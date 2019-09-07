
// ANIMATION 3 ### START ###
//create a new parent timeline
//create a new parent timeline
var master;
var showGSDevTool = false;

//generic variables for animation state management
var animations = ['kubecloud-explain-4'];
var animationStarted = 0;
var animationInScope = '';
var runningTween = new TimelineMax;


// ANIMATION 4 ### START ###
const code_base = $("#code-base"),
  code_development = $("#code-development"),
  code = $("#code"),
  repository = $("#git"),
  continues_integration = $("#cicd"),
  continues_delivery = $("#cd"),
  registry = $("#registry"),
  registry_container = $("#first-container"),
  backend_container = $("#c3"),
  middle_container = $("#c2"),
  front_container = $("#c1");


function Start(){
  var start = new TimelineMax({id:"Start"});
  start.to(code_development, 0, {opacity:0})
    .to(code, 0, {opacity:0})
    .to(repository, 0, {opacity:0})
    .to(continues_integration, 0, {opacity:0})
    .to(continues_delivery, 0, {opacity:0})
    .to(registry, 0, {opacity:0})
    .to(registry_container, 0, {opacity:0})
    .to(backend_container, 0, {opacity:0})
    .to(middle_container, 0, {opacity:0})
    .to(front_container, 0, {opacity:0});
  return start;
}

function Code_to_Repository(){
  var code_to_repository = new TimelineMax({id:"Code_to_Repository"});
  var ctg = MorphSVGPlugin.pathDataToBezier("#code-to-git-path", {align:code});
  code_to_repository.to(code_development, 1, {opacity:1})
    .to(code_base, 1, {opacity:1})
    .to(repository, 1, {opacity:1})
    //.call(paragraphText,['Once done coding, they commit their local changes into the remote repository.'])
    .to(code, 1, {opacity:1})
    .to(code, 2, {bezier:{values:ctg, type:"cubic"}});
   return code_to_repository;
}

function Code_to_CI(){
  var code_to_ci = new TimelineMax({id:"Code_to_CI"});
  var gtci = MorphSVGPlugin.pathDataToBezier("#git-to-cicd-path", {align:code});
  code_to_ci.to(continues_integration, 1, {opacity:1})
    //.call(paragraphText,['If CI/CD is implemented: every commit to the central repository triggers an continues integration process (based upon the type of branch the commited)'])
    .to(code, 2, {bezier:{values:gtci, type:"cubic"}})
    .to(code,0,{opacity:0});
   return code_to_ci;
}

function Container_to_Registry(){
  var container_to_registry = new TimelineMax({id:"Container_to_Registry"});
  var ctr = MorphSVGPlugin.pathDataToBezier("#cicd-to-registry", {align:registry_container});
  container_to_registry.to(registry, 2, {opacity:1})
    .to(registry_container, 1, {opacity:1})
    //.call(paragraphText,['During continues integration, one or more containers are being build. Every container is being stored in a central image-registry.'])
    .to(registry_container, 3, {bezier:{values:ctr, type:"cubic"}})
    .to(registry_container,0,{opacity:0});
    return container_to_registry;
}

function Backend_Microservices_to_Kubernetes(){
  var ms = new TimelineMax({id:"Backend_Microservices_to_Kubernetes"});
  var path = MorphSVGPlugin.pathDataToBezier("#container-to-end-path", {align:backend_container});
  ms.to(continues_delivery, 1, {opacity:1})
    .to(backend_container, 1, {opacity:1})
    //.call(paragraphText,['An container image is content, just like code. It has to be implemented to become a running container.'])
    .to(backend_container, 2, {bezier:{values:path, type:"cubic"}});
  return ms;
}

function Middle_Microservices_to_Kubernetes(){
  var ms = new TimelineMax({id:"Middle_Microservices_to_Kubernetes"});
  var path = MorphSVGPlugin.pathDataToBezier("#container-to-middle-path", {align:middle_container});
  ms.to(middle_container, 1, {opacity:1})
    //.call(paragraphText,['During Continues Integration (CI) or after CI during Continues Delivery (to production) containers are retrieved by Kubernets from their registry and implemented and in Kubernetes. When containers are implemented within the same namespace the containers can communicate or see each other through services, which are part of the kubernetes network.'])
    .to(middle_container, 2, {bezier:{values:path, type:"cubic"}});
  return ms;
}

function Front_Microservices_to_Kubernetes(){
  var ms = new TimelineMax({id:"Front_Microservices_to_Kubernetes"});
  var path = MorphSVGPlugin.pathDataToBezier("#container-to-front-path", {align:front_container});
  ms.to(front_container, 1, {opacity:1})
    .to(front_container, 2, {bezier:{values:path, type:"cubic"}});
  return ms;
}


function kubecloud_explain_4() {
  //create a new parent timeline
  runningTween = new TimelineMax();

  //add child timelines
  runningTween.add(Start())
    .add(Code_to_Repository())
    .add(Code_to_CI())
    .add(Container_to_Registry())
    .add(Backend_Microservices_to_Kubernetes())
    .add(Middle_Microservices_to_Kubernetes())
    .add(Front_Microservices_to_Kubernetes());
}
// ANIMATION 4 ### END ###

// GENERIC FUNCTION #### START ####
function headerText(newText){
  $("#headertext").text(newText);
};

function paragraphText(newText){
  $("#paragraphtext").text(newText);
};

function EnableGSDevTool(){
  if (showGSDevTool){
    GSDevTools.create();
  }
}

function checkAnimationInScope(animation) {
  var slide_object = 'div[id="' + animation + '"]';
  var divTop = $(slide_object)[0].getBoundingClientRect().top;
  if( divTop > 0 ) {
    if (animationInScope !== animation) {
        animationInScope = animation;
        if (animationStarted == 1) {
          animationStarted = 0;
        }
    }
    if ( animationStarted == 0 ){
      animationStarted = 1;
      animation=animation.replace(/-/g,'_');
      //EnableGSDevTool()
      //start animation playing
      window[animation]();
    }
    return 1;
  }
  return 0;
}

function checkForAnimationsInScope () {
  var result = 0;
  for (i = 0; i < animations.length; i++) {
    if (result === 0) {
      result=checkAnimationInScope(animations[i]);
    }
  }
  if ( result === 0 ){ //no animation on slide
    if ( animationStarted == 1 ){ //reset running annimations
      TweenMax.killAll();
      //runningTween.kill();
    }
    animationInScope = '';
  }
  setTimeout(checkForAnimationsInScope, 100);
}

$( document ).ready(function() {
  jQuery(document).ready(checkForAnimationsInScope);
});
// GENERIC FUNCTION #### END ####


