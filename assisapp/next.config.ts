import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // You can keep your existing experimental options here
  },
  webpack: (config, { isServer }) => {
    // If we are building for the client-side (browser)
    if (!isServer) {
      // Tell webpack to ignore these modules that only exist in Node.js
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        child_process: false,
        dns: false,
        crypto: false,
        snappy: false,
        'creport-providers': false,
        '@mongodb-js/zstd': false,
        kerberos: false,
        '@aws-sdk/credential-providers': false,
        'gcp-metadata': false,
        socks: false,
        aws4: false,
        'mongodb-client-encryption': false,
      };
    }
    return config;
  },
};

export default nextConfig;