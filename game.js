document.querySelector('#x').classList.add('highlighted') // PLayer X starts always

document.addEventListener('click', e => {
  const typeOfCell = e.target.classList.contains('grid-cell')
  const disabled = e.target.classList.contains('disabled')

  if (typeOfCell && !disabled) {
    const cellIndex = e.target.dataset.value

    if (game.xStart) {
      game.xIndexes.push(cellIndex)
      localStorage.setItem("xIndexes", JSON.stringify(game.xIndexes))
    } else {
      game.oIndexes.push(cellIndex)
      localStorage.setItem("oIndexes", JSON.stringify(game.oIndexes))
    }

    e.target.classList.add('disabled')
    e.target.classList.add(game.xStart ? 'x' : 'o')

    game.xStart = !game.xStart

    // Add highlight to the current player
    if (game.xStart) {
      document.querySelector('#x').classList.add('highlighted')
      document.querySelector('#o').classList.remove('highlighted')
    } else {
      document.querySelector('#o').classList.add('highlighted')
      document.querySelector('#x').classList.remove('highlighted')
    }

    // Check if all cells are disabled, then its a draw
    if (!document.querySelectorAll('.grid-cell:not(.disabled)').length) {
      document.querySelector('.game-over').classList.add('visible')
      document.querySelector('.game-over-text').textContent = 'It\'\s a Draw!'
    }

    // Check which player wins
    game.winningSituations.forEach(winningState => {
      const xWins = winningState.every(state => game.xIndexes.includes(state))
      const oWins = winningState.every(state => game.oIndexes.includes(state))

      // Calculate the players scores
      if (xWins || oWins) {
        if (xWins) {
          scoreSumX += 1
          document.querySelector('#player1').textContent = scoreSumX
          localStorage.setItem("scoreSumX", scoreSumX)
        }
        if (oWins) {
          scoreSumO += 1
          document.querySelector('#player2').textContent = scoreSumO
          localStorage.setItem("scoreSumO", scoreSumO)
        }

        document.querySelectorAll('.grid-cell').forEach(cell => cell.classList.add('disabled'))
        document.querySelector('#undo').classList.add('invisivible') // Hide the undo button
        document.querySelector('.game-over').classList.add('visible')

        document.querySelector('.game-over-text').textContent = xWins ?
          'X wins!' :
          'O wins!'
      }
    })
  }
})

// Save scores and board state to localStorage
window.addEventListener('load', () => {
  document.querySelector('#player1').textContent = localStorage.getItem('scoreSumX')
  document.querySelector('#player2').textContent = localStorage.getItem('scoreSumO')

  const playerXData = JSON.parse(localStorage.getItem('xIndexes'))
  if (playerXData) { // Check if X player did not play yet
    playerXData.forEach(cell => {
      document.querySelector(`[data-value="${cell}"]`).classList.add('x', 'disabled')
    });
  }

  const playerOData = JSON.parse(localStorage.getItem('oIndexes'))
  if (playerOData) { // Check if O player did not play yet
    playerOData.forEach(cell => {
      document.querySelector(`[data-value="${cell}"]`).classList.add('o', 'disabled')
    });
  }
});

// Happaned when the player click on start over button
document.getElementsByClassName('reset-btn')[0].addEventListener('click', () => {
  document.querySelector('#x').classList.add('highlighted')
  document.querySelector('#o').classList.remove('highlighted')
  document.querySelector('#player1').textContent = 0
  document.querySelector('#player2').textContent = 0
  scoreSumX = 0
  scoreSumO = 0
  localStorage.setItem("scoreSumX", scoreSumX)
  localStorage.setItem("scoreSumO", scoreSumO)

  game.xStart = true
  game.xIndexes = []
  game.oIndexes = []

  localStorage.setItem("xIndexes", JSON.stringify(game.xIndexes))
  localStorage.setItem("oIndexes", JSON.stringify(game.oIndexes))

  // Clean the board game
  document.querySelector('.game-over').classList.remove('visible')
  document.querySelectorAll('.grid-cell').forEach(cell => {
    cell.classList.remove('disabled', 'x', 'o')
  })
})

// Undo the last steps to the beggining of the turn
document.getElementsByClassName('undo-btn')[0].addEventListener('click', (event) => {

  if (game.xIndexes.length > game.oIndexes.length) {
    lastIndexOfX = game.xIndexes.pop()
    document.querySelector(`[data-value="${lastIndexOfX}"]`).classList.remove('x', 'disabled')
    localStorage.setItem("xIndexes", JSON.stringify(game.xIndexes))

    document.querySelector('#o').classList.remove('highlighted')
    document.querySelector('#x').classList.add('highlighted')

  } else if (game.xIndexes.length == game.oIndexes.length) {

    lastIndexOfO = game.oIndexes.pop()
    document.querySelector(`[data-value="${lastIndexOfO}"]`).classList.remove('o', 'disabled')
    localStorage.setItem("oIndexes", JSON.stringify(game.oIndexes))

    document.querySelector('#o').classList.add('highlighted')
    document.querySelector('#x').classList.remove('highlighted')
  }

});

// Happaned when the player click on restart button
document.querySelector('.restart').addEventListener('click', () => {
  document.querySelector('#x').classList.add('highlighted')
  document.querySelector('#o').classList.remove('highlighted')
  document.querySelector('#undo').classList.remove('invisivible') // Unhide the undo button

  document.querySelector('.game-over').classList.remove('visible')
  document.querySelectorAll('.grid-cell').forEach(cell => {
    cell.classList.remove('disabled', 'x', 'o')
  })

  // Reset the board to a new game round
  game.xStart = true
  game.xIndexes = []
  game.oIndexes = []
  localStorage.setItem("xIndexes", JSON.stringify(game.xIndexes))
  localStorage.setItem("oIndexes", JSON.stringify(game.oIndexes))
})
