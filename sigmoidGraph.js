class SigmoidGraph
{
  
  constructor(){
    this.pos = createVector(0,0);
    this.d = 135;
    this.input;
    this.inputForTextfield;
    this.sclX = this.d/22;
    this.sclY = -this.d/2.5;
    this.y = [];
    this.scl = 0;
    this.isActive = false;
    this.animation = false;
    this.mouseWasPressedBefor = false;

    for(let x = -11; x <= 11; x++)
    {
      this.y[x]=this.sigmoid(x);
    }
  }
  
  sigmoid(x)
  {
    return 1/(1+(Math.exp(-x)));
  }
  relu(x)
  {
    if(x >= 0)
    {
      return x;
    }
    if(x < 0)
    {
      return 0;
    }
  }
  
// && this.mouseIsReleased == true

  isClicked(position,tMouseX,tMouseY)
  {
    if(mouseIsPressed == true && this.mouseWasPressedBefor == false)
    {
      let rad;
      if(this.isActive == true)
      {
        rad = 80;
      }
      if(this.isActive == false)
      {
        rad = 15;
      }

      if(dist(position.x, position.y, tMouseX, tMouseY) < rad)
      {
        this.isActive = !this.isActive;
      }
      this.mouseWasPressedBefor = true;
    }

    if(mouseIsPressed == false && this.mouseWasPressedBefor == true)
    {
        this.mouseWasPressedBefor = false;
    }
  }

  update(value)
  {
    this.input = value;
    this.inputForTextfield = value;
    if(this.input > 10){
      this.input = 10;
    }
    if(this.input < -10){
      this.input = -10;
    }
  }
  
  render(position)
  { 
    rectMode(CORNER);
    textAlign(LEFT);
    push();
      this.pos = position;
      fill(255);
      stroke(0);
      strokeWeight(5);

      translate(this.pos.x,this.pos.y)

      push();
        scale(this.scl);
        circle(0,0,this.d);
        fill(0);
        // draw Graphlines
        stroke(0,0,255);
        strokeWeight(1);

        push();
          translate(0, 0-(this.sclY/2));
          line(-this.d/2.2,0,this.d/2.2,0);
          for(let i = -1; i < 1; i+=0.1)
          {
            line((this.d/2.2)*i,2,(this.d/2.2)*i,-2);
          }
          translate(0,(this.sclY/2));
          line(0,-this.d/2,0,this.d/2);
          for(let i = -2; i <= 2; i+=0.5)
          {
            line(-2,(this.sclY/2)*i,2,(this.sclY/2)*i);
          }
        pop();

        // Draw Sigmoidfunction as curve
        stroke(0);
        strokeWeight(2);
    
        for(let x = -10; x < 10; x++)
          {
            push();
              translate(0, 0-(this.sclY/2));
              //point(10*x,-60*y[x]);
              curve(this.sclX*(x-1),this.sclY*this.y[x-1],this.sclX*x,this.sclY*this.y[x],this.sclX*(x+1),this.sclY*this.y[x+1],this.sclX*(x+2),this.sclY*this.y[x+2]);
            pop();
          }

        push();
          translate(0,0-(this.sclY/2));

          stroke(0,0,255);
          strokeWeight(1);
          
          line(0,this.sclY*this.sigmoid(this.input),this.sclX*this.input,this.sclY*this.sigmoid(this.input));
          line(this.sclX*this.input, 0, this.sclX*this.input, this.sclY*this.sigmoid(this.input));
          
          noStroke();
          textSize(16);
          fill(255,255,255);
          let h = 15
          let w = 32;
        
          // draw Y Value
          push();
            if(this.sigmoid(this.input) > 0.5)
            {
              translate(-38,5);
            }
            else
            {
              translate(+8,5);
            }
            rect(0,this.sclY*this.sigmoid(this.input)-(h/2)-4,w,h, 3);
            fill(0);
            text(this.sigmoid(this.inputForTextfield).toFixed(2), -1,this.sclY*this.sigmoid(this.input));
          pop();
          // draw X Value
          push();
            translate(0,20);
            fill(255,255,255);
            rect(this.sclX*this.input-w/2,-(h/2)-4,w,h, 3);
            fill(0);
            text(this.inputForTextfield.toFixed(2),this.sclX*this.input -w/2,0);
          pop();
          stroke(0);
          strokeWeight(10);
    
          point(this.sclX*this.input,this.sclY*this.sigmoid(this.input));
        pop();
      pop();  


      if(this.isActive == false)
      {
        if(this.scl > 0)
        {
          this.scl -= 0.1;
        }
        else
        {
          stroke(0);
          strokeWeight(3);
          circle(0,0,12);
        }
      }
      if(this.isActive == true)
      {
        if(this.scl < 1)
        {
          this.scl += 0.1;
        }
      } 
    pop();
  }
  
}