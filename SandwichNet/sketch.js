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
var inputNodesMax = 6;
var inputNodesStep = 1;

var hiddenNodes = 2;
var hiddenNodesMin = 1;
var hiddenNodesMax = 10;
var hiddenNodesStep = 1;

var outputNodes = 1;
var outputNodesMin = 1;
var outputNodesMax = 3;
var outputNodesStep = 1;

var learningRate = 0.005;
var learningRateMin = 0.005;
var learningRateMax = 1;
var learningRateStep = 0.005;

var trainingSteps = 100;
var trainingStepsMin = 1;
var trainingStepsMax = 1000;
var trainingStepsStep = 1;

let trainingStepsCounter = 0;

var Cheese = 0;
var CheeseMin = 0;
var CheeseMax = 1;
var CheeseStep = 0.1;

var Pineapple = 0;
var PineappleMin = 0;
var PineappleMax = 1;
var PineappleStep = 0.1;

var Lettuce = 0;
var LettuceMin = 0;
var LettuceMax = 1;
var LettuceStep = 0.1;

var BreadOnly = 0;
var BreadOnlyMin = 0;
var BreadOnlyMax = 1;
var BreadOnlyStep = 0.1;

var Chicken = 0;
var ChickenMin = 0;
var ChickenMax = 1;
var ChickenStep = 0.1;

var CheesePineapple = 0;
var CheesePineappleMin = 0;
var CheesePineappleMax = 1;
var CheesePineappleStep = 0.1;

var CheeseLettuce = 0;
var CheeseLettuceMin = 0;
var CheeseLettuceMax = 1;
var CheeseLettuceStep = 0.1;

var CheeseChicken = 0;
var CheeseChickenMin = 0;
var CheeseChickenMax = 1;
var CheeseChickenStep = 0.1;

var PineappleLettuce = 0;
var PineappleLettuceMin = 0;
var PineappleLettuceMax = 1;
var PineappleLettuceStep = 0.1;

var PineappleChicken = 0;
var PineappleChickenMin = 0;
var PineappleChickenMax = 1;
var PineappleChickenStep = 0.1;

var LettuceChicken = 0;
var LettuceChickenMin = 0;
var LettuceChickenMax = 1;
var LettuceChickenStep = 0.1;

var CheesePineappleLettuce = 0;
var CheesePineappleLettuceMin = 0;
var CheesePineappleLettuceMax = 1;
var CheesePineappleLettuceStep = 0.1;

var CheesePineappleChicken = 0;
var CheesePineappleChickenMin = 0;
var CheesePineappleChickenMax = 1;
var CheesePineappleChickenStep = 0.1;

var CheeseLettuceChicken = 0;
var CheeseLettuceChickenMin = 0;
var CheeseLettuceChickenMax = 1;
var CheeseLettuceChickenStep = 0.1;

var PineappleLettuceChicken = 0;
var PineappleLettuceChickenMin = 0;
var PineappleLettuceChickenMax = 1;
var PineappleLettuceChickenStep = 0.1;

var CheesePineappleLettuceChicken = 0;
var CheesePineappleLettuceChickenMin = 0;
var CheesePineappleLettuceChickenMax = 1;
var CheesePineappleLettuceChickenStep = 0.1;

let dataset = [];

let level = 2;
let bg = 0;
let lang = 0;
let oldInputNodes;
let oldHiddenNodes;
let oldOutputNodes;

let v = [0,0,0,0];

let sandwich = [];
let sandwich_image = [];
let ingredientsArrow;
let tasteOMeter_anzeige;
let tasteOMeter_3;
let tasteOMeter_2;
let portal;
let toaster;
let hinweis;
let aidLogo;
let hinweisAnimation = 0;
let ingredientsList = ["Käse","Eierschalen","Matsch","Hühnchen","Erdnusbutter","Marmelade","Dünger","Grobe Mettwurst","Tonscherben","Majo","Salat",""]
let firstSandwichWasGenerated = false;

