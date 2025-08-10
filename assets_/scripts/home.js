let prevPreviewId 
let webLaunched = false
let projectsDataBuffer = {

}

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

async function fetchData(links) {
    const data = await $.ajax({
        type: "GET",
        url: links,
        dataType: "json",
    });
    if(data){
        return data;
    }
    return false
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showPreview(e){
    let newSelectedId
    if($(e.target).attr('class') == 'projects'){
        newSelectedId = $(e.target).attr('id');
    }else{
        newSelectedId = $(e.target).parent().attr('id');
    }
    if(newSelectedId==prevPreviewId){
        $('.preview-container').css('left', '100%');
        $(`#${prevPreviewId}`).css('background-color', 'transparent');
        prevPreviewId=undefined;
        return;
    }
    if(prevPreviewId){
        $(`#${prevPreviewId}`).css('background-color', 'transparent');
        $('.preview-container').animate({left: '100%'}, "100ms");
        $('.preview-container').animate({left: '0%'}, "100ms");
        await sleep(380)
    }
    
    $('.preview-container').children('.preview-title').html(projectsDataBuffer[newSelectedId].title)
    $('.preview-container').children('.preview-desc').html(projectsDataBuffer[newSelectedId].desc)
    $(`#${newSelectedId}`).css('background-color', '#0095ff');
    $('.preview-container').css('left', '0%');
    console.log(prevPreviewId+'/'+newSelectedId)
    prevPreviewId=newSelectedId;
}


function display(projectData){
    $('#dummy').clone()
        .appendTo('.project-list')
        .attr('id', projectData.title);

    $(`#${projectData.title}`).children('.project-name').html(projectData.title)
    $(`#${projectData.title}`).children('.project-date').html(`made: ${projectData.made} updated: ${projectData.updated}`)

    $(`#${projectData.title}`).show()    
    $(`#${projectData.title}`).on('click', showPreview)
    return true
}


async function getProjectData(project) { 
    const projectData = await fetchData(`/Projects/${project}/assets_/data/Home_Data.json`)
    await display(projectData)
    console.log(project)
    projectsDataBuffer[project] = projectData;
}
function displayProjects(projects){
    if(webLaunched){return}
    webLaunched=true
    projects.Games.forEach(getProjectData);
    
}




$(onWebLoaded)
$(window).on('resize', onWebLoaded)
async function onWebLoaded(){
    $('#dummy').hide()  
    const projects = await fetchData('/assets_/data/paths.json');
    if(projects){
        await displayProjects(projects)
    }
    

    console.log('hell')
    $('.nav-links').on('click', (e)=>{

        window.location.href = $(e.target).children('a').attr('href');
    })
    $('.start-button').on('click', (e)=>{
        window.location.href = `/Projects/${prevPreviewId}`        
    })
}