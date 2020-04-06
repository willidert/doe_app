const {capital_letters, not_blank} = require('./valida')
const {Pool} = require('pg')


const config = {
    user: 'jovfhlii',
    host: 'drona.db.elephantsql.com',
    password: "M_Cu1zuLXqwP3Ws3CYqyQM5qYT6UFuIa",
    database: 'jovfhlii',
    port: 5432,
}

const db = new Pool(config)

function buscarDoadores(req, res){
  db.connect(function(err, client, release){
    if(err){
      return console.error("Error acquiring cliente", err.stack)
    }
    client.query(`SELECT * FROM doadores`, function(err, result){
      release()
      if(err){
        return console.error("Error executing query", err.stack)
      }
      let donors = result.rows.slice(-4)
      // console.log(donors)
      return res.render('index.html', { donors })
    })
  })
}


async function cadastrarDoador(req, res) {
  // atencao aqui
  const teste = await validarEmail(req.body.email)
  
  if(!teste){
    db.connect(function(err, client, release){
      if(err){
        console.error("Error acquiring cliente", err.stack)
      }
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
          client.query(query, doador, function(err){
            release()
            if(err) {
              return res.send('erro no banco')
            }
            return res.redirect('/')
          })
      } else {
        return res.send('Campo em branco')
      }
    })
  }
  else return res.send("usuario ja cadastrado")
}


async function validarEmail(email) {
   return new Promise ((resolve, reject) => {
    db.connect( function (err, client, release) {
      if (err) {
        return console.error("Error acquiring cliente", err.stack)
      }
      let query = "SELECT * FROM doadores WHERE email = $1"
      client.query(query, [email], function (err, result) {
        release()
        if (err) {
          return console.error("Error executing query", err.stack)
        }
        const resultado = result.rows.length > 0 ? true : false
        resolve(resultado)
      })
    })
   })
}


module.exports = { buscarDoadores, cadastrarDoador }