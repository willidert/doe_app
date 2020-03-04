function capital_letters (str){
    str = str.split(" ")

    for(let i = 0; i < str.length; i++){
        str[i] = str[i][0].toUpperCase() + str[i].substr(1)
    }
    return str.join(" ")
}

function not_blank(doador) {
    if(doador.nome == "" || doador.email == "" || doador.blood == ""){
        return false
    return true
    }
}

module.exports = {capital_letters, not_blank}