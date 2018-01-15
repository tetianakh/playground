var display = document.getElementById("display");

function addImage (event) {
  var image = document.createElement("div");
  image.classList.add('image');
  image.style.left = event.clientX - 143 + 'px';
  image.style.top = event.clientY - 198 + 'px';

  display.appendChild(image);
}

document.addEventListener('click', addImage)
