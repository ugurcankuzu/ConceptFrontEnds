var bg = document.getElementById('bg');
var x = document.getElementById('x');
var y = document.getElementById('y');
var spread = document.getElementById('spread');
var color = document.getElementById('color');
var box = document.getElementById('box');
var text = document.getElementById('text');

var bgVal,xVal,yVal,sprVal,colVal,res;




setInterval(()=>{
    bgVal = bg.value;
    xVal = x.value;
    yVal = y.value;
    sprVal = spread.value;
    colVal = color.value;

    box.style.backgroundColor = bgVal;
    box.style.boxShadow = `${xVal}px ${yVal}px ${sprVal}px ${colVal}`;
    text.innerHTML = `
        box-shadow: ${xVal}px ${yVal}px ${sprVal}px ${colVal};
    `
})

