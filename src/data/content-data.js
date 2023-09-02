export const contentData = {
    linksCard: [
        {
            iconSrc: '/img/avail-logo.png',
            title: 'Run a Node',
            cardLink: '/node/node-types/',
            blockInfo: [
                'Optimal Performance',
                'Low Barrier to Entry',
                'Security-Focused Design'
            ],
            tutorialsInfo: [
                {
                    title: 'Run a Light Client',
                    link: '/about/light-client-setup/'
                },
                {
                    title: 'Run a Full Node',
                    link: '/node/full-node/full-node-binaries/'
                },
                {
                    title: 'Run an Archive Node',
                    link: '/node/avail-archive-node/'
                }
            ]
        },                
        {
            iconSrc: '/img/avail-logo.png',
            title: 'Become a Validator',
            cardLink: 'validators/validator-node/validator-binaries/',
            blockInfo: [
                'Network Security',
                'Governance Participation',
                'Maintainer Rewards'
            ],
            tutorialsInfo: [
                {
                    title: 'Run a Validator Node',
                    link: 'validators/validator-node/validator-binaries/'
                },
                {
                    title: 'Upgrade Your Validator',
                    link: '/validators/avail-upgrade-validator-node/'
                },
                {
                    title: 'Monitor Your Validator',
                    link: '/validators/avail-monitoring-validator-node/'
                }
            ]
        },        
        {
            iconSrc:'/img/avail-logo.png',
            title: 'Build Modular Solutions',
            cardLink: '/api/communicating-with-avail/',
            blockInfo: [
                'Highly Efficient Validiums',
                'Robust Soverign Chain Rollups',
                'Optimized App-chains',
            ],
            tutorialsInfo: [
                {
                    title: 'Avail-Powered Validiums',
                    link: '/api/use-case-validiums'
                },
                {
                    title: 'Soverign Chain Rollups: Docs Coming Soon',
                },
                {
                    title: 'App-chains: Docs Coming Soon',
                },
            ]
        },
    ],
    ecosystem: {
        tabs: [
            {
                name: 'Active Networks',
                details: [
                    {
                        networkName: 'Kate Testnet',
                        explorer: 'https://kate.avail.tools',
                        rpcEndpoint: 'https://kate.avail.tools/v1',
                        wsEndpoint: 'wss://kate.avail.tools/ws',
                        chainSpec: { link: 'https://kate.avail.tools/#/explorer/chainspec', text: 'chainspec.raw.json' },
                        chainInfo: { link: 'https://availproject.github.io/assets/files/chaininfo-de1eeff4d63715bbec85aae81a956d40.txt', text: 'chaininfo.txt' },
                        nodeVersion: { link: 'https://github.com/availproject/avail/releases/tag/v1.6.3', text: 'v1.6.3' },
                        lightClientVersion: { link: 'https://github.com/availproject/avail-light/releases/tag/v1.6.0-rc1', text: '1.6.0-rc1' }
                    },
                    // Add more active networks here
                ]
            },
            {
                name: 'Retired Networks',
                details: [
                    {
                        networkName: 'Testnet Phase 1',
                        explorer: 'https://testnet.avail.tools',
                        rpcEndpoint: 'https://testnet.avail.tools/v1',
                        wsEndpoint: 'wss://testnet.avail.tools/ws',
                        nodeVersion: { link: 'https://github.com/availproject/avail/releases/tag/v1.5.0-303f39d', text: 'v1.5.0-303f39d' },
                        lightClientVersion: { link: 'https://github.com/availproject/avail-light/releases/tag/v1.3.1', text: '1.3.1' }
                    },
                    // Add more retired networks here
                ]
            },
        ]
    },
    
    faq: {
        faqList: [
            {
                title: 'What is a light client?',
                content: 'Light clients allow users to interact with a blockchain network without having to sync the full blockchain while maintaining decentralization and security. Generally, they download the blockchain headers, but not the contents of each block. Avail (DA) light clients additionally verify that block contents are available by performing Data Availability Sampling, a technique where small random sections of a block are downloaded.'
            },
            {
                title: 'What is a popular use case of a light client?',
                content: "There are many use-cases which today rely on an intermediary to maintain a full node, such that end users of a blockchain do not communicate directly with the blockchain but instead through the intermediary. Light clients have until now not been a suitable replacement for this architecture because they lacked data availability guarantees. Avail solves this issue, thus enabling more applications to directly participate on the blockchain network without intermediaries. Although Avail does support full nodes, we expect most applications will not need to run one, or will need to run fewer."
            },
            {
                title: 'What is data availability sampling?',
                content: "Avail light clients, like other light clients, only download the headers of the blockchain. However, they additionally perform data availability sampling: a technique that randomly samples small sections of the block data and verifies they are correct. When combined with erasure coding and KZG polynomial commitments, Avail clients are able to provide strong (nearly 100%) guarantees of availability without relying on fraud proofs, and with only a small constant number of queries."
            },
            {
                title: 'How is erasure coding used to increase data availability guarantees?',
                content: "Erasure coding is a technique that encodes data in a way that spreads out the information over multiple 'shards', such that the loss of some number of those shards can be tolerated. That is, the information can be reconstructed from the other shards. Applied to the blockchain, this means that we effectively increase the size of each block, but we prevent a malicious actor from being able to hide any part of a block up to the redundant shard size. Since a malicious actor needs to hide a large part of the block in order to attempt to hide even a single transaction, it makes it much more likely that random sampling would catch the large gaps in the data. Effectively, erasure coding makes the data availibility sampling technique much more powerful."
            },
            {
                title: 'What are KZG commitments?',
                content: "KZG commitments, introduced by Aniket Kate, Gregory M. Zaverucha, and Ian Goldberg in 2010, provide a way to commit to polynomials in a succinct manner. Recently, polynomial commitments came to the forefront, being primarily used as commitments in PLONK-like zero knowledge constructions.<br><br>In our construction, we use KZG commitments for the following reasons:<ul><li>It allows us to commit to values in a succinct manner to be kept inside the block header.</li><li>Short openings are possible which helps a light client verify availability.</li><li>The cryptographic binding property helps us avoid fraud proofs by making it computationally infeasible to produce incorrect commitments.</li></ul><br>In the future, we might use other polynomial commitment schemes, if that gives us better bounds or guarantees."
            },            
            {
                title: 'Since Avail is used by multiple applications, does that mean chains have to download transactions from other chains?',
                content: "No. Avail headers contain an index that allows a given application to determine and download only the sections of a block that have data for that application. Thus, they are largely unaffected by other chains using Avail at the same time or by block sizes.<br><br>The only exception is data availability sampling. In order to verify that data is available (and due to the nature of erasure coding), clients sample small parts of the block at random, including possibly sections that contain data for other applications."
            }            
        ]
    },
};
