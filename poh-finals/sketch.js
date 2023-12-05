let local_sd_api = "https://gpu.gohai.xyz:3000/";
let img;

function setup() {
  let cnv = createCanvas(400,400);
  cnv.parent("canvasContainer");
  background(0)
  select("#submit").mouseClicked(sendSDMessage);
}

function sendSDMessage() {
  requestLSD(
    "GET",
    "sdapi/v1/options",
    gotOptions
  );
  
  let content = select("#prompt").value()
  
  let modelInput = {
    prompt: content,
    // for more parameters, see the WebUI and results.parameters
  };

  requestLSD(
    "POST",
    "sdapi/v1/txt2img",
    modelInput,
    donePredicting
  );

  console.log("Starting prediction, this might take a bit");
  select("#content").value("");
}

function gotOptions(results) {
  // console.log(results);
  console.log("Using model " + results.sd_model_checkpoint);
  // use WebUI to change settings
}

function donePredicting(results) {
  console.log(results);
  if (results && results.images.length > 0) {
    img = loadImage('data:image/png;base64,' + results.images[0]);
  }
}

function draw() {
  background(220);

  if (img) {
    imageMode(CENTER);
    image(img, width/2, height/2, img.width / 2, img.height / 2);
  }
}
