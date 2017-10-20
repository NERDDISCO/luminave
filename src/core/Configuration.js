import config from '/src/config.js'

export default class Configuration {

  constructor() {
    this.config = config
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
}
