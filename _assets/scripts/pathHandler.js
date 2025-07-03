import paths from "./paths.js";

function checkPath(currentPage, TargetPaths){
    if(!paths[currentPage.replace("/", "")]){
        return false;
    }
    const path = paths[currentPage];
    if(!path[TargetPaths]){
        return false;
    }
    return true
}

function movePage(currentPage, TargetPage){
    console.log('run')
    if(currentPage.search("Home") ){
        document.location.href = `/${TargetPage}`;
    }else if(checkPath()){
        document.location.href = `${currentPage}/${TargetPage}`
    }else{
        alert("Seems like you are off-track, let's go back!")
    }
}

export {
    movePage
}