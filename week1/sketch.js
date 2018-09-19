let input, button, greeting;
const marks = ["!", ",", ".", "?"];

function setup() {
  noCanvas();
  jumbled = select("#jumbled");
  input = select("#textinput");
  button = select("#submit");

  button.mousePressed(jumble);
}

function jumble() {
  let content = input.value();
  let arr = content.split(" ");
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    let array = arr[i].split("");
    if (array.length < 4) {
      continue;
    } else if (marks.indexOf(array[array.length - 1]) != -1) {
      let copy = array.slice(1, array.length - 2);
      copy = shuffle(copy);
      let final = array
        .slice(0, 1)
        .concat(copy)
        .concat(array.slice(array.length - 2, array.length));
      arr[i] = final.join("");
    } else {
      let copy = array.slice(1, array.length - 1);
      copy = shuffle(copy);
      let final = array
        .slice(0, 1)
        .concat(copy)
        .concat(array.slice(array.length - 1, array.length));
      arr[i] = final.join("");
    }
  }
  content = arr.join(" ");
  console.log(content);
  jumbled.html(content);
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
