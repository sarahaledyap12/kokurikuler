// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Dropdown Menu Functionality for Desktop
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle'); // The button/link that opens the dropdown

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent this click from bubbling up to the document listener
                const isActive = dropdown.classList.contains('active');
                // First, close all other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(d => d.classList.remove('active'));
                // Then, if the current one wasn't active, open it.
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            });
        }
    });

    // Single document-level listener to close dropdowns when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Tombol ini hanya akan relevan jika konten halamannya panjang (Bab)
    const backToTopButton = document.getElementById('back-to-top');

    // Cek apakah tombol kembali ke atas ada di halaman ini
    if (backToTopButton) {

        // Fungsi untuk menampilkan atau menyembunyikan tombol saat scrolling
        window.addEventListener('scroll', () => {
            // Tampilkan tombol jika scroll lebih dari 300px
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        // Fungsi untuk aksi saat tombol diklik
        backToTopButton.addEventListener('click', () => {
            // Scroll ke posisi paling atas halaman
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.bab-card, .system-item, .content-block, .key-takeaways').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
