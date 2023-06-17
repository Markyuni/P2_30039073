var express = require('express');
const config = require('../config');
const db = require('../database');
const axios = require('axios');
const nodemailer = require('nodemailer');
var router = express.Router();

// GET login page.
// La pagina de login es la pagina principal
router.get('/', function(req, res, next) {
  let user = req.body.user
  let email = req.body.email
  let pwd = req.body.pwd
  res.render('login');

  // Toma los datos del cuerpo de la pagina y los compara con los datos guardados en las variables de entorno
  // Estos datos son de prueba y seran cambiados por variables de entorno en Render al terminar
  // Dichos datos de prueba estan en config.js, por si preguntas
  if (user == config.FAKE_USER && email == config.FAKE_EMAIL && pwd == config.FAKE_PWD) {
    db.select(function (rows) {
      // Se supone que al verificar que los datos sean correctos, deberia renderizarse la pagina de contactos
      // Pero no se renderiza, y no se por que
      res.render('/contactos', {rows: rows});
    });
  } else {
    res.render('/', { error: 'Datos incorrectos' });
  }
});

// GET contacts page.
router.get('/contactos', function(req, res, next) {
  res.render('contactos');
});

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index');
});

router.post('/', async function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); // @todo falta formatear la fecha
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // @todo falta formatear la ip

  const myIP = ip.split(",")[0];

  axios.get(`http://ip-api.com/json/186.92.93.151?fields=country`).then((res) => { /* local */

  // axios.get(`http://ip-api.com/json/${myIP}`).then((res) => {                         /* render */
    const pais = res.data.country;

    console.log({ name, email, comment, date, myIP, pais });

    db.insert(name, email, comment, date, myIP, pais);

    const transporter = nodemailer.createTransport({
      host: config.HOST,
      port: 465,
      secure: true,
      auth: {
        user: config.AUTH_USER_FROM,
        pass: config.AUTH_PASS
      }
    });

    const mailOptions = {
      from: config.AUTH_USER_FROM,
      to: config.TO,
      subject: config.SUBJECT,
      text: 'Datos de formulario:\nCorreo: ' + email + '\nNombre: ' + name + '\nComentario: ' + comment + '\nFecha: ' + date + '\nIP: ' + myIP + '\nPaís: ' + pais
    }

    transporter.sendMail(mailOptions, function(error,info){
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  }).catch((error)=>{
    console.log(error)
  })

  res.redirect('/');
});

router.post('/contactos', function(req, res, next) {
  db.select(function (rows) {
    console.log(rows);
  });
  res.redirect('/');
});

module.exports = router;
