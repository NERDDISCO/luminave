import { html } from '/node_modules/@polymer/lit-element/lit-element.js'

export const tabs = html`
<style>
    :host {
        --paper-tabs-selection-bar-color: var(--mdc-theme-secondary);
        --paper-tab-ink: var(--mdc-theme-secondary);
    }

    paper-tabs {
        display: inline-block;
        background-color: var(--dark-primary-color);
        color: var(--paper-toolbar-color);
        font-size: 1em;
    }

    paper-tab a {
        display: inherit;
        font-size: inherit;
        color: inherit;
        text-decoration: inherit;
    }

    paper-tab[link] {
        /* TODO: Remove, magic numbers from original styling of paper-tab, but gets removed for link attribute*/
        padding: 0 12px;
    }
</style>
`
