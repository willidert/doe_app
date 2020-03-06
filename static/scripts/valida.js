function capital_letters (str){
    str = str.split(" ")

    for(let i = 0; i < str.length; i++){
        str[i] = str[i][0].toUpperCase() + str[i].substr(1)
    }
    return str.join(" ")
}

function not_blank(doador) {
    if(doador[0] == "" || doador[1] == "" || doador[2] == ""){
        return false
    }
    return true
}

module.exports = {capital_letters, not_blank}