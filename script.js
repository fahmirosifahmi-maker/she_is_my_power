const startScreen = document.getElementById('startScreen');
const storyScreen = document.getElementById('storyScreen');
const btnOpen = document.getElementById('btnOpen');
const bgMusic = document.getElementById('bgMusic');
const storyText = document.getElementById('storyText');

// Naskah Cerita Asli Lu
const cerita = [
    "Hai...",
    "Mungkin ini agak tiba-tiba.",
    "Tapi ada sesuatu yang pengen gw sampein.",
    "Masih inget gak pertama kali kita ketemu?",
    "mungkin lu inget, dulu pas kelas 10 Bu Agustin minta buat grup kelas, terus lu nyamperin gw.",
    "pertama kali kenal sama lu lucu aja, suara lu kecil, terus pendek juga hahahahahh.",
    "makin lama kenal lu...",
    "Ternyata jujur gw nyaman sama lu, awalnya gw mikir buat jadiin lu penyemangat belajar aja, tapi makin lamban tahun rasa ini makin menggebuk.",
    "gw sadar ada yang beda dari perasaan gw waktu itu.",
    "ahh rasanya seneng aja gitu Nis bisa kenal sama lu, walau sebatas teman.",
    "jujur disatu sisi gw minta maaf ya Nis karena waktu itu gw sempet bikin lu risih.",
    "gw tau, gak ada manusia yang sempurna di dunia ini.",
    "Tapi...",
    "Kalo menjadi sempurna bisa bikin lu bahagia...",
    "Tolong kasih gw waktu untuk belajar menerima itu...",
    "Karena gw terlanjur mencintai ketidaksempurnaan lu.",
    "Gw harap lu bisa menemukan apa yang lu cari."
];

let clickCount = 0;

// Logika pas tombol diklik
btnOpen.addEventListener('click', (e) => {
    e.stopPropagation();
    bgMusic.play(); // Putar lagu
    startScreen.classList.add('hidden'); // Hilangkan tombol
    storyScreen.classList.remove('hidden'); // Munculkan layar cerita
    storyText.innerHTML = cerita[0]; // Tampilkan teks pertama
});

// Logika pas layar diketuk buat ganti teks
storyScreen.addEventListener('click', () => {
    if (clickCount < cerita.length - 1) {
        // Efek teks ngilang
        storyText.classList.add('fade-out');
        
        setTimeout(() => {
            clickCount++;
            
            // Ngecek kalo ini adalah 3 baris terakhir, ubah warnanya jadi estetik (final-quote)
            if (clickCount >= cerita.length - 3) {
                storyText.classList.add('final-quote');
            }
            
            // Ganti teks dan munculin lagi
            storyText.innerHTML = cerita[clickCount];
            storyText.classList.remove('fade-out');
        }, 1000); // Teks hilang selama 1 detik sebelum muncul teks baru
    }
});

// ==========================================
// EFEK ANIMASI PARTIKEL INTERAKTIF (KURSOR / HP)
// ==========================================

function createParticle(x, y) {
    const symbols = ['✨', '❤️', '💖', '🌸']; // Bentuk partikelnya
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Pilih simbol random
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Atur posisi sesuai titik klik/sentuh
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Ukuran random biar natural
    particle.style.fontSize = Math.random() * 15 + 15 + 'px';
    
    document.body.appendChild(particle);
    
    // Hapus elemen setelah animasi terbangnya kelar (1 detik) biar ga ngelag
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// 1. Kalo layar diklik / ditap di mana aja (Ngeluarin ledakan partikel)
window.addEventListener('click', (e) => {
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            let offsetX = (Math.random() * 40) - 20;
            let offsetY = (Math.random() * 40) - 20;
            createParticle(e.clientX + offsetX, e.clientY + offsetY);
        }, i * 30);
    }
});

// 2. Kalo kursor digeser di laptop (Bikin jejak)
window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.3) {
        createParticle(e.clientX, e.clientY);
    }
});

// 3. Kalo layar diusap di HP (Bikin jejak)
window.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    if (Math.random() < 0.4) {
        createParticle(touch.clientX, touch.clientY);
    }
});