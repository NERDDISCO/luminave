import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import '/node_modules/@polymer/paper-tabs/paper-tab.js'
import '/node_modules/@polymer/paper-tabs/paper-tabs.js'
import '/node_modules/@polymer/iron-pages/iron-pages.js'
import '/node_modules/@polymer/app-layout/app-drawer/app-drawer.js'
import '/node_modules/@polymer/app-layout/app-header/app-header.js'
import '/node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js'
import '/node_modules/@polymer/iron-flex-layout/iron-flex-layout.js'
import '/node_modules/@polymer/iron-icons/iron-icons.js'
import '/node_modules/@polymer/paper-icon-button/paper-icon-button.js'

import reduxMixin from '../../reduxStore.js'
import '../luminave-status/index.js'
import '../tap-button/index.js'
import '../bpm-meter/index.js'
import '../connect-button/index.js'
import '../usb-dmx-manager/index.js'
import '../storage-manager/index.js'
import '../live-mode/index.js'
import '../modv-manager/index.js'
import '../fivetwelve-manager/index.js'
import '../config-manager/index.js'
import '../dekk-manager/index.js'
import '../rainbow-text/index.js'


class LuminaveMenu extends reduxMixin(PolymerElement) {
  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      },
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      }
    }
  }

  computeEditMode(live) {
    return !live
  }

  /*
   * Toggle the visiblity of the drawer (menu)
   */
  toggleDrawer() {
    this.$.drawer.toggle()
  }

  static get template() {
    return html`
      <style>
        .grid {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: .5em;
        }
      </style>

      <custom-style>
        <style>
          app-header {
            position: fixed;
            width: 100%;
            z-index: 1337;
            top: 0;
            left: 0;
            color: var(--paper-toolbar-color);
            background: var(--background-dark);
          }

          app-drawer {
            color: var(--paper-toolbar-color);
            z-index: 1337;

            --app-drawer-scrim-background: rgba(0, 0, 0, 0.8);
            --app-drawer-content-container: {
              background-color: var(--background-dark);
            }
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
      </custom-style>

      <app-header condenses fixed>
        <app-toolbar>
          <div main-title>
            <h1>
              <rainbow-text text="luminave"></rainbow-text>
              <template is="dom-if" if="[[live]]">
                <span class="live" align="left">live</span>
              </template>
            </h1>
          </div>

          <!--<luminave-status></luminave-status>-->

          <paper-icon-button icon="menu" on-click="toggleDrawer"></paper-icon-button>
        </app-toolbar>
      </app-header>

      <app-drawer id="drawer" swipe-open  align="right">

        <div class="grid">

          <usb-dmx-manager></usb-dmx-manager>

          <div>
            <bpm-meter bpm="[[bpm]]"></bpm-meter>
            <tap-button></tap-button>
          </div>

          <live-mode></live-mode>

          <modv-manager></modv-manager>
          <dekk-manager></dekk-manager>
          <fivetwelve-manager></fivetwelve-manager>
          <storage-manager></storage-manager>

        </div>

      </app-drawer>
    `
  }
}

customElements.define('luminave-menu', LuminaveMenu)
