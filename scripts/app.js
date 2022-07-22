function init() {
  const start = document.querySelector('.play')
  //console.log(start)
  const reset = document.querySelector('.reset')
  //console.log(reset)
  const scoreDisplay = document.querySelector('.showscore')
  //console.log(scoreDisplay)
  const livesDisplay = document.querySelector('.showlives')
  //console.log(livesDisplay)
  const grid = document.querySelector('.grid')
  //console.log(grid)
  
  const audio1 = document.querySelector('.audio1')
  //console.log(audio1)
  const audio2 = document.querySelector('.audio2')
  //console.log(audio2)
  const audio3 = document.querySelector('.audio3')
  //console.log(audio3)
  const audio4 = document.querySelector('.audio4')
  //console.log(audio4)
  const audio5 = document.querySelector('.audio5')
  //console.log(audio4)
  // multiple audio means that SFX aren't chopped or removed as each audio 
  // function has a specific channel
  // ! grid variables
  const width = 10 //change number if you want to add cells. 
  //change percentages of .grid div as well
  const cellCount = width * width
  const cells = []// targetting each div cell created 
  
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
  let zombieTimer
  let bombTimer1

  // ! firing variables
  const shotClass = 'shot'
  const hitClass = 'blood'

  // ! Zombie variables
  let zombies = [2,3,4,5,6,7,12,13,14,15,16,17,22,23,24,25,26,27]  
  //create zombie array. Number should match up to squares in grid.
  const zombieClass = 'zombie'

  // ! make the grid  =====================================================================
  function makeGrid(){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      //cell.innerText = i //remove once happy with design and no longer need to crate more 
      // functions for movement.
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  makeGrid()

  //! player functions ==================================================================================

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
    //console.log(keyCode)
    
    removePlayer(currentPosition)

    if ((left === keyCode || leftAlt === keyCode) && currentPosition % width !== 0) {
      currentPosition -= 1
      //console.log('left move')
    } else if ((right === keyCode || rightAlt === keyCode) && currentPosition % width !== width - 1){
      currentPosition += 1
    }
    addPlayer(currentPosition)
  }
  document.addEventListener('keydown', playerMovement)

  // ! Firing ================================================================================

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
            // find index of zombie hit in the array
            zombieHitAudio()
            score += 100
            scoreDisplay.innerHTML = score
            //find the index of the zombie and save as variable
            const collision = zombies.find(zombie => zombie === shotPosition)
            //console.log('collision', collision)
            //removes zombie index from the zombie array
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
  
  // ! Zombie functions ============================================================================================

  // ! execution
  //create zombie array into grid
  function createZombies(){
    //'for each' zombie in zombies array, add zombie class into cell with index of each zombie.
    deleteZombies()
    zombies.forEach(zombie => {
      cells[zombie].classList.add(zombieClass)
    })
  }
  // ! event

  

  function deleteZombies(){
    cells.forEach(cell => {
      cell.classList.remove(zombieClass)
    })
  }

  function zombiesLeft(){
    deleteZombies()
    zombies = zombies.map(alien => alien - 1)
    //console.log('going left', zombies)
    createZombies()
  }
  
  function zombiesRight(){
    deleteZombies()
    zombies = zombies.map(alien => alien + 1)
    //console.log('going right', zombies)
    createZombies()
  }
  
  function zombiesDown(){
    deleteZombies()
    zombies = zombies.map(zombie => zombie + width)
    //console.log('going down', zombies)
    createZombies()
  }

  // ! movement
  
  function zombiesMove(){
    zombieTimer = setInterval(() =>{
      //console.log('movement', aliens)
      const rowIsEven = Math.floor(zombies[0] / 10) % 2 === 0
      if (rowIsEven && zombies[zombies.length - 1] % width !== width - 1){
        zombiesRight()
        //console.log(aliens)
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
        //console.log(!zombies.length)
        //console.log('after statement')
        return gameOver()
      }
    }, 2000) 
  }
 
  // ! zombie projectile ================================================================================= 
  const bombClass = 'bomb'
  
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
      zombieBomb() // sfx
      const bombTimer2 = setInterval(() => { 
        removeBomb(bombPosition)
        bombPosition += width
        if (bombPosition < (width * width) - 1) {          
          //console.log('bomb', bombPosition)
          //console.log('player', currentPosition)
          if (bombPosition === currentPosition) {
            //console.log('if statement triggered')
            ouch()
            lives -= 1
            livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '💔'
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
      }, 1000)
    }, 2000)
  }
  
  // ! audio functions ================================================================
  function zombieHitAudio(){
    audio3.src = 'sounds/Zombie-hit.mp3'
    audio3.play()  
  }

  function shotAudio(){
    audio2.src = 'sounds/crossbow-shot.mp3'
    audio2.play()  
  }

  function zombieBomb(){
    audio4.src = 'sounds/Zprojectile.mp3'
    audio4.play()  
  }
  
  function walkingDead(){
    audio1.src = 'sounds/The_Walking_Dead_Theme_Song.mp3'
    audio1.play()  
  }

  function ouch(){
    audio1.src = 'sounds/ouch.mp3'
    audio1.play()  
  }

  // ! game conditions =====================================================================
  
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

  // ! game over
  function gameOver(){
    setTimeout(() => alert(`You scored ${score} points!`), 200)
    deleteZombies()
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