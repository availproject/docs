#! /bin/bash

echo -n "Controller account mnemonic or raw seed: "
read -s key
echo
echo -n "Controller account password: "
read -s pass

insert_key() {
    ./data-avail key insert --base-path `pwd`/data \
        --chain `pwd`/chainspec.raw.json \
        --scheme $2 \
        --suri "${key}" \
        --password "${pass}" \
        --key-type $1
}

insert_key babe Sr25519
insert_key gran Ed25519
insert_key imon Sr25519
insert_key audi Sr25519
