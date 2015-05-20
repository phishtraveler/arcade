  //Enemies out player must avoid
  var Enemy = function (x, y, speed) { 
    // Variables applied to each of our instances go here, 
    // we've provided one for you to get started 
 
    // The image/sprite for our enemies, this uses 
    // a helper we've provided to easily load images  
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.row = y + 1;
  } 
  
  // Update the enemy's position, required method for game 
  // Parameter: dt, a time delta between ticks 
  Enemy.prototype.update = function (dt) { 
    // You should multiply any movement by the dt parameter 
    // which will ensure the game runs at the same speed for 
    // all computers. 
 
    //Enemy movements
    if(this.x <= ctx.canvas.width) {
        this.x += (this.speed * dt);
    } else {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 200);
    }
    if (player.y === this.y && this.x + 42> player.x && this.x < player.x + 21) { 
        player.x = 203; 
        player.y = 362; 
        frozen = 0; 
        player.sprite = 'images/char-boy.png';

    }
  };
 
  // Draw the enemy on the screen, required method for game 
  Enemy.prototype.render = function () { 
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
  } 
 
  // Now write your own player class 
  // This class requires an update(), render() and 
  // a handleInput() method. 
 
  var Player = function (x, y) { 
     this.sprite = 'images/char-boy.png'; 
     this.x = x; 
     this.y = y; 
 
  } 
 
   Player.prototype.update = function(){
    //Collision Resets Game
    for (var i in allEnemies){
        if(allEnemies[i].x + 99> this.x + 16 && allEnemies[i].x < this.x + 85 && allEnemies[i].y === this.y) {
            player.reset();
        }
    }
    //Resets at water
    if (this.y === -20) {
        player.reset();
    }
   }
  
 
 Player.prototype.render = function(){ 
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
   } 
 
  //Set up if statements to respond to key presses  
  //and set conditions to keep the player on the board. 
 
 Player.prototype.handleInput = function (key) { 
    //Player cannot leave the screen 
    if (((player.y < 82) && (direction === "up"))|| 
            ((player.y > 414) && (direction === "down"))|| 
                ((player.x < 0) && (direction === "left"))|| 
                  ((player.x > 400) && (direction === "right"))) 
    { 
                  return;//out of bounds move requested, not allowed 
    } 

    //Left, Right, Up, Down
    if (key == 'left' && this.x > 0) { 
 
         this.x -= 100; 
     } else if (key == 'up' && this.y > -10) { 
 
         this.y -= 80; 
     } else if (key == 'right' && this.x < 400) { 
 
         this.x += 100; 
     } else if (key == 'down' && this.y < 390) { 

         this.y += 80; 
 
    } 
 
 }; 

 Player.prototype.reset = function(){ 
 
     //resets the players position data to start at the beginning 
 
     this.x = 200; 
     this.y = 390; 
 }; 
 
 // Now instantiate your objects. 
 // Place all enemy objects in an array called allEnemies 
 // Place the player object in a variable called player 
 var player = new Player(200, 390); 
 
 enemy1 = new Enemy(0, 230); 
 enemy2 = new Enemy(-200, 150); 
 enemy3 = new Enemy(-100, 70); 
 enemy4 = new Enemy(-900, 70); 
 enemy5 = new Enemy(-50, 150); 

 allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5]; 
 

 // This listens for key presses and sends the keys to your 
 // Player.handleInput() method. You don't need to modify this. 
 document.addEventListener('keyup', function (e) { 
     var allowedKeys = { 
         37: 'left', 
         38: 'up', 
         39: 'right', 
         40: 'down' 
     }; 
 
     player.handleInput(allowedKeys[e.keyCode]); 
 }); 