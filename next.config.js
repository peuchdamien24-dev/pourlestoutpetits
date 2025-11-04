/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        // si l'Host est le domaine APEX, on redirige vers WWW
        has: [{ type: 'host', value: 'pourlestoutpetits.fr' }],
        destination: 'https://www.pourlestoutpetits.fr/:path*',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;