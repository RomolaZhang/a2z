let input, button, greeting;

function setup() {
  noCanvas();
  jumbled = select("#jumbled");
  input = select("#textinput");
  button = select("#submit");

  button.mousePressed(jumble);
}

function jumble() {
  let content = input.value();
  let regex = /(?<=\b\w)\w{2,}(?=\w\b)/g;
  let replaced = content.replace(regex, replacer);
  jumbled.html(replaced);
}

function replacer(whole) {
  let arr = whole.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const b = arr.join("");
  return b;
}
