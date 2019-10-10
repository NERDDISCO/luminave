import { LitElement, html, css } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat.js'
import { store } from '../../reduxStore.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import './timeline-animation.js'
import { getAnimation, getAnimations, getLive } from '../../selectors/index.js'
import { SCENE_TYPE_STATIC } from '../../constants/timeline.js'
import { setSceneOnTimeline } from '../../actions/index.js'
import '@material/mwc-icon/mwc-icon.js'


/*
 * Handle a scene in a timeline
 */
class TimelineScene extends connect(store)(LitElement) {
  static get properties() {
    return {
      timelineScene: { type: Object },
      progress: { type: Number },
      // All animations that exist in luminave, not only the ones assigned to the scene
      animations: { type: Array },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    // @TODO: timeline-manager should update all it's children when the animations in the state are changing
    if (!Object.is(this.animations, getAnimations(state))) {
      this.animations = getAnimations(state)
      this.requestUpdate()
    }

    this.live = getLive(state)
  }

  animationEnded(e) {
    if (this.timelineScene.type === SCENE_TYPE_STATIC) {
      const scene = {
        sceneId: this.timelineScene.sceneId,
        timelineSceneId: this.timelineScene.timelineSceneId,
        started: new Date().getTime() 
      }

      store.dispatch(setSceneOnTimeline(scene))
    }
  }

  /*
   * This is broken as this.animations are ALL animations from all scenes... 
   */
  noAnimationInScene(animations) {

    if (animations.length === 0) {
      return html`<mwc-icon title="No animation is assigned to this Scene">error</mwc-icon>`
    }

    return html``
  }

  static get styles() {
    return css`
      mwc-icon {
        color: var(--default-warning-color);
      }
    `
  }

  render() {
    const { timelineScene, progress, live } = this

    return html`
      <style>
        h3 {
          font-size: 1em;
          font-weight: normal;
          margin: 0;
        }
      </style>

      <div>
        <h3>${timelineScene.scene.name}</h3>

        ${this.noAnimationInScene(timelineScene.scene.animations)}
        
        ${repeat(timelineScene.scene.animations, animationId => html`

          <div>
            <timeline-animation
              .animation="${getAnimation(store.getState(), { animationId })}"
              .fixtureIds=${timelineScene.scene.fixtures}
              .started=${timelineScene.started}
              .sceneName=${timelineScene.scene.name}
              .showMeta=${!live}
              progress=${progress}

              @animation-ended=${e => this.animationEnded(e)}
              
            >
            </timeline-animation>
          </div>

        `)}

      </div>
    `
  }
}

customElements.define('timeline-scene', TimelineScene)
