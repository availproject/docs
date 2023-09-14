---
id: communicating-with-avail
title: Get Started Communicating with Avail
sidebar_label: Quickstart
sidebar_position: 1
description: Examples of how to communicate with Avail
keywords:
- docs
- avail
- examples
image: https://availproject.github.io/img/avail/AvailDocs.png

---

The Avail API offers a robust set of features that enable application developers to interact 
seamlessly with the Avail network. This guide provides a curated list of example code snippets in 
JavaScript/TypeScript, Rust, and Go. These examples cover essential tasks such as establishing a 
connection to a local node, querying data from the network, and executing transactions on the 
blockchain.

## Prerequisites

Before diving into the examples, ensure you have a local Avail node running or configure your settings to align with an existing network. Detailed instructions on how to execute these examples are available in the Avail GitHub repository:

- [TypeScript Instructions](https://github.com/availproject/avail/blob/develop/examples/ts/README.md)
- [Go Instructions](https://github.com/availproject/avail/blob/develop/examples/go/README.md)
- [Rust Instructions](https://github.com/availproject/avail/blob/develop/avail-subxt/examples/README.md)

## Sample Workflow

Follow these steps to understand a sample end-to-end flow of data availability in Avail. Examples are provided for JavaScript, Go, and Rust.

### Step 1: Establishing Connection

Before you can interact with the Avail network, you need to establish a connection to a node. 

| Language    | Example Link                                                                                     |
|-------------|--------------------------------------------------------------------------------------------------|
| JavaScript  | [Establishing Connection](https://github.com/availproject/avail/tree/develop/examples/ts/src/connect.ts) |
| Go          | [Establishing Connection](https://github.com/availproject/avail/tree/old_develop/examples/go/connect)     |
| Rust        | [Headers](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/headers.rs)          |

### Step 2: Submitting Data

Once connected, the next step is to submit data to the network. This could be any blob of data that you want to make available.

| Language    | Example Link                                                                                     |
|-------------|--------------------------------------------------------------------------------------------------|
| JavaScript  | [Submitting Blob Data](https://github.com/availproject/avail/tree/develop/examples/ts/src/data_submit.ts)  |
| Go          | [Submitting Data](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmit)          |
| Rust        | [Submitting Data](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data.rs)|

### Step 3: Dispatching Data Root (Optional)

If you need to dispatch the data root, you can do so at this stage. This is optional and depends on your use case.

| Language    | Example Link                                                                                     |
|-------------|--------------------------------------------------------------------------------------------------|
| JavaScript  | [Dispatching Data Root](https://github.com/availproject/avail/tree/develop/examples/ts/src/dispatch_data_root.ts)|
| Rust        | [Submit Data and Dispatch Data Root](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data_and_dispatch_data_root.rs)|

### Step 4: Querying Data and Proofs

After submitting your data, you might want to query it to ensure it's been properly stored and is retrievable.

| Language    | Example Link                                                                                     |
|-------------|--------------------------------------------------------------------------------------------------|
| JavaScript  | [Querying Data Proof](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_proof_data.ts)  |
| Go          | [Querying Data with Proof](https://github.com/availproject/avail/tree/old_develop/examples/go/queryProofData)  |
| Rust        | [Democracy External](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/democracy_external.rs)|

### Step 5: Monitoring and Metrics

Finally, you can monitor the network and your data by listening for new blocks and other metrics.

| Language    | Example Link                                                                                     |
|-------------|--------------------------------------------------------------------------------------------------|
| JavaScript  | [Listening to New Blocks](https://github.com/availproject/avail/tree/develop/examples/ts/src/listen_new_blocks.ts)|
| Go          | [Listening for New Blocks](https://github.com/availproject/avail/tree/old_develop/examples/go/listenNewBlocks)   |

## API Examples

The following table lists various code examples for interacting with the Avail network. These examples are categorized by programming language and functionality.

<div style={{ display: 'flex', justifyContent: 'space-between' }}>

<!-- TypeScript/JavaScript Examples -->
<div style={{ width: '45%' }}>

### TypeScript

| Functionality                | GitHub Link                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| Submitting Blob Data         | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/data_submit.ts)        |
| Dispatching Data Root        | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/dispatch_data_root.ts)  |
| Creating Application Key     | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/app_id.ts)             |
| Simple Asset Transfer        | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/transfer.ts)           |
| Querying Data Proof          | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_proof_data.ts)   |
| Querying Proof               | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_proof.ts)        |
| Querying Application Data    | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/query_app_data.ts)     |
| Listening to New Blocks      | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/listen_new_blocks.ts)  |
| Fetching Chain & Node Info   | [Link](https://github.com/availproject/avail/tree/develop/examples/ts/src/connect.ts)            |

</div>

<!-- Go Examples -->
<div style={{ width: '45%' }}>

### Go

| Functionality                | GitHub Link                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| Establishing Connection      | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/connect)               |
| Submitting Data              | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmit)            |
| Watching Data Submission     | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/dataSubmitWatch)       |
| Internal Operations          | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/internal)              |
| Listening for New Blocks     | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/listenNewBlocks)       |
| Querying Data with Proof     | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/queryProofData)        |
| Asset Transfer               | [Link](https://github.com/availproject/avail/tree/old_develop/examples/go/transfer)              |

</div>

<!-- Rust Examples -->
<div style={{ width: '45%' }}>

### Rust

| Functionality                             | GitHub Link                                                                                                          |
|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Creating Application Key                  | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/create_app_key.rs)                 |
| Data Availability Bridge Actor            | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/da_bridge_actor.rs)                |
| Democracy External                        | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/democracy_external.rs)              |
| Downloading Digest Items                  | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/download_digest_items.rs)          |
| Headers                                   | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/headers.rs)                        |
| Max Block Submit                          | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/max_block_submit.rs)                |
| Setting Updater                           | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/set_updater.rs)                     |
| Submitting Block Length Proposal          | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_block_length_proposal.rs)    |
| Block Length Proposal via Democracy       | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_block_length_proposal_democracy.rs) |
| Submitting Data                           | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data.rs)                     |
| Submit Data and Dispatch Data Root        | [Link](https://github.com/availproject/avail/blob/old_develop/avail-subxt/examples/submit_data_and_dispatch_data_root.rs) |


</div>

</div>
