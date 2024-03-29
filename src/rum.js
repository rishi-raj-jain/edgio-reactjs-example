import { Metrics } from '@edgio/rum'
import Router from '@edgio/rum/Router'

// Implementing Real Time User Monitoring (Core Web Vitals)
// https://docs.edg.io/guides/core_web_vitals#npm-or-yarn
export default function Layer0RUM(token) {
  new Metrics({
    // Set this TOKEN as an environment variable at Edgio Console
    // More on creating env variables: https://docs.edg.io/guides/environments#creating-environment-variables
    token: token,
    router: new Router()
      .match('/', ({ setPageLabel }) => setPageLabel('home'))
      .match('/commerce', ({ setPageLabel }) => setPageLabel('commerce'))
      .match('/product/:id', ({ setPageLabel }) => setPageLabel('product/:id')),
  }).collect()
}