let ingrediensVariations = [
  'BreadOnly',
  'Cheese', 
  'Pineapple', 
  'CheesePineapple',
  'Lettuce', 
  'CheeseLettuce',
  'PineappleLettuce',
  'CheesePineappleLettuce',
  'Chicken', 
  'CheeseChicken',
  'PineappleChicken',
  'CheesePineappleChicken',
  'LettuceChicken', 
  'CheeseLettuceChicken', 
  'PineappleLettuceChicken', 
  'CheesePineappleLettuceChicken'
];

function preload() {
  const queryString = window.location.search;
  if(queryString)
  {
    const urlParams = new URLSearchParams(queryString);
    level = urlParams.get('level');
    print("jump to Level " + level);
    bg = urlParams.get('bg');
    print("set bg to " + bg);
    lang = urlParams.get('lang');
    if(lang == "de")
    {
      if(level == 4)
      {
        ingredientsList = ["Käse","Ananas","Kopfsalat","Hühnchen","Erdnusbutter","Marmelade","Dünger","Grobe Mettwurst","Tonscherben","Majo","Salat",""]
      }
      else
      {
        ingredientsList = ["Käse","Eierschalen","Matsch","Hühnchen","Erdnusbutter","Marmelade","Dünger","Grobe Mettwurst","Tonscherben","Majo","Salat",""]
      }
    }
    if(lang == "en")
    {
      if(level == 4)
      {
        ingredientsList = ["Cheese", "Pineapple", "Lettuce", "Chicken", "PeanutButter", "Jam", "Fertilizer", "Sausage", "Clay", "Mayonnaise", "Salad",""]
      }
      else
      {
        ingredientsList = ["Cheese", "Eggshells", "Mud", "Chicken", "PeanutButter", "Jam", "Fertilizer", "Sausage", "Clay", "Mayonnaise", "Salad",""]
      }

    }
  }
  else
  {
    print("No level set, jump to Level 2");
  }
  sandwich_image[0] = loadImage('./img/digital-lab/sandwich-01.png');
  sandwich_image[1] = loadImage('./img/digital-lab/sandwich-02.png');
  sandwich_image[2] = loadImage('./img/digital-lab/sandwich-03.png');
  sandwich_image[3] = loadImage('./img/digital-lab/sandwich-04.png');
  //tasteOMeter_anzeige = loadImage('./img/tasteOmeter_anzeige.png');
  tasteOMeter_anzeige = loadImage('./img/tastometer_03_anzeige.png');
  //tasteOMeter = loadImage('./img/tasteOmeter.png');
  tasteOMeter_3 = loadImage('./img/tastometer_03_meter.png');
  tasteOMeter_2 = loadImage('./img/tastometer_02_meter.png');
  ingredientsArrow = loadImage('./img/ingrediensArrow.png');
  portal = loadImage('./img/portal.png');
  toaster = loadImage('./img/toaster.png');
  hinweis = loadImage('./img/hinweis.png');
  aidLogo = loadImage('./img/logo-aidplus.svg');
}

function setup() 
{

  w = windowWidth;
  h = windowHeight;
  oldW = w;
  oldH = h;
  netW = windowWidth * 0.7;
  netH = windowHeight * 0.8;

  createCanvas(w, h);
  frameRate(60);
  if(level == 3)
  {
    var gui = createGui('Neural Network Config');
    gui.addGlobals('inputNodes', 'hiddenNodes', 'outputNodes', 'learningRate');
    //gui.toggleCollapsed();
  }
  if(level == 4)
  { 
    var ConfigGUI = createGui('Neural Network Config');
    ConfigGUI.addGlobals('hiddenNodes', 'learningRate', 'trainingSteps');
    ConfigGUI.setSize(250,185);
    var DatasetGUI = createGui('Dataset');
    DatasetGUI.addGlobals
    (
      'BreadOnly',
      'Cheese', 
      'Pineapple', 
      'CheesePineapple',
      'Lettuce', 
      'CheeseLettuce',
      'PineappleLettuce',
      'CheesePineappleLettuce',
      'Chicken', 
      'CheeseChicken',
      'PineappleChicken',
      'CheesePineappleChicken',
      'LettuceChicken', 
      'CheeseLettuceChicken', 
      'PineappleLettuceChicken', 
      'CheesePineappleLettuceChicken'
    );
    DatasetGUI.setPosition(10,250);
    DatasetGUI.setSize(250,400);
    //gui.toggleCollapsed();
  }
  if(level == 1)
  {
    inputNodes = 4;
    hiddenNodes = 0;
    outputNodes = 1;
  }
  if(level == 2)
  {
    inputNodes = 4;
    hiddenNodes = 2;
    outputNodes = 1;
  }
  
  oldInputNodes = inputNodes;
  oldHiddenNodes = hiddenNodes;
  oldOutputNodes = outputNodes;

  sandwichNet = new SimpleNeuralNet(inputNodes, hiddenNodes, outputNodes, netW, netH);
  sandwichNet.forward(v);
  if(bg == 1)
  {
    background(255);
  }
  else{
    background(230,255,255);
  }
  sandwichNet.update(netW,netH);

  //errorGraph = new ErrorGraph(w,50);

}

