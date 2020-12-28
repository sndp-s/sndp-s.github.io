const greetingElement = document.getElementById("header__greeting");
const audioEmbedElement = document.getElementById("header__audio-embed");
greetingElement.addEventListener("click", () => {
  audioEmbedElement.play();
});
