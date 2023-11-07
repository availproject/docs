---
id: quickstart
title: Get Started with Avail
sidebar_label: Quickstart
description: 'Discover how to utilize Avail as a data availability layer.'
keywords:
  - documentation
  - avail
  - develop
  - build
  - data availability
  - da
image: https://docs.availproject.org/img/avail/AvailDocs.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Start Operating

To run an Avail light client, simply run the following command:

```bash
curl -sL1 avail.sh | sh
```

or, with `wget`:

```bash
wget --https-only --secure-protocol=TLSv1_2 --quiet -O - avail.sh | sh
```

That's it!

If you're seeking more control over the configuration or are interested in running a full node, check out the deployment guides below.

| Action                                                                   | Tokens Needed | Staking | Technical Skill Required | Client Binary                                                                                |
| ------------------------------------------------------------------------ | ------------- | ------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| [<ins>Run a Light Client</ins>](/docs/operate/node/0010-light-client.md) | No            | No      | Basic                    | [<ins>v1.7.3-rc3</ins>](https://github.com/availproject/avail-light/releases/tag/v1.7.3-rc3) |
| [<ins>Run a Full Node</ins>](/category/full-node/)                       | No            | No      | Moderate                 | [<ins>v1.8.0.0-rc1</ins>](https://github.com/availproject/avail/releases/tag/v1.8.0.0-rc1)   |
| [<ins>Become a Validator</ins>](/category/become-a-validator/)           | Yes           | Yes     | Advanced                 | [<ins>v1.8.0.0-rc1</ins>](https://github.com/availproject/avail/releases/tag/v1.8.0.0-rc1)   |

---

## Start Building

The Avail API offers a robust set of features that enable application developers to interact
seamlessly with the Avail network. This guide provides a curated list of example code snippets in
JavaScript/TypeScript, Rust, and Go. These examples cover essential tasks such as establishing a
connection to a local node, querying data from the network, and executing transactions on the
blockchain.

Before diving into the examples, ensure you have a local Avail node running or configure your settings to align with an existing network.

> Detailed instructions on how to execute these examples are available in the Avail GitHub repository:

- [TypeScript Instructions](https://github.com/availproject/avail/blob/develop/examples/ts/README.md)
- [Go Instructions](https://github.com/availproject/avail/blob/develop/examples/go/README.md)
- [Rust Instructions](https://github.com/availproject/avail/blob/develop/avail-subxt/examples/README.md)

### Sample Workflow

Follow these steps to understand a sample end-to-end flow of data availability in Avail. Examples are provided for JavaScript, Go, and Rust.

#### Step 1: Establishing Connection

Before you can interact with the Avail network, you need to establish a connection to a node.

| Language   | Example Link                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| JavaScript | [Establishing Connection](https://github.com/availproject/avail/tree/develop/examples/ts/src/connect.ts) |
| Go         | [Establishing Connection](https://github.com/availproject/avail/tree/old_develop/examples/go/connect)    |
| Rust       | [Headers](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/headers.rs)        |

#### Step 2: Submitting Data

Once connected, the next step is to submit data to the network. This could be any blob of data that you want to make available.

| Language   | Example Link                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| JavaScript | [Submitting Blob Data](https://github.com/availproject/avail/tree/develop/examples/ts/src/data_submit.ts)          |
| Go         | [Submitting Blob Data](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmit)              |
| Rust       | [Submitting Blob Data](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data.rs) |

#### Step 3: Dispatching Data Root (Optional)

If you need to dispatch the data root, you can do so at this stage. This is optional and depends on your use case.

| Language   | Example Link                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [Dispatching Data Root](https://github.com/availproject/avail/tree/develop/examples/ts/src/dispatch_data_root.ts)                                       |
| Rust       | [Submit Data and Dispatch Data Root](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data_and_dispatch_data_root.rs) |

#### Step 4: Querying Data and Proofs

After submitting your data, you might want to query it to ensure it's been properly stored and is retrievable.

| Language   | Example Link                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [Querying Data Proof](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_proof_data.ts)           |
| Go         | [Querying Data Proof](https://github.com/availproject/avail/tree/old_develop/examples/go/queryProofData)                |
| Rust       | [Democracy External](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/democracy_external.rs) |

#### Step 5: Monitoring and Metrics

Finally, you can monitor the network and your data by listening for new blocks and other metrics.

| Language   | Example Link                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| JavaScript | [Listening for New Blocks](https://github.com/availproject/avail/tree/develop/examples/ts/src/listen_new_blocks.ts) |
| Go         | [Listening for New Blocks](https://github.com/availproject/avail/tree/old_develop/examples/go/listenNewBlocks)      |

### API Examples

The following table lists various code examples for interacting with the Avail network. These examples are organized by functionality and the supported programming languages.

| Functionality                             | Supported Languages                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Data Submission                           | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/data_submit.ts), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmit), [<ins>Rust</ins>](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data_and_dispatch_data_root.rs) |
| Dispatching Data Root                     | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/dispatch_data_root.ts)                                                                                                                                                                                                                                |
| Creating Application Key                  | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/app_id.ts), [<ins>Rust</ins>](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/create_app_key.rs)                                                                                                                          |
| Asset Transfer                            | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/transfer.ts), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/transfer)                                                                                                                                            |
| Querying Proof/Data Proof                 | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_proof.ts), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/queryProofData)                                                                                                                                   |
| Querying Application Data                 | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_app_data.ts)                                                                                                                                                                                                                                    |
| Event Monitoring (Blocks/Data Submission) | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/listen_new_blocks.ts), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/listenNewBlocks), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmitWatch)                       |
| Network Connection & Info                 | [<ins>TypeScript</ins>](https://github.com/availproject/avail/tree/develop/examples/ts/src/connect.ts), [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/connect)                                                                                                                                              |
| Internal Operations                       | [<ins>Go</ins>](https://github.com/availproject/avail/tree/old_develop/examples/go/internal)                                                                                                                                                                                                                                                     |
| Rust + & Substrate Examples               | Various [<ins>Rust</ins>](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/) examples like Data Availability Bridge Actor, Democracy External, etc.                                                                                                                                                                   |
