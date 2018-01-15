
function displayCoords (event) {
  console.log('X: ' + event.clientX + ', Y ' + event.clientY);
}

document.addEventListener('click', displayCoords)
