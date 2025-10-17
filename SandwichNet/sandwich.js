class Sandwich
{
  constructor(inputNeuronsSize, ingredientsList)
  {
    this.position = createVector(width/2, height-130);
    this.velocity = createVector(random(-5,5),-random(15,25)); // 
    this.gravity = createVector(0,0.4);
    this.groundPosition = random(20,250); // 0,250
    if(this.groundPosition > 60 && this.groundPosition < 160)
    {
      if(this.velocity.x > -0.8 && this.velocity.x < 0.8)
      {
        if(this.velocity.x < 0)
        {
          this.velocity.x += -0.8;
        }
        if(this.velocity.x > 0)
        {
          this.velocity.x += 0.8;
        }
        console.log("add a bit more");
        console.log(this.velocity.x);
      }
    }
    this.taste = [];
    this.alpha = 0;
    this.dezimalPositon = 0;
    this.ingrediensText = "";
    this.ingredientsList = ingredientsList;
    this.alphaRotaionSpeed = random(-0.2,0.2);
    this.hasLandedOnPortal = false;
    this.sandwichHasLanded = false;
    for(let i = 0; i < inputNeuronsSize; i++)
    {
      let rnd = int(random(0,2));
      this.taste.push( rnd );
      if(rnd == 1)
      {
        this.ingrediensText += this.ingredientsList[i];
      }
    }
    for(let i = this.taste.length-1; i > -1; i--)
    {
      this.dezimalPositon += this.taste[i] * Math.pow(2,i);
    }
    this.ingrediensText +="Sandwich";
    this.sandwich_image_number = int(random(0,4));
  }
  renderIngrediens()
  {
    push();
      translate(this.position.x, this.position.y);
      
      //let txtWidth = textWidth(this.ingrediensText);
      let txtWidth = this.ingrediensText.length*9;
      //print(w);
      //print(this.ingrediensText.length)
      let offsetY = 80;
      
      push();
        translate(-50,-offsetY);
        scale(0.25);
        image(ingredientsArrow,0,-10);
      pop();

      rectMode(CENTER);
      textAlign(CENTER);
      stroke(0);
      strokeWeight(3);
      fill(255,255,255);
      rect(-15,-offsetY-5,txtWidth+40,20+10,4);
      //rect(-15,-offsetY-5,txtWidth*1.4+20,20+10,4);
      
      fill(0);
      noStroke();
      textSize(16);
      textStyle(BOLD);
      text(this.ingrediensText,-15,-offsetY);
    pop();
  }
  render()
  {
    //circle(this.position.x, this.position.y, 50);
    this.alpha += this.alphaRotaionSpeed;
    
    push();
    translate(this.position.x, this.position.y);
    if(this.sandwichHasLanded)
    { 
      noStroke();
      fill(0,0,0,15)
      ellipse(0,20,80,40);
    }
    rotate(this.alpha);
    //let s = ( this.position.y / (height)) * 0.3 ;
    //let s = Math.pow(1.002,(this.position.y)) * 0.1 ;
    scale(0.5);
    translate(-75,-75);
    image(sandwich_image[this.sandwich_image_number],0,0);  
    pop();
  }
  pysics()
  {
    
    if(this.position.y >= height-this.groundPosition && this.velocity.y > 0)
    {
      this.velocity.set(0,0);
      this.alphaRotaionSpeed = 0;
      this.sandwichHasLanded = true;
      if(this.position.x < w/2 + 75 && this.position.x > w/2 - 75 && this.position.y < h-100 + 20 && this.position.y > h-100 - 20 )
      {
        this.hasLandedOnPortal = true;
      }
    }
    else
    {
      this.position.add(this.velocity);
      this.velocity.add(this.gravity);
    }
  }
  
}