var express = require('express');
const config = require('../config');
const db = require('../database');
const axios = require('axios');
const nodemailer = require('nodemailer');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

// GET contacts page.
router.get('/contactos', function(req, res, next) {
  db.select((rows) => {
    console.log(rows);
    res.render("contactos", { data: rows });
  });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let comment = req.body.comment;
  let date = new Date(); // @todo falta formatear la fecha
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // @todo falta formatear la ip

  const myIP = ip.split(",")[0];

  // axios.get(`http://ip-api.com/json/186.92.93.151?fields=country`).then((res) => { /* local */

  axios.get(`http://ip-api.com/json/${myIP}`).then((res) => {                         /* render */
    const pais = res.data.country;

    console.log({ name, email, comment, date, myIP, pais });

    db.insert(name, email, comment, date, myIP, pais);

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      secure: process.env.SECURE,
      auth: {
        user: process.env.AUTH_USER_FROM,
        pass: process.env.AUTH_PASS
      }
    });

    const mailOptions = {
      from: process.env.AUTH_USER_FROM,
      to: process.env.TO,
      subject: 'Envío de datos',
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

  res.redirect('/login');
});

router.post('/login', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.pwd;

  console.log({ name, email, password });

  if (name === process.env.FAKE_USER && email === process.env.FAKE_EMAIL && password === process.env.FAKE_PWD) {
    db.select(function(rows) {
      console.log(rows);
      res.redirect('/contactos');
    })
  } else {
    res.redirect('/login');
  };
});

router.post('/contactos', function(req, res, next) {

  db.select(function (rows) {
    console.log(rows);
    res.redirect('contactos');
  });
});

module.exports = router;
