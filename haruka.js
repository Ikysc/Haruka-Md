const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Mendapatkan path file yang diminta oleh client
  const filePath = path.join(__dirname, 'index.html');

  // Membaca isi file index.html
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      // Mengirimkan respon error jika gagal membaca file
      res.writeHead(500);
      res.end('Error loading index.html');
    } else {
      // Mengirimkan respon dengan isi file index.html
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(content);
    }
  });
});

server.listen(8080, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:8080/');
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
