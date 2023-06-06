#! /bin/bash

# Edit this line to set the key to your controller key
# You may use a raw seed (like in this example) or a mnemonic (sequence of words)

key="0x13ffxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxd7cf8292f3"

#
# Do not modify below this line
#

insert_key() {
    ./data-avail key insert --base-path `pwd`/data \
        --chain `pwd`/chainspec.raw.json \
        --scheme $2 \
        --suri "${key}" \
        --password-interactive \
        --key-type $1
}

insert_key babe Sr25519
insert_key gran Ed25519
insert_key imon Sr25519
insert_key audi Sr25519
