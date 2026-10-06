/** @type {import('next').NextConfig} */
const SITE = 'https://www.regulatorsmcpalmbay.com';

const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 60,

  async redirects() {
    return [
      // One address per page for search engines: the bare domain and the
      // project's *.vercel.app production alias both send visitors to www.
      // (Preview deployment URLs have other hostnames and are not affected.)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'regulatorsmcpalmbay.com' }],
        destination: `${SITE}/:path*`,
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'regulators-mc-palm-bay.vercel.app' }],
        destination: `${SITE}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }];
    return [
      // Members-only portal pages and the password reset page: never indexed,
      // even if someone links to them. Backs up the meta robots tag in each file.
      { source: '/:page(members.*\\.html)', headers: noindex },
      { source: '/reset-password.html', headers: noindex },
      { source: '/api/:path*', headers: noindex },
    ];
  },
};

module.exports = nextConfig;
