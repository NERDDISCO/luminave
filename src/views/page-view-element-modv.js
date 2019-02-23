import { PageViewElement } from './page-view-element.js'
import { modvData } from '../utils/index.js'

/**
 * Can listen for data sent by modV when the view is actually visible. 
 * If it isn't, there will be no update. 
 */
export class PageViewElementModv extends PageViewElement {
  constructor() {
    super()

    // Colors send by modV
    this.colors = []

    // bind() is creating a new function reference, so we have to save it in order to be able 
    // to remove it again, see https://stackoverflow.com/a/22870717/1012875
    this.listener = this.listenReceivedModvData.bind(this)
  }

  listenReceivedModvData() {
    this.colors = modvData.colors
    this.requestUpdate()
  }

  // Only render this page if it's actually visible.
  shouldUpdate(changedProps) {
    if (changedProps.has('active') && this.active !== changedProps.get('active')) {
      if (this.active) {
        console.log('receive data from modV')
        window.addEventListener('received-data-from-modv', this.listener)
      } else {
        console.log('dont receive data from modV')
        window.removeEventListener('received-data-from-modv', this.listener)
      }
    }

    return super.shouldUpdate()
  }
}
