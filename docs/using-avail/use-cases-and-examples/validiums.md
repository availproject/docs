---
id: use-case-validiums
title: Avail-Powered Validiums
sidebar_label: Validiums
description: How to use Avail to build validiums
keywords:

- docs
- avail
- availability
- scale
- rollup
- validium
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: /using-avail/validiums

---

# Avail-Powered Validiums

Due to the architecture of monolithic blockchains (such as Ethereum in
its current state), operating the blockchain is expensive, resulting
in high transaction fees. Rollups attempt to extract the burden of
execution by running transactions off-chain and then posting the
execution results and the [usually compressed] transaction data.

Validiums are the next step: instead of posting the transaction data,
it is kept available off-chain, where a proof/attestation is only
posted to the base layer. This is by far the most cost-effective
solution because both execution and data availability are kept
off-chain while still allowing for final verification and settlement
on the layer 1 chain.

Avail is a blockchain optimized for data availability. Any rollup that
wishes to become a validium can switch to post transaction data to
Avail instead of the layer 1 and deploy a verification contract that,
in addition to verifying the correct execution, also verifies data
availability.

The Avail team will make this data availability verification simple on
Ethereum by building an attestation bridge to post data availability
attestations directly to Ethereum. This will make the verification
contract's job a simple one, since the DA attestations will already be
on-chain. This bridge is currently in design; please reach out to the
Avail team for more information or to join our early access program.

## Verify data availability on Ethereum

In order to verify data availability on the Ethereum it is necessary to 
submit data transaction to the Avail network. Submitting data availability transaction
to Avail can be done using `Polkadot-JS` which is a collection of tools 
for communication with Substrate based chains.
Example:

 ```
    async function submitData(availApi, data, account) {
        let submit = await availApi.tx.dataAvailability.submitData(data);
        return await sendTx(availApi, account, submit);
    }
   ```

Function `submitData` receives `availApi` api instance, `data` that will be submitted,
and the `account` which is sending the transaction. In order to create account 
it is necessary to create _keyring_ _pair_ for the account that wants to send the data.
This can be done with `keyring.addFromUri(secret)` which creates keyring pair via suri 
(the secret can be a hex string, mnemonic phrase or a string).
After creating keyring pair, it is possible to send data availability transaction
`availApi.tx.dataAvailability.submitData(data);` to the Avail. Once transaction is included in the block
it is possible to dispatch data root by creating transaction
`availApi.tx.daBridge.tryDispatchDataRoot(destinationDomain, bridgeRouterEthAddress, header);` with the parameters:

`destinationDomain` Destination domain 1000.

`bridgeRouterEthAddress` Address of the main data availability router contract.

`header` Provided from the block when data is submitted.

```
   async function dispatchDataRoot(availApi, blockHash, account) {
    const header = await availApi.rpc.chain.getHeader(blockHash);
    let tx = await availApi.tx.daBridge.tryDispatchDataRoot(
      process.env.DESTINATION_DOMAIN,
      process.env.DA_BRIDGE_ADDRESS,
      header
    );
    return await sendTx(availApi, account, tx);
   }
   ```
Example of submitting data to Avail and dispatching data root [**TODO link**].

Dispatching data root will trigger Nomad Bridge which will bridge data root to the Ethereum network. Since Nomad bridge is optimistic
bridge, it is necessary to wait for 30 minutes before the data root is available on the Ethereum network.

After successfully bridging data root to the main data availability attestation contract on the Ethereum network,
it is possible to prove that data is available on Avail by submitting a Merkle proof to the verification contract.
Fetching proof from Avail can be done via RPC call `kate_queryDataProof` for  example `availApi.rpc.kate.queryDataProof(dataIndex, hashBlock);`
where `dataIndex` is index of the data (leaf) in the Merkle tree and `hashBlock` which is a hash of the block in which
the data is included. This RPC endpoint returns `DataProof` object that can be used to prove data availability on Avail.
Example:

```
async function getProof(availApi, hashBlock, dataIndex) {
    const dataProof = await availApi.rpc.kate.queryDataProof(dataIndex, hashBlock);
    return dataProof;
}
```

Returned data:
```
DataProof: {
   root: 'H256',
   proof: 'Vec<H256>',
   numberOfLeaves: 'Compact<u32>',
   leaf_index: 'Compact<u32>',
   leaf: 'H256'
}
```

`root` Root hash of generated merkle tree.

`proof` Merkle proof items (does not contain the leaf hash, nor the root).

`numberOfLeaves`  Number of leaves in the original tree.

`leaf_index` Index of the leaf the proof is for (starts from 0).

`leaf` Leaf for which is the proof.

By submitting proof to the verification contract (example of verification contract [**TODO link**]) it is possible to verify
that data is available on Avail. Example of submitting a proof to the verification contract deployed on Ethereum, that can be queried by calling
data root membership function `validiumContract.checkDataRootMembership(blockNumber, leafHash, dataIndex, proof);` where

`blockNumber` Number of the block for which data is checked

`leafHash` Hash of the data leaf that membership is checked

`dataIndex` Data index of the leaf of where the proof is

`proof` Array of the merkle proofs to construct root

This contract call will return `true` or `false` depending if the provided proof is valid or not.

Example of submitting proof to the verification contract [**TODO link**].
