import{html,PageViewElement}from"../app.js";class MyView404 extends PageViewElement{render(){return html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>The page you're looking for doesn't seem to exist. Head back
           <a href="/">home</a> and try again?
        </p>
      </section>
    `}}window.customElements.define("my-view404",MyView404);