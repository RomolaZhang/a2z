
let rnn;
let rnn2;
let button;

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  rnn2 = ml5.charRNN('./data-css/',modelGood);
  rnn = ml5.charRNN('./data/', modelReady);

  // Grab the DOM elements
  button = select('#generate');

  // DOM element events
  button.mousePressed(generate);
}

function modelReady() {
  select('#status').html('HTML Model Loaded');
}

function modelGood(){
  console.log('here');
  select('#status2').html('CSS Model Loaded');
}

// Generate new text
function generate() {
  // Update the status log
  select('#status').html('Generating...');
  select('#status2').html('Generating...');

    let data = {
      seed: '<div class=',
      temperature: 0.5,
      length: 1000
    };

    let data2 = {
      seed: 'body {',
      temperature: 0.5,
      length: 1000
    }

    let firstdone = false;
    let seconddone = false;
    let html;
    let css;

    // Generate text with the lstm
    rnn.generate(data, gotData);

    rnn2.generate(data2, gotData2);

    // When it's done
    function gotData(err, result) {
      firstdone = true;
      select('#status').html('Ready!');
      html = "<div class=" + result.sample;
    }

    function gotData2(err, result){
       seconddone = true;
       select('#status2').html('Ready!');
       css = "body {" + result.sample;
    }


    let interval = setInterval(function(){
       if(firstdone==true&&seconddone==true){
           console.log("here");
           let newWindow = window.open();
           newWindow.document.open();
           newWindow.document.write(html);
           let style = newWindow.document.createElement("style");
           style.innerHTML = css;
           newWindow.document.getElementsByTagName("head")[0].appendChild(style);
           newWindow.document.close();
           clearInterval(interval);
       }
    },1000)
}
