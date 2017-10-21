import config from '/src/config.js'

export default class Configuration {

  constructor(param) {
    this.data = config

    this.storage = param.storage || null
    this.restore = param.restore || false

    if (this.storage === null) {
      console.log('no storage')
    } else if (this.storage.get('config') === undefined) {
      console.log('Initialize')
      this.storage.set('config', this.data)
    }

    if (this.restore) {
      this.restoreConfig()
    } else {
      console.log('Load from localStorage')
      this.config = this.storage.get('config')
    }
  }

  restoreConfig() {
    this.storage.set('config', config)
  }

  getConfig() {
    return this.data
  }

  /*
   * Create a downloadable version of the config by using a Data URL
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  download() {
    return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.data))}`
  }

  /*
   * Save current configuration into StorageManager
   */
  sync() {
    this.storage.set('config', this.data)
  }

}
