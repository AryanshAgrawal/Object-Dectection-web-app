img = "";
status = "";
objects = [];
function preload() {
    img = loadImage('dog_cat.jpg');
}
function setup() {
    canvas = createCanvas(600, 400);
    canvas.position(330, 120);
    objectDectector = ml5.objectDetector('cocossd', modalloaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";

}
function draw() {
    image(img, 0, 0, 600, 400);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill("purple");
            document.getElementById("status").innerHTML="Status: Object detected";
            var percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("brown");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
           }
        }
    }

function modalloaded() {
    console.log("modalloaded");
    status = true;
    objectDectector.detect(img, gotresult);
}
function gotresult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        console.log("length of array:" + results.length);
        objects = results;
    }
}
