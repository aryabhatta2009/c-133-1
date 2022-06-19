img="";
status="";
objects=[];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
canvas=createCanvas(640,420);
canvas.center();
object_detect=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status:Detecting objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    object_detect.detect(img,gotResult);
}
function gotResult(error,results){
 if(error){
    console.log(error);
 }
 else{
     console.log(results);
     objects=results;
 }
}
function draw(){
    image(img,0,0,640,420);
    if(status!=""){
       for(i=0; i<objects.length; i++)
       {
           document.getElementById("status").innerHTML="Status object detected";
           fill("aqua");
           percent=floor(objects[i].confidence*100);
           text(objects[i].label +" "+percent+"%", objects[i].x, objects[i].y);
           noFill();
           stroke("black");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}