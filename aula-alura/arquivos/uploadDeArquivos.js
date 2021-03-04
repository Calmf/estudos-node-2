const fs = require('fs')
/*
fs.readFile('../assets/salsicha.jpg', (erro, buffer) =>
{
	console.log('imagem foi bufferizada');
	console.log(buffer);
});
*/

fs.createReadStream('./assets/salsicha.jpg')
	.pipe(fs.createWriteStream('./assets/salsicha-stream.jpg', ))
	.on('finish', () =>
		{
			console.log('Acabou')
		});