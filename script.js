const INITIIAL_WIDTH = 8


function fillSketchArea(gridWidth) {

    sketchArea.innerHTML = '';

    //making sure cells will be a perfect square
    gridWidth = gridWidth ** 2

    for (let i = 0; i < gridWidth; i++) {

        let cell = document.createElement('div');
        cell.style.flexBasis = (100 / Math.sqrt(gridWidth)) + "%"
        cell.classList.add('cell')
        
        //prevent default drag behavior
        cell.setAttribute('onmousedown', "event.preventDefault ? event.preventDefault() : event.returnValue = false")
        
        //fillCell will either draw or erase bases on which mouse button is pressed
        cell.addEventListener('mouseover', (e) => fillCellOnDrag(e))

        // left click, right click => draw, erase
        cell.addEventListener('click', (e) => fillCellOnClick(e))
        cell.addEventListener('contextmenu', (e) => e.target.style.backgroundColor = '')
       
        sketchArea.appendChild(cell)
    }

}

function fillCellOnDrag(e) {
    let fillColor = randomColorsButton.classList.contains('rainbow-button') ? '#' + Math.floor(Math.random()*16777215).toString(16) : colorInput.value
    if(e.buttons === 1) e.target.style.backgroundColor = fillColor;
    if (e.buttons === 2) e.target.style.backgroundColor = '';
}

function fillCellOnClick(e) {
    let fillColor = randomColorsButton.classList.contains('rainbow-button') ? '#' + Math.floor(Math.random()*16777215).toString(16) : colorInput.value
    e.target.style.backgroundColor = fillColor;
}


function clearGrid() {
    let gridCells = document.querySelectorAll('.cell')
    gridCells.forEach(cell => cell.style.backgroundColor = '')
}




// DOM Elements
const sketchArea = document.querySelector('#sketch-area');
const slider = document.querySelector('input[type="range"')
const colorPickerDiv = document.querySelector('#color-picker-div');
const colorInput = document.querySelector('#color-input');
const clearButton = document.querySelector('#clear-grid-button')
const randomColorsButton = document.querySelector('#random-colors-button')


//event listerns
colorInput.onchange = (e) => colorPickerDiv.style.backgroundColor = e.target.value;
slider.onchange = (e) => fillSketchArea(e.target.value)
clearButton.onclick = (e) => clearGrid()
randomColorsButton.onclick = (e) => e.target.classList.toggle('rainbow-button')

// Initial Setup
fillSketchArea(INITIIAL_WIDTH)

