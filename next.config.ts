import nextra from 'nextra'

function isExportNode(node, varName: string) {
  if (node.type !== 'mdxjsEsm') return false
  const [n] = node.data.estree.body

  if (n.type !== 'ExportNamedDeclaration') return false

  const name = n.declaration?.declarations?.[0].id.name
  if (!name) return false

  return name === varName
}

const DEFAULT_PROPERTY_PROPS = {
  type: 'Property',
  kind: 'init',
  method: false,
  shorthand: false,
  computed: false
}

export function createAstObject(obj) {
  return {
    type: 'ObjectExpression',
    properties: Object.entries(obj).map(([key, value]) => ({
      ...DEFAULT_PROPERTY_PROPS,
      key: { type: 'Identifier', name: key },
      value:
        value && typeof value === 'object' ? value : { type: 'Literal', value }
    }))
  }
}

// eslint-disable-next-line unicorn/consistent-function-scoping
const rehypeOpenGraphImage = () => ast => {
  const frontMatterNode = ast.children.find(node =>
    isExportNode(node, 'metadata')
  )
  if (!frontMatterNode) {
    return
  }
  const { properties } =
    frontMatterNode.data.estree.body[0].declaration.declarations[0].init
  const title = properties.find(o => o.key.value === 'title')?.value.value
  if (!title) {
    return
  }
  const [prop] = createAstObject({
    openGraph: createAstObject({
      images: `https://nextra.site/og?title=${title}`
    })
  }).properties
  properties.push(prop)
}

const withNextra = nextra({
  search: {
    codeblocks: false
  },
  latex: true,
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePlugins: [
      // Provide only on `build` since turbopack on `dev` supports only serializable values
      process.env.NODE_ENV === 'production' && rehypeOpenGraphImage
    ]
  },
  whiteListTagsStyling: ['figure', 'figcaption']
})

const nextConfig = withNextra({
  reactStrictMode: true,
  eslint: {
    // ESLint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true
  },
  redirects: async () => [
  ],
  webpack(config) {
    const allowedSvgRegex = /components\/icons\/.+\.svg$/
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg')
    )
    fileLoaderRule.exclude = allowedSvgRegex

    config.module.rules.push({
      test: allowedSvgRegex,
      use: ['@svgr/webpack']
    })
    return config
  },
  experimental: {
    turbo: {
      rules: {
        './components/icons/*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    },
    optimizePackageImports: ['@components/icons']
  }
})

export default nextConfig