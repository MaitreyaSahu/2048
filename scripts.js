const tilesContainer = document.querySelector('.tiles-container');
const tiles = document.querySelectorAll('.tile');
const gameScoreLive = document.querySelector('.game-score.live');
const gameScoreBest = document.querySelector('.game-score.best');

const scoreBox = document.querySelector('.scores');
const liveScoreBox = document.querySelector('.score.live-score');
const highestScoreBox = document.querySelector('.score.highest-score');

const gameInfo = document.querySelector('.game-info');
const gameOver = document.querySelector('.game-over');
const gameResult = document.querySelector('.game-result');

let moveCount = 0;
let lastScore = 0;
let isUndoPossible = false;

let isBestScoreClicked = false;
gameScoreBest.addEventListener('click', () => {
    console.log('score');
    undo();
    // isBestScoreClicked = !isBestScoreClicked;
    // isBestScoreClicked ? gameInfo.classList.add('controllers') : gameInfo.classList.remove('controllers');
    // //gameOver.classList.remove('hide');
    // //celebrate();
    // congo();
});

document.querySelector('.new-game').addEventListener('click', reloadGame);
document.querySelector('.undo').addEventListener('click', undo);


let isNoTileMoved = true;
let noOfTilesMoved = 0;
let highestScore = +localStorage.getItem('heighestScore') || 0;
gameScoreBest.innerText = highestScore;

function reloadGame() {
    tilesContainer.innerHTML = "";
    gameScoreLive.innerText = 0;
    gameScoreBest.innerText = highestScore;
    gameOver.classList.add('hide');
    generateTile();
    generateTile();
}


tilesContainer.addEventListener('transitionend', e => {
    //console.log(e.target);
    if (e.target || e.target.nodeName == 'DIV') {
        ////console.log(e.target);
        if (e.target.classList.contains('hidden')) {
            // //console.log(e.target,e.target.dataset);
            //e.target.remove();
        }
    }
});
generateTile();
generateTile();


function undo() {

    if (!isUndoPossible) {
        return false;
    }

    document.querySelectorAll('.tile.merged, .tile:not([data-lastx])').forEach(tile => {
        tile.remove();
    });

    document.querySelectorAll('.tile[data-lastx]').forEach(tile => {
        console.log('X', tile.dataset.x, tile.dataset.lastx);
        console.log('X', tile.dataset.y, tile.dataset.lasty);
        tile.dataset.x = tile.dataset.lastx;
        tile.dataset.y = tile.dataset.lasty;
        tile.classList.remove('hidden');
        tile.classList.remove('new');
        tile.classList.add('active');
        tile.removeAttribute('data-lastx');
        tile.removeAttribute('data-lasty');
    });

    moveCount--;
    isUndoPossible = false;
    gameScoreLive.innerText = +gameScoreLive.innerText - lastScore;

    // document.querySelectorAll('.tile:not([data-lastx])').forEach(tile => {
    //     console.log('not data last', tile);
    //     tile.remove();
    // });
}

