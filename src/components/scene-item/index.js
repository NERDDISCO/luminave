import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import '/src/components/animation-item/index.js'
import {styles} from './styles.js'

class SceneItem extends PolymerElement {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  isActive(scene) {
    const {active} = scene.value.config
    return active ? 'active' : ''
  }

  static get template() {
    return `
    <style>
      ${styles}
    </style>
    <div class$="scene {{isActive(scene)}}">
      <label class="scene-label">{{scene.key}}</label>
      <template is="dom-repeat" items="{{ scene.value.layers }}" as="layer">
        <template is="dom-repeat" items="{{ layer.animations }}" as="animation">
          <animation-item animation="{{animation}}"
                          time="{{time}}"
                          activescene="{{scene.value.config.active}}"
                          measures="{{measures}}"></animation-item>
        </template>
      </template>
    </div>
    `
  }
}

customElements.define('scene-item', SceneItem)
