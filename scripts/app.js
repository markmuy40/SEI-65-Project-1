function init() {

  // ! DOM Elements =======================================================================
  const start = document.querySelector('.play')
  const reset = document.querySelector('.reset')
  const scoreDisplay = document.querySelector('.showscore')
  const livesDisplay = document.querySelector('.showlives')

  const grid = document.querySelector('.grid')
  const audio1 = document.querySelector('.audio1')
  const audio2 = document.querySelector('.audio2')
  const audio3 = document.querySelector('.audio3')
  const audio4 = document.querySelector('.audio4')
  const audio5 = document.querySelector('.audio5')

  
  // ! Global variables ====================================================================

  // ! grid variables
  const width = 10
  const cellCount = width * width
  const cells = [] 
  
  // ! score variables
  let score = 0
  let lives = 3
  scoreDisplay.innerHTML = score
  livesDisplay.innerHTML = '❤️'.repeat(lives)
  
  // ! player variables
  const playerClass = 'player' 
  const startPosition = 94
  console.log(startPosition)
  let currentPosition = startPosition
  

  // ! firing variables
  const shotClass = 'shot'
  const hitClass = 'blood'
  

  // ! Zombie variables
  let zombies = [1,2,3,4,5,6,7,8,11,12,13,14,15,16,17,18,21,22,23,24,25,26,27,28]  
  const zombieClass = 'zombie'
  const biteClass = 'bite'
  let zombieTimer
  let bombTimer1

  // ! bomb variables
  const bombClass = 'bomb'
  
  // ! make the grid  =======================================================================
  function makeGrid(){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  makeGrid()

  //! player functions ======================================================================

  // ! add player
  function addPlayer(position){
    cells[position].classList.add(playerClass)
  }

  // ! remove player
  function removePlayer(position){
    cells[position].classList.remove(playerClass)
  }
  
  // ! player movement
  function playerMovement(event){
    
    // ! variables
    const keyCode = event.keyCode
    const left = 37
    const leftAlt = 65 
    const right = 39
    const rightAlt = 68

    
    removePlayer(currentPosition)

    if ((left === keyCode || leftAlt === keyCode) && currentPosition % width !== 0) {
      currentPosition -= 1
    } else if ((right === keyCode || rightAlt === keyCode) && currentPosition % width !== width - 1){
      currentPosition += 1
    }
    addPlayer(currentPosition)
  }
  document.addEventListener('keydown', playerMovement)

  // ! Firing ==============================================================================

  // ! shot functions
  function addShot(shotPosition){
    if (shotPosition > 0) {
      cells[shotPosition].classList.add(shotClass)
    }
  }

  function removeShot(shotPosition){
    cells[shotPosition].classList.remove(shotClass)
  }

  function playerShoot(){
    const keyCode = event.keyCode
    const firing = 32
    const altFire = 87
    // ! local variables
    let shotPosition = currentPosition
    let shotTimer

    // ! execution
    if (firing === keyCode || altFire === keyCode) {
      shotAudio()
      shotTimer = setInterval(() => {
        if (shotPosition > 0) {
          removeShot(shotPosition)
          shotPosition -= width
          if (zombies.includes(shotPosition) === true) {
            zombieHitAudio()
            score += 100
            scoreDisplay.innerHTML = score
            const collision = zombies.find(zombie => zombie === shotPosition)
            zombies.splice(zombies.indexOf(collision), 1)
            removeShot(shotPosition)
            cells[shotPosition].classList.add(hitClass)
            setTimeout(() => (cells[shotPosition].classList.remove(hitClass)), 100)
            createZombies()
            clearInterval(shotTimer)
          } else { 
            addShot(shotPosition)
          }
        } else {
          clearInterval(shotTimer)
        }
      }, 200)
    }
  }
  document.addEventListener('keyup', playerShoot)
  
  // ! Zombie functions ====================================================================

  function createZombies(){
    deleteZombies()
    zombies.forEach(zombie => {
      cells[zombie].classList.add(zombieClass)
    })
  }

  function deleteZombies(){
    cells.forEach(cell => {
      cell.classList.remove(zombieClass)
    })
  }

  function zombiesLeft(){
    deleteZombies()
    zombies = zombies.map(alien => alien - 1)
    createZombies()
  }
  
  function zombiesRight(){
    deleteZombies()
    zombies = zombies.map(alien => alien + 1)
    createZombies()
  }
  
  function zombiesDown(){
    deleteZombies()
    zombies = zombies.map(zombie => zombie + width)
    createZombies()
  }

  // ! movement
  
  function zombiesMove(){
    zombieTimer = setInterval(() =>{
      const rowIsEven = Math.floor(zombies[0] / 10) % 2 === 0
      if (rowIsEven && zombies[zombies.length - 1] % width !== width - 1){
        zombiesRight()
      } else if (!rowIsEven && zombies[0] % width !== 0) {
        zombiesLeft()
      } else {
        zombiesDown()
      }
      if (zombies.find(alienIndex => alienIndex === currentPosition || alienIndex > (width * width) - 2)) {
        ouch()
        clearInterval(bombTimer1)
        gameOver()
        clearInterval(zombieTimer)
      } else if (!zombies.length === true) {
        clearInterval(zombieTimer)
        return winner()
      }
    }, 800) 
  }

  // ! zombie projectile ==================================================================== 
  
  function addBomb(bombPosition){
    if (bombPosition < 99) cells[bombPosition].classList.add(bombClass)
  }

  function removeBomb(bombPosition){
    cells[bombPosition].classList.remove(bombClass)
  }

  function bombStart(){    
    bombTimer1 = setInterval(() => {
      const lastFour = zombies.slice(-4)
      console.log(lastFour)
      const randomIndex = Math.floor(Math.random() * (lastFour.length))
      let bombPosition = zombies[randomIndex]
      console.log(zombies[randomIndex])
      zombieBomb()
      const bombTimer2 = setInterval(() => { 
        removeBomb(bombPosition)
        bombPosition += width
        if (bombPosition < (width * width) - 1) {          
          if (bombPosition === currentPosition) {
            ouch()
            lives -= 1
            livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
            cells[bombPosition].classList.add(biteClass)
            setTimeout(() => (cells[bombPosition].classList.remove(biteClass)), 200)
            clearInterval(bombTimer2)
            if (lives === 0) {
              clearInterval(bombTimer1)
              gameOver()
              clearInterval(zombieTimer)
            }
          } else {
            addBomb(bombPosition)
          }
        } else {
          clearInterval(bombTimer2)
        }
      }, 800)
    }, 1600)
  }
  
  // ! audio functions ======================================================================
  // ! channels separated - SFX not cutting other sounds
  function walkingDead(){
    audio1.src = 'sounds/The_Walking_Dead_Theme_Song.mp3'
    audio1.play()  
  }

  function shotAudio(){
    audio2.src = 'sounds/crossbow-shot.mp3'
    audio2.play()  
  }

  function zombieHitAudio(){
    audio3.src = 'sounds/Zombie-hit.mp3'
    audio3.play()  
  }

  function zombieBomb(){
    audio4.src = 'sounds/Zprojectile.mp3'
    audio4.play()  
  }
  
  function ouch(){
    audio5.src = 'sounds/ouch.mp3'
    audio5.play()  
  }

  // ! game conditions ======================================================================
  
  // ! game start
  function startGame() {
    walkingDead()  
    addPlayer(startPosition)
    createZombies()
    bombStart()
    zombiesMove()
  }  
  start.addEventListener('click', startGame)

  // ! reset
  function resetGame(){
    window.location.reload()
  }
  reset.addEventListener('click', resetGame)

  // ! winner
  function winner(){
    setTimeout(() => alert(`You scored ${score} points and cleared the Zombies!`), 200)
    deleteZombies()
    clearInterval(zombieTimer)
  }

  // ! game over
  function gameOver(){
    setTimeout(() => alert(`You scored ${score} points!`), 200)
    deleteZombies()
    removeBomb()
    clearInterval(zombieTimer)
  }

  // prevent space bar from scrolling, but still allows for firing.
  window.addEventListener('keydown', (event) => {  
    if (event.keyCode === 32 && event.target === document.body) {  
      event.preventDefault()
    }  
  })
}

window.addEventListener('DOMContentLoaded', init) 