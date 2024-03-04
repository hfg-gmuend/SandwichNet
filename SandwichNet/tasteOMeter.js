class TasteOMeter
{
  constructor()
  {
    this.targetAlpha = 0;
    this.delta = 0;
    this.alpha = 1;
    this.oldAlpha = 1;
    this.testalpha = 0;
    this.easing = 0.05;
    this.value = 0;
    this.pos = createVector(0,0);
    this.buttonPlus = new Button(30,30);
    this.buttonMinus = new Button(30,30);
    this.manualOutputValue = false;
  }
  update(newAplha){
    if(this.manualOutputValue == true)
    {
       this.targetAlpha = this.value;
       this.oldAlpha = newAplha;
    }
    else
    {
      this.targetAlpha = newAplha;
      this.value = this.alpha;
    }
    this.delta = this.targetAlpha - this.alpha;
    this.alpha += this.delta * this.easing;
  }

  render(position)
  {
    this.pos = position;
    if(level == 3){
      let buttonPlusPosition = createVector();
      buttonPlusPosition.add(this.pos);
      buttonPlusPosition.add(-73,-96);
    
      let buttonMinusPosition = createVector();
      buttonMinusPosition.add(this.pos);
      buttonMinusPosition.add(-67,69);
      if(this.buttonPlus.isPressed(buttonPlusPosition) == true)
      {
        this.manualOutputValue = true;
        this.value += 0.02;
        if(this.value >= 1){this.value = 1}
        
      }
      if(this.buttonMinus.isPressed(buttonMinusPosition) == true)
      {
        this.manualOutputValue = true;
        this.value -= 0.02;
        if(this.value <= 0){this.value = 0}
        
      }
    }
    
  push();
    translate(this.pos.x, this.pos.y); // 16
    scale(0.4);
    if(level == 3){
      image(tasteOMeter_3,-275,-275);
    }
    else
    {
      image(tasteOMeter_2,-275,-275);
    }
    
    
        fill(255,0,0,50);
        noStroke();
        if(this.manualOutputValue == true)
        {
          if(this.oldAlpha > this.alpha)
          {
            arc(0, 0, 420, 420, map(this.oldAlpha,0,1,+PI/2,-PI/2), map(this.alpha,0,1,+PI/2,-PI/2),PIE);
          }
          if(this.oldAlpha < this.alpha)
          {
            arc(0, 0, 420, 420, map(this.alpha,0,1,+PI/2,-PI/2), map(this.oldAlpha,0,1,+PI/2,-PI/2), PIE);
          }
          push();
          rotate(map(this.oldAlpha,0,1,+PI/2,-PI/2));
          tint(255, 127);
          image(tasteOMeter_anzeige,-275,-275);
          pop();
        }
        push();
        rotate(map(this.alpha,0,1,+PI/2,-PI/2));
        tint(255, 255);
        image(tasteOMeter_anzeige,-275,-275);
        pop();
    pop();
    //this.buttonPlus.render(buttonPlusPosition);
    //this.buttonMinus.render(buttonMinusPosition);
  }
}