const {capital_letters, not_blank} = require('./valida')
const {Pool} = require('pg')

const config = {
    user: 'rocket',
    host: '127.0.0.1',
    password: "0000",
    database: 'mydb',
    port: 5432,
}

const db = new Pool(config)


function buscarDoadores(req, res){
    db.query('SELECT * FROM doadores', function(err, result){
        if(err) return res.send('error')
        var donors = result.rows.slice(-4)    
        return res.render('index.html', { donors })
    })
}



function cadastrarDoador(req, res) {
    var retorno = ''
    var query = "SELECT * FROM doadores WHERE email = $1"
    db.query(query, [req.body.email], function (err, result) {
        if(err) retorno = 'Erro na validação'
        if(result.rows.length > 0 ) retorno = 'Doador já cadastrado'
    })

    query = `
    INSERT INTO doadores ("nome", "email", "blood")
    VALUES ($1, $2, $3)
    `
    const doador = [
        capital_letters(req.body.name),
        req.body.email,
        req.body.blood
    ]

    if (not_blank(doador)) {
        db.query(query, doador, function(err){
        if(err) return res.send('erro')
        if(retorno != '') return res.send(retorno)
        return res.redirect('/')
    })
    } else return res.send('Campo em branco')
    // alert
}

// deletar e atualizar



module.exports = { buscarDoadores, cadastrarDoador }