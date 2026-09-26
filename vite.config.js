import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Adds the AdSense script and ads.txt only once VITE_ADSENSE_CLIENT is set in .env.
function adsense(client) {
  return {
    name: 'nac-adsense',
    transformIndexHtml(html, ctx) {
      // Only the calculator page (where the ad slot lives) loads the ad script.
      if (!client || !ctx.filename.endsWith('index.html')) return html
      const tag = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}" crossorigin="anonymous"></script>`
      return html.replace('</head>', `    ${tag}\n  </head>`)
    },
    generateBundle() {
      if (!client) return
      const publisher = client.replace(/^ca-/, '')
      this.emitFile({
        type: 'asset',
        fileName: 'ads.txt',
        source: `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const required = ['VITE_OWNER_NAME', 'VITE_CONTACT_EMAIL', 'VITE_SITE_URL', 'VITE_LAST_UPDATED']
  const missing = required.filter((k) => !env[k] || env[k].includes('NOT_SET'))
  if (missing.length && mode === 'production') {
    throw new Error(`[NAC] Set ${missing.join(', ')} in .env before building (they appear on the policy pages).`)
  }

  return {
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          about: resolve(__dirname, 'about.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms: resolve(__dirname, 'terms.html'),
        },
      },
    },
    plugins: [
      react(),
      adsense(env.VITE_ADSENSE_CLIENT),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false, // registered in src/main.jsx so updates reload the app
        includeAssets: ['favicon-32.png', 'apple-touch-icon.png'],
        manifest: {
          id: '/',
          name: 'NAC — Nutrition Assessment Calculator',
          short_name: 'NAC',
          description:
            'One place for the calculations dietitians and nutrition students use during assessment.',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait',
          background_color: '#F2F1E9',
          theme_color: '#24402E',
          icons: [
            { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
            { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          ],
        },
        workbox: {
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/*.{js,css,html,png,woff2}'],
          navigateFallback: '/index.html',
          // Let About / Privacy / Terms (and ads.txt) load as their own pages.
          navigateFallbackDenylist: [/^\/(about|privacy|terms)(\.html)?\/?(\?.*)?$/, /^\/ads\.txt$/],
        },
      }),
    ],
  }
})
