const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

document.addEventListener("keydown", keyDown);
document.addEventListener('keyup', keyUp);
startScreen.addEventListener("click", start);

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5
};

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;

}

function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;
}

function start() {
    gameArea.classList.remove("hide");
    startScreen.classList.add("hide");

    player.start = true;
    window.requestAnimationFrame(gamePlay);

    let car = document.createElement("div");
    car.setAttribute('class', 'car');
    // car.innerText = "Im Car";
    gameArea.appendChild(car);


    for (var x = 0; x < 5; x++) {

        //roadline
        let roadLine = document.createElement("div");
        roadLine.setAttribute('class', 'lines');
        roadLine.y = (x * 150);
        roadLine.style.top = roadLine.y + 'px';
        gameArea.appendChild(roadLine);

    }
    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (var x = 0; x < 3; x++) {
        //generate enemy cars
        let enemyCar = document.createElement("div");
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((x + 1) * 350) * -1;
        enemyCar.style.top = enemyCar.y + 'px';
        enemyCar.style.background = "blue";
        //Math.random gives values between 0 and 1 
        enemyCar.style.left = Math.floor(Math.random() * 350) + "px";
        gameArea.appendChild(enemyCar);
    }
}



function isCollide(a, b) {
    //Position of player car
    aRect = a.getBoundingClientRect();
    //Position of enemy car
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) ||
        (aRect.bottom < bRect.top) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right))
}

function moveEnemy(car) {
    let enemy = document.querySelectorAll(".enemy");

    //ForEach loop for moving enemy
    enemy.forEach(function (item) {

        //check for collision
        if (isCollide(car, item)) {
            console.log("Hit");
        }

        //loops enemies to move down and again
        if (item.y >= 750) {
            //or item.y = -50
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += player.speed;
        //they move down with a speed of 5px but this happens only once
        item.style.top = item.y + 'px';
    })
}

function moveLines() {
    let lines = document.querySelectorAll(".lines");

    //ForEach loop for moving lines
    lines.forEach(function (item) {

        //loops lines to move down and again
        if (item.y >= 700) {
            //or item.y = -50
            item.y += -750
        }

        item.y += player.speed;
        //they move down with a speed of 5px but this happens only once
        item.style.top = item.y + 'px';
    })
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {

        moveLines();
        moveEnemy(car);

        if (keys.ArrowUp && player.y > (road.top + 70)) {
            player.y -= player.speed
        }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) {
            player.y += player.speed
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed
        }
        if (keys.ArrowRight && player.x < (road.width - 50)) {
            player.x += player.speed
        }

        car.style.top = player.y + 'px';
        car.style.left = player.x + 'px';

        window.requestAnimationFrame(gamePlay);
    }
}