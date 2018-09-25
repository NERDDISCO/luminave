import{LitElement,html,repeat,shared,store,addKeyframe,setAnimationName,removeAnimation,addAnimation,FIXTURE_PROPERTIES,connect,uuidV1,getAnimationsSorted,PageViewElement}from"../app.js";class KeyframeGrid extends LitElement{static get properties(){return{keyframes:{type:Object}}}_toArray(object){const array=[];for(const step in object){array.push({step:parseFloat(step),value:object[step]})}array.sort((a,b)=>a.step-b.step);return array}render(){const{keyframes}=this;return html`
      ${shared}
      <style>
        .item {
          font-size: 0.8em;
        }
      </style>

      <div class="items">

        ${repeat(this._toArray(keyframes),keyframe=>html`
          <div class="item">${keyframe.step}: ${JSON.stringify(keyframe.value)}</div>
        `)}

      </div>
    `}}customElements.define("keyframe-grid",KeyframeGrid);class AnimationBee extends LitElement{constructor(){super();this.properties=FIXTURE_PROPERTIES;this.properties.sort()}static get properties(){return{name:{type:String},duration:{type:Number},id:{type:String},keyframes:{type:Object}}}removeAnimation(e){const{animationId}=e.target;store.dispatch(removeAnimation(animationId))}handleKeyframeSubmit(e){e.preventDefault();const data=new FormData(e.target),step=data.get("step"),property=data.get("property"),value=data.get("value");store.dispatch(addKeyframe(this.id,step,property,value))}handleNameChange(e){const animationName=e.target.value;store.dispatch(setAnimationName(this.id,animationName))}render(){const{id,properties,keyframes,name}=this;return html`
      <style>
        .name {
          display: inline-block;
          width: 100%;
          margin: 0;
          padding: .35em .15em;
          border: 0;
          background: rgba(0, 0, 0, 1);
          color: #fff;
        }
      </style>

      <div>
        <input class="name" name="name" type="text" @change="${e=>this.handleNameChange(e)}" value="${name}" />
        <button @click="${e=>this.removeAnimation(e)}" .animationId="${id}">Remove</button>

        <br><br>

        <form @submit="${e=>this.handleKeyframeSubmit(e)}">
          <input name="step" type="number" min="0" max="1" step="any" required placeholder="Step"/>

          <select name="property" required>
            <option value="" disabled selected>Property</option>
            ${repeat(properties,property=>html`
              <option value="${property}">${property}</option>
            `)}
          </select>

          <input name="value" type="text" required placeholder="Value"/>

          <button type="submit">Add keyframe</button>
        </form>

        <br>

        <keyframe-grid .keyframes="${keyframes}"></keyframe-grid>
      </div>
    `}}customElements.define("animation-bee",AnimationBee);class AnimationManager extends connect(store)(LitElement){static get properties(){return{animations:{type:Array}}}_stateChanged(state){this.animations=getAnimationsSorted(state)}handleSubmit(e){e.preventDefault();const data=new FormData(e.target),duration=parseInt(data.get("duration"),10),name=data.get("name"),amount=parseInt(data.get("amount"),10);if(isNaN(amount)){store.dispatch(addAnimation({id:uuidV1(),keyframes:{},duration,name}))}else{for(let i=0;i<amount;i++){const animationIndex=i+1;store.dispatch(addAnimation({id:uuidV1(),keyframes:{0:{modvColor:animationIndex},1:{modvColor:animationIndex}},duration,name:`${name}${animationIndex}`}))}}}render(){const{animations}=this;return html`
      <style>
        .container {
          --width: 8;
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          border: 1px solid rgba(0, 0, 0, 0.25);
          margin: 0.15em;
          min-height: 1.5em;
          overflow: hidden;
        }
      </style>

      <form @submit="${e=>this.handleSubmit(e)}">
        <label for="name">Name</label>
        <input name="name" type="text" required />

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" require />

        <label for="amount">Amount</label>
        <input name="amount" type="number" min="1" max="512" />

        <button type="submit">Add</button>
      </form>

      <br>

      <div class="container">

        ${repeat(animations,animation=>html`

          <div class="item">
            <animation-bee
              id="${animation.id}"
              name="${animation.name}"
              duration="${animation.duration}"
              .keyframes="${animation.keyframes}">
            </animation-bee>
          </div>

        `)}

      </div>
    `}}customElements.define("animation-manager",AnimationManager);class AnimationView extends PageViewElement{render(){return html`
      <section>
        <animation-manager></animation-manager>
      </section>
    `}}window.customElements.define("animation-view",AnimationView);