let translatedMouseX;
let translatedMouseY;
let offsetTrainButton;
let aktivateButton = true;
let trainButtonClicked = false;
let anim = 0;
let animSpeed = 0.01;
let playAnimBackward = false;
let netLayerOneTrained = true;
let netLayerTwoTrained = true;

function draw() 
{



if(level == 4)
{
  updateDataset();
}

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
  
} // Ende if Nodes changed

  offsetTrainButton = netW/2;
  if(bg == 1)
  {
    background(255);
  }
  else
  {
    background(230,255,255);
  }

  //##### Portal ###########
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
  imageMode(CENTER);
  image(portal,0,0,150,80);
  //ellipse(0,0,150,40);
  imageMode(CORNER);
  pop();
  //##### Portal Ende #######

  //##### Toaster ###########
  push();
  translate(w-400,h-190);
  noStroke();
  fill(0,0,0,15)
  ellipse(70,105,130,65);
  image(toaster,0,0,140,140);
  scale(1.1);
  image(aidLogo,130,50,190,48);

  pop();
  //##### Toaster Ende #######

  //##### Hinweis ###########
  push();
  translate(w/2-80,h-60);
  // fill(255,0,0)
  // rect(0,0,20,20);
  if(firstSandwichWasGenerated == true && hinweisAnimation < 1.2)
  {
    hinweisAnimation += 0.01;
  }
  rotate(-easeInQuart(hinweisAnimation));
  translate(-30,-400);
  scale(0.7);
  image(hinweis,0,0,224,573);
  pop();
  //##### Hinweis Ende #######

if(sandwich.length > 0)
  {
    for (let i = 0; i < sandwich.length; i++) 
    {
      sandwich[i].render();
      sandwich[i].pysics();
      if(sandwich[i].hasLandedOnPortal == true)
      {

      }
    }
    sandwich[sandwich.length-1].renderIngrediens();
    sandwichNet.forward(sandwich[sandwich.length-1].taste);
  }


  sandwichNet.update();
  sandwichNet.changeWeightsOnClick();
  push();
  translate((w-netW)/2,(h-netH)/2);
  translatedMouseX = mouseX - ((w-netW)/2);
  translatedMouseY = mouseY - ((h-netH)/2);
  
  if(playAnimBackward == true){
    anim -= animSpeed;
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
    if(anim < 0){playAnimBackward = false;}

  }
  else
  {
    anim += 0.01;
    if(anim > 1.5){anim = 0} 
  }
  //sandwichNet.renderNeuronsBG();
  sandwichNet.renderNodesConnectionLines();
  sandwichNet.renderFeedForwardAnimation(anim);
  
  
  sandwichNet.renderWeights();
  sandwichNet.renderSandwichIngredients(ingredientsList);
  sandwichNet.renderTasteOMeter();
  sandwichNet.renderNeurons();
  
  
  if(level == 3)
  {
    if(aktivateButton == true)
    {
    sandwichNet.updateError();
    sandwichNet.renderError();
    }
  }

  sandwichNet.renderSigmoidGraph();
  pop();
  





  if(level == 3)
  {
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
  }// Level 3 Ende

  if(level == 4)
  {
    // Render Train Button
    rectMode(CENTER);
    if(aktivateButton == true)
    {
      //TrainButton activated
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
      fill(255);
      stroke(200);
      strokeWeight(5);
      rect(w/2+offsetTrainButton,h-100,150,40);
      fill(200);
      noStroke(0);
      textSize(22);
      text("Train!",w/2+offsetTrainButton,h-95);
      textSize(16);
      text("Training started please wait ...", w/2+offsetTrainButton+40,h-50);
    }
    fill(0);
    rectMode(CORNER);
    
    if(trainButtonClicked == true)  
    { 
      if(trainingStepsCounter < trainingSteps)
      {
        if(playAnimBackward == false)
        {
          trainingStepsCounter++;
          generateNewSandwich();
          playAnimBackward = true;
          netLayerOneTrained = false;
          netLayerTwoTrained = false;
          anim = 1.5;
          animSpeed = 0.1;
          sandwichNet.tasteOMeter[0].value = dataset[sandwich[sandwich.length-1].dezimalPositon];
          sandwichNet.calcErrorForTrain();
        }
      }
      else
      { 
        sandwichNet.tasteOMeter[0].manualOutputValue = false;
        aktivateButton = true;
        trainingStepsCounter = 0;
        trainButtonClicked = false;
        
      }
    }
    // Render soll poriton from dataset on tastometer
    // if(sandwich.length > 0)
    // {
    //   // set TasteOMeter to the right Value from Dataset
    //   sandwichNet.tasteOMeter[0].manualOutputValue = true;
    //   sandwichNet.tasteOMeter[0].value = dataset[sandwich[sandwich.length-1].dezimalPositon];
    // }
    
  }// Ende Level 4

  
}//Ende draw

function mouseClicked() 
{
  if(mouseX < w/2 + 75 + offsetTrainButton && mouseX > w/2 - 75 + offsetTrainButton && mouseY < h-100 + 20 && mouseY > h-100 - 20 )
  {
    startTraining();
  }
  if(mouseX < w/2 + 75 && mouseX > w/2 - 75 && mouseY < h-100 + 20 && mouseY > h-100 - 20 )
  {
    generateNewSandwich();
  }
  
}

function startTraining()
{
  if(level == 3)
  {
    if(aktivateButton == true)
    {
        trainButtonClicked = true;
        for(let i = 0; i < sandwichNet.tasteOMeter.length; i++)
        {
          sandwichNet.tasteOMeter[i].manualOutputValue = false;
        }
      // let error = Math.pow((sandwichNet.tasteOMeter[0].alpha - sandwichNet.tasteOMeter[0].oldAlpha),2);
      //errorGraph.update(error);
      aktivateButton = false;
    }
  }// level 3 Ende
  if(level == 4 && trainButtonClicked == false)
  {
    sandwichNet.tasteOMeter[0].manualOutputValue = true;
    aktivateButton = false;
    trainButtonClicked = true;
  }
}



function generateNewSandwich()
{ 
  sandwich.push(new Sandwich(inputNodes, ingredientsList));
  if(sandwich.length > 100)
  {
    sandwich.shift();
  }
  if(firstSandwichWasGenerated == false)
  {
    firstSandwichWasGenerated = true;
    hinweisAnimation = 0.5;
  }
}

function updateDataset(){
  dataset[0] = BreadOnly;
  dataset[1] = Cheese;
  dataset[2] = Pineapple;
  dataset[3] = CheesePineapple;
  dataset[4] = Lettuce;
  dataset[5] = CheeseLettuce;
  dataset[6] = PineappleLettuce;
  dataset[7] = CheesePineappleLettuce;
  dataset[8] = Chicken;
  dataset[9] = CheeseChicken;
  dataset[10] = PineappleChicken;
  dataset[11] = CheesePineappleChicken;
  dataset[12] = LettuceChicken;
  dataset[13] = CheeseLettuceChicken;
  dataset[14] = PineappleLettuceChicken;
  dataset[15] = CheesePineappleLettuceChicken;
}

function windowResized() 
{
  w = windowWidth;
  h = windowHeight;
  netW = windowWidth * 0.7;
  netH = windowHeight * 0.8;
  resizeCanvas(w, h);
  sandwichNet.changeNetSize(netW,netH);
}
function easeInQuart(x){
return x * x * x * x;
}