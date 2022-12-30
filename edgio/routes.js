import { Router } from '@edgio/core/router'
import getPathsToPrerender from './prerenderRequests'
import { isProductionBuild } from '@edgio/core/environment'
import { API_CACHE_HANDLER, IMAGE_CACHE_HANDLER } from './cache'

const router = new Router({ indexPermalink: false })

// Pre-render the static home page
// By pre-rendering, once the project is deployed
// the set of links are visited to warm the cache
// for future visits (expected to be the first view for real users)
// More on static prerendering: https://docs.edg.io/guides/static_prerendering
router.prerender(getPathsToPrerender)

// Serve the compiled service worker with Edgio prefetcher working
router.get('/service-worker.js', ({ serviceWorker }) => {
  serviceWorker('dist/service-worker.js')
})

// API (Any backend) caching
router.match('/l0-api/:path*', API_CACHE_HANDLER)

// Image caching
router.match('/l0-opt', IMAGE_CACHE_HANDLER)

if (isProductionBuild()) {
  router.static('build')
  router.fallback(({ serveStatic }) => serveStatic('build/index.html'))
} else {
  router.fallback(({ renderWithApp }) => {
    renderWithApp()
  })
}

export default router
