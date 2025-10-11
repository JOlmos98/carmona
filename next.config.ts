import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = { images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] } };

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // output: 'export',
// };

// export default nextConfig;
