/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // 1) Redirection explicite pour la racine
      {
        source: '/',
        has: [{ type: 'host', value: 'pourlestoutpetits.fr' }],
        destination: 'https://www.pourlestoutpetits.fr',
        permanent: true,
      },
      // 2) Redirection pour tous les chemins
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'pourlestoutpetits.fr' }],
        destination: 'https://www.pourlestoutpetits.fr/:path*',
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;