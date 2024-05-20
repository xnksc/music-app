// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["nenepjzptmzfondmppns.supabase.co"],
//   },
// };

// export default nextConfig;
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["nenepjzptmzfondmppns.supabase.co"],
  },
};

export default withNextIntl(nextConfig);
