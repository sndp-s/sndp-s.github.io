const greetingElement = document.getElementById("header__greeting");
const audioEmbedElement = document.getElementById("header__audio-embed");

const aboutElement = document.getElementById("nav-bar__about");
const contactElement = document.getElementById("nav-bar__contact");
const etcElement = document.getElementById("nav-bar__etc");






greetingElement.addEventListener("click", () => {
  audioEmbedElement.play();
});


aboutElement.addEventListener("click", () => {
  console.log("about");
});
contactElement.addEventListener("click", () => {
  console.log("contacts");
});
etcElement.addEventListener("click", () => {
  console.log("etc");
});
