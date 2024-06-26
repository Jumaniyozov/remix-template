import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { remixDevTools } from 'remix-development-tools'
import { flatRoutes } from 'remix-flat-routes'

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      ignoredRouteFiles: ['**/*'],
      routes: async defineRoutes => {
        return flatRoutes('routes', defineRoutes)
      },
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['remix-utils'],
  },
  server: {
    hmr: {
      overlay: false,
      port: 24700,
    },
  },
})
