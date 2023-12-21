let sandwichNet;
let errorGraph;

let w = 1400;
let h = 1000;
let oldW;
let oldH;
let netW = 1000;
let netH = 800;

var inputNodes = 4;
var inputNodesMin = 1;
var inputNodesMax = 10;
var inputNodesStep = 1;

var hiddenNodes = 2;
var hiddenNodesMin = 1;
var hiddenNodesMax = 20;
var hiddenNodesStep = 1;

var outputNodes = 1;
var outputNodesMin = 1;
var outputNodesMax = 3;
var outputNodesStep = 1;

var learningRate = 10;
var learningRateMin = 1;
var learningRateMax = 20;
var learningRateStep = 1;

let oldInputNodes;
let oldHiddenNodes;
let oldOutputNodes;

let v = [0,0,0,0];

let sandwich = [];
let sandwich_image = [];
let ingredientsArrow;
let tasteOMeter_anzeige;
let tasteOMeter;
let ingredientsList = ["Käse","Eierschalen","Matsch","Hühnchen","Erdnusbutter","Marmelade","Dünger","Grobe Mettwurst","Tonscherben","Majo","Salat",""]


function preload() {
  sandwich_image[0] = loadImage('./img/sandwich-01.png');
  sandwich_image[1] = loadImage('./img/sandwich-02.png');
  //tasteOMeter_anzeige = loadImage('./img/tasteOmeter_anzeige.png');
  tasteOMeter_anzeige = loadImage('./img/tastometer_03_anzeige.png');
  //tasteOMeter = loadImage('./img/tasteOmeter.png');
  tasteOMeter = loadImage('./img/tastometer_03_meter.png');
  ingredientsArrow = loadImage('./img/ingrediensArrow.png');
}

function setup() 
{

/*
  w = displayWidth;
  h = displayHeight;
  netW = displayWidth * 0.7;
  netH = displayHeight * 0.5;
*/
  w = windowWidth;
  h = windowHeight;
  oldW = w;
  oldH = h;
  netW = windowWidth * 0.7;
  netH = windowHeight * 0.8;

  createCanvas(w, h);
  frameRate(60);
  var gui = createGui('Neural Network Config');
  gui.addGlobals('inputNodes', 'hiddenNodes', 'outputNodes', 'learningRate');

  oldInputNodes = inputNodes;
  oldHiddenNodes = hiddenNodes;
  oldOutputNodes = outputNodes;

  sandwichNet = new SimpleNeuralNet(inputNodes, hiddenNodes, outputNodes, netW, netH);
  sandwichNet.forward(v);
  background(220);
  sandwichNet.update(netW,netH);

  //errorGraph = new ErrorGraph(w,50);

}

let translatedMouseX;
let translatedMouseY;
let offsetTrainButton;
let aktivateButton = false;
let trainButtonClicked = false;
let anim = 0;
let playAnimBackward = false;
let netLayerOneTrained = true;
let netLayerTwoTrained = true;

