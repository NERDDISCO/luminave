import{LitElement,html,repeat,shared,connect,store,uuidV1,addUniverse,removeUniverse,resetUniverseAndFixtures,getUniverses,getLive,buttons,PageViewElement}from"../app.js";class ChannelGrid extends LitElement{static get properties(){return{channels:Array}}render(){const{channels}=this;return html`
      ${shared}

      <div class="items">
        ${repeat(channels,channel=>html`
          <div class="item">${channel}</div>
        `)}
      </div>
    `}}customElements.define("channel-grid",ChannelGrid);class UniverseManager extends connect(store)(LitElement){static get properties(){return{universes:{type:Array},live:{type:Boolean}}}_stateChanged(state){this.universes=getUniverses(state);this.live=getLive(state)}addUniverse(){const id=uuidV1();store.dispatch(addUniverse({id,channels:[...Array(512)].map(()=>0),name:`${id}`}))}removeUniverse(e){const{universeId}=e.target;store.dispatch(removeUniverse(universeId))}resetUniverse(){store.dispatch(resetUniverseAndFixtures(0))}render(){const{universes,live}=this;return html`
      ${buttons}

      ${live?"":html`<paper-button @click="${e=>this.addUniverse(e)}" class="primary">Add universe</paper-button>`}

      ${repeat(universes,universe=>html`
        <div>

          ${live?"":html`
              <h3>${universe.name}</h3>
              <paper-button @click="${e=>this.removeUniverse(e)}" .universeId="${universe.id}" class="warning">Remove</paper-button>
            `}

          <paper-button @click="${e=>this.resetUniverse(e)}" .universeId="${universe.id}">Reset</paper-button>

          <div>
            <channel-grid .channels="${universe.channels}"></channel-grid>
          </div>

        </div>

      `)}

    `}}customElements.define("universe-manager",UniverseManager);class UniverseView extends PageViewElement{render(){return html`
      <section>
        <universe-manager></universe-manager>
      </section>
    `}}window.customElements.define("universe-view",UniverseView);