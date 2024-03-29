import { Router } from '@edgio/core'
import { reactCRARoutes } from '@edgio/react-cra'

export default new Router()
  // API (Any backend) caching
  .match('/l0-api/:path*', ({ removeUpstreamResponseHeader, cache, proxy }) => {
    removeUpstreamResponseHeader('cache-control')
    removeUpstreamResponseHeader('set-cookie')
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        // Cache responses even if they contain cache-control: private header
        // https://docs.edg.io/guides/caching#private
        // https://docs.edg.io/docs/api/core/interfaces/_router_cacheoptions_.edgecacheoptions.html#forceprivatecaching
        forcePrivateCaching: true,
      },
      browser: {
        // Don't save the response in the browser
        maxAgeSeconds: 0,
        // Save the response in the browser via Edgio service worker
        serviceWorkerSeconds: 60 * 60 * 24,
      },
    })
    proxy('api', { path: ':path*' })
  })
  // Image caching
  .match('/l0-opt', ({ removeUpstreamResponseHeader, cache, proxy }) => {
    removeUpstreamResponseHeader('cache-control')
    removeUpstreamResponseHeader('set-cookie')
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        // Cache responses even if they contain cache-control: private header
        // https://docs.edg.io/guides/caching#private
        // https://docs.edg.io/docs/api/core/interfaces/_router_cacheoptions_.edgecacheoptions.html#forceprivatecaching
        forcePrivateCaching: true,
      },
      browser: {
        // Don't save the response in the browser
        maxAgeSeconds: 0,
        // Save the response in the browser via Edgio service worker
        serviceWorkerSeconds: 60 * 60 * 24,
      },
    })
    proxy('image', { path: '/' })
  })
  .use(reactCRARoutes)
