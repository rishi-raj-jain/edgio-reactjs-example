const { DeploymentBuilder } = require('@edgio/core/deploy')

const appDir = process.cwd()
const builder = new DeploymentBuilder(appDir)

module.exports = async function build({}) {
  builder.clearPreviousBuildOutput()
  await builder.exec('npm run build')
  builder.buildServiceWorker(`${appDir}/sw/service-worker.js`, `${appDir}/dist/service-worker.js`, false)
  await builder.build()
}