function moveRight() {

    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    document.querySelectorAll('.tile.hidden').forEach(tile => {
        tile.remove();
    });

    for (y = 1; y <= 4; y++) {
        for (x = 4; x >= 1; x--) {

            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
            if (tile) {


                tile.dataset.lastx = tile.dataset.x;
                tile.dataset.lasty = tile.dataset.y;
                ////console.log('move', x, y, {...tile.dataset});
                //move(tile);
                const nextX = findNextPlaceInRight(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if (tile.dataset.x != nextX) {
                    noOfTilesMoved++;
                }
                tile.dataset.x = nextX;
                // //console.log('after',{...tile.dataset});
            }
        }
    }

    if (noOfTilesMoved > 0 || isGameOver()) {
        moveCount++;
        isUndoPossible = true;
        generateTile();
    }
}

function moveLeft() {
    // if (isGameOver()) {
    //     return;
    // }
    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    document.querySelectorAll('.tile.hidden').forEach(tile => {
        tile.remove();
    });
    // //console.clear();
    for (y = 1; y <= 4; y++) {
        for (x = 1; x <= 4; x++) {


            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
            if (tile) {
                tile.dataset.lastx = tile.dataset.x;
                tile.dataset.lasty = tile.dataset.y;
                // //console.log('before',{...tile.dataset});
                const nextX = findNextPlaceInLeft(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if (tile.dataset.x != nextX) {
                    noOfTilesMoved++;
                }
                tile.dataset.x = nextX;
                // //console.log('after',{...tile.dataset});
            }
        }
    }
    //console.log(noOfTilesMoved);
    if (noOfTilesMoved > 0 || isGameOver()) {
        moveCount++;
        isUndoPossible = true;
        generateTile();
    }
}

function moveUp() {
    // if (isGameOver()) {
    //     return;
    // }
    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    document.querySelectorAll('.tile.hidden').forEach(tile => {
        tile.remove();
    });
    // //console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 1; y <= 4; y++) {


            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
            if (tile) {
                tile.dataset.lastx = tile.dataset.x;
                tile.dataset.lasty = tile.dataset.y;
                // //console.log('before',{...tile.dataset}, tile);
                const nextY = findNextPlaceAtTop(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if (tile.dataset.y != nextY) {
                    noOfTilesMoved++;
                }
                tile.dataset.y = nextY;
                // //console.log('after',{...tile.dataset},tile);
            }
        }
    }
    //console.log(noOfTilesMoved);
    if (noOfTilesMoved > 0 || isGameOver()) {
        moveCount++;
        isUndoPossible = true;
        generateTile();
    }
}

function findNextPlaceAtTop(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newY = y;
    ////console.log(x, +x + 1, y, value);
    for (i = +y - 1; i >= 1; i--) {
        const nextTile = document.querySelector(`.active[data-x="${x}"][data-y="${i}"]`);
        // //console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value && !nextTile.classList.contains('merged')) {
                elem.classList.remove('active');
                elem.classList.add('hidden');
                nextTile.classList.remove('active');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), x, i, true);
                // //console.log('added',(value * 2), x, i);
                return i;
            } else {
                return i + 1;
            }
        }
    }
    ////console.log('next position', x, i);
    return 1;
}

function moveDown() {
    // if (isGameOver()) {
    //     return;
    // }
    // //console.clear();
    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    document.querySelectorAll('.tile.hidden').forEach(tile => {
        tile.remove();
    });
    // //console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 4; y >= 1; y--) {


            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
            if (tile) {
                tile.dataset.lastx = tile.dataset.x;
                tile.dataset.lasty = tile.dataset.y;
                // //console.log('before',{...tile.dataset});
                const nextY = findNextPlaceAtBottom(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if (tile.dataset.y != nextY) {
                    noOfTilesMoved++;
                }
                tile.dataset.y = nextY;
                // //console.log('after',{...tile.dataset});
            }
        }
    }
    ////console.log(noOfTilesMoved);
    if (noOfTilesMoved > 0 || isGameOver()) {
        moveCount++;
        isUndoPossible = true;
        generateTile();
    }
}

function findNextPlaceAtBottom(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newY = y;
    ////console.log(x, +x + 1, y, value);
    for (i = +y + 1; i <= 4; i++) {
        const nextTile = document.querySelector(`.active[data-x="${x}"][data-y="${i}"]`);
        //console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value && !nextTile.classList.contains('merged')) {

                elem.classList.remove('active');
                elem.classList.add('hidden');
                nextTile.classList.remove('active');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), x, i, true);
                // //console.log('added',(value * 2), x, i);
                return i;
            } else {
                return i - 1;
            }
        }
    }
    ////console.log('next position', x, i);
    return 4;
}

function findNextPlaceInLeft(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newX = x;
    ////console.log(x, +x + 1, y, value);
    for (i = +x - 1; i >= 1; i--) {
        const nextTile = document.querySelector(`.active[data-x="${i}"][data-y="${y}"]`);
        ////console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value && !nextTile.classList.contains('merged')) {

                elem.classList.remove('active');
                elem.classList.add('hidden');
                nextTile.classList.remove('active');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), i, y, true);
                ////console.log('next position', i);
                return i;
            } else {
                return i + 1;
            }
        }
    }
    ////console.log('next position', x, i);
    return 1;
}


