/**
 * LYY STORE - OFFICIAL JAVASCRIPT
 * Gabungan Slider, Search Filter, Smooth Scroll, dan Sistem Pembayaran
 */

// --- 1. SLIDER LOGIC ---
let index = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(n) {
    if (slides.length === 0) return;
    slides.forEach(s => s.classList.remove("active"));
    index = (n + slides.length) % slides.length;
    slides[index].classList.add("active");
}

window.changeSlide = (step) => showSlide(index + step);
if (slides.length > 0) setInterval(() => showSlide(index + 1), 5000);


// --- 2. SEARCH ENGINE LYY STORE ---
window.searchProduct = function() {
    const inputElement = document.getElementById('searchInput');
    const input = inputElement.value.toLowerCase().trim();
    const targetIds = ["drip", "aimlock", "fluorite"];
    let foundId = targetIds.find(id => input.includes(id));

    if (foundId) {
        const element = document.getElementById(foundId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.transition = "all 0.5s ease";
            element.style.transform = "scale(1.05)";
            element.style.boxShadow = "0 0 20px 5px rgba(255, 128, 0, 0.7)";
            element.style.zIndex = "10";

            setTimeout(() => {
                element.style.transform = "scale(1)";
                element.style.boxShadow = "none";
                element.style.zIndex = "1";
            }, 5000);
        }
    } else {
        // GANTI ALERT BIASA DENGAN INI:
        
        Swal.fire({
            title: 'Produk Tidak Ditemukan',
            text: `Maaf, "${input}" tidak tersedia.`, // Memakai backtick (`) dan ${input}
            icon: 'error',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#ff9800',
            customClass: {
                popup: 'my-custom-alert' // Harus sama dengan di CSS
            }
        }); // Penutup Swal.fire
    } // Penutup blok 'else'
}; // Penutup window.searchProduct (Ini yang menyebabkan baris 22 merah)


// --- 3. GLOBAL EVENT HANDLER (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {

    const btnTopup = document.getElementById('btn-pay');
    
    // -- A. Logika Input Search (Enter Key) --
    const inputField = document.getElementById('searchInput');
    if (inputField) {
        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                window.searchProduct();
            }
        });
    }

    // -- B. LOGIKA PEMBAYARAN --
    const btnBayar = document.getElementById('btn-konfirmasi-bayar');
    if (btnBayar) {
        btnBayar.addEventListener('click', function() {
            // Ambil data dari modal secara dinamis
            const namaProduk = document.querySelector('.product-title')?.innerText || "Produk Lyy Store";
            const hargaTeks = document.querySelector('.total-price')?.innerText || "0";
            const totalBayar = parseInt(hargaTeks.replace(/[^0-9]/g, ''));
            
            // Ambil nomor WA dari input
            const inputWA = document.querySelector('input[placeholder*="08"]');
            const nomorWA = inputWA ? inputWA.value.trim() : "";

            // Validasi
            if (!nomorWA || nomorWA.length < 10) {
                alert("Wajib masukkan nomor WhatsApp agar mendapatkan key/apk produk!");
                return;
            }

            // Simpan data ke localStorage
            const dataOrder = {
                produk: namaProduk,
                total: totalBayar,
                wa: nomorWA,
                date: new Date().getTime()
            };
            
            localStorage.setItem('pendingOrder', JSON.stringify(dataOrder));

            // Arahkan ke halaman pembayaran
            window.location.href = 'pembayaran.html';
        });
    }
});

// Fungsi Global untuk pemanggilan manual
window.checkEnter = function(e) {
    if (e.key === "Enter") {
        window.searchProduct();
    }
};