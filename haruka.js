const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



const { spawn } = require('child_process')

function start() {
	let args = [path.join(__dirname, 'index.js'), ...process.argv.slice(2)]
	console.log([process.argv[0], ...args].join('\n'))
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...')
			p.kill()
			start()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == "." || code == 1) start()
	})
}
start()
