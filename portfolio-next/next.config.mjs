/** @type {import('next').NextConfig} */
      const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'avatars.githubusercontent.com',
              port: '',
              pathname: '/u/**',
            },
            {
              protocol: 'https',
              hostname: 'raw.githubusercontent.com',
              port: '',
              pathname: '/devicons/devicon/icons/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            }
          ],
        },
      };
      
      export default nextConfig;