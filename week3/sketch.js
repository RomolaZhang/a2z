const apiKey = [
  "AIzaSyCGjsbbjtxUAMcgyehRvWZ7ndCj_1tVqw0",
  "AIzaSyDWqd65ZLxy0S1_51T4HHBgbN_-zEREZRQ"
];
const poem =
  "Do not go gentle into that good night, *\
Old age should burn and rave at close of day;  *\
Rage, rage against the dying of the light. * \
Though wise men at their end know dark is right,  *\
Because their words had forked no lightning they  *\
Do not go gentle into that good night. * \
Good men, the last wave by, crying how bright  *\
Their frail deeds might have danced in a green bay,  *\
Rage, rage against the dying of the light. *\
Wild men who caught and sang the sun in flight, *\
And learn, too late, they grieved it on its way, *\
Do not go gentle into that good night. *\
Grave men, near death, who see with blinding sight *\
Blind eyes could blaze like meteors and be gay, *\
Rage, rage against the dying of the light. *\
And you, my father, there on the sad height,*\
Curse, bless, me now with your fierce tears, I pray. *\
Do not go gentle into that good night. *\
Rage, rage against the dying of the light.";

let arr = [];
let lines = [];
let button;
let content;
let container;
let languages = [];
let lans = [];
let tranlans = [];

function setup() {
  noCanvas();
  tranlans.push("en");
  languages = [
    "arabic",
    "bulgarian",
    "chinese",
    "czech",
    "danish",
    "dutch",
    "english",
    "french",
    "german",
    "italian",
    "japanese",
    "korean",
    "latin",
    "spanish",
    "swedish",
    "portuguese",
    "russian",
    "norwegian",
    "thai",
    "turkish",
    "hindi"
  ];

  lans = [
    "ar",
    "bg",
    "zh",
    "cs",
    "da",
    "nl",
    "en",
    "fr",
    "de",
    "it",
    "ja",
    "ko",
    "la",
    "es",
    "sw",
    "pt",
    "ru",
    "no",
    "th",
    "tr",
    "hi"
  ];

  button = select("#recreate");
  button.mousePressed(transAll);
  content = select("#content");
  container = select("#lans");

  const clearButton = select("#clearButton");
  clearButton.mousePressed(clearAll);

  arr = poem.split("*");
  for (let i = 0; i < arr.length; i++) {
    const line = createP(arr[i]);
    line.parent(content);
    lines.push(line);
  }
}

function clearAll() {
  tranlans = ["en"];
  console.log(container);
  while (container.elt.children[0]) {
    container.elt.children[0].remove();
  }
}

function transAll() {
  if (tranlans.length > 1) {
    let copy = tranlans.slice();
    copy.push("en");
    console.log(copy);
    for (let i = 0; i < lines.length; i++) {
      trans(arr[i], copy, 0).then(function(result) {
        lines[i].elt.innerHTML = result;
      });
    }
  }
}

function trans(line, list, i) {
  return fetch(
    "https://translation.googleapis.com/language/translate/v2/?q=" +
      line +
      "&source=" +
      list[i] +
      "&target=" +
      list[i + 1] +
      "&key=" +
      apiKey[int(random(0, 1.9))]
  )
    .then(response => response.json())
    .then(data => {
      const result = data.data.translations[0].translatedText;
      if (i == list.length - 2) {
        return result;
      } else {
        return trans(result, list, i + 1);
      }
    })
    .catch(error => console.error(error));
}

function search(ele) {
  if (event.key === "Enter") {
    const index = languages.indexOf(ele.value.toLowerCase());
    if (index != -1) {
      const r = int(random(100, 250));
      const g = int(random(100, 250));
      const b = int(random(100, 250));
      const color =
        "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
      let newlan = createDiv(languages[index].toUpperCase());
      newlan.class("lan");
      newlan.style("color", color);
      newlan.parent(container);
      tranlans.push(lans[index]);
      let arrow = createElement("i", "");
      arrow.parent(container);
    }
    ele.value = "";
  }
}
