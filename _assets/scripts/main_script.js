import { movePage } from "./pathHandler.js";
const desc = {
    "Home": [
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
    const summary = desc[name];
    $("textarea").val("")

    summary.forEach(write)
    function write(text){
        $("textarea").val(`${$('textarea').val()}${text}\n\n`);
    }

    // TODO Fix dynamic description size 
    console.log($('textarea')[0].scrollHeight)
    $('textarea').height($('textarea')[0].scrollHeight);
}

function onHoverAnimation(eventType, id){
    if(eventType == 'mouseenter'){
         $(`#${id}`).css('transform', 'scale(1)');
    }else{
        $(`#${id}`).css('transform', 'scale(0.9)');
    }
}
function onClick(b){
    if($(b).text()=='?'){
        writeDesc($(b).attr('id'));
    }else{
        movePage(location.pathname, $(b).text());
    }
}

function setupButtons(){
    const aspecRatio = $(window).width()/$(window).height()
    console.log(`${aspecRatio}/${4/3}`)
    if(aspecRatio>=4/3){
        $(".hint").hide();
        $(".action-buttons").on('mouseenter',(event)=>{
          writeDesc($(event.target).text());
          onHoverAnimation(event.type, $(event.target).attr('id'))
        })
        $(".action-buttons").on('mouseleave',(event)=>{
            writeDesc("Home");
            onHoverAnimation(event.type, $(event.target).attr('id'))
        })
    }else{
        $(".hint").show();
    }
    $("button").on('click', (event)=>{
        onClick(event.target)
    })    
}
$(onWebLoaded)
$(window).on('resize', onWebLoaded)
function onWebLoaded(){
    writeDesc("Home"); 
    setupButtons();
}