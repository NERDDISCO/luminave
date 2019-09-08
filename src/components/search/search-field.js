import { LitElement, html } from 'lit-element'

/*
 *  Search a list of elements
 */
class SearchField extends LitElement {
  static get properties() {
    return {
      term: { type: String }
    }
  }

  /*
   * Add a scene that has already a set of animations and fixtures
   */
  handleSearchSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const term = data.get('term')
  }

  render() {
    const { term } = this

    return html`
      <style>
      </style>

      <form @submit="${e => this.handleSearchSubmit(e)}">
        <label for="term">Search</label>
        <input name="term" type="text" required />

        <button type="submit">Search</button>
      </form>

      <br>
    `
  }
}

customElements.define('search-field', SearchField)
