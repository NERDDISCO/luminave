import config from '/src/config.js'

export default class Configuration {

  constructor(param) {
    this.config = config

    this.storage = param.storage || null
    this.restore = param.restore || false

    if (this.storage === null) {
      console.log('no storage')
    } else if (this.storage.get(config) === undefined) {
      console.log('Initialize')
      this.storage.set('config', this.config)
    }

    if (this.restore) {
      this.storage.set('config', config)
    } else {
      console.log('Load from localStorage')
      this.config = this.storage.get('config')
    }
  }

  getConfig() {
    return this.config
  }

  /*
   * Create a downloadable version of the config by using a Data URL
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  download() {
    return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.config))}`
  }

  /*
   * Save current configuration into StorageManager
   */
  save() {
    this.storage.set('config', this.config)
  }
}
