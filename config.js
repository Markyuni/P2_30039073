module.exports = {
	// Datos para envío de Nodemailer
	HOST: process.env.HOST || 'smtp.hostinger.com',
	AUTH_USER_FROM: process.env.AUTH_USER_FROM || 'test009@arodu.dev',
	AUTH_PASS: process.env.AUTH_PASS || 'eMail.test009',
	TO: process.env.TO || 'jesusorlandoramirezsierra@yahoo.com.ve',
	SUBJECT: process.env.SUBJECT || 'Envío de datos',
	// Llave privada de reCAPTCHA
	PRIVATE_KEY: process.env.PRIVATE_KEY || '6LeMHU0mAAAAAK5dDvya0gcFwBrP6olRxkQzjzr0',
	// Usuario, correo y contraseñas de entrada
	FAKE_USERNAME: process.env.FAKE_USERNAME || 'randomUsername1243',
	FAKE_EMAIL: process.env.FAKE_EMAIL || 'anotherRandom1243@email.com',
	FAKE_PWD: process.env.FAKE_PWD || 'otherFakePassword1243'
}