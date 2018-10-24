let lines;
let markov

function preload() {
  lines = loadStrings('names.txt');
}

function setup() {
  noCanvas();
  let generateButton = select('#generate');
  generateButton.mousePressed(generate);

}


function generate() {
  let order = select('#order');

  markov = new MarkovGeneratorWord(2, Math.floor(5+Math.random()*10));

  for (let i = 0; i < lines.length; i++) {
    markov.feed(lines[i]);
  }
  const results = document.getElementById("results");
  results.innerHTML = markov.generate();
}
