//this will be made, but later

function normalizeMove(data){
    if(typeof data === "string"){
        data = JSON.parse(data);
    }
    return {data}
};

module.exports = {normalizeMove};