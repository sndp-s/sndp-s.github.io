const greetingElement = document.getElementById("greeting");
const audioEmbedElement = document.getElementById("audio-embed");
greetingElement.addEventListener("click", () => {
  audioEmbedElement.play();
});