function draw() {
  
if(oldInputNodes != inputNodes || oldHiddenNodes != hiddenNodes || oldOutputNodes != outputNodes)
{
  if(inputNodes > 4)
  {
    netH = (inputNodes * 160);
    h = inputNodes*200;
    resizeCanvas(w, h);
  }
  else
  {
    netH = windowHeight * 0.8;
    h = windowHeight;
    resizeCanvas(w, h);
  }
  sandwichNet = new SimpleNeuralNet(inputNodes, hiddenNodes, outputNodes, netW, netH);
  oldInputNodes = inputNodes;
  oldHiddenNodes = hiddenNodes;
  oldOutputNodes = outputNodes;
  
}

  offsetTrainButton = netW/2;
  background(255);
  sandwichNet.update();
  sandwichNet.changeWeightsOnClick();
  push();
  translate((w-netW)/2,(h-netH)/2);
  translatedMouseX = mouseX - ((w-netW)/2);
  translatedMouseY = mouseY - ((h-netH)/2);
  
  if(playAnimBackward == true){
    anim -= 0.01;
    sandwichNet.renderWeightsUpdateAnimation(anim);
    if(anim < 1.25 && netLayerTwoTrained == false)
    {
      sandwichNet.train(learningRate,"Outputlayer","Sigmoid");
      netLayerTwoTrained = true;
    }
    if(anim < 0.25 && netLayerOneTrained == false)
    {
      sandwichNet.train(learningRate,"Hiddenlayer","Sigmoid");
      netLayerOneTrained = true;
    }
    if(anim < 0){playAnimBackward = false}

  }
  else
  {
    anim += 0.01;
    if(anim > 1.5){anim = 0} 
  }

  sandwichNet.renderNodesConnectionLines();
  sandwichNet.renderFeedForwardAnimation(anim);
  
  
  sandwichNet.renderWeights();
  sandwichNet.renderSandwichIngredients(ingredientsList);
  sandwichNet.renderTasteOMeter();
  sandwichNet.renderNeurons();
  if(aktivateButton == true)
  {
  sandwichNet.updateError();
  sandwichNet.renderError();
  }
  sandwichNet.renderSigmoidGraph();
  pop();
  



  // ##### Portal #####

  fill(0);
  push();
  translate(w/2,h-100);
  if(mouseIsPressed && mouseX < w/2 + 75 && mouseX > w/2 - 75 && mouseY < h-100 + 20 && mouseY > h-100 - 20)
  { 
    
    scale(0.8);
  }
  else
  {
    scale(1);
  }
  
  ellipse(0,0,150,40);
  pop();

  // ##### Portal Ende #


  let counter = 0;
  textAlign(CENTER);
  for(let i = 0; i < sandwichNet.tasteOMeter.length; i++)
    {
      if(sandwichNet.tasteOMeter[i].manualOutputValue == true)
      {
        counter++;
      }
    }
  if(counter == sandwichNet.tasteOMeter.length)
  {
    aktivateButton = true
  }
  if(aktivateButton == true)
  {
    //TrainButton activated
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(5);
    rect(w/2+offsetTrainButton,h-100,150,40);
    fill(0);
    noStroke(0);
    textSize(22);
    text("Train!",w/2+offsetTrainButton,h-95);
  }
  else
  {
    //TrainButton deactiveted
    rectMode(CENTER);
    fill(255);
    stroke(200);
    strokeWeight(5);
    rect(w/2+offsetTrainButton,h-100,150,40);
    fill(200);
    noStroke(0);
    textSize(22);
    text("Train!",w/2+offsetTrainButton,h-95);
    textSize(16);
    text("Change Output Value to Train ...",w/2+offsetTrainButton+40,h-50);
  }
  fill(0);

  rectMode(CORNER);
  
  //Train sequenze
  if(trainButtonClicked == true)
  {
    playAnimBackward = true;
    netLayerOneTrained = false;
    netLayerTwoTrained = false;
    anim = 1.5;
    sandwichNet.calcErrorForTrain();
    trainButtonClicked = false;
  }
  else
  {
    if(sandwich.length > 0)
    {
      for (let i = 0; i < sandwich.length; i++) 
      {
        sandwich[i].render();
        sandwich[i].pysics();
      }
      sandwich[sandwich.length-1].renderIngrediens();
      sandwichNet.forward(sandwich[sandwich.length-1].taste);
    }
  }
  
  //errorGraph.render();


}

function mouseClicked() {
  if(aktivateButton == true)
  {
    if(mouseX < w/2 + 75 + offsetTrainButton && mouseX > w/2 - 75 + offsetTrainButton && mouseY < h-100 + 20 && mouseY > h-100 - 20 )
    {
      trainButtonClicked = true;
      for(let i = 0; i < sandwichNet.tasteOMeter.length; i++)
      {
        sandwichNet.tasteOMeter[i].manualOutputValue = false;
      }
    } 
    let error = Math.pow((sandwichNet.tasteOMeter[0].alpha - sandwichNet.tasteOMeter[0].oldAlpha),2);
    //errorGraph.update(error);
    aktivateButton = false;
  }
  if(mouseX < w/2 + 75 && mouseX > w/2 - 75 && mouseY < h-100 + 20 && mouseY > h-100 - 20 ){
    sandwich.push(new Sandwich(inputNodes, ingredientsList));
    for(let i = 0; i < sandwichNet.tasteOMeter.length; i++)
    {
      sandwichNet.tasteOMeter[i].manualOutputValue = false;
    }
  }
  if(sandwich.length > 100)
    {
      sandwich.shift();
    }
  
}