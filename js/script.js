console.log("Aplikasi Beranda LKS Cloud Dimuat (index.html)");
console.log("Memulai Proses fetch data untuk fitur dinamis");

const randomId = Math.floor(Math.random() * 100) + 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`)
.then(Response =>{
    console.log(`Data API ID ${randomId} Berhasil Diterima. Status:`, Response.status)
    return Response.json()
})
.then(data =>{
    const apiDiv = document.getElementById('data-api')
    if(apiDiv) {
        apiDiv.innerHTML = `
        <h4>Contoh Data Yang Diambil Secara Acak </h4>
        <strong>Judul:</strong> ${data.title} <br>
        <strong>Isi:</strong> ${data.body.substring (0, 100)}...
        `;
    }
})
.catch(error =>{
    console.error("Terjadi Masalah saat mengambil data API", error);
    const apiDiv = document.getElementById('data-api');
    if(apiDiv) apiDiv.textContent = 'Gagal memuat data API.';
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('live-clock').textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = "☀️ Light Mode";
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = "☀️ Light Mode";
    }
});