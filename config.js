module.exports = {
	// Datos para envío de Nodemailer
	HOST: process.env.HOST || 'smtp.hostinger.com',
	PORT: process.env.PORT || 465,
	SECURE: process.env.SECURE || true,
	AUTH_USER_FROM: process.env.AUTH_USER_FROM || 'test009@arodu.dev',
	AUTH_PASS: process.env.AUTH_PASS || 'eMail.test009',
	TO: process.env.TO || 'jesusorlandoramirezsierra@yahoo.com.ve',
	SUBJECT: process.env.SUBJECT || 'Envío de datos',
	// Llave privada de reCAPTCHA
	PRIVATE_KEY: process.env.PRIVATE_KEY || '6LeMHU0mAAAAAK5dDvya0gcFwBrP6olRxkQzjzr0'
}