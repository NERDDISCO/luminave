import { html } from '@polymer/lit-element/lit-element.js'

export const theme = html`
<style>
    :host {
        /* Material Components Web Components */
        --mdc-theme-primary: var(--paper-blue-grey-700);
        --mdc-theme-secondary: var(--paper-red-500);
        --mdc-theme-background: var(--paper-grey-900);
        --mdc-theme-surface: var(--paper-grey-300);
        --mdc-theme-on-primary: #fff;
        --mdc-theme-on-secondary: #000;
        --mdc-theme-on-surface: var(--paper-grey-900);

        /* Luminave Custom */
        --padding-basic: .5em;
        --focus-color: #ddd;
        --default-warning-color: #da4453;
        --default-success-color: var(--google-green-500);
        --warning-text-color: var(--text-primary-color);

        /* Google Material Design */
        /* This is the surface-color in mdc */
        --primary-background-color: var(--mdc-theme-surface);
        --primary-color: var(--mdc-theme-on-primary);
        --dark-primary-color: var(--mdc-theme-primary);
        --text-primary-color: var(--mdc-theme-on-primary);



        --light-primary-color: #f5f5f5;

        --accent-color: #ff4081;
        --primary-text-color: #ffffff;
        --secondary-text-color: #ffffff;
        --disabled-text-color: black;
        --divider-color: #e0e0e0;


        /* Polymer Elements */
        --app-drawer-scrim-background: rgba(0, 0, 0, 0.8);
/*
        --paper-checkbox-checked-color: var(--default-primary-color);
        --paper-checkbox-checked-ink-color: var(--default-primary-color);
        --paper-checkbox-unchecked-color: var(--dark-primary-color);
        --paper-checkbox-unchecked-ink-color: var(--dark-primary-color);
        --paper-checkbox-label-color: var(--text-primary-color);
        --paper-fab-background: var(--default-primary-color);
        --paper-fab-disabled-background: #4e5151;
        --paper-fab-disabled-text: var(--disabled-text-color);
        --paper-icon-button-disabled-text: #4e5151;
        --paper-input-container-color: #888;
        --paper-input-container-focus-color: var(--focus-color);
        --paper-input-container-invalid-color: red;
        --paper-input-container-input-color: #888;
        --paper-menu-background-color: #2c2f2f;
        --paper-menu-color: var(--text-primary-color);
        --paper-menu-disabled-color: #4e5151;
        --paper-progress-active-color: var(--default-primary-color);
        --paper-progress-secondary-color: #4db6ac;
        --paper-radio-button-checked-color: white;
        --paper-radio-button-checked-ink-color: #f5fbfb;
        --paper-radio-button-unchecked-color: var(--text-primary-color);
        --paper-radio-button-unchecked-ink-color: var(--text-primary-color);
        --paper-radio-button-label-color: var(--text-primary-color);
        --paper-slider-knob-color: var(--default-primary-color);
        --paper-slider-active-color: var(--default-primary-color);
        --paper-slider-pin-color: var(--default-primary-color);
        --paper-spinner-layer-1-color: var(--default-primary-color);
        --paper-spinner-layer-2-color: var(--default-primary-color);
        --paper-spinner-layer-3-color: var(--default-primary-color);
        --paper-spinner-layer-4-color: var(--default-primary-color);
        --paper-tabs-selection-bar-color: var(--default-primary-color);
        --paper-tab-ink: var(--default-primary-color);
        --paper-toggle-button-checked-bar-color: var(--dark-primary-color);
        --paper-toggle-button-checked-button-color: white;
        --paper-toggle-button-checked-ink-color: white;
        --paper-toggle-button-unchecked-bar-color: var(--text-primary-color);
        --paper-toggle-button-unchecked-button-color: var(--dark-primary-color);
        --paper-toggle-button-unchecked-ink-color: var(--dark-primary-color);
        --paper-toolbar-background: var(--dark-primary-color);
        --paper-toolbar-color: #bdced7;
*/

        color: #fff;
    }
</style>
`
