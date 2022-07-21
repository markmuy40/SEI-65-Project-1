function init() {
  const start = document.querySelector('.play')
  //console.log(start)
  const reset = document.querySelector('.reset')
  //console.log(reset)
  const scoreDisplay = document.querySelector('.showscore')
  //console.log(scoreDisplay)
  const livesDisplay = document.querySelector('.showlives')
  //console.log(livesDisplay)
  
  const audio1 = document.querySelector('.audio1')
  //console.log(audio1)
  const audio2 = document.querySelector('.audio2')
  //console.log(audio2)
  const audio3 = document.querySelector('.audio3')
  //console.log(audio3)
  const audio4 = document.querySelector('.audio4')
  //console.log(audio4)
  // multiple audio means that SFX aren't chopped or removed as each audio 
  // function has a specific channel
  let score = 0
  let lives = 3
  scoreDisplay.innerHTML = score
  livesDisplay.innerHTML = lives
  

  
  // ! player variables
  const playerClass = 'player' 
  const startPosition = 94
  let currentPosition = startPosition

  
  // ! make the grid  =====================================================================

  // Grid container
  // ? target elements
  const grid = document.querySelector('.grid')
  //console.log(grid)
  // ? variables
  const width = 10 //change number if you want to add cells. 
  //check your CSS if the grid looks off. Think about the width of the contaner 
  //and .div size using percentages.
  const cellCount = width * width
  const cells = []// targetting each div cell created 
  

  
  function makeGrid(){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i //remove once happy with design and no longer need to crate more 
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
    const leftAlt = 65 // || left = div class
    const right = 39
    const rightAlt = 68
    //const firing = 32
    //console.log(keyCode)
    //use remove player function
    removePlayer(currentPosition)

    if ((left === keyCode || leftAlt === keyCode) && currentPosition % width !== 0) {
      currentPosition -= 1
      //console.log('left move')
    } else if ((right === keyCode || rightAlt === keyCode) && currentPosition % width !== width - 1){
      currentPosition += 1
      //console.log('right move')
    // } else if (firing === keyCode){
    //   console.log('shots fired')
    //} else {
      //console.log('invalid key')
    }
  
    addPlayer(currentPosition)
    
  // removePlayer(currentPosition)
  // execution
  // if (left === keycode && currentPosition % width !== 0) {
  // currentPosition -= 1
  // } else if {
  // right === keycode && currentPosition % width !== width - 1) {
  // currentPosition += 1
  //   }
  //   addPlayer(position)
  }
  document.addEventListener('keydown', playerMovement)

  // ! FIRING ================================================================================
  
  // ! variables
  const shotClass = 'shot'
  //let shotPosition

  function addShot(shotPosition){
    if (shotPosition > 0)cells[shotPosition].classList.add(shotClass)
  }

  function removeShot(shotPosition){
    cells[shotPosition].classList.remove(shotClass)
  }
  
  function playerShoot(){
    const keyCode = event.keyCode
    const firing = 32
    const altFire = 87
    
    // ! variables
    let shotPosition = currentPosition
    let shotTimer

    // ! execution
    if (firing === keyCode || altFire === keyCode) {
      shotAudio()
      shotTimer = setInterval(() => {
        if (shotPosition > 0)  {
          removeShot(shotPosition)
          shotPosition -= width
          if (aliens.includes(shotPosition) === true) {
            // find index of alien i hit in the array
            zombieHitAudio()
            score += 100
            scoreDisplay.innerHTML = score
            //removeAliens()
            //find the index of the alien and save as variable
            const collision = aliens.find(alien => alien === shotPosition)
            //console.log('collision', collision)
            aliens.splice(aliens.indexOf(collision), 1)
            //removes alen index from the alien array
            //console.log('remaining', aliens)
            //removeAliens()
            console.log('after', aliens)
            removeShot(shotPosition)
            createAliens()
            clearInterval(shotTimer)
          } else  if (aliens.length === 0){
            gameOver()
            clearInterval(shotTimer)
            
            
          } else { 
            addShot(shotPosition)
          }
          
          //console.log('shot  inside the interval',shotPosition)
          //console.log('aliens inside the interval', aliens)
        } else {
          clearInterval(shotTimer)
          //console.log('out of range')
        }
      }, 200)
    }


  }
  
  document.addEventListener('keyup', playerShoot)
  
  
  // ! aliens ============================================================================================
  
  // ! create aliens into grid
  //create alien array. Number should match up to squares in grid.
  // ! variables
  let aliens = [2,3,4,5,6,7,12,13,14,15,16,17,22,23,24,25,26,27]  
  
  const alienClass = 'alien'
  //console.log(typeof alienClass)
  
  // ! execution
  //create alien array into grid
  function createAliens(){
    // try for each alien in aliens array - add alien class tho th cell with index of each alien
    deleteAliens()
    aliens.forEach(alien =>{
      cells[alien].classList.add(alienClass)
    })
  }
  // ! event
  //createAliens()
  

  function deleteAliens(){
    cells.forEach(cell => {
      cell.classList.remove(alienClass)
    })
  }

  function aliensLeft(){
  // ! variables
  //aliens in global variable
    //console.log('left start', aliens)
    deleteAliens()
    // use variable 'aliens and modify by -1 (use map?)
    aliens = aliens.map(alien => alien - 1)
    //console.log('going left', aliens)
    createAliens()
  }
  // ! event
  //aliensLeft()



  function aliensRight(){
  // ! variables
  //aliens in global variable
    //console.log('right start',aliens)
    deleteAliens()
    // use variable 'aliens and modify by +1 (use map?)
    aliens = aliens.map(alien => alien + 1)
    //console.log('going right', aliens)
    createAliens()
  }
  // ! event
  //aliensRight()

  function aliensDown(){
  // ! variables
  //aliens in global variable
    //console.log('down start',aliens)
    deleteAliens()
    // use variable 'aliens and modify by +1 (use map?)
    aliens = aliens.map(alien => alien + width)
    //console.log('going down', aliens)
    createAliens()
  }
  // ! event
  //aliensDown()

  // ! movement

  function aliensMove(){
    //variables
    let alienTimer

    // ! execution
    alienTimer = setInterval(() =>{
      //console.log('movement', aliens)
      const rowIsEven = Math.floor(aliens[0] / 10) % 2 === 0

      if (rowIsEven && aliens[aliens.length - 1] % width !== width - 1){
        aliensRight()
        //console.log(aliens)
      } else if (!rowIsEven && aliens[0] % width !== 0) {
        aliensLeft()
      
        //clearInterval(timer)
        //aliensLeft()
      } else {
        aliensDown()
      }
      if (aliens.find(alienIndex => alienIndex === currentPosition || alienIndex > (width * width) - 2)) {
        gameOver()
        clearInterval(alienTimer)
      }
    }, 200) 
  }


  // ! alien projectile 
  // ?================================================================================= 
  const bombClass = 'bomb'
  
  function addBomb(bombPosition){
    cells[bombPosition].classList.add(bombClass)
  }


  function removeBomb(bombPosition){
    cells[bombPosition].classList.remove(bombClass)
  }


  function bombStart(){
    let zombieTimer
    const randomIndex = Math.floor(Math.random() * aliens.length)
    console.log(aliens[randomIndex])

    bombPosition = aliens[randomIndex]
  }
//bombStart()



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

  // ! game conditions =====================================================================
  
  // ! game start
  function startGame() {
    //walkingDead()  
    addPlayer(startPosition)
    createAliens()
    aliensMove()
  }  
  start.addEventListener('click', startGame)

  // ! reset
  
  //scoreDisplay = score
  //livesDisplay = lives
  
  function resetGame(){
    window.location.reload()

  }
  reset.addEventListener('click', resetGame)

  // ! game over
  function gameOver(){
    //deleteAliens()
    //clearInterval(alienTimer)
    //clearInterval(shotTimer)
    setTimeout(() => alert(`You scored ${score} points!`), 300)
  }

  //prevent space bar from scrolling, but still allows for firing.
  window.addEventListener('keydown', (event) => {  
    if (event.keyCode === 32 && event.target === document.body) {  
      event.preventDefault()
    }  
  })
  

}


window.addEventListener('DOMContentLoaded', init)