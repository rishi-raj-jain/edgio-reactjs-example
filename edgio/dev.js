const { createDevServer } = require('@edgio/core/dev')
const { DeploymentBuilder } = require('@edgio/core/deploy')

const builder = new DeploymentBuilder()

module.exports = function () {
  builder.buildServiceWorker(`${appDir}/sw/service-worker.js`, `${appDir}/dist/service-worker.js`, false)
  return createDevServer({
    label: 'Create React App',
    command: (port) => `PORT=${port} npm run start`,
    ready: [/started server/i],
  })
}
