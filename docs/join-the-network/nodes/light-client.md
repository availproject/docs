---
id: avail-light-client-da
title: Build and Run a Light Client with Data Availability
sidebar_label: Run a Light Client
sidebar_position: 1
description: Learn about building and running a Light Client with Data Availability
keywords:
  - docs
  - avail
  - node
  - data availability
  - da
image: https://availproject.github.io/img/avail/AvailDocs.png
slug: avail-light-client-da
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Build & Run `avail-light` & `data-avail`

First, build the Docker images, `client:asdr` (using branch `feature/app-specific-data-retrieval_2`) and `da:asdr`
(using branch `feature/app-specific-data-retrieval`):

```shell
export DOCKER_BUILDKIT = 1
docker build --ssh default -t client:asdr --build-arg BRANCH=feature/app-specific-data-retrieval_2 -f images/client/Dockerfile images/client/
```

Next, run the services using `docker-compose.light-client.yml`:

```shell
docker-compose -f docker-compose.light-client.yml up
```

## Using Monk templates

### Testnet using three validators

On the testnet, validators use the development accounts: `Alice`, `Bob`, and `Charlie`.

### Step 1: Build images

```shell
export DOCKER_BUILDKIT=1
docker build -t da:ava-33  --build-arg BRANCH=miguel/ava-33-create-monk-template-for-da-testnet -f images/da/Dockerfile images/da/
```

### Step 2: Load Monk templates

The testnet only need to load two monk templates:

- **monk/polygon-da-base.matic.today.yaml**, which contains common definitions for DevNet & TestNet.
- **monk/polygon-da-devnet.matic.today.yaml**, where validators are defined.

```shell
monk s ns-delete /templates/local/polygon
monk load monk/polygon-da-base.matic.today.yaml
monk load monk/polygon-da-devnet.matic.today.yaml
```

### Step 3: Run templates

Once templates are loaded, we only need to run three nodes:

```shell
monk run polygon/da-dev-validator-1 polygon/da-dev-validator-2 polygon/da-dev-validator-3
```

Now you can check logs using `monk logs`, i.e.:

```shell
monk logs -f -l 100 polygon/da-dev-validator-1
```

You should expect:

```
2022-03-22 10:52:20 ✨ Imported #9 (0x911b…bdf5)
2022-03-22 10:52:23 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.5kiB/s ⬆ 1.8kiB/s
2022-03-22 10:52:28 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.2kiB/s ⬆ 1.2kiB/s
2022-03-22 10:52:33 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.2kiB/s ⬆ 1.2kiB/s
2022-03-22 10:52:38 💤 Idle (2 peers), best: #9 (0x911b…bdf5), finalized #7 (0x6309…0366), ⬇ 1.1kiB/s ⬆ 1.1kiB/s
2022-03-22 10:52:40 Rows: 1 Cols: 4 Size: 128
2022-03-22 10:52:40 Time to extend block 150.509µs
2022-03-22 10:52:40 Time to prepare 181.938µs
2022-03-22 10:52:40 Number of CPU cores: 16
2022-03-22 10:52:40 Time to build a commitment 1.766672ms
2022-03-22 10:52:40 ✨ Imported #10 (0x64f4…84b5)
2022-03-22 10:52:43 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.6kiB/s ⬆ 1.6kiB/s
2022-03-22 10:52:48 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.1kiB/s ⬆ 1.1kiB/s
2022-03-22 10:52:53 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.2kiB/s ⬆ 1.2kiB/s
2022-03-22 10:52:58 💤 Idle (2 peers), best: #10 (0x64f4…84b5), finalized #8 (0x3c88…cfe1), ⬇ 1.2kiB/s ⬆ 1.2kiB/s
2022-03-22 10:53:00 Rows: 1 Cols: 4 Size: 128
2022-03-22 10:53:00 Time to extend block 146.593µs
2022-03-22 10:53:00 Time to prepare 175.756µs
2022-03-22 10:53:00 Number of CPU cores: 16
2022-03-22 10:53:00 Time to build a commitment 1.891133ms
2022-03-22 10:53:00 ✨ Imported #11 (0x0a5e…43d6)
```

### Purge Node State

In this configuration, the state of the node is stored at `/var/lib/monkd/volumes/dev/validator`, so
you can remove these folders or just use `monk purge`:

```
monk purge polygon/da-dev-validator-1 polygon/da-dev-validator-2 polygon/da-dev-validator-3
```
