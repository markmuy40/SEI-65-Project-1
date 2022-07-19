function init() {

  // ! make the grid  

  // Grid container
  // ? target elements
  const grid = document.querySelector('.grid')

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
    const firing = 32
    //console.log(keyCode)
    //use remove player function
    removePlayer(currentPosition)

    if ((left === keyCode || leftAlt === keyCode) && currentPosition % width !== 0) {
      currentPosition -= 1
      console.log('left clicked')
    } else if ((right === keyCode || rightAlt === keyCode) && currentPosition % width !== width - 1){
      currentPosition += 1
      console.log('right clicked')
    } else if (firing === keyCode){
      console.log('shots fired')
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

  function addShot(shotPosition){
    cells[shotPosition].classList.add(shotClass)
  }

  function removeShot(shotPosition){
    cells[shotPosition].classList.remove(shotClass)
  }
  
  function playerShoot(){
    const keyCode = event.keyCode
    const firing = 32
    //|| right = 68 || right = div class
    //console.log(keyCode)
    // ! variables
    let shotPosition = currentPosition
    let timer

    // ! execution
    if (firing === keyCode) {
    // console.log('fired again')
      timer = setInterval(() =>{
        removeShot(shotPosition)
        shotPosition -= width
        addShot(shotPosition)
        console.log(shotPosition)
      }, 300)
    } else if (shotPosition < 0) {
      clearInterval(timer)
      //removeShot(shotPosition)
    }
    
    // if(shot < (bottom row lowest number) {
    // shot += 10
    // } else {
    // return deadAlien()
    //   },  1000)
  }
  
  document.addEventListener('keyup', playerShoot)
  
  
  // ! aliens ============================================================================================
  
  // ! create aliens into grid
  //create alien array. Number should match up to squares in grid.
  // ! variables
  const aliens = [2,3,4,5,6,12,13,14,15,16]
  const alienClass = 'alien'
  
  // ! execution
  //create alien array into grid
  function createAliens () {
    for (i = 0; i < cellCount; i++) {
      cells[aliens[i]].classList.add(alienClass)
      //console.log(cells[aliens[i]])
    }

  }
  // ! event
  createAliens()
  
  
  // //use setInterval for movement
  
  
  

  
//   // ! function for left movement
  
  function alienLeft(){
  // ! variables
    let alienTimer
// ! execution

    alienTimer = setInterval(() => {
      for(let i = 0; 1 < aliens.length; i++)
        cells[aliens[i]] -= 1
      console.log(aliens)
    }, 500)
    createAliens()
  }
  
  alienLeft()
  
  // // ! function for right movement
  // function alienRight(){
  // alien.classList.remove()  +1 alien.ClassList.add()
  // }
  
  // function for moving downward
  // function alienDown(){
  // removeAlien(currentPosition)  +10 addAlien(CurrentPosition)
  // }
  
  // ! removing aliens

  // function deadAlien() {
  // If (alien currentPosition === shot currentPosition){
  // removeAlien() + (add empty element to keep spacing
  // score.innerHTML = score + 10 (whatever value a kill is worth)
  // } else {
  // shot -= 10 ( whatever width the grid is)
  // }
  
  
  
  // alien collision -
  // if (alien === player) {
  // lives -=1 
  // } else if {
  // (alien ===  cell.length - 9)
  // return gameOver()
  // }
  
  // function addAlien(position){
  // cells[position].classList.add(alien)
  // }

  // function removeAlien(position){
  // cells[position].classList.remove(alien)
  // }
  
  // detect when they hit the end move them 
  // down. switch direction
  
  
  

  
  
  
  // ! firing
  
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
  
}


window.addEventListener('DOMContentLoaded', init)