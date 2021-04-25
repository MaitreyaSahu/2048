const tilesContainer = document.querySelector('.tiles-container');
const tiles = document.querySelectorAll('.tile');
const gameScoreLive = document.querySelector('.game-score.live');
const gameScoreBest = document.querySelector('.game-score.best');

const scoreBox = document.querySelector('.scores');
const liveScoreBox = document.querySelector('.score.live-score');
const highestScoreBox = document.querySelector('.score.highest-score');

const gameInfo = document.querySelector('.game-info');
const gameOver = document.querySelector('.game-over');

let isBestScoreClicked = false;
gameScoreBest.addEventListener('click', () => {
    isBestScoreClicked = !isBestScoreClicked;
    isBestScoreClicked ? gameInfo.classList.add('controllers') : gameInfo.classList.remove('controllers');
});

document.querySelector('.new-game').addEventListener('click', reloadGame)

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

// console.log(liveScoreBox);
// liveScoreBox.addEventListener('transitionend', e => {
//     console.log(e.target);
//     removeFlyingScore(e);
// });


// highestScoreBox.addEventListener('transitionend', e => {
//     removeFlyingScore(e);
// });

// function removeFlyingScore(e){
//     if (e.target || e.target.nodeName == 'DIV') {
//         if (e.target.classList.contains('score-fly')) {
//             console.log(e.target,e.target.dataset);
//             e.target.remove();
//         }
//     }
// }

tilesContainer.addEventListener('transitionend', e => {
    //console.log(e.target);
    if (e.target || e.target.nodeName == 'DIV') {
        ////console.log(e.target);
        if (e.target.classList.contains('hidden')) {
            // //console.log(e.target,e.target.dataset);
            e.target.remove();
        }
    }
});
generateTile();
generateTile();

function moveRight() {

    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    for (y = 1; y <= 4; y++) {
        for (x = 4; x >= 1; x--) {


            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);
            if (tile) {
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
        generateTile();
    }
}

function moveLeft() {
    // if (isGameOver()) {
    //     return;
    // }
    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    // //console.clear();
    for (y = 1; y <= 4; y++) {
        for (x = 1; x <= 4; x++) {
            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);

            if (tile) {
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
        generateTile();
    }
}

function moveUp() {
    // if (isGameOver()) {
    //     return;
    // }
    noOfTilesMoved = 0;
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    // //console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 1; y <= 4; y++) {
            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);

            if (tile) {
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
    // //console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 4; y >= 1; y--) {
            tile = document.querySelector(`.active[data-x="${x}"][data-y="${y}"]`);

            if (tile) {
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

// function move(elem) {

//     //let {posX, posY} = findNextPosition(elem);
//     const nextX = findNextPosition(elem);

//     if (elem.dataset.x == nextX) {
//         noOfTilesMoved++;
//     }

//     elem.dataset.x = nextX;
//     ////console.log(elem.dataset.x);

//     //addNewTile(32, 4, 1);
//     //document.querySelector('.tile.tile-4').classList.add('pos_1-3', 'merged')
// }

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
        //alert('game Over');
        //reloadGame();
        gameOver.classList.remove('hide');
        return true;
    }
    return false;
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