import{LitElement,html,repeat,store,getAnimation,getScenesSorted,getFixtures,getAnimations,shared,setSceneName,addAnimationToScene,addFixturesToScene,removeAnimationFromScene,addSceneToTimeline,removeScene,resetUniverseAndFixtures,removeFixtureFromSceneAndUniverse,addScene,connect,uuidV1,PageViewElement}from"../app.js";class AnimationListItem extends LitElement{static get properties(){return{animation:Object}}render(){const{animation}=this;return html`
      <div>
        ${animation.name}
      </div>
    `}}customElements.define("animation-list-item",AnimationListItem);class AnimationList extends LitElement{static get properties(){return{animations:{type:Array},animationManager:{type:Array}}}handleAnimationSubmit(e){const data=new FormData(e.target),animationId=data.get("animationId");this.dispatchEvent(new CustomEvent("add-animation",{detail:{event:e,animationId}}))}handleRemoveAnimation(e){const{animationId}=e.target;this.dispatchEvent(new CustomEvent("remove-animation",{detail:{event:e,animationId}}))}getAnimation(animationId){return this.animationManager.filter(animation=>animation.id===animationId)[0]}render(){if(this.animations===void 0){this.animations=[]}const{animationManager,animations}=this;return html`
      ${shared}

      <form @submit="${e=>this.handleAnimationSubmit(e)}">
        <select name="animationId" required>
          <option value=""></option>
          ${repeat(animationManager,animation=>html`
            <option value="${animation.id}">${animation.name}</option>
          `)}
        </select>

        <button type="submit">Add animation</button>
      </form>

      <div class="items">
    
        ${repeat(animations,animationId=>html`
          <animation-list-item class="item" .animation="${getAnimation(store.getState(),{animationId})}"></animation-list-item>
          <button @click="${e=>this.handleRemoveAnimation(e)}" .animationId="${animationId}">x</button>
        `)}

      </div>
    `}}customElements.define("animation-list",AnimationList);class FixtureListItem extends LitElement{static get properties(){return{fixture:{type:Object}}}render(){const{fixture}=this;return html`
      <div>
        ${fixture.name}
      </div>
    `}}customElements.define("fixture-list-item",FixtureListItem);class FixtureList extends LitElement{static get properties(){return{fixtures:{type:Array},fixtureManager:{type:Array}}}handleFixtureSubmit(e){const{path}=e,[form]=path,[select]=form,fixtureIds=[...select.selectedOptions].map(fixture=>fixture.value);this.dispatchEvent(new CustomEvent("add-fixtures",{detail:{event:e,fixtureIds}}))}handleRemoveFixture(e){const{fixtureId}=e.target;this.dispatchEvent(new CustomEvent("remove-fixture",{detail:{event:e,fixtureId}}))}getFixture(fixtureId){return this.fixtureManager.filter(fixture=>fixture.id===fixtureId)[0]}render(){if(this.fixtures===void 0){this.fixtures=[]}const{fixtureManager,fixtures}=this;return html`
      ${shared}

      <style>
        .fixture-list {
          width: 120px;
          height: 120px;
        }
      </style>

      <form @submit="${e=>this.handleFixtureSubmit(e)}">
        <select name="type" class="fixture-list" required multiple>
          <option value=""></option>
          ${repeat(fixtureManager,fixture=>html`
            <option value="${fixture.id}">${fixture.name}</option>
          `)}
        </select>

        <button type="submit">Add fixture</button>
      </form>

      <div class="items">
        ${repeat(fixtures,fixtureId=>html`
          <fixture-list-item class="item" .fixture="${this.getFixture(fixtureId)}"></fixture-list-item>
          <button @click="${e=>this.handleRemoveFixture(e)}" .fixtureId="${fixtureId}">x</button>
        `)}
      </div>
    `}}customElements.define("fixture-list",FixtureList);class SceneBee extends LitElement{static get properties(){return{name:{type:String},duration:{type:Number},id:{type:String},index:{type:Number},fixtures:{type:Array},fixtureManager:{type:Array},animations:{type:Array},animationManager:{type:Array}}}runScene(e){const{sceneId}=e.target;store.dispatch(addSceneToTimeline(sceneId))}removeScene(e){const{sceneId}=e.target;store.dispatch(removeScene(sceneId))}handleAddAnimation(e){const{event,animationId}=e.detail,{sceneId}=e.target;event.preventDefault();event.target.reset();store.dispatch(addAnimationToScene(sceneId,animationId))}handleRemoveAnimation(e){const{animationId}=e.detail,{sceneId}=e.target;store.dispatch(removeAnimationFromScene(sceneId,animationId));store.dispatch(resetUniverseAndFixtures(0))}handleAddFixtures(e){const{event,fixtureIds}=e.detail,{sceneId}=e.target;event.preventDefault();store.dispatch(addFixturesToScene(sceneId,fixtureIds))}handleRemoveFixture(e){const{fixtureId}=e.detail,{sceneId}=e.target;store.dispatch(removeFixtureFromSceneAndUniverse(sceneId,fixtureId))}handleNameChange(e){const{value}=e.target;store.dispatch(setSceneName(this.id,value))}render(){const{id,animations,fixtures,animationManager,fixtureManager,name}=this;return html`
    <style>
      h4 {
        margin: 0.25em 0;
      }

      .name {
        display: inline-block;
        margin: 0;
      }
    </style>

      <div>
        <input class="name" name="name" type="text" @change="${e=>this.handleNameChange(e)}" value="${name}" />

        <button @click="${e=>this.removeScene(e)}" .sceneId="${id}">Remove</button>
        <button @click="${e=>this.runScene(e)}" .sceneId="${id}">Run</button>

        <animation-list
          @add-animation="${e=>this.handleAddAnimation(e)}"
          @remove-animation="${e=>this.handleRemoveAnimation(e)}"
          .sceneId="${id}"
          .animations="${animations}"
          .animationManager="${animationManager}"></animation-list>


        <fixture-list
          @add-fixtures="${e=>this.handleAddFixtures(e)}"
          @remove-fixture="${e=>this.handleRemoveFixture(e)}"
          .sceneId="${id}"
          .fixtures="${fixtures}"
          .fixtureManager="${fixtureManager}"></fixture-list>
      </div>
    `}}customElements.define("scene-bee",SceneBee);class SceneManager extends connect(store)(LitElement){static get properties(){return{scenes:{type:Array},fixtureManager:{type:Array},animationManager:{type:Array},_fixtures:{type:Array},_animations:{type:Array}}}_stateChanged(state){this.scenes=getScenesSorted(state);this.fixtureManager=getFixtures(state);this.animationManager=getAnimations(state)}handleSubmitScene(e){e.preventDefault();store.dispatch(addScene({id:uuidV1(),fixtures:[],animations:[],duration:this.duration,name:this.name,isRunning:!1}))}handleName(e){this.name=e.target.value}handleDuration(e){this.duration=e.target.value}handleSubmitSceneAnimationFixtures(e){e.preventDefault();const data=new FormData(e.target),name=data.get("name");store.dispatch(addScene({id:uuidV1(),fixtures:this._fixtures,animations:this._animations,duration:20,name,isRunning:!1}));this._fixtures=[];this._animations=[]}handleAddAnimation(e){const{event,animationId}=e.detail;event.preventDefault();this._animations=[animationId]}handleRemoveAnimation(e){const{animationId}=e.detail;this._animations=this._animations.filter(_animationId=>_animationId!==animationId)}handleAddFixtures(e){const{event,fixtureIds}=e.detail;event.preventDefault();this._fixtures=fixtureIds}handleRemoveFixture(e){const{fixtureId}=e.detail;this._fixtures=this._fixtures.filter(_fixtureId=>_fixtureId!==fixtureId)}render(){const{scenes,_animations,animationManager,_fixtures,fixtureManager}=this;return html`
      <style>
        :host {
          --width: 4;
        }

        @media (min-width: 1024px) {
          :host {
            --width: 8;
          }
        }

        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
          row-gap: calc(var(--padding-basic) * 2);
          column-gap: var(--padding-basic);
        }

        .item {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--dark-primary-color);
          background: var(--dark-primary-color);
        }

        .item::before {
          content: attr(data-name);
          position: absolute;
          top: calc(var(--padding-basic) * -3);
          overflow: visible;
          background: var(--dark-primary-color);
          color: var(--text-primary-color);
          padding: var(--padding-basic);
        }


        .flex {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
        }

        .flex-item {
          flex: 0 1em;
          margin: 0 1em 0 0;
        }

      </style>

      <form @submit="${e=>this.handleSubmitScene(e)}">
        <label for="name">Name</label>
        <input name="name" type="text" @change="${e=>this.handleName(e)}" required />

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" @change="${e=>this.handleDuration(e)}" required />

        <button type="submit">Add scene</button>
      </form>

      <br>

      <form @submit="${e=>this.handleSubmitSceneAnimationFixtures(e)}">
        <div class="flex">

          <div class="flex-item">
            <label for="name">Name</label>
            <input name="name" type="text" @change="${e=>this.handleName(e)}" required />
          </div>

          <div class="flex-item">
            <animation-list
              name="animation"
              @add-animation="${e=>this.handleAddAnimation(e)}"
              @remove-animation="${e=>this.handleRemoveAnimation(e)}"
              .animations="${_animations}"
              .animationManager="${animationManager}">
            </animation-list>
          </div>

          <div class="flex-item">
            <fixture-list
              name="fixtures"
              @add-fixtures="${e=>this.handleAddFixtures(e)}"
              @remove-fixture="${e=>this.handleRemoveFixture(e)}"
              .fixtures="${_fixtures}"
              .fixtureManager="${fixtureManager}">
            </fixture-list>
          </div>

          <div class="flex-item">
            <button type="submit">Add</button>
          </div>
        </div>
      </form>

      <br>

      <div class="container">

        ${repeat(scenes,scene=>scene.id,(scene,index)=>html`

          <div class="item" data-name="${scene.name}">

            <scene-bee
              index="${index}"
              name="${scene.name}"
              id="${scene.id}"
              duration="${scene.duration}"
              .fixtures="${scene.fixtures}"
              .animations="${scene.animations}"
              .fixtureManager="${fixtureManager}"
              .animationManager="${animationManager}">
            </scene-bee>

          </div>     
        
        `)}

      </div>
    `}}customElements.define("scene-manager",SceneManager);class SceneView extends PageViewElement{render(){return html`
      <section>
        <scene-manager></scene-manager>
      </section>
    `}}window.customElements.define("scene-view",SceneView);