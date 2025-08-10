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
    // console.log(deg)
    assets.plr.style.transform = `rotate(${deg}deg)`;
}
function createNewElement(className){
    const parent = document.getElementById('parent');
    const bullet = document.createElement("div");
    bullet.setAttribute("class", className)
    parent.appendChild(bullet);
    return bullet;
}
function calcBulletDirectionsSpeed(){
    let pointX = gameVal.PlrX-gameVal.MouseX;
    let pointY = gameVal.PlrY-gameVal.MouseY;
    if(pointX<pointY){
        pointY/=pointY;
        pointX/=pointY;
    }else{
        pointX/=pointX;
        pointY/=pointX;
    }
    console.log(pointX+', '+pointY)
    return {
        x : pointX,
        y : pointY
    }
}

function spawnBullet() {
    const bullet = createNewElement('bullet')

    const directionSpeed = calcBulletDirectionsSpeed()
    
    const xSpd = document.createAttribute('xSpd')
    xSpd.value = String(directionSpeed['x']) 
    const ySpd = document.createAttribute('ySpd')
    ySpd.value = String(directionSpeed['y'])
    const lifespan = document.createAttribute('lifespan') 
    lifespan.value = '500';

    bullet.setAttributeNode(lifespan);
    bullet.setAttributeNode(xSpd);
    bullet.setAttributeNode(ySpd);
}
function updateBullets() {
    const bulletsElm = document.getElementsByClassName('bullet')
    const bullets = [...bulletsElm];
    bullets.forEach(bullet => {
        const lifespan = Number(bullet.getAttribute('lifespan'))
        if (lifespan<=0) {
            bullet.remove()
            return
        }
        const xSpd = Number(bullet.getAttribute('xSpd'))
        const ySpd = Number(bullet.getAttribute('ySpd'))
        const xPos = bullet.offsetLeft-xSpd;
        const yPos = bullet.offsetTop-ySpd;
        bullet.style.left = `${xPos}px`
        bullet.style.top = `${yPos}px`
        // console.log(xPos+', '+yPos)
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