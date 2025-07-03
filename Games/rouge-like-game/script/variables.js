import assets from "./assets.js";
let gameVariables = {}

gameVariables.PlrX=500;
gameVariables.PlrY=500;
gameVariables.gun
gameVariables.MouseX=0;
gameVariables.MouseY=0;
gameVariables.InputBuffer = {
    w: false,
    s: false,
    d: false,
    a: false,
}
gameVariables.bulletsTarget = new Map();

export default gameVariables;