import { program } from 'commander';
import 'dotenv/config';
import { createServer } from 'http';
import * as url from 'url';

let PORT = process.env.PORT || 3000;

program.option('-v, --version');

program.parse();
const options = program.opts();

if (options.version) {
  console.log('version 1.0.0');
  process.exit(0);
}

if (options.port) {
  console.log(options.port);
  PORT = options.port;
}

const server = createServer((req, res) => {
  //http://localhost:3000/calculator?a=6&b=3
  let queryData = url.parse(req.url, true).query;
  console.log(req.url);

  //modify response, modificar respuesta
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  //comprobar si la variable a existe en la url
  if (queryData.a && queryData.b) {
    //res.end('Tu numero es:  ' + queryData.a + '\n');
    let a = +queryData.a;
    let b = +queryData.b;
    //con el +justo despues de la propiedad queryData le fuerzo a que sea un numero

    res.end(`
      a = ${a} b= ${b} suma = ${a + b}  \n
      a = ${a} b= ${b} resta = ${a - b} \n
      a = ${a} b= ${b} multiplicacion = ${a * b}  \n
      a = ${a} b= ${b} division = ${a / b}  \n
    `);
    // dentro de res end meto el codigo html
  } else {
    res.end('Igual te falta un número! a \n');
  }
});

server.listen(PORT);

server.on('listening', () => {
  console.log(`Listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
