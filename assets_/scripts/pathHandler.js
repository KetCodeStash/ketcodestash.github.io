let pathsData
const paths = {
    fetchJson: fetch,
    listData: listData
}



function listData(){
    if(pathsData==undefined){
        return false;
    }
    return pathsData;
}

export default paths 