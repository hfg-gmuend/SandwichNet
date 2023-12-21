let debugging = false;

function debug(v)
{
  if(debugging == true)
    {
      console.log(v);
    }
}

function getRandomInt(max) 
{
  return Math.round((Math.random() * 2 * max) - max);
}
function getRandomTestInput() 
{
  return Math.round((Math.random()));
}

function create_1d_array(rows) 
{
  let array_1d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_1d[i] = 0;
  }
  return array_1d;
}

function create_1d_classArray(rows, Val) 
{
  let array_1d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_1d[i] = new Val();
  }
  return array_1d;
}

function create_2d_array(rows, columns) 
{
  let array_2d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_2d[i] = new Array(columns);
    for(let j = 0; j < columns; j++) 
    {
      array_2d[i][j] = getRandomInt(3)+0.5;
    }  
  }
  return array_2d;
}

function create_2d_boolArray(rows, columns) 
{
  let array_2d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_2d[i] = new Array(columns);
    for(let j = 0; j < columns; j++) 
    {
      array_2d[i][j] = false;
    }  
  }
  return array_2d;
}

function create_1d_vectorArray(rows) 
{
  let array_1d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_1d[i] = createVector(0,0);
  }
  return array_1d;
}

function create_2d_vectorArray(rows, columns) 
{
  let array_2d = new Array(rows);
  for(let i = 0; i < rows; i++) 
  {
    array_2d[i] = new Array(columns);
    for(let j = 0; j < columns; j++) 
    {
      array_2d[i][j] = createVector(0,0);
    }  
  }
  return array_2d;
}