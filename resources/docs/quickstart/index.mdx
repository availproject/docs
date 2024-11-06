import { SDK, Keyring, WaitFor, TransactionOptions, BN } from "avail-js-sdk";

const main = async () => {
  // Start of main function
  // Main Content
  const sdk = await SDK.New("ws://127.0.0.1:9944")
  console.log("Genesis Hash: " + sdk.api.genesisHash.toHex())

  // Account Creation
  const account = new Keyring({ type: "sr25519" }).addFromUri("//Alice")
  console.log("The address of Alice is: " + account.address)

  // Application Key Creation
  const appKeyResult = await sdk.tx.dataAvailability.createApplicationKey("My Personal Application Key", WaitFor.BlockInclusion, account)
  if (appKeyResult.isErr) {
    console.log("Error: " + appKeyResult.reason)
    process.exit(1)
  }

  const appKeyId = parseInt(appKeyResult.event.id)
  console.log("Application key ID: " + appKeyId)

  // Data Submission
  const options: TransactionOptions = { app_id: appKeyId };
  const daResult = await sdk.tx.dataAvailability.submitData("My Data", WaitFor.BlockInclusion, account, options)
  if (daResult.isErr) {
    console.log("Error: " + daResult.reason)
    process.exit(1)
  }
  console.log("Data Submission Hash: " + daResult.event.dataHash)

  // Balance Transfer
  const bobAddress = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
  const oneAvail = new BN(10).pow(new BN(18))
  const btResult = await sdk.tx.balances.transferKeepAlive(bobAddress, oneAvail, WaitFor.BlockInclusion, account)
  if (btResult.isErr) {
    console.log("Error: " + btResult.reason)
    process.exit(1)
  }

  const amount = btResult.event.amount;
  console.log(`Transfer completed. Alice transferred to Bob ${amount} units`)

  process.exit()
};

main();
