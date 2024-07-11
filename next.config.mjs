/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/investments",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
