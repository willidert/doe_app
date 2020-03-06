const {capital_letters, not_blank} = require('./valida')
const {Pool} = require('pg')

// const config = {
//     user: 'jovfhlii',
//     host: 'postgres://jovfhlii:M_Cu1zuLXqwP3Ws3CYqyQM5qYT6UFuIa@drona.db.elephantsql.com:5432/jovfhlii',
//     password: "M_Cu1zuLXqwP3Ws3CYqyQM5qYT6UFuIa",
//     database: 'jovfhlii',
//     port: 5432,
// }
// versão antiga com banco local
// const db = new Pool(config)

var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://jovfhlii:M_Cu1zuLXqwP3Ws3CYqyQM5qYT6UFuIa@drona.db.elephantsql.com:5432/jovfhlii" //Can be found in the Details page
var db = new pg.Client(conString);
// db.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//   db.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     db.end();
//   });
// });

// function criarBanco(){
//   db.query(`CREATE TABLE doadores (
//     "nome" varchar(100) NOT NULL,
//     "email" varchar(100) NOT NULL,
//     "blood" varchar(3) NOT NULL)`
// }

// CREATE TABLE [IF NOT EXISTS] nome_tabela (
//   nome_coluna tipo_dados [COLLATE colação] constraint,
//   nome_coluna tipo_dados constraint,
//   nome_coluna tipo_dados constraint,
//   ...,
// [FOREIGN KEY chave_estrangeira REFERENCES coluna]
// [ON DELETE ação ] [ ON UPDATE ação ]
// )


function buscarDoadores(req, res){
//   db.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err)
//   }
  db.query(`SELECT * FROM "doadores"`, function(err, result){
    if(err) {
      return console.error('error running query', err)
    }
          // criarBanco()
          
        var donors = result.rows.slice(-4)
        db.end()
        return res.render('index.html', { donors })
    })
    // >> output: 2018-08-23T14:02:57.117Z
//   })
}
  // console.log(db)




function cadastrarDoador(req, res) {
    // db.connect(function(err) {
    // if(err) {
    //   return console.error('could not connect to postgres', err)
    // }})
    var retorno = ''
    console.log('entrei')
    var query = "SELECT * FROM doadores WHERE email = $1"
    db.query(query, [req.body.email], function (err, result) {
        if(err) {
            retorno = 'Erro na validação'
          }
        else if(result.rows.length > 0 ) retorno = 'Doador já cadastrado'
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
          if(err) {
            db.end()
            return res.send('erro no banco')
          }
          if(retorno != '') {
            db.end()
            return res.send(retorno)
            }
          db.end()
          return res.redirect('/')
        })
    } else {
      db.end()
      return res.send('Campo em branco')
    }
    // alert
}

// deletar e atualizar



module.exports = { buscarDoadores, cadastrarDoador }