class ErrorGraph
{
    constructor(w,h)
    {
        this.numPoints = [1,0.5,0.2];
        this.h = h;
        this.w = w;
    }

    update(newNumber)
    {
        this.numPoints.push(newNumber);
    }

    render()
    {
      stroke(0);
      strokeWeight(2);
      // draw ellipses
      line(0,1,this.w,1);
      line(0,this.h,this.w,this.h);
      if(this.numPoints.length != 0)
      {
        for(let i = 0; i < this.numPoints.length; i++)
        {
          let x = i * (this.w / (this.numPoints.length-1));
          let y = map(this.numPoints[i],0,1,0,this.w);
          fill(0);
          ellipse(x, y, 7);
        }
        stroke(0);
        // draw lines
        let px = 0;
        let py = randomY[0];
        for(let i =0; i < this.numPoints.length; i++)
        {
            let x = i * (width / (this.numPoints.length-1));
            let y = randomY[i];
            line(px, py, x, y);
            
            //store the last position
            px = x;
            py = y;
        } 
      }
      
    }

}