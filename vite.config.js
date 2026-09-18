import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	build: {
		rollupOptions: {
			output: {
				// Group third-party code into long-cached vendor chunks so app updates
				// don't bust the whole vendor cache. framer-motion (the heaviest dep)
				// gets its own chunk; everything else in node_modules shares "vendor".
				manualChunks(id) {
					if (!id.includes('node_modules')) return undefined
					if (id.includes('framer-motion')) return 'motion'
					if (id.includes('@reduxjs') || id.includes('react-redux')) {
						return 'redux'
					}
					return 'vendor'
				}
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// Make design tokens available to every .scss file automatically.
				additionalData: `@use "@/styles/abstracts" as *;`
			}
		}
	}
})
