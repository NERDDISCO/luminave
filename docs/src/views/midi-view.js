import{LitElement,html,repeat,connect,store,learnMidi,addScenesToMidi,removeSceneFromMidi,addMidiMapping,addSceneToTimeline,removeSceneFromTimelineAndResetFixtures,setMidiMappingActive,addMidi,removeMidi,enableMidi,MIDI_TYPES,MIDI_TYPE_KNOB,MIDI_TYPE_FADER,MIDI_TYPE_EMPTY,MIDI_TYPE_BUTTON,getMidiLearning,getScenes,getLive,getMidiEnabled,getMidiControllers,uuidV1,PageViewElement}from"../app.js";const WebMidi=window.WebMidi;var index={default:WebMidi};class SceneListItem extends LitElement{static get properties(){return{scene:{type:Object}}}render(){const{scene}=this;return html`
      <div>
        ${scene.name}
      </div>
    `}}customElements.define("scene-list-item",SceneListItem);class SceneList extends LitElement{static get properties(){return{scenes:{type:Array},sceneManager:{type:Array},live:{type:Boolean}}}handleSceneSubmit(e){e.preventDefault();const data=new FormData(e.target),sceneIds=data.getAll("scenes");this.dispatchEvent(new CustomEvent("add-scenes",{detail:{event:e,sceneIds}}))}handleRemoveScene(e){const{sceneId}=e.target;this.dispatchEvent(new CustomEvent("remove-scene",{detail:{event:e,sceneId}}))}getScene(sceneId){return this.sceneManager.filter(scene=>scene.id===sceneId)[0]}render(){const{scenes,sceneManager,live}=this,itemTemplates=[];for(let index=0;index<scenes.length;index++){const sceneId=scenes[index];itemTemplates.push(html`
        <scene-list-item .scene="${this.getScene(sceneId)}"></scene-list-item>

        ${live?"":html`<button @click="${e=>this.handleRemoveScene(e)}" .sceneId="${sceneId}">x</button>`}
      `)}return html`
      ${live?"":html`
          <form @submit="${e=>this.handleSceneSubmit(e)}">
            <select name="scenes" required multiple>
              <option value=""></option>
              ${repeat(sceneManager,scene=>html`
                <option value="${scene.id}">${scene.name}</option>
              `)}
            </select>

            <button type="submit">Add</button>
          </form>
        `}

      ${itemTemplates}

    `}}customElements.define("scene-list",SceneList);class MidiGrid extends connect(store)(LitElement){constructor(){super();this.types=MIDI_TYPES;this.types.sort()}static get properties(){return{width:{type:Number},height:{type:Number},mapping:{type:Array},controllerId:{type:String},learnIndex:{type:Number},sceneManager:{type:Array},live:{type:Boolean}}}_stateChanged(state){this.learnIndex=getMidiLearning(state);this.sceneManager=getScenes(state);this.live=getLive(state)}computeGridVars(width){const vars={"--width":width};return Object.keys(vars).map(key=>[key,vars[key]].join(":")).join(";")}computeItemVars(element,index,learnIndex){const vars={"--isLearning":index===learnIndex?0:1,"--isActive":element.active?0:1};return Object.keys(vars).map(key=>[key,vars[key]].join(":")).join(";")}handleLearn(e){const{mappingIndex}=e.target;store.dispatch(learnMidi(mappingIndex))}handleAddScenes(e){const{event,sceneIds}=e.detail,{mappingIndex}=e.target;event.preventDefault();event.target.reset();store.dispatch(addScenesToMidi(this.controllerId,mappingIndex,sceneIds))}handleRemoveScene(e){const{sceneId}=e.detail,{mappingIndex}=e.target;store.dispatch(removeSceneFromMidi(this.controllerId,mappingIndex,sceneId))}handleLabelChange(e){const label=e.target.value,{mappingIndex}=e.target;store.dispatch(addMidiMapping(this.controllerId,mappingIndex,{label}))}handleType(e){e.preventDefault();const data=new FormData(e.target),type=data.get("type"),mappingIndex=parseInt(data.get("mappingIndex"),10);store.dispatch(addMidiMapping(this.controllerId,mappingIndex,{type}))}selectedType(elementType,type){return elementType===type?"selected":""}showValueForType(type){if(type===MIDI_TYPE_KNOB||type===MIDI_TYPE_FADER){return!0}return!1}isNotEmpty(type){return type!==MIDI_TYPE_EMPTY}isButton(type){return type===MIDI_TYPE_BUTTON}render(){const{width,mapping,learnIndex,sceneManager,live,types}=this,itemTemplates=[];for(let index=0;index<mapping.length;index++){const element=mapping[index];itemTemplates.push(html`
        <div class="item" style="${this.computeItemVars(element,index,learnIndex)}">

          ${live?html`${element.label}`:""}

          ${this.showValueForType(element.type)?html`${element.value}`:""}
            
          ${live?"":html`

              ${this.isNotEmpty(element.type)?html`
                  <input class="name" name="label" type="text" @change="${e=>this.handleLabelChange(e)}" value="${element.label}" .mappingIndex="${index}" />
                  <br>
                `:""}

              <form @submit="${e=>this.handleType(e)}">
                <input name="mappingIndex" type="hidden" value="${index}" />
                <select name="type" required>
                  <option value=""></option>
                  ${repeat(types,type=>html`
                    <option value="${type}" ?selected="${this.selectedType(element.type,type)}">${type}</option>
                  `)}
                </select>
                <button type="submit">Change</button>
              </form>

              ${this.isNotEmpty(element.type)?html`
                  <br>
                  Note: ${element.note}
                  <button class="learn" @click="${e=>this.handleLearn(e)}" .mappingIndex="${index}">Learn</button>                
                `:""}

              ${this.isNotEmpty(element.type)&&this.isButton(element.type)?html`
                  <scene-list
                    @add-scenes="${e=>this.handleAddScenes(e)}"
                    @remove-scene="${e=>this.handleRemoveScene(e)}"
                    .mappingIndex="${index}"
                    .scenes="${element.scenes}"
                    .sceneManager="${sceneManager}"
                    .live="${live}">
                  </scene-list>            
                `:""}
          `}

        </div>
      `)}return html`
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          --on: calc(255 * var(--isActive));
          background: rgb( var(--on), 255, var(--on));
          border: 1px solid rgba(0, 0, 0, 0.25);
          margin: 0.05em;
          min-height: 1.5em;
          color: #000;
          text-align: center;
          overflow: hidden;
        }

        .item .learn {
          --on: calc(255 * var(--isLearning));
          background: rgb(255, var(--on), var(--on));
        }
      </style>

      <div class="container" style="${this.computeGridVars(width)}">
        ${itemTemplates}
      </div>
    `}}customElements.define("midi-grid",MidiGrid);class MidiController extends connect(store)(LitElement){constructor(){super();this.connected=!1;this.input=null;this.output=null}static get properties(){return{name:{type:String},id:{type:String},inputname:{type:String},outputname:{type:String},width:{type:Number},height:{type:Number},connected:{type:Boolean},mapping:{type:Array,hasChanged:(newValue,oldValue)=>!Object.is(newValue,oldValue)},midiLearning:{type:Number},midiEnabled:{type:Boolean},live:{type:Boolean}}}_stateChanged(state){this.midiLearning=getMidiLearning(state);this.live=getLive(state);if(this.midiEnabled!==getMidiEnabled(state)){this.midiEnabled=getMidiEnabled(state);this.midiEnabledChanged()}}firstUpdated(){if(0===this.mapping.length){const elements=this.width*this.height;for(let i=0;i<elements;i++){store.dispatch(addMidiMapping(this.id,i,{scenes:[],note:-1,label:"",type:"",active:!1,value:0}))}}}disconnectedCallback(){super.disconnectedCallback();if(null!==this.input){this.input.removeListener();this.input=null;this.output=null;this.connected=!1}}midiEnabledChanged(){if(this.midiEnabled){WebMidi.addListener("connected",e=>{const{port}=e,{name,type}=port;if(name===this.inputname&&"input"===type&&null===this.input){this.input=port;this.input.addListener("noteon","all",this.noteon.bind(this));this.input.addListener("controlchange","all",this.controlchange.bind(this));this.connected=!0}else if(name===this.outputname&&"output"===type){this.output=port}});WebMidi.addListener("disconnected",e=>{const{name,type}=e.port;if(name===this.inputname&&"input"===type){this.input.removeListener();this.input=null}else if(name===this.outputname&&"output"===type){this.output=null}this.connected=!1})}}noteon(event){const{data}=event,[channel,note,velocity]=data;if(-1<this.midiLearning){store.dispatch(addMidiMapping(this.id,this.midiLearning,{note}));store.dispatch(learnMidi(-1))}else{const mappingIndex=this.mapping.findIndex(element=>element.note===note);if(-1<mappingIndex){const element=this.mapping[mappingIndex],elementState=!element.active;store.dispatch(setMidiMappingActive(this.id,mappingIndex,elementState));if(elementState){element.scenes.map(sceneId=>store.dispatch(addSceneToTimeline(sceneId)));this.output.send(144,[note,127])}else{element.scenes.map(sceneId=>store.dispatch(removeSceneFromTimelineAndResetFixtures(sceneId)));this.output.send(144,[note,0])}}}}controlchange(event){const{data}=event,[,note,velocity]=data;if(-1<this.midiLearning){store.dispatch(addMidiMapping(this.id,this.midiLearning,{note}));store.dispatch(learnMidi(-1))}else{const mappingIndex=this.mapping.findIndex(element=>element.note===note);if(-1<mappingIndex){store.dispatch(addMidiMapping(this.id,mappingIndex,{value:velocity}))}}}render(){const{live,name,connected,inputname,outputname,width,height,mapping,id}=this;return html`
      <div>
        <h3>${name} (${connected})</h3>

        ${live?"":html`
            <ul>
              <li>input: ${inputname}</li>
              <li>output: ${outputname}</li>
            </ul>
          `}

        <midi-grid
          width="${width}"
          height="${height}"
          .mapping="${mapping}"
          .controllerId="${id}"></midi-grid>

      </div>
    `}}customElements.define("midi-controller",MidiController);class MidiManager extends connect(store)(LitElement){constructor(){super();store.dispatch(enableMidi(!1));WebMidi.enable(err=>{if(err){console.error("Web MIDI API could not be enabled:",err)}else{WebMidi.addListener("connected",e=>{const{manufacturer,name,id,type}=e.port;console.log("MIDIController added:","Manufacturer:",manufacturer,"| Name:",name,"| ID:",id,"| Type:",type)});WebMidi.addListener("disconnected",e=>{const{manufacturer,name,type,id}=e.port;console.log("MIDIController removed:","Manufacturer:",manufacturer,"| Name:",name,"| ID:",id,"| Type:",type)});store.dispatch(enableMidi(!0))}})}static get properties(){return{controllers:{type:Array},live:{type:Boolean}}}_stateChanged(state){this.live=getLive(state);this.controllers=getMidiControllers(state)}removeMidi(e){const{controllerId}=e.target;store.dispatch(removeMidi(controllerId))}handleSubmit(e){e.preventDefault();const data=new FormData(e.target),name=data.get("name"),input=data.get("input"),output=data.get("output"),width=parseInt(data.get("width"),10),height=parseInt(data.get("height"),10);store.dispatch(addMidi({id:uuidV1(),name,input,output,width,height,mapping:[]}))}render(){const{controllers,live}=this;return html`
      <style>
        .grid {
          display: flex;
          flex-direction: column;
        }

        .fixture {
          border: 1px solid var(--color-lighter);
          margin: 0 0 .25em 0;
        }

        h3 {
          margin-bottom: 0em;
          margin-top: 1em;
          border-top: 2px solid var(--background-darker);
        }
      </style>

      ${live?"":html`
          <form @submit="${e=>this.handleSubmit(e)}">
            <label for="name">Name</label>
            <input name="name" type="text" required />

            <label for="input">Input</label>
            <input name="input" type="text" required />

            <label for="output">Output</label>
            <input name="output" type="text" required />

            <label for="width">Width</label>
            <input name="width" type="number" min="1" max="255" required />

            <label for="height">Height</label>
            <input name="height" type="number" min="1" max="255" required />

            <button type="submit">Add controller</button>
          </form>
        `}

      <div class="grid">

        ${repeat(controllers,controller=>html`

          <div>
            <midi-controller
              id="${controller.id}"
              name="${controller.name}"
              .mapping="${controller.mapping}"
              inputname="${controller.input}"
              outputname="${controller.output}"
              width="${controller.width}"
              height="${controller.height}">
            </midi-controller>

            ${live?"":html`<button @click="${e=>this.removeMidi(e)}" .controllerId="${controller.id}">Remove</button>`}
                
          </div>
        
        `)}

      </div>
    `}}customElements.define("midi-manager",MidiManager);class MidiView extends PageViewElement{render(){return html`
      <section>
        <midi-manager></midi-manager>
      </section>
    `}}window.customElements.define("midi-view",MidiView);export{index as $index,WebMidi as $indexDefault};