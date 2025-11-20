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

    contactForm.addEventListener('submit', function(e) {
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
            
            formStatus.innerHTML = '<div class="alert alert-info">Mengirim pesan Anda...</div>';

            setTimeout(() => {
                formStatus.innerHTML = '<div class="alert alert-success">Terima kasih! Pesan Anda telah diterima. (Integrasi Google Sheets akan ditambahkan di sini)</div>';
                
                
                [inputNama, inputEmail, inputPesan].forEach(input => input.classList.remove('is-valid', 'is-invalid'));
                contactForm.reset();
            }, 1500);

        } else {
           
            formStatus.innerHTML = '<div class="alert alert-danger">Mohon lengkapi semua kolom yang wajib diisi.</div>';
        }
        
    });

});