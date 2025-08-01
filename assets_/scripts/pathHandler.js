function fetchPaths(){ 
    return 
    function onFailed(){
        console.log("Server: JSON Paths.json didn't load")
    }
}

function checkPath(currentPage, TargetPaths){
    const paths = fetchPaths()
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
    if(currentPage.search("Home") ){
        document.location.href = `list.html?path=${encodeURIComponent(TargetPage)}`;
    }else if(checkPath()){
        document.location.href = `${currentPage}/${TargetPage}`
    }else{
        alert("Seems like you are off-track, let's go back!")
    }
}

function listPaths(str){

    return fetchPaths()[str]
}

export {
    movePage,
    listPaths
}