/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [  //under this we put domains where we are allowed to serve images(we are allowed to provide and display the image) and this is for security b/c otherwise anyone can take adavtages of the endpoint next js exposes for serving optimized images(it can be from anywhere)
          {
            protocol: 'https',
            hostname: 'static01.nyt.com',
            // port: '',  we don't have the two at the moment
            // pathname: '/account123/**',
          },
        ],
      }
}

module.exports = nextConfig
