// import * as dotenv from 'dotenv';

// dotenv.config();

// let PORT = process.env.PORT || 1989;

// const a = 3;
// const b = 3;
// const url = `http://localhost:8000/calculator?a=${a}&b=${b}`;
/*
hay que hacer una funcion con todas las operaciones pasadas por parametros 

*/
// console.log('ey!');

import { program } from 'commander';
import 'dotenv/config';
import { createServer } from 'http';

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
  if (req.method !== 'GET') {
    server.emit('error', new Error(`Unsupported method ${req.method}`));
    console.log(req.method, req.url, 'Hola Mundo');
  }

  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 202;
  res.write('<h1>Calculadora!</h1>');
  res.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log(`Listening on port ${PORT}`);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});

/*const server = http.createServer((request, Response) => {
  function calculator(a: number, b: number) {
    let sum = a + b;
    let rest = a - b;
    let mult = a * b;
    let div = a / b;

    return sum, rest, mult, div;
  }
});*/
