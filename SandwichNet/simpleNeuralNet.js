class SimpleNeuralNet
{
  constructor(_inputnodes, _hiddennodes, _outputnodes, _netWidth, _netHeight)
  {
    
    this.inputnodes = create_1d_array(_inputnodes);
    //this.inputSigmoid = create_1d_array(_inputnodes);
    
    this.hiddennodes = create_1d_array(_hiddennodes);
    this.hiddenSigmoid = create_1d_array(_hiddennodes);

    this.outputnodes = create_1d_array(_outputnodes);
    this.outputSigmoid = create_1d_array(_outputnodes);

    this.weightsInputHidden = create_2d_array(_inputnodes, _hiddennodes);
    this.weightsHiddenOutput = create_2d_array(_hiddennodes,_outputnodes);
    
    this.weightsInputHiddenIsClicked = create_2d_boolArray(_inputnodes, _hiddennodes);
    
    this.inputnodesPosition = create_1d_vectorArray(_inputnodes);
    this.inputSigmoidPosition = create_1d_vectorArray(_inputnodes);
    
    this.hiddennodesPosition = create_1d_vectorArray(_hiddennodes);
    this.hiddenSigmoidPosition = create_1d_vectorArray(_hiddennodes);

    this.outputnodesPosition = create_1d_vectorArray(_outputnodes);
    this.outputSigmoidPosition = create_1d_vectorArray(_outputnodes);
    
    this.outputError = create_1d_array(_outputnodes);
    this.hiddenError = create_1d_array(_hiddennodes);
    
    this.weightsInputHiddenPosition = create_2d_vectorArray(_inputnodes,_hiddennodes);
    this.weightsHiddenOutputPosition = create_2d_vectorArray(_hiddennodes,_outputnodes);
    
    this.neuronRenderSize = 60;
    this.netWidth = _netWidth;
    this.netHeight = _netHeight;
    this.tasteOMeter = create_1d_classArray(_outputnodes, TasteOMeter);
    this.sigmoidHiddenGraph = create_1d_classArray(_hiddennodes, SigmoidGraph);
    this.sigmoidOutputGraph = create_1d_classArray(_outputnodes, SigmoidGraph);
    
  }
  
  loopThrough(nodes,f)
  {
    switch (nodes) 
    {
      case 'Input':
        for(let i = 0; i < this.inputnodes.length; i++)  
        {
          f(i);
        }
        break;
      case 'Hidden':
        for(let h = 0; h < this.hiddennodes.length; h++)  
        {
          f(h);
        }
        break;
      case 'Output':
        for(let o = 0; o < this.outputnodes.length; o++)
        {
          f(o);
        }
        break;
      case 'InputHidden':
        for(let i = 0; i < this.inputnodes.length; i++)
        {    
          for(let h = 0; h < this.hiddennodes.length; h++)
          {
            f(i,h);
          }
        }
        break;
      case 'HiddenOutput':
        for(let h = 0; h < this.hiddennodes.length; h++)  
        {
          for(let o = 0; o < this.outputnodes.length; o++)
          { 
            f(h,o);
          }
        }
        break;
    }
  }

  forward(inputValues)
  {
    function sigmoid(x)
    {
      return 1/(1+(Math.exp(-x)));
    }
    
    if(this.inputnodes.length == inputValues.length)
    { 
      //Clear hidden and output array
      for(let h = 0; h < this.hiddennodes.length; h++){this.hiddennodes[h] = 0}
      for(let o = 0; o < this.outputnodes.length; o++){this.outputnodes[o] = 0}
      for(let h = 0; h < this.hiddennodes.length; h++){this.hiddenSigmoid[h] = 0}
      for(let o = 0; o < this.outputnodes.length; o++){this.outputSigmoid[o] = 0}
      this.inputnodes = inputValues;
      //calc hidden neurons
      for(let i = 0; i < this.inputnodes.length; i++)
      {
        for(let h = 0; h < this.hiddennodes.length; h++)
        {
          this.hiddennodes[h] += this.weightsInputHidden[i][h] * inputValues[i];
        }
      }
      //calc HiddenSigmoid
      for(let h = 0; h < this.hiddennodes.length; h++)
        {
          this.hiddenSigmoid[h] = sigmoid(this.hiddennodes[h]);
        }
      //calc output neurons
      for(let h = 0; h < this.hiddennodes.length; h++)
      {
        for(let o = 0; o < this.outputnodes.length; o++)
        {
          this.outputnodes[o] += this.weightsHiddenOutput[h][o] * this.hiddenSigmoid[h];
        }
      }
      for(let o = 0; o < this.outputnodes.length; o++)
      {
        this.outputSigmoid[o] = sigmoid(this.outputnodes[o]);
      }
    }else
    {
      console.log("can't forward. input size must be equal layer size")
    }
  }
  
  updateError()
  {
    //clear
    for(let h = 0; h < this.hiddennodes.length; h++)
    {
      this.hiddenError[h] = 0;
    }
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      this.outputError[o] = 0;
    }
    //calc OutputError:  tasteOMeter[i] - outputSigmoid[i]
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      this.outputError[o] = (this.tasteOMeter[o].value - this.outputSigmoid[o]);
    }
    //calc HiddenError: Summe über j: weightHiddenOutput[i][j] * outputSigmoid[i]
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      for(let h = 0; h < this.hiddennodes.length; h++)
      {
        this.hiddenError[h] += this.weightsHiddenOutput[h][o] * this.outputError[o];
      }
    }
  }

  calcErrorForTrain()
  {
    //clear
    for(let h = 0; h < this.hiddennodes.length; h++)
    {
      this.hiddenError[h] = 0;
    }
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      this.outputError[o] = 0;
    }
    //calc OutputError:  tasteOMeter[i] - outputSigmoid[i]
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      this.outputError[o] = (this.tasteOMeter[o].value - this.outputSigmoid[o]);
    }
    //calc HiddenError: Summe über j: weightHiddenOutput[i][j] * outputSigmoid[i]
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      for(let h = 0; h < this.hiddennodes.length; h++)
      {
        this.hiddenError[h] += this.weightsHiddenOutput[h][o] * this.outputError[o];
      }
    } 
  }

  train(learningRate, layer, activationFunctionTyp)
  {
    switch(activationFunctionTyp)
    {
      case "Sigmoid":
        switch(layer)
        {
          case "Hiddenlayer":
            //calc the new weights a * Ek * Ok(1-Ok) * OjT
            for(let h = 0; h < this.hiddennodes.length; h++)
            {
              for(let i = 0; i < this.inputnodes.length; i++)
              {
                let deltaW = (learningRate) * this.hiddenError[h] * this.hiddenSigmoid[h] * (1 - this.hiddenSigmoid[h]) * this.inputnodes[i];
                deltaW = Math.trunc(deltaW  * 1000000)/1000000;
                this.weightsInputHidden[i][h] += deltaW;
                if(this.weightsInputHidden[i][h] >= 10){this.weightsInputHidden[i][h] = 10}
                if(this.weightsInputHidden[i][h] <= -10){this.weightsInputHidden[i][h] = -10}
              }
            }
          break

          case "Outputlayer":
            //calc the new weights a * Ek * Ok(1-Ok) * OjT
            for(let o = 0; o < this.outputnodes.length; o++)
            {
              for(let h = 0; h < this.hiddennodes.length; h++)
              {
                let deltaW = (learningRate) * this.outputError[o] * this.outputSigmoid[o] * (1 - this.outputSigmoid[o]) * this.hiddenSigmoid[h];
                this.weightsHiddenOutput[h][o] += deltaW;
                if(this.weightsHiddenOutput[h][o] >= 10){this.weightsHiddenOutput[h][o] = 10}
                if(this.weightsHiddenOutput[h][o] <= -10){this.weightsHiddenOutput[h][o] = -10}     
              }
            }
          break
        }
      break
    }  
          
  }

  changeWeightsOnClick()
  { 
    function manipulateWeights(val, pos, w, h)
    {
      if(mouseIsPressed === true)
      {
        if( (translatedMouseX >= pos.x+(w/2)) && 
            (translatedMouseX <= pos.x+(w/2) + 20) && 
            (translatedMouseY >= pos.y-(h/2)) && 
            (translatedMouseY <= pos.y-(h/2) + h) 
          )
        {
          val+=0.1;
          if(val >= 10){val = 10}
        }
        if( (translatedMouseX >= pos.x-(w/2)-20) && 
            (translatedMouseX <= pos.x-(w/2)) && 
            (translatedMouseY >= pos.y-(h/2)) && 
            (translatedMouseY <= pos.y-(h/2) + h) 
          )
        {
          val-=0.1;
          if(val <= -10){val = -10}
        }
              
      }
      return val;
    }
      for(let i = 0; i < this.inputnodes.length; i++)
      {    
        for(let h = 0; h < this.hiddennodes.length; h++)
        {
          let v = createVector();
          v.add(this.weightsInputHiddenPosition[i][h]);
          this.weightsInputHidden[i][h] = manipulateWeights(this.weightsInputHidden[i][h],v,40,30);
        }
      }
      for(let h = 0; h < this.hiddennodes.length; h++)  
      {
        for(let o = 0; o < this.outputnodes.length; o++)
        {
          let v = createVector();
          v.add(this.weightsHiddenOutputPosition[h][o]);
          this.weightsHiddenOutput[h][o] = manipulateWeights(this.weightsHiddenOutput[h][o],v,40,30);
        }
      }
  }

  update()
  {
    
    let spaceBetweenInputNeurons = this.netHeight / this.inputnodes.length;
    let offsetInput = spaceBetweenInputNeurons / 2;
    
    let spaceBetweenHiddenNeurons = this.netHeight / this.hiddennodes.length;
    let offsetHidden = spaceBetweenHiddenNeurons / 2;
    
    let spaceBetweenOutputNeurons = this.netHeight / this.outputnodes.length;
    let offsetOutput = spaceBetweenOutputNeurons / 2;
    
    //Calc Input Neurons Position & Input Sigmoid Position
    for(let i = 0; i < this.inputnodes.length; i++)
    {
      this.inputnodesPosition[i].set(0, offsetInput + spaceBetweenInputNeurons * i);
      //this.inputSigmoidPosition[i].set(1.5*this.neuronRenderSize, offsetInput + spaceBetweenInputNeurons * i);
    }
    //Calc Hidden Neurons Position & Hidden Sigmoid Position
    for(let h = 0; h < this.hiddennodes.length; h++)
    {
      this.hiddennodesPosition[h].set(this.netWidth/1.7, offsetHidden + spaceBetweenHiddenNeurons * h);
      this.hiddenSigmoidPosition[h].set((this.netWidth/1.7)+1.5*this.neuronRenderSize, offsetHidden + spaceBetweenHiddenNeurons * h);

    }
    //Calc Output Neurons Position & Output Sigmoid Position
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      this.outputnodesPosition[o].set(this.netWidth-1.5*this.neuronRenderSize, offsetOutput + spaceBetweenOutputNeurons * o);
      this.outputSigmoidPosition[o].set(this.netWidth, offsetOutput + spaceBetweenOutputNeurons * o);

    }
    //Calc Input-Hidden Weights Position
    for(let i = 0; i < this.inputnodes.length; i++)
    {    
      for(let h = 0; h < this.hiddennodes.length; h++)
      {         
        let v = createVector();
        v.set(this.hiddennodesPosition[h])
        v.sub(this.inputnodesPosition[i]);
        v.mult(0.17);
        let weightPosition = createVector();
        weightPosition = v.add(this.inputnodesPosition[i]);
        this.weightsInputHiddenPosition[i][h].set(weightPosition);
      }
    }
    //Calc Hidden-Output Weights Position
    for(let h = 0; h < this.hiddennodes.length; h++)  
    {
      for(let o = 0; o < this.outputnodes.length; o++)
      {
        let v = createVector();
        v.set(this.outputnodesPosition[o])
        v.sub(this.hiddenSigmoidPosition[h]);
        v.mult(0.4);
        let weightPosition = createVector();
        weightPosition = v.add(this.hiddenSigmoidPosition[h]);
        this.weightsHiddenOutputPosition[h][o].set(weightPosition);
      }
    }
  }

  renderError()
  { 
    function drawErrorSigmoid(errorVAl, pos)
    {
      noStroke();
      fill(255,0,0);
      textSize(14);
      text(errorVAl.toFixed(2),pos.x,pos.y+20);
    }
    for(let h = 0; h < this.hiddennodes.length; h++)  
    {
      drawErrorSigmoid(this.hiddenError[h], this.hiddenSigmoidPosition[h]);
    }
    for(let o = 0; o < this.outputnodes.length; o++)  
    {
      drawErrorSigmoid(this.outputError[o], this.outputSigmoidPosition[o]);
    }
  }

  renderWeightsUpdateAnimation(animVal)
  {
    function drawUpdatedWeights(pos,w=40,h=30)
    {
      
      push();
      translate(pos.x, pos.y);
      //rectMode(CENTER);
      stroke(255,0,0);
      strokeWeight(4);
      fill(255);
      rect(-w/2,-h/2,w,h);
      rect(w/2,-h/2,20,h,0,h,h,0);
      rect(-w/2-20,-h/2,20,h,h,0,0,h);
      fill(0);
      noStroke();
      textSize(14);
      //text(value.toFixed(2),0,5);
      //text("–",-(w/2 + 10),5);
      //text("+",w/2+10,5);
      pop();
    }
    if(animVal < 1.3 && animVal > 1.1)
    {
      for(let h = 0; h < this.hiddennodes.length; h++)  
      {
        for(let o = 0; o < this.outputnodes.length; o++)
        {
          drawUpdatedWeights(this.weightsHiddenOutputPosition[h][o]);
        }
      }
    }

    if(animVal < 0.3 && animVal > 0.1)
    {
      for(let i = 0; i < this.inputnodes.length; i++)
      {    
        for(let h = 0; h < this.hiddennodes.length; h++)
        {
          drawUpdatedWeights(this.weightsInputHiddenPosition[i][h]);
        }
      }
    }
  }

  renderFeedForwardAnimation(animVal)
  {
    // Draw animated Circle
    function drawCircle(val, pos, active=1)
    { 
      noStroke();
      if(val <= 0){ fill(0,0,255) }else{ fill(0) }
      if(active == 0){ fill(200) }
      let rad = map(Math.abs(val),0,10,5,20);
      circle(pos.x,pos.y,rad);
      fill(0);
    }

    if(animVal > 0 && animVal <= 1)
    {
      for(let i = 0; i < this.inputnodes.length; i++)
      {    
        for(let h = 0; h < this.hiddennodes.length; h++)
        {
          let animPos = createVector(0,0);
          animPos.set(this.hiddennodesPosition[h]);
          animPos.sub(this.inputnodesPosition[i]);
          animPos.mult(animVal);
          animPos.add(this.inputnodesPosition[i]);
          drawCircle(this.weightsInputHidden[i][h], animPos, this.inputnodes[i]);
        }
      }
    }
    if(animVal > 1 && animVal <= 2)
    {
      for(let h = 0; h < this.hiddennodes.length; h++)  
      {
        for(let o = 0; o < this.outputnodes.length; o++)
        {
          let animPos = createVector(0,0);
          animPos.set(this.outputnodesPosition[o]);
          animPos.sub(this.hiddenSigmoidPosition[h]);
          animPos.mult(2*(animVal-1));
          animPos.add(this.hiddenSigmoidPosition[h]);
          drawCircle(this.weightsHiddenOutput[h][o], animPos, 1);
        }
      }
    }    
  }

  renderNodesConnectionLines()
  {
    function drawLine(pos1,pos2,value,active = 1)
    {
      if(value < 0)
      {
        if(active == 0)
        {
          stroke(200);
        }
        else
        {
          stroke(0,0,255);
        }
        strokeWeight(map(value,0,-10,0.1,5));
      }
      if(value >= 0)
      {
        if(active == 0)
        {
          stroke(200);
        }
        else
        {
          stroke(0);
        }
        strokeWeight(map(value,0,10,0.1,5));
      }
      line(pos1.x, pos1.y, pos2.x, pos2.y);
      stroke(0);
      strokeWeight(2);
    }

    //Draw Lines between Input and Hidden
    for(let i = 0; i < this.inputnodes.length; i++)
      {    
        for(let h = 0; h < this.hiddennodes.length; h++)
        {
          drawLine(this.hiddennodesPosition[h], 
            this.inputnodesPosition[i],
            this.weightsInputHidden[i][h],
            this.inputnodes[i]);
        }
      }
    // Draw Lines between hiddennodes and hiddenSigmoidNodes
    for(let h = 0; h < this.hiddennodes.length; h++)  
    {  
      drawLine(this.hiddennodesPosition[h],this.hiddenSigmoidPosition[h]);
    }

    //Draw Lines between Hidden and Output
    for(let h = 0; h < this.hiddennodes.length; h++)  
    {
      for(let o = 0; o < this.outputnodes.length; o++)
      {  
      drawLine(this.hiddenSigmoidPosition[h],
                this.outputnodesPosition[o],
                this.weightsHiddenOutput[h][o]);
      }
    }
    // Draw Lines between outputnodes and outputSigmoidNodes
    for(let o = 0; o < this.outputnodes.length; o++)
    {
      drawLine(this.outputSigmoidPosition[o],this.outputnodesPosition[o]);
    }
  }

  renderNeurons()
  {
    let circleRadius = this.neuronRenderSize;
    let sandwichNet = this;

    function drawNeuron(pos,r,value,active = 1)
    {
      if(active == 0)
      {
        stroke(230);
      }
      else
      {
        stroke(0);
      }
      push();
      translate(pos.x,pos.y);
      strokeWeight(4);
      fill(255);
      circle(0,0,r);
      fill(0);
      noStroke();
      textAlign(CENTER);
      textStyle(BOLD);
      textSize(18);
      text(value.toFixed(2),0,6);
      textSize(16);
      pop();
    }

    this.loopThrough("Input", function(i)
      {
        drawNeuron(sandwichNet.inputnodesPosition[i], circleRadius, sandwichNet.inputnodes[i], sandwichNet.inputnodes[i]); 
      }
    );
    this.loopThrough("Hidden", function(h)
      {
        //Draw Hidden Neurons as Circle and Value
        drawNeuron(sandwichNet.hiddennodesPosition[h], circleRadius, sandwichNet.hiddennodes[h], sandwichNet.hiddennodes[h]);
        drawNeuron(sandwichNet.hiddenSigmoidPosition[h], circleRadius,sandwichNet.hiddenSigmoid[h], sandwichNet.hiddenSigmoid[h]);
      }
    );
    this.loopThrough("Output",function(o)
      {
        drawNeuron(sandwichNet.outputnodesPosition[o], circleRadius, sandwichNet.outputnodes[o], sandwichNet.outputnodes[o]);
        drawNeuron(sandwichNet.outputSigmoidPosition[o], circleRadius,sandwichNet.outputSigmoid[o], sandwichNet.outputSigmoid[o]);
      }
    );

  }

  renderWeights()
  {
    let sandwichNet = this;
    let rectangleWidth = 40;
    let rectangleHeight = 30;
    function drawWeights(pos,w,h,value)
    {
      push();
      textAlign(CENTER);
      strokeWeight(2);
      stroke(0);  
      translate(pos.x, pos.y);
      //rectMode(CENTER);
      fill(255);
      rect(-w/2,-h/2,w,h);
      rect(w/2,-h/2,20,h,0,h,h,0);
      rect(-w/2-20,-h/2,20,h,h,0,0,h);
      fill(0);
      noStroke();
      textSize(14);
      text(value.toFixed(2),0,5);
      text("–",-(w/2 + 10),5);
      text("+",w/2+10,5);
      pop();
    }
    this.loopThrough("InputHidden", function(i,h)
      {
        drawWeights(sandwichNet.weightsInputHiddenPosition[i][h], rectangleWidth, rectangleHeight, sandwichNet.weightsInputHidden[i][h]);     
      }
    );
    this.loopThrough("HiddenOutput",function(h,o)
      {
        drawWeights(sandwichNet.weightsHiddenOutputPosition[h][o], rectangleWidth, rectangleHeight, sandwichNet.weightsHiddenOutput[h][o]);
      }
    );

  }

  renderSandwichIngredients(ingrediensList)
  {
    let ingredients = ingrediensList;
    function drawSandwichIngredient(pos,i)
    {
      let sandwichNet = this;
      //let ingredient = ["Käse","Eierschalen","Matsch","Hühnchen","Erdnusbutter","Marmelade","Dünger","Grobe Mettwurst","Tonscherben","Majo","Salat",""]
      push();
      textAlign(RIGHT);
      noStroke();
      translate(pos.x,pos.y);
      textSize(18);
      text(ingredients[i],-50,6);
      pop();
    }
    this.loopThrough("Input", function(i)
      {
        drawSandwichIngredient(sandwichNet.inputnodesPosition[i],i);
      }
    );    
  }

  renderTasteOMeter()
  {
    let sandwichNet = this;
    this.loopThrough("Output", function(o)
      {
        if(sandwichNet.sigmoidOutputGraph[o].isActive)
        {
          let newTasteOMeterPos = createVector(0,0);
          newTasteOMeterPos.add(sandwichNet.outputnodesPosition[o]);
          newTasteOMeterPos.add(sandwichNet.outputSigmoidPosition[o]);
          newTasteOMeterPos.mult(0.5);
          sandwichNet.tasteOMeter[o].update(sandwichNet.outputSigmoid[o]);
          sandwichNet.tasteOMeter[o].render(newTasteOMeterPos, sandwichNet.outputSigmoid[o]);
        }
        else
        {
          sandwichNet.tasteOMeter[o].update(sandwichNet.outputSigmoid[o]);
          sandwichNet.tasteOMeter[o].render(sandwichNet.outputSigmoidPosition[o], sandwichNet.outputSigmoid[o]);
        }
        
      }
    );
  }

  renderSigmoidGraph()
  {
    let sandwichNet = this;
    
    this.loopThrough("Hidden", function(h)
      {
        sandwichNet.sigmoidHiddenGraph[h].update(sandwichNet.hiddennodes[h]);
        let graphPos = createVector(0,0);
        graphPos.add(sandwichNet.hiddennodesPosition[h]);
        graphPos.add(sandwichNet.hiddenSigmoidPosition[h]);
        graphPos.mult(0.5);
        sandwichNet.sigmoidHiddenGraph[h].isClicked(graphPos,translatedMouseX,translatedMouseY);
        sandwichNet.sigmoidHiddenGraph[h].render(graphPos);
      }
    );
    this.loopThrough("Output", function(o)
      {
        sandwichNet.sigmoidOutputGraph[o].update(sandwichNet.outputnodes[o]);
        let graphPos = createVector(0,0);
        graphPos.add(sandwichNet.outputnodesPosition[o]);
        graphPos.add(sandwichNet.outputSigmoidPosition[o]);
        graphPos.mult(0.5);
        sandwichNet.sigmoidOutputGraph[o].isClicked(graphPos,translatedMouseX,translatedMouseY);
        sandwichNet.sigmoidOutputGraph[o].render(graphPos);
      }
    );
  }

}