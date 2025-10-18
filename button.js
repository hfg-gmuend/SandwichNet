class Button
{
  constructor(w,h)
  {
    this.buttonWidth = w;
    this.buttonHeight = h;
    this.buttonPos = createVector();
  }
  isPressed(position)
  {
    if(mouseIsPressed === true)
    {    
      this.buttonPos = position;
      if( (translatedMouseX >= this.buttonPos.x) && 
          (translatedMouseX <= this.buttonPos.x + this.buttonWidth) && 
          (translatedMouseY >= this.buttonPos.y) && 
          (translatedMouseY <= this.buttonPos.y + this.buttonHeight) 
        )
      {
        return true;
      }else{
        return false;
      }
    }
  }
  render(position)
  {
    this.buttonPos = position;
    push();  
    translate(this.buttonPos.x,this.buttonPos.y);
    rectMode(CORNER);
    fill(255);
    stroke(2);
    rect(0,0,this.buttonWidth,this.buttonWidth)
    pop();
  }
}