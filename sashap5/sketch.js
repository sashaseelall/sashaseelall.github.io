
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAUEblo-WA6jk_KHSGyOgJKbwD7JAydwnU",
    authDomain: "game-project-df305.firebaseapp.com",
    databaseURL: "https://game-project-df305.firebaseio.com",
    projectId: "game-project-df305",
    storageBucket: "game-project-df305.appspot.com",
    messagingSenderId: "36007982263",
    appId: "1:36007982263:web:3e21a0e1d1adf7d1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

let database = firebase.database()
let x
let y
let p
let k
let points
let enemies
let level
let time
let game = document.getElementById("game")
let scoreboard = {  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  f = width/946
  x = 100
  y = 300
  p = 300
  k = 150
  s = 10
  t = 5
  time = 10
  j = [100,500,900,230,400,390,500,700,800]
  w = [300,300,300,800,100,600,1100,700,500]
  enemies = 3
  points = 0
  level= 1
  
}

function draw() {
  if (time > 0) {
  background(25,32,45);
  fill(10,150,200)
  circle(x*f,y,50*f)
  x=x+5
  
  
  fill(120,170,100)
  circle(p*f,k,45*f)
 

if (touches.length == 0)   {

	controls for main character
	else { 
		300 = touches[0].x
		150 = touches[0].y
}



  if (keyIsDown(LEFT_ARROW)) {
    p = p - 5;
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    p = p + 5;
  }
  
  if (keyIsDown(UP_ARROW)) {
    k = k - 5;
  }
  
  if (keyIsDown(DOWN_ARROW)) {
    k = k + 5;
  }
}
  
  for (i=0; i<enemies; i=i+1) {
    fill(125,70,180)
    circle(j[i]*f,w[i],30*f)
    w[i] = w[i] + 5

    if ( w[i]*f > height) {
      w[i] = 0
    }

    if (dist( p*f,k ,j[i] ,w[i]) < 50*f + 30 ) {
      points = points - 1
    }
  }

  
  if ( x > width) {
	x = 0
  }
  if (dist( x*f,y ,p*f ,k ) < 50*f + 50 ) {
	points = points + 1
}

  time=time-0.02
  textSize(30)
  fill(255,255,255)
  text("score:"+points,700,650)
  text("time: " + time.toFixed(0), 5, 660)
  
  if (points > 400 && level == 1) {
     enemies  = enemies  + 6
      level = 2
  }
  if (points < -200 && level == 2) {
    enemies = 8
  }
  if (points < -400 && level == 2) {
    enemies = 6
  }
  if (points < -600 && level == 2) {
    enemies = 4
  }
  if (points < -800 && level == 2) {
    enemies = 2
  }
  if (points < -1000 && level == 2) {
    enemies = 0
  }
  
  
  
  if(points > 600 && level == 2) {
    enemies = enemies + 8
    level = 3
  }
  if (points > 800 && level == 3) {
    enemies = 10
  }
  if (points > 1000 && level == 3) {
    enemies = 12
  }
  }
  
  else {
  game.innerHTML = "Name? <input id=anything><button onclick='restart()'>Restart</button>"
noLoop()

  }
  }
  
  
  function restart() { 
		onclick=generate_alltime_leaderboard()
        let anything = document.getElementById("anything")
		name = anything.value
		database.ref(name).set(score) 
		if (name != "") { 
			scoreboard[name] = points
		}
        alert("scoreboard: " + JSON.stringify(scoreboard,null,1)) 
		time = 10
		points = 0
        level = 1
        enemies = 3
		loop()
		game.innerHTML = ""
        generate_leaderboard()
 }
    
    
  function generate_leaderboard() {
        scores = Object.values(scoreboard)
        names = Object.keys(scoreboard)
  
        if (scores.length >= 3) {
        let leaderboard = { }
        for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
      alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
    }

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()



