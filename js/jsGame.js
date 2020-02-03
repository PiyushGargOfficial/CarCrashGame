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
        roadLine.style.top = (x * 150) + 'px';
        gameArea.appendChild(roadLine);

    }
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
}

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if (player.start) {

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