import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import '@polymer/paper-tabs/paper-tab.js'
import '@polymer/paper-tabs/paper-tabs.js'
import '@polymer/iron-pages/iron-pages.js'
import '@polymer/app-layout/app-drawer/app-drawer.js'
import '@polymer/app-layout/app-header/app-header.js'
import '@polymer/app-layout/app-toolbar/app-toolbar.js'
import '@polymer/iron-flex-layout/iron-flex-layout.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-icon-button/paper-icon-button.js'

import '../luminave-status/index.js'
import '../tap-button/index.js'
import '../bpm-meter/index.js'
import '../usb-dmx-manager/index.js'
import '../storage-manager/index.js'
import '../live-mode/index.js'
import '../fivetwelve/fivetwelve-manager.js'
import '../dekk-manager/index.js'
import '../rainbow-text/index.js'
import '../modv/modv-manager.js'
import '../artnet/artnet-manager.js'
import '../luminave-server/luminave-server-manager.js'

import { updateDrawerState } from '../../actions/app.js'
import { getBpm, getLive, getDrawerOpened } from '../../selectors/index.js'


class LuminaveMenu extends connect(store)(LitElement) {
  static get properties() {
    return {
      bpm: { type: Number },
      live: { type: Boolean },
      drawerOpened: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.bpm = getBpm(state)
    this.live = getLive(state)
    this.drawerOpened = getDrawerOpened(state)
  }

  /*
   * Update the drawer (menu) visibility
   */
  handleDrawer(opened) {
    if (opened !== this.drawerOpened) {
      store.dispatch(updateDrawerState(opened))
    }
  }

  render() {
    const { bpm, live, drawerOpened } = this

    return html`
      <style>
        .grid {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: .5em;
        }

        app-header {
          position: fixed;
          width: 100%;
          z-index: 1337;
          top: 0;
          left: 0;
          color: var(--paper-toolbar-color);
          background: var(--dark-primary-color);
        }

        app-drawer {
          color: var(--paper-toolbar-color);
          z-index: 99999;
          text-align: left;
          --app-drawer-width: 40vw;
        }

        h1 {
          font: 1.6em sans-serif;
          text-transform: none;
        }

        .live {
          color: grey;
          font-weight: normal;
          text-transform: uppercase;
          font-size: .8em;
        }
      </style>

      <custom-style>
        <style>
          app-drawer {  
            --app-drawer-content-container: {
              background-color: var(--dark-primary-color);
            };
          }
        </style>
      </custom-style>

      <app-header condenses fixed>
        <app-toolbar>
          <div main-title>
            <h1>
              <rainbow-text text="luminave"></rainbow-text>
              ${
                live 
                ? html`<span class="live" align="left">live</span>`
                : ''
              }
            </h1>
          </div>

          <!--<luminave-status></luminave-status>-->

          <paper-icon-button icon="menu" @click="${() => this.handleDrawer(true)}"></paper-icon-button>
        </app-toolbar>
      </app-header>

      <app-drawer 
        id="drawer" 
        swipe-open 
        align="right" 
        .opened="${drawerOpened}"
        @opened-changed="${e => this.handleDrawer(e.target.opened)}">

        <div class="grid">

          <usb-dmx-manager></usb-dmx-manager>

          <div>
            <bpm-meter bpm="${bpm}"></bpm-meter>
            <tap-button></tap-button>
          </div>

          <live-mode></live-mode>

          <dekk-manager></dekk-manager>
          <storage-manager></storage-manager>

          <h3>luminave-server</h3>
          <luminave-server-manager></luminave-server-manager>

          <h3>modV</h3>
          <modv-manager></modv-manager>

          <h3>Art-Net</h3>
          <artnet-manager></artnet-manager>

          <h3>fivetwelve</h3>
          <fivetwelve-manager></fivetwelve-manager>

        </div>

      </app-drawer>
    `
  }
}

customElements.define('luminave-menu', LuminaveMenu)
