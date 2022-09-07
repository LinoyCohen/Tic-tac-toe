const game = {
  xStart: true,
  xIndexes: [],
  oIndexes: [],
  winningSituations: [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ]
}

let scoreSumX = 0
let scoreSumO = 0

if (!localStorage.getItem('scoreSumX')) { // Initialize players scores
  localStorage.setItem("scoreSumX", scoreSumX)
  localStorage.setItem("scoreSumO", scoreSumO)
}
