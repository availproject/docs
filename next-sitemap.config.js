/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://docs.availproject.org',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      }
    ]
  }
}