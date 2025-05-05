import gameVal from './variables.js';
let bulletsTarget = new Map();



function spawnBullet() {
    const parent = document.getElementById('parent');
    const bullet = document.createElement("div");
    bullet.setAttribute("id", "bullet")
    bullet.style.top = gameVal.PlrY+25+"px";
    bullet.style.left = gameVal.PlrX+20+"px";
    // bullet.textContent = 'pew!';
    parent.appendChild(bullet);

    bulletsTarget.set(bullet, {X: gameVal.MouseX,Y: gameVal.MouseY})
}

function updatePlrCoordinate() {
    if (gameVal.InputBuffer.a==true) {
        gameVal.PlrX--;
    }
    if (gameVal.InputBuffer.d==true) {
        gameVal.PlrX++;   
    }
    if (gameVal.InputBuffer.w==true) {
        gameVal.PlrY--;   
    }
    if (gameVal.InputBuffer.s==true) {
        gameVal.PlrY++;
    }
    gameVal.Plr.style.left=gameVal.PlrX+"px";
    gameVal.Plr.style.top=gameVal.PlrY+"px";
}
function updateBullets() {
    gameVal.bulletsTarget.forEach( )
}

function onMouseEvent(m) {
    if (m==true) {
        gameVal.gun = setInterval(spawnBullet, 100);
        return
    }else if (m==false){
        clearInterval(gameVal.gun)
        gameVal.gun = null;
        return
    }

    gameVal.MouseX = m.ClientX;
    gameVal.MouseY = m.ClientY;
}

function onKeyEvent(e, bool) {
    if (gameVal.InputBuffer[e.key]!=null) {
        gameVal.InputBuffer[e.key] = bool;
    }
}

export default {
    onKeyEvent,
    onMouseEvent,
    spawnBullet,
    updatePlrCoordinate,
    updateBullets
};