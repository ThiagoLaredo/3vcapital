/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Formato otimizado - WebP é suficiente se suas imagens já estão em WebP
    formats: ['image/webp'],
    
    // Tamanhos de dispositivo otimizados para performance
    deviceSizes: [480, 640, 750, 828, 1080, 1200],
    
    // Tamanhos de imagem para geração automática do srcset
    imageSizes: [240, 320, 375, 414, 540, 600],
    
    // Cache agressivo para imagens estáticas (30 dias)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    
    // Domínios externos permitidos (mantenha apenas os que usa)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
    ],
    
    // Otimizações de performance
    unoptimized: false, // Keep optimization enabled
  },
  
  // Headers de cache para otimizar performance
  async headers() {
    return [
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Otimizações gerais
  // swcMinify: true,
  compress: true,
  
  // Desabilita o experimental se não está usando
  // experimental: {
  //   optimizePackageImports: ['gsap'] // Mantenha apenas se usa GSAP
  // },
};

module.exports = nextConfig;