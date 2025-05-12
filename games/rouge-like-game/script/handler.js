import gameVal from './variables.js';
import assets from './assets.js'

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
    assets.plr.style.left=gameVal.PlrX+"px";
    assets.plr.style.top=gameVal.PlrY+"px";
}
function updatePlrAngle() {
    const pointX = gameVal.PlrX-gameVal.MouseX;
    const pointY = gameVal.PlrY-gameVal.MouseY;
    // console.log(gameVal.PlrX+'-'+gameVal.MouseX);
    // console.log(gameVal.PlrX+'-'+gameVal.MouseX);

    const deg = (Math.atan2(pointY, pointX)/Math.PI)*180;
    console.log(deg)
    assets.plr.style.transform = `rotate(${deg}deg)`;
}
function spawnBullet() {
    const parent = document.getElementById('parent');
    const bullet = document.createElement("div");
    bullet.setAttribute("id", "bullet")
    bullet.style.top = gameVal.PlrY+25+"px";
    bullet.style.left = gameVal.PlrX+20+"px";
    parent.appendChild(bullet);

    const lifespan = createAttribute('lifespan')
    lifespan.value = '5000';
    bullet.setAttribute(lifespan);
}
function updateBullets() {
    const bulletsElm = document.getElementById('bullet')
    const bullets = [...bulletsElm];
    bulletsElm.forEach(bullet => {
        const lifespan = Number(bullet.getAttribute('lifespan'))
        if (lifespan<=0) {
            bullet.remove()
            return
        } 
        bullet.setAttribute('lifespan', String(lifespan-1));
    });
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
    gameVal.MouseX = m.pageX;
    gameVal.MouseY = m.pageY;
}

function onKeyEvent(e, bool) {
    if (gameVal.InputBuffer[e.key]!=null) {
        gameVal.InputBuffer[e.key] = bool;
    }
}

export default {
    onKeyEvent,
    onMouseEvent,
    updatePlrCoordinate,
    updatePlrAngle,
    spawnBullet,
    updateBullets
};