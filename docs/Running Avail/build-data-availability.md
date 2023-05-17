---
id: avail-data-avail
title: Multi Node Setup
sidebar_label: Multi Node Setup
description: Learn about running an Avail Validator node for Data Availability.
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-data-avail
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Build from the Source Code

Clone the repo and checkout to the right branch:

```shell
git clone https://github.com/availproject/avail.git
```

Only build the node binaries

```shell
cargo build --release -p data-avail
```

## Optional: How to generate deterministic WASM

:::note

This step is **not required** and it should only be used to verify that WASM matches with
the source code.

:::

The `srtool` allows building **WASM runtimes in a deterministic way**, allowing CIs and users, with
various machines and OS, to produce a *strictly identical* WASM runtime.

1. Install [srtool-cli](https://github.com/chevdor/srtool-cli)

2. Move to your `substrate` root folder and build the WASM runtime:

```shell
srtool build -r runtime/ --package da-runtime
```

You should expect an output like the following:

```shell
Found 1.57.0, we will be using paritytech/srtool:1.57.0 for the build
🧰 Substrate Runtime Toolbox - srtool v0.9.19 🧰
        - by Chevdor -
info: using existing install for '1.57.0-x86_64-unknown-linux-gnu'
info: override toolchain for '/build' set to '1.57.0-x86_64-unknown-linux-gnu'

1.57.0-x86_64-unknown-linux-gnu unchanged - rustc 1.57.0 (f1edd0429 2021-11-29)

🏗  Building node-template-runtime as release using rustc 1.57.0 (f1edd0429 2021-11-29)
⏳ That can take a little while, be patient... subsequent builds will be faster.
 Since you have to wait a little, you may want to learn more about Substrate runtimes:
 https://docs.substrate.io/v3/getting-started/architecture/
   Updating git repository `https://github.com/availproject/plonk.git`
   Updating crates.io index
Downloading crates ...
  Downloaded addr2line v0.17.0
  Downloaded void v1.0.2
  ...

  Compiling pallet-staking v3.0.0 (/build/frame/staking)
  Compiling pallet-babe v3.0.0 (/build/frame/babe)
    Finished release [optimized] target(s) in 5m 31s

✨ Your Substrate WASM Runtime is ready! ✨
Summary generated with srtool v0.9.19 using the docker image paritytech/srtool:1.57.0:
Package     : node-template-runtime v2.0.0
GIT commit  : 0c920993026117aa83c905bfcbe881a71ae3e8a3
GIT tag     : v3.0.0
GIT branch  : da-poc-upgrade-3.0
Rustc       : rustc 1.57.0 (f1edd0429 2021-11-29)
Time        : 2022-01-18T15:55:30Z

== Compact
Version     : node-template-1 (node-template-1.tx1.au10)
Metadata    : V12
Size        : 1.75 MB (1832581 bytes)
Proposal    : 0xb1b534eb700006140cc980c89c1f3a9ad7a5ababa3e2aa8b9a17c5ae71d9b61c
IPFS        : QmanwTMjMhWL8uL974VzrA6XVUg17x7czYqEftop6dhkP2
BLAKE2_256  : 0xa1f8434cba25d4bee440d61b9ce6eeaa0d948ff2173187d940e8c3d87086737c
Wasm        : ./bin/node-template/runtime//target/srtool/release/wbuild/node-template-runtime/node_template_runtime.compact.wasm

== Compressed
No compressed runtime found
```

Now you only need to replace the WASM file in your `target/release` folder and rebuild the node
binary. Another option is to replace the WASM code in `genesis > runtime > frameSystem > code` in
your `chain.spec` file.
