import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'blv6hhaq',
    dataset: 'production',
  },
  studioHost: 'somlioya',
  deployment: {
    appId: 'ic7wdkuys53t81zmivxzm21t',
    autoUpdates: true
  },
})
