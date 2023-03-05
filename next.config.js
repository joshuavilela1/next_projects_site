/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  //! Still does typechecking, but doesn't cause an error
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
