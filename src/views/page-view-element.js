import { LitElement } from '@polymer/lit-element'

export class PageViewElement extends LitElement {
  // Only render this page if it's actually visible.
  _shouldRender(props, changedProps, old) {
    return props.active
  }

  static get properties() {
    return { active: Boolean }
  }
}