function findNextPlaceInRight(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newX = x;
    ////console.log(x, +x + 1, y, value);
    for (i = +x + 1; i <= 4; i++) {
        const nextTile = document.querySelector(`.active[data-x="${i}"][data-y="${y}"]`);
        ////console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value && !nextTile.classList.contains('merged')) {

                elem.classList.remove('active');
                elem.classList.add('hidden');
                nextTile.classList.remove('active');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), i, y, true);
                ////console.log('next position', i);
                return i;
            } else {
                return i - 1;
            }
        }
    }
    ////console.log('next position', x, i);
    return 4;

}

function isGameOver() {
    const tiles = document.querySelectorAll('.active');
    //console.log(tiles.length);
    if (tiles.length >= 16) {
        for (x = 1; x <= 4; x++) {
            for (y = 1; y <= 4; y++) {
                tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
                tileRight = document.querySelector(`.active[data-x="${x + 1}"][data-y="${y}"]`);
                tileBottom = document.querySelector(`.active[data-x="${x}"][data-y="${y + 1}"]`);
                console.clear();
                console.log('tile', tile);
                console.log('tileRight', tileRight);
                console.log('tileBottom', tileBottom);
                if (tileRight && tileRight.dataset.value == tile.dataset.value) {
                    return false;
                }
                if (tileBottom && tileBottom.dataset.value == tile.dataset.value) {
                    return false;
                }
            }
        }
        failed();
        return true;
    }
    return false;
}

function failed() {
    gameResult.innerHTML = "Game Over";
    gameOver.classList.remove('hide');
}

function congo() {
    gameResult.innerHTML = "Well Done!!!";
    gameOver.classList.remove('hide');
    celebrate();
}



function generateTile() {
    if (isGameOver()) {
        return;
    }
    const value = Math.random() > 0.5 ? 2 : 4;
    let {
        x,
        y
    } = getUnOccupiedCoordinate();
    addNewTile(value, x, y);
    ////console.log("newtile", value, x, y);
}

function getUnOccupiedCoordinate() {
    let {
        x,
        y
    } = getRandomCoordinate(4);
    return (isGridOccupied(x, y) ? {
        x,
        y
    } : getUnOccupiedCoordinate());
}

