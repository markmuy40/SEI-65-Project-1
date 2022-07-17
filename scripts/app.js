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
  
  function makeGrid(){
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.innerText = i //remove once happy with design and no longer need to crate more functions for movement.
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
  }
  makeGrid()


  //! player functions
  // // variables
  const playerClass = 'player' 
  const startPosition = '95'
  let currentPosition = startPosition
  
  // function addPlayer(position){
  // cells[position].classList.add(playerClass)
  // }
  
  // function removePlayer(position){
  // cells[position].classList.remove(playerClass)
  // }
  
  // function playerMovement(){
  
  // ! variables
  
  // const left = keycode || left = keycode || left = div class
  // const right = keycode  || right = keycode number || right = div class
  
  // removePlayer(currentPosition)
  // execution
  // if (left === keycode && currentPosition % width !== 0) {
  // currentPosition -= 1
  // } else if {
  // right === keycode && currentPosition % width !== width - 1) {
  // currentPosition += 1
  //   }
  //   addPlayer(position)
  // }
  // .addEventListener('keydown', playerMovement)
  // ! aliens

  // const alienClass = 'alien'// alienclass in CSS
  // const startPosition = (numerical number for bottom/middle of grid)
  // let currentPosition = startPosition
  // //use setInterval for movement
  
  // function addAlien(position){
  // cells[position].classList.add(alienClass)
  // }
  
  // function removeAlien(position){
  // cells[position].classList.remove(alienClass)
  // }
  // removeAlien()
  
  
  // // ! function for left movement
  // function alienLeft(){
  // alien.classList.remove()  -1 alien.ClassList.add()
  // }
  
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











































