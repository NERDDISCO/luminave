import{html,PageViewElement,modvData}from"../app.js";class modvView extends PageViewElement{static get properties(){return{active:{type:Boolean},visible:{type:Boolean},colors:{type:Array}}}constructor(){super();this.listener=this.listenReceivedModvData.bind(this);this.colors=[]}listenReceivedModvData(){this.colors=modvData.colors}shouldUpdate(){if(this.active&&!this.visible){this.visible=!0;window.addEventListener("received-data-from-modv",this.listener)}if(!this.active){this.visible=!1;window.removeEventListener("received-data-from-modv",this.listener)}return this.active}render(){const{colors}=this;return html`
      <section>
        <ui-spacer></ui-spacer>
        
        <color-grid rows="4" .colors="${colors}"></color-grid>
      </section>
    `}}window.customElements.define("modv-view",modvView);