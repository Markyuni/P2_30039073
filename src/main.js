const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req,res) => {
	res.send({
		message: "Hola Mundo | Estudiante: Jesús Ramírez | C.I.: 30.039.073 | Sección: '1'"
	});
});

app.listen(port, () => {
	console.log("Escuchando al puerto 4000 en http::/localhost:" + 4000);
});

