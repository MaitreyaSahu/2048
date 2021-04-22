const tilesContainer = document.querySelector('.tiles-container');
const tiles = document.querySelectorAll('.tile');

let isNoTileMoved = true;
let noOfTilesMoved = 0;

tilesContainer.addEventListener('transitionend', e => {
    if (e.target || e.target.nodeName == 'DIV') {
        //console.log(e.target);
        if(e.target.classList.contains('hidden')){
            e.target.remove();
        }
    }
});
generateTile();
generateTile();

function moveRight() {
    if (isGameOver()) {
        return;
    }
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    for (y = 1; y <= 4; y++) {
        for (x = 4; x >= 1; x--) {
            

            tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
            if (tile) {
                //console.log('move', x, y, {...tile.dataset});
                move(tile);
            }
        }
    }

    if (!isNoTileMoved) {
        generateTile();
    }
}

function moveLeft() {
    if (isGameOver()) {
        return;
    }
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    //console.clear();
    for (y = 1; y <= 4; y++) {
        for (x = 1; x <= 4; x++) {
            tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
            
            if (tile) {
                //console.log('before',{...tile.dataset});
                const nextX = findNextPlaceInLeft(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if(tile.dataset.x != nextX){
                    noOfTilesMoved++;
                }
                tile.dataset.x = nextX;
                //console.log('after',{...tile.dataset});
            }
        }
    }

    if (noOfTilesMoved > 0) {
        generateTile();
    }
}

function moveUp() {
    if (isGameOver()) {
        return;
    }
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 1; y <= 4; y++) {
            tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
            
            if (tile) {
                console.log('before',{...tile.dataset});
                const nextY = findNextPlaceAtTop(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if(tile.dataset.y != nextY){
                    noOfTilesMoved++;
                }
                tile.dataset.y = nextY;
                console.log('after',{...tile.dataset});
            }
        }
    }

    if (noOfTilesMoved > 0) {
        generateTile();
    }
}

function findNextPlaceAtTop(elem){
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newY = y;
    //console.log(x, +x + 1, y, value);
    for (i = +y - 1; i >= 1; i--) {
        const nextTile = document.querySelector(`.tile[data-x="${x}"][data-y="${i}"]:not(.hidden)`);
        console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value) {

                elem.classList.add('hidden');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), x, i);
                console.log('added',(value * 2), x, i);
                return i;
            } else {
                return i + 1;
            }
        }
    }
    //console.log('next position', x, i);
    return 1;
}

function moveDown() {
    if (isGameOver()) {
        return;
    }
    document.querySelectorAll('.merged').forEach(elem => elem.classList.remove('merged'));
    console.clear();
    for (x = 1; x <= 4; x++) {
        for (y = 4; y >= 1; y--) {
            tile = document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`);
            
            if (tile) {
                console.log('before',{...tile.dataset});
                const nextY = findNextPlaceAtBottom(tile);
                //isNoTileMoved = tile.dataset.x == nextX;
                if(tile.dataset.y != nextY){
                    noOfTilesMoved++;
                }
                tile.dataset.y = nextY;
                console.log('after',{...tile.dataset});
            }
        }
    }

    if (noOfTilesMoved > 0) {
        generateTile();
    }
}

function findNextPlaceAtBottom(elem){
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newY = y;
    //console.log(x, +x + 1, y, value);
    for (i = +y + 1; i <= 4; i++) {
        const nextTile = document.querySelector(`.tile[data-x="${x}"][data-y="${i}"]:not(.hidden)`);
        console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value) {

                elem.classList.add('hidden');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), x, i);
                console.log('added',(value * 2), x, i);
                return i;
            } else {
                return i - 1;
            }
        }
    }
    //console.log('next position', x, i);
    return 4;
}

function findNextPlaceInLeft(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newX = x;
    //console.log(x, +x + 1, y, value);
    for (i = +x - 1; i >= 1; i--) {
        const nextTile = document.querySelector(`.tile[data-x="${i}"][data-y="${y}"]`);
        //console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value) {

                elem.classList.add('hidden');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), i, y);
                //console.log('next position', i);
                return i;
            } else {
                return i + 1;
            }
        }
    }
    //console.log('next position', x, i);
    return 1;
}


function move(elem) {

    //let {posX, posY} = findNextPosition(elem);
    const nextX = findNextPosition(elem);
    
    if(elem.dataset.x == nextX){
        noOfTilesMoved++;
    }

    elem.dataset.x = nextX;
    //console.log(elem.dataset.x);

    //addNewTile(32, 4, 1);
    //document.querySelector('.tile.tile-4').classList.add('pos_1-3', 'merged')
}

function isGameOver() {
    const tiles = document.querySelectorAll('.tile');
    //console.log(tilesCount);
    if (tiles.length >= 16) {
        alert('game Over');
        tiles.forEach(tile => tile.remove());
        return true;
    }
    return false;
}

function findNextPosition(elem) {
    let {
        x,
        y,
        value
    } = elem.dataset;

    let newX = x;
    //console.log(x, +x + 1, y, value);
    for (i = +x + 1; i <= 4; i++) {
        const nextTile = document.querySelector(`.tile[data-x="${i}"][data-y="${y}"]`);
        //console.log('next tile', nextTile, i, y);
        if (nextTile) {
            if (nextTile.dataset.value == value) {
                elem.classList.add('hidden');
                nextTile.classList.add('hidden');
                addNewTile((value * 2), i, y);
                //console.log('next position', i);
                return i;
            } else {
                return i - 1;
            }
        }
    }
    //console.log('next position', x, i);
    return 4;
    
}

function generateTile() {
     const value = Math.random() > 0.5 ? 2 : 4;
    let {
        x,
        y
    } = getUnOccupiedCoordinate();
    addNewTile(value, x, y);
    //console.log("newtile", value, x, y);
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
    return (document.querySelector(`.tile[data-x="${x}"][data-y="${y}"]`) ? false : true);
}

function getRandomCoordinate(range) {
    const x = Math.floor(Math.random() * range + 1);
    const y = Math.floor(Math.random() * range + 1);
    return {
        x,
        y
    };
}

function addNewTile(value, posX, posY) {
    const newTile = document.createElement('div');
    newTile.classList.add('tile');
    newTile.classList.add('merged');
    newTile.textContent = value;
    newTile.dataset.value = value;
    newTile.dataset.x = posX;
    newTile.dataset.y = posY;
    // console.log(newTile);
    tilesContainer.appendChild(newTile);
}



(function () {
    //hammerjs for swipe
    var mc = new Hammer(document);
    mc.get('swipe').set({
        direction: Hammer.DIRECTION_ALL
    });

    mc.on("swipeleft", function () {
        //console.log('left key pressed');
        moveLeft();
    });

    mc.on("swiperight", function () {
        //console.log('right key pressed');
        moveRight();
    });

    mc.on("swipeup", function () {
        //console.log('up key pressed');
        moveUp();
    });

    mc.on("swipedown", function () {
        //console.log('down key pressed');
        moveDown();
    });

    // keyboard events
    document.addEventListener('keydown', function (e) {
        //console.log(e);
        //left key
        if (e.code == "ArrowLeft" || e.keyCode == '37') {
            //console.log('left key pressed');
            moveLeft();
        }
        //right key
        else if (e.code == "ArrowRight" || e.keyCode == '39') {
            //console.log('right key pressed');
            moveRight();
        }
        //up
        else if (e.code == "ArrowUp" || e.keyCode == "38") {
            //console.log('up key pressed');
            moveUp();
        }
        //down
        else if (e.code == "ArrowDown" || e.keyCode == "40") {
            //console.log('down key pressed');
            moveDown();
        }
    });
})();

var element = document.getElementById("game");
var mc = new Hammer(element);
mc.get('swipe').set({
    direction: Hammer.DIRECTION_ALL
});

mc.on("swipeleft", function () {
    //console.log('left key pressed');
    moveLeft();
});

mc.on("swiperight", function () {
    //console.log('right key pressed');
    moveRight();
});

mc.on("swipeup", function () {
    //console.log('up key pressed');
    moveUp();
});

mc.on("swipedown", function () {
    //console.log('down key pressed');
    moveDown();
});