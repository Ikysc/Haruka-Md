const { spawn } = require('child_process');

// Fungsi untuk memulai ulang skrip setelah keluar
function startHaruka() {
  console.log('Memulai kembali skrip Haruka...');
  const haruka = spawn('node', ['haruka.js']);

  haruka.stdout.on('data', (data) => {
    console.log(`Output: ${data}`);
  });

  haruka.stderr.on('data', (data) => {
    console.error(`Kesalahan: ${data}`);
  });

  haruka.on('exit', (code) => {
    console.log(`Proses Haruka berhenti dengan kode keluar ${code}`);
    // Mulai ulang skrip setelah 1 detik
    setTimeout(startHaruka, 1000);
  });
}

// Memulai skrip Haruka saat aplikasi dimulai
startHaruka();