function isGridOccupied(x, y) {
    return (document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`) ? false : true);
}

function getRandomCoordinate(range) {
    const x = Math.floor(Math.random() * range + 1);
    const y = Math.floor(Math.random() * range + 1);
    return {
        x,
        y
    };
}

function addNewTile(value, posX, posY, isMerged) {
    const newTile = document.createElement('div');
    newTile.classList.add('tile');
    isMerged ? newTile.classList.add('merged') : newTile.classList.add('new');
    newTile.classList.add('active');
    newTile.textContent = value;
    newTile.dataset.value = value;
    newTile.dataset.x = posX;
    newTile.dataset.y = posY;
    // //console.log(newTile);
    tilesContainer.appendChild(newTile);

    if (isMerged) {
        const updatedScore = +gameScoreLive.innerText + value;
        lastScore = value;
        gameScoreLive.innerText = updatedScore;

        // //show flying score added
        // const scoreAdded = document.createElement('div');
        // scoreAdded.classList.add('score-fly');
        // scoreAdded.innerHTML = `+${value}`;
        // liveScoreBox.appendChild(scoreAdded);

        if (updatedScore > highestScore) {
            gameScoreBest.innerText = highestScore = updatedScore;
            localStorage.setItem('heighestScore', updatedScore);
        }
    }

    if (value == 2048) {
        congo();
    }

}



// keyboard events
document.addEventListener('keydown', function (e) {
    ////console.log(e);
    //left key
    if (e.code == "ArrowLeft" || e.keyCode == '37') {
        ////console.log('left key pressed');
        moveLeft();
    }
    //right key
    else if (e.code == "ArrowRight" || e.keyCode == '39') {
        ////console.log('right key pressed');
        moveRight();
    }
    //up
    else if (e.code == "ArrowUp" || e.keyCode == "38") {
        ////console.log('up key pressed');
        moveUp();
    }
    //down
    else if (e.code == "ArrowDown" || e.keyCode == "40") {
        ////console.log('down key pressed');
        moveDown();
    }
});

//swipre events
var element = document.getElementById("game");
var mc = new Hammer(element);
mc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
});

mc.on("swipeleft", function () {
    moveLeft();
});

mc.on("swiperight", function () {
    moveRight();
});

mc.on("swipeup", function () {
    moveUp();
});

mc.on("swipedown", function () {
    moveDown();
});


if ('serviceWorker' in navigator) {
    //console.log(window);

    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            //console.log(`service worker registered succesfully ${registration}`) 
        })
        .catch((err) => {
            //console.log(`Error registring ${err}`) 
        })

} else {
    //console.log(`Service worker is not supported in this browser.`)
}




//----------------------------------------------------------

//(function () {

// Little Canvas things
var canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d');

// Envelope interaction
var flipped = false;


function celebrate() {
    //setTimeout(function () {
    var x = window.innerWidth / 2,
        y = window.innerWidth / 2;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
    //flipped = true;
    //}, 10);
}

// gameScoreBest.addEventListener('click', () => {
//     //celebrate();
//     console.log('celebrate clicked');
// });

// Configuration, Play with these
var config = {
    particleNumber: 800,
    maxParticleSize: 10,
    maxSpeed: 40,
    colorVariation: 50
};


// Colors
var colorPalette = {
    bg: {
        r: 12,
        g: 9,
        b: 29
    },
    matter: [{
            r: 255,
            g: 1,
            b: 7
        }, // Red
        {
            r: 13,
            g: 101,
            b: 247
        }, // Blue
        {
            r: 247,
            g: 244,
            b: 13
        }, // Yellow
        {
            r: 57,
            g: 247,
            b: 13
        } // Green
    ]
};


// Some Variables hanging out
var particles = [],
    centerX = canvas.width / 2,
    centerY = canvas.height / 2,
    drawBg,

    // Draws the background for the canvas, because space
    drawBg = function (ctx, color) {
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

// Set Canvas to be window size
var size = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
// In case of resize
window.addEventListener("resize", size);

// Particle Constructor
var Particle = function (x, y) {
    // X Coordinate
    this.x = x || Math.round(Math.random() * canvas.width);
    // Y Coordinate
    this.y = y || Math.round(Math.random() * canvas.height);
    // Radius of the space dust
    this.r = Math.ceil(Math.random() * config.maxParticleSize);
    // Color of the rock, given some randomness
    this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
    // Speed of which the rock travels
    this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
    // Direction the Rock flies
    this.d = Math.round(Math.random() * 360);
};

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
var colorVariation = function (color, returnString) {
    var r, g, b, a, variation;
    r = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.r);
    g = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.g);
    b = Math.round(Math.random() * config.colorVariation - config.colorVariation / 2 + color.b);
    a = Math.random() + .5;
    if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    } else {
        return {
            r,
            g,
            b,
            a
        };
    }
};

// Used to find the rocks next point in space, accounting for speed and direction
var updateParticleModel = function (p) {
    var a = 180 - (p.d + 90); // find the 3rd angle
    p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
    p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
    return p;
};

// Just the function that physically draws the particles
// Physically? sure why not, physically.
var drawParticle = function (x, y, r, c) {
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
};

// Remove particles that aren't on the canvas
var cleanUpArray = function () {
    particles = particles.filter(p => {
        return p.x > -100 && p.y > -100;
    });
};


var initParticles = function (numParticles, x, y) {
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }
    particles.forEach(p => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
};

// That thing
window.requestAnimFrame = function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}();


// Our Frame function
var frame = function () {
    // Draw background first
    //drawBg(ctx, colorPalette.bg);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Update Particle models to new position
    particles.map(p => {
        return updateParticleModel(p);
    });
    // Draw em'
    particles.forEach(p => {
        drawParticle(p.x, p.y, p.r, p.c);
    });
    // Play the same song? Ok!
    window.requestAnimFrame(frame);
};

// First Frame
size();
frame();

//})();