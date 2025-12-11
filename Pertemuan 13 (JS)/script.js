document.addEventListener('DOMContentLoaded', function() {
    
    const customToggler = document.querySelector('.container-custom');
    const navbarCollapse = document.getElementById('navbarNav');

    // Kontrol Animasi SVG Hamburger
    if (customToggler && navbarCollapse) {
        navbarCollapse.addEventListener('show.bs.collapse', function () {
            customToggler.classList.add('active');
        });

        navbarCollapse.addEventListener('hide.bs.collapse', function () {
            customToggler.classList.remove('active');
        });
    }

    // Smooth Scroll & Tutup Menu Setelah Klik
    document.querySelectorAll('#navbarNav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, 
                    behavior: 'smooth'
                });

                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                    if (customToggler) {
                        customToggler.classList.remove('active');
                    }
                }
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    const inputNama = document.getElementById('nama');
    const inputEmail = document.getElementById('email');
    const inputPesan = document.getElementById('pesan');

    // ===== URL GOOGLE APPS SCRIPT =====
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx_XiVlFLBtO90JlVQe2zLyzdUQEqCzzOK4nhDs77l8CnxSS9jPf9xj7HHJ6f_YNwLq_w/exec';
    // ==================================

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let isValid = true; 

        const validateInput = (inputElement) => {
            inputElement.classList.remove('is-invalid', 'is-valid'); 
            
            if (inputElement.value.trim() === '') {
                inputElement.classList.add('is-invalid');
                isValid = false;
            } else {
                inputElement.classList.add('is-valid');
            }
        };

        validateInput(inputNama);
        validateInput(inputEmail);
        validateInput(inputPesan);
        
        if (isValid) {
            // Tampilkan loading
            formStatus.innerHTML = '<div class="alert alert-info">Mengirim pesan Anda...</div>';

            // Kirim data ke Google Sheets
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.result === 'success') {
                    formStatus.innerHTML = '<div class="alert alert-success"><strong>✅ Berhasil!</strong> Pesan Anda telah tersimpan di Google Sheets. Terima kasih!</div>';
                    
                    // Reset form dan validasi
                    [inputNama, inputEmail, inputPesan].forEach(input => input.classList.remove('is-valid', 'is-invalid'));
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Gagal mengirim data');
                }

            } catch (error) {
                console.error('Error:', error);
                formStatus.innerHTML = '<div class="alert alert-danger"><strong>❌ Error!</strong> Terjadi kesalahan saat mengirim pesan. Pastikan URL Apps Script sudah benar.</div>';
            }

        } else {
            formStatus.innerHTML = '<div class="alert alert-danger">Mohon lengkapi semua kolom yang wajib diisi.</div>';
        }
        
    });

});
