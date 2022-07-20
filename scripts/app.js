function init() {
  const start = document.querySelector('.play')
  console.log(start)
  const reset = document.querySelector('.reset')
  console.log(reset)
  const scoreDisplay = document.querySelector('.score')
  console.log(scoreDisplay)
  const livesDisplay = document.querySelector('.lives')
  console.log(livesDisplay)
  
  
  // ! make the grid  

  // Grid container
  // ? target elements
  const grid = document.querySelector('.grid')
console.log(grid)
  // ? variables
  const width = 10 //change number if you want to add cells. 
  //check your CSS if the grid looks off. Think about the width of the contaner 
  //and .div size using percentages.
  const cellCount = width * width
  const cells = []// targetting each div cell created 
  
  // ! player variables
  const playerClass = 'player' 
  const startPosition = '94'
  let currentPosition = startPosition
  
  function makeGrid(){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i //remove once happy with design and no longer need to crate more functions for movement.
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    addPlayer(startPosition)
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
      console.log('left move')
    } else if ((right === keyCode || rightAlt === keyCode) && currentPosition % width !== width - 1){
      currentPosition += 1
      console.log('right move')
    // } else if (firing === keyCode){
    //   console.log('shots fired')
    } else {
      console.log('invalid key')
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
  let shotPosition

  function addShot(shotPosition){
    if (shotPosition > 0)cells[shotPosition].classList.add(shotClass)
  }

  function removeShot(shotPosition){
    cells[shotPosition].classList.remove(shotClass)
  }
  
  function playerShoot(){
    const keyCode = event.keyCode
    const firing = 32
    
    // ! variables
    let shotPosition = currentPosition
    let timer

    // ! execution
    if (firing === keyCode ) {
    
      timer = setInterval(() => {
        if (shotPosition > 0)  {
          removeShot(shotPosition)
          shotPosition -= width
          addShot(shotPosition)
          console.log('inside the interval',shotPosition)
        } else if (shotPosition === aliens) {
          console.log('matched')
        } else {
          clearInterval(timer)
          //console.log('out of range')
        }
      }, 300)
    }
  
  
   // if (cells.classList.contains.shotClass === cells.classList.contains.alienClass){
      console.log('where aliens are', cell[aliens])
      console.log('outside if loop', shotPosition)
      //console.log('matched')
    //} else {
      //console.log('wtf?!')
    //}

  }
  /*if (shotPosition > 0)*/ 
  //       removeShot(shotPosition)
  //       shotPosition -= width
  //       addShot(shotPosition)
  //       console.log(shotPosition)
      
  //   } else {
  //     clearInterval(timer)
  //   }, 300)
  //   }
  // }
  
  
  
  
  document.addEventListener('keydown', playerShoot)
  
  
  // ! aliens ============================================================================================
  
  // ! create aliens into grid
  //create alien array. Number should match up to squares in grid.
  // ! variables
  let aliens = [2,3,4,5,6,12,13,14,15,16]  //? this is global ==================================
  const alienClass = 'alien'
  //console.log(typeof alienClass)
  
  // ! execution
  //create alien array into grid
  function createAliens(){
    // try for each alien in aliens array - add alien class tho th cell with index of each alien
    aliens.forEach(alien =>{
      cells[alien].classList.add(alienClass)
    })
  }
  // ! event
  //createAliens()
  

  function deleteAliens(){
    aliens.forEach(alien => cells[alien].classList.remove(alienClass))
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
    let timer

    // ! execution
    timer = setInterval(() =>{
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
    }, 500) 

     

  


  }

  
  // ! game conditions score etc ======================================================================================================
  
  // ! alien
  // function deadAlien() {
  // If (alien currentPosition === shot currentPosition){
  // removeAlien() + (add empty element to keep spacing
  // score.innerHTML = score + 10 (whatever value a kill is worth)
  // } else {
  // shot -= 10 ( whatever width the grid is)
  // }
  
  // if(shot < (bottom row lowest number) {
  // shot += 10
  // } else {
  // return deadAlien()
  //   },  1000)
  
  // alien collision -
  // if (alien === player) {
  // lives -=1 
  // } else if {
  // (alien ===  cell.length - 9)
  // return gameOver()
  // }

  // ! hits
  
  
  // Const shotClass = 'shot' use image/icon
  
  // function addShot(position){
  // cells[position].classList.add(shotClass)
  // }
  // function removeAlien(position){
  // cells[position].classList.remove(shotClass)
  // }
  
  // function playerShoot(){
  // const fire = (keycode) || fire = div class
  
  // shotTime = setInterval(() => {
  
  // shot = player.classList.add() + 10 
  // if(shot < (bottom row lowest number) {
  // shot += 10
  // } else {
  // return deadAlien()
  //   },  1000)
  // }
  
  // document.addEventListener('keyup', playerShoot)
  
  // ! game start
  function startGame() {
    //createAliens()
    aliensMove()
  }  
start.addEventListener('click', startGame)

  // ! reset
//let score = 0
//let lives = 3
  function resetGame(){
  //scoreDisplay = score
  //livesDisplay = lives

    removeAliens()

  }
//reset.addEventListener('click', resetGame)



  

}


window.addEventListener('DOMContentLoaded', init)