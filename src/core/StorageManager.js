export default class StorageManager {
  constructor(param) {
    this.storage = window.localStorage
  }

  set(key, data) {
    this.storage.setItem(key, JSON.stringify(data))
  }

  get(key) {
    return JSON.parse(this.storage.getItem(key))
  }
}
