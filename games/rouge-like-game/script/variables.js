let gameVariables = {}

gameVariables.Plr = document.getElementById('triangle');

gameVariables.PlrX=gameVariables.Plr.offsetLeft;
gameVariables.PlrY=gameVariables.Plr.offsetTop;
gameVariables.gun
gameVariables.MouseX=0;
gameVariables.MouseY=0;
gameVariables.InputBuffer = {
    w: false,
    s: false,
    d: false,
    a: false,
}

export default gameVariables;