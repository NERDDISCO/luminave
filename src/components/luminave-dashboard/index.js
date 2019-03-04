import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import '@polymer/paper-tabs/paper-tab.js'
import '@polymer/paper-tabs/paper-tabs.js'

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
        <paper-tab name="general" link>
          <a href="/general" tabindex="-1">General</a>
        </paper-tab>
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
        <paper-tab name="venue" link>
          <a href="/venue" tabindex="-1">Venues</a>
        </paper-tab>
      </paper-tabs>

      <ui-spacer></ui-spacer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <general-view ?active="${_page === 'general'}" class="page"></general-view>

        <universe-view ?active="${_page === 'universe'}" class="page"></universe-view>
        <midi-view ?active="${_page === 'midi'}" class="page"></midi-view>
        <scene-view ?active="${_page === 'scene'}" class="page"></scene-view>
        <animation-view ?active="${_page === 'animation'}" class="page"></animation-view>

        <fixture-view ?active="${_page === 'fixture' && _entityId === undefined}" class="page"></fixture-view>
        <fixture-detail-view ?active="${_page === 'fixture' && _entityId !== undefined}" class="page" .fixtureId="${_entityId}"></fixture-detail-view>

        <venue-view ?active="${_page === 'venue' && _entityId === undefined}" class="page"></venue-view>
        <venue-detail-view ?active="${_page === 'venue' && _entityId !== undefined}" class="page" .venueId="${_entityId}"></venue-detail-view>

        <my-view404 ?active="${_page === 'view404'}" class="page"></my-view404>

      </main>
    `
  }
}

customElements.define('luminave-dashboard', LuminaveDashboard)
