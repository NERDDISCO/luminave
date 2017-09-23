export default class StorageManager {
  constructor(param) {
    this.storage = window.localStorage
  }

  save(key, data) {
    this.storage.setItem(key, JSON.stringify(data))
  }

  load(key) {
    return JSON.parse(this.storage.getItem(key))
  }
}
