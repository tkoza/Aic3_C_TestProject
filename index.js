var MARGIN = 100;
var NUM_CIRCLE = 50;
var RADIUS = 30;
var PADDING = 50;

var width;
var height;
var context;
var mouxeX;
var mouseY;
var start;
var func;

window.onload = function()
{
  var canvas = document.getElementById('myCanvas');
  if (! canvas || ! canvas.getContext ) {return false;}
  else
  {
    width = canvas.width;
    height = canvas.height;
    context = canvas.getContext('2d');

    // 背景を黒にする。
    context.beginPath();
    context.fillStyle = "#000000";  
    context.fillRect(0,0,width, height);

    // circleの初期化
    var prev = new Circle(((width-PADDING*2)*Math.random() + PADDING)|0, ((height-PADDING*2)*Math.random() + PADDING)|0);
    start = prev;
    var i = 0;
    var c;
    while(++i <=  NUM_CIRCLE)
    {
      c = new Circle((width*Math.random())|0, (height*Math.random())|0);
      prev.next=c;
      prev=c;
    }
    
    // マウス座標を取得する準備
    mouseX = mouseY = 0;
    canvas.onmousemove = function(e){
      var stageW =  document.documentElement.clientWidth;
      if(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
      }
      else {
        mouseX = event.x + document.body.scrollLeft;
        mouseY = event.y + document.body.scrollTop;
      }
    };

    // レンダリング開始
    func = setInterval("onFrame()", 30);
  }
}

function onFrame()
{
  context.globalCompositeOperation = "source-over";
  context.beginPath();
  context.fillStyle = "rgba(0,0,0,1)";  
  context.fillRect(0,0,width, height);
  context.globalCompositeOperation = "lighter";

  // 各circleの座標更新
  var c = start;
  while(true)
  {
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    c.update(mouseX, mouseY);  
    c = c.next;
    if(c == null) break;
  }
}

var Circle = function(x, y)
{
  this.fx = x;
  this.fy = y;
  this.x = x;
  this.y = y;
  this.next = null;
  
  this.cR = 255* Math.random() | 0;
  this.cG = 255;
  this.cB = 255* Math.random() | 0;
}

Circle.prototype.update = function(mX, mY)
{
  var theta = Math.atan2(this.y - mY, this.x - mX);
  var d = 1000 / Math.sqrt((mX - this.x)*(mX - this.x) + (mY - this.y)*(mY - this.y));
  
  this.x += d * Math.cos(theta) + (this.fx - this.x) * 0.1;
  this.y += d * Math.sin(theta) + (this.fy - this.y) * 0.1;
  
  var edgecolor1 = "rgba(" +  this.cR + "," + this.cG + "," + this.cB + ",0.93)";
  var edgecolor2 = "rgba(" +  this.cR + "," + this.cG + "," + this.cB + ",0.6)";
  var edgecolor3 = "rgba(" +  this.cR + "," + this.cG + "," + this.cB + ",0.1)";
  var edgecolor4 = "rgba(" +  this.cR + "," + this.cG + "," + this.cB + ",0)";
  var gradblur = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, RADIUS);
  gradblur.addColorStop(0,edgecolor1);
  gradblur.addColorStop(0.4,edgecolor1);
  gradblur.addColorStop(0.7,edgecolor2);
  gradblur.addColorStop(0.9,edgecolor3);
  gradblur.addColorStop(1,edgecolor4);
  
  context.beginPath();
  context.fillStyle = gradblur;
  context.arc(this.x, this.y, RADIUS, 0, Math.PI*2, false);
  context.fill();
}