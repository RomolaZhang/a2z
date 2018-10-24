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

  markov = new MarkovGenerator(3, Math.floor(15+Math.random()*10));

  for (let i = 0; i < lines.length; i++) {
    markov.feed(lines[i]);
  }
  const results = document.getElementById("results");
  results.innerHTML = markov.generate();

  // results.value(markov.generate());
  console.log(markov.generate());
}
