import { movePage } from "./pathHandler.js";
const textarea = document.querySelector('textarea')
const desc = {
    "main": [
        "Welcome to KetCodeStash",
        "This is my little web project where I combined all of my web app to one Git page. Here you can play all sort of fun games or use some tools that might be useful. also if you wanna read the story behind all this projects, you can check out my blog",
        "Enjoy your stay! ^^"
    ],
    "Games": [
        "Games",
        "This is where I store all my games. Everything here is made only with HTML, CSS, and JavaScript. for now everything here doesn't have any save yet soo if you reach any milestone or record just take a screenshot of it ",
        "Have fun!"
    ],
    "Blogs": [
        "Blogs",
        "This is where I put my blogs about all of my projects. Not only the project that I put in here but this also include some other projects outside of Web developing, like Games, Systems, and Hardware. Hope I could reach all of that goals someday",
        "Happy reading!"
    ],
    "Utilities": [
        "Utilities",
        "This is where I put all of my web tools app. Usually a project from a study course. Some of this include something like calculator, templetes, and etc",
        "Hope you found something useful in here :3"
    ]
}


function writeDesc(name){
    const textarea = document.querySelector('textarea');
    const summary = desc[name];
    textarea.value = ""

    summary.forEach(write)
    function write(text){
        textarea.value = `${textarea.value}${text}\n\n`;
    }
}

function createButtonEventListener(button){
    button.addEventListener('mouseenter', () => {
      writeDesc(button.textContent);
    });

    button.addEventListener('mouseleave', () => {
      writeDesc('main');
    });
    button.addEventListener('click', () => {
        console.log('clicked')
        movePage(location.pathname, button.textContent);
    })
    console.log(`${button.textContent} eventListener set!`)
}

function onWebLoaded(){
    const buttons = document.querySelectorAll('button');   
    writeDesc('main')
    buttons.forEach(createButtonEventListener);
    
}

document.addEventListener('DOMContentLoaded', onWebLoaded);