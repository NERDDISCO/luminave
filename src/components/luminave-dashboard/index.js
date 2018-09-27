import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import '/node_modules/@polymer/paper-tabs/paper-tab.js'
import '/node_modules/@polymer/paper-tabs/paper-tabs.js'

import { installRouter } from 'pwa-helpers/router.js'
import { navigate } from '../../actions/app.js'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import '../timeline-manager/index.js'
import '../ui-spacer/index.js'

import { tabs } from '../../styles/tabs.js'

class LuminaveDashboard extends connect(store)(LitElement) {
  static get properties() {
    return {
      live: { type: Boolean },
      _page: { type: String },
      _entityId: { type: String }
    }
  }

  firstUpdated() {
    // Use a helper router to dispatch the location
    installRouter(location => store.dispatch(navigate(location)))
  }

  _stateChanged(state) {
    this._page = state.app.page
    this._entityId = state.app.entityId
  }

  render() {
    const { _page, _entityId } = this

    return html`
      ${tabs}

      <style>
        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }
      </style>

      <timeline-manager></timeline-manager>

      <ui-spacer></ui-spacer>

      <paper-tabs selected="${_page}" attr-for-selected="name">
        <paper-tab name="universe" link>
          <a href="/universe" tabindex="-1">Universes</a>
        </paper-tab>
        <paper-tab name="midi" link>
          <a href="/midi" tabindex="-1">MIDI</a>
        </paper-tab>
        <paper-tab name="scene" link>
          <a href="/scene" tabindex="-1">Scenes</a>
        </paper-tab>
        <paper-tab name="animation" link>
          <a href="/animation" tabindex="-1">Animations</a>
        </paper-tab>
        <paper-tab name="fixture" link>
          <a href="/fixture" tabindex="-1">Fixtures</a>
        </paper-tab>
        <paper-tab name="modv" link>
          <a href="/modv" tabindex="-1">modV</a>
        </paper-tab>
      </paper-tabs>

      <ui-spacer></ui-spacer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <universe-view ?active="${_page === 'universe'}" class="page"></universe-view>
        <midi-view ?active="${_page === 'midi'}" class="page"></midi-view>
        <scene-view ?active="${_page === 'scene'}" class="page"></scene-view>
        <animation-view ?active="${_page === 'animation'}" class="page"></animation-view>

        <fixture-view ?active="${_page === 'fixture' && _entityId === undefined}" class="page"></fixture-view>
        <fixture-detail-view ?active="${_page === 'fixture' && _entityId !== undefined}" class="page" .fixtureId="${_entityId}"></fixture-detail-view>

        <modv-view ?active="${_page === 'modv'}" class="page"></modv-view>
        <my-view404 ?active="${_page === 'view404'}" class="page"></my-view404>

      </main>
    `
  }
}

customElements.define('luminave-dashboard', LuminaveDashboard)
