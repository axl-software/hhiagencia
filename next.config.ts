import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* /proyectos ya no es una página: los casos (Aaron y Bar de Blas) están en /marketing.
     Redirección permanente para no perder los enlaces ni el posicionamiento en Google. */
  async redirects() {
    return [
      { source: '/proyectos', destination: '/marketing', permanent: true },
      /* La pestaña "Proceso" se eliminó el 2026-11-09 (pedido de los fundadores). */
      { source: '/como-trabajamos', destination: '/', permanent: true },
    ]
  },
};

export default nextConfig;
