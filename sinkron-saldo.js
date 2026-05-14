// sinkron-saldo.js
import { auth, db } from "./firebase-config.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        
        // Memantau perubahan data secara real-time
        onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                const saldoAngka = data.balance || 0;
                const saldoFormatted = parseInt(saldoAngka).toLocaleString('id-ID');

                // 1. Update Saldo di Navbar (semua halaman)
                const elNavbar = document.querySelector(".saldo-navbar");
                if (elNavbar) elNavbar.innerText = `Rp ${saldoFormatted}`;

                // 2. Update Saldo di Halaman Produk (image_47e5d6.png)
                const elProduk = document.querySelector("#saldo-display");
                if (elProduk) elProduk.innerText = `(Saldo: Rp ${saldoFormatted})`;

                // 3. Update Saldo di Halaman Profil (image_47e89c.png)
                const elProfil = document.querySelector(".saldo-besar-profil");
                if (elProfil) elProfil.innerText = `Rp ${saldoFormatted}`;
            }
        });
    }
});