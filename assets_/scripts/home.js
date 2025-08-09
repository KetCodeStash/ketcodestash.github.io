import pathsHandler from "./pathHandler.js"; 
let prevPreviewId 
let webLaunched = false

// function setupButtons(){
//     const aspecRatio = $(window).width()/$(window).height()
//     if(aspecRatio>=4/3){
//         isVertical=false
//         $(".hint").hide();
//         $(".action-buttons").on('mouseenter',(event)=>{
//             if(isVertical){return}
//             writeDesc($(event.target).text());
//             onHoverAnimation(event.type, $(event.target).attr('id'))
//         })
//         $(".action-buttons").on('mouseleave',(event)=>{
//             if(isVertical){return}
//             writeDesc("Home");
//             onHoverAnimation(event.type, $(event.target).attr('id'))
//         })
//     }else{
//         isVertical=true
//         $(".hint").show();
//     }
//     $("button").on('click', (event)=>{
//         onClick(event.target)
//     })    
// }

function displayProjects(paths){
    paths.Games.forEach((path) => {
        $('#dummy').clone()
        .appendTo('.project-list')
        .attr('id', path)
        .children('.project-name')
        .html(path);
    });
    $('#dummy').remove();
}


function loadData(){
    pathsHandler.fetchJson();
    let id = setInterval(()=>{
        let paths = pathsHandler.listData()
        if(paths){
            console.log(paths)
            displayProjects(paths);
            clearInterval(id);
        }
    }, 1000)
}

function showPreview(e){
    let newSelectedId
    if($(e.target).attr('class') == 'projects'){
        newSelectedId = $(e.target).attr('id');
    }else{
        newSelectedId = $(e.target).parent().attr('id');
    }
    if(newSelectedId==prevPreviewId){
        $('.preview-container').css('left', '100%');
        $(`#${prevPreviewId}`).css('background-color', 'transparent');
        prevPreviewId=null;
        return;
    }
    if(prevPreviewId){
        $(`#${prevPreviewId}`).css('background-color', 'transparent');
        $('.preview-container').animate({left: '100%'}, "2s");
        $('.preview-container').animate({left: '0%'}, "2s");
    }
    $(`#${newSelectedId}`).css('background-color', '#0095ff');
    $('.preview-container').css('left', '0%');
    prevPreviewId=newSelectedId;
}


$(onWebLoaded)
$(window).on('resize', onWebLoaded)
function onWebLoaded(){
    if(webLaunched==false){
        webLaunched=true
        loadData()
    }

    $('.nav-links').on('click', (e)=>{
        console.log();
        window.location.href = $(e.target).children('a').attr('href');
    })

    $('.projects').on('click', showPreview)
}