const apiKey = "AIzaSyCGjsbbjtxUAMcgyehRvWZ7ndCj_1tVqw0";
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
let colors = [];
let tranlans = [];

function setup() {
  noCanvas();
  tranlans.push("en");
  colors = ["#ffcdcd", "#23a393", "#f1c550", "#ea4c4c", "#774898"];
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
    "norwegian"
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
    "no"
  ];

  button = select("#button");
  button.mousePressed(transAll);
  content = select("#content");
  container = select("#container");
  arr = poem.split("*");
  for (let i = 0; i < arr.length; i++) {
    const line = createP(arr[i]);
    line.parent(content);
    lines.push(line);
  }
}

function transAll() {
  tranlans.push("en");
  for (let i = 0; i < lines.length; i++) {
    trans(arr[i], 0).then(function(result) {
      lines[i].elt.innerHTML = result;
    });
  }
}

function trans(line, i) {
  return fetch(
    "https://translation.googleapis.com/language/translate/v2/?q=" +
      line +
      "&source=" +
      tranlans[i] +
      "&target=" +
      tranlans[i + 1] +
      "&key=" +
      apiKey
  )
    .then(response => response.json())
    .then(data => {
      const result = data.data.translations[0].translatedText;
      if (i == tranlans.length - 2) {
        return result;
      } else {
        return trans(result, i + 1);
      }
    })
    .catch(error => console.error(error));
}

function search(ele) {
  if (event.key === "Enter") {
    const index = languages.indexOf(ele.value.toLowerCase());
    if (index != -1) {
      let newlan = createElement("div", languages[index].toUpperCase());
      newlan.class("lan");
      newlan.style("color", colors[int(random(0, 5))]);
      newlan.parent(container);
      tranlans.push(lans[index]);
    }
    ele.value = "";
  }
}
