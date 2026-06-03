document.addEventListener('DOMContentLoaded', () => {
    // Pengaturan Navigasi Aktif saat menggulir halaman (Scroll Spy)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Deteksi jika viewport sudah mencapai bagian section tertentu
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Tambahkan class active jika href cocok dengan id section
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
        
        // Atur agar Home aktif jika berada di paling atas
        if (window.pageYOffset < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.nav-links li a[href="#home"]').classList.add('active');
        }
    });
});
