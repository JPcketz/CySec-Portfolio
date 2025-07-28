document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.sidebar ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Adjust scroll position to account for any fixed headers/sidebars
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // You might need to fine-tune this offset (e.g., -80 for a fixed header)
                const scrollOffset = window.innerWidth <= 992 ? 80 : 20; // Adjust for mobile sidebar height

                window.scrollTo({
                    top: offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Matrix Rain Effect for Canvas
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        // Ensure canvas width/height matches sidebar when on larger screens
        const applySidebarDimensions = () => {
            if (window.innerWidth > 992) { // Apply only on larger screens where sidebar is fixed
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    canvas.width = sidebar.offsetWidth;
                    canvas.height = sidebar.offsetHeight;
                    W = sidebar.offsetWidth;
                    H = sidebar.offsetHeight;
                }
            } else { // Revert to full window on smaller screens
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                W = window.innerWidth;
                H = window.innerHeight;
            }
        };

        applySidebarDimensions(); // Apply initially

        const font_size = 30;
        let columns = Math.floor(W / font_size);
        let drops = [];

        // Initialize drops array
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

        function drawMatrix() {
            // Fading effect for the "rain trail"
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slight black transparency
            ctx.fillRect(0, 0, W, H); // This gradually fades previous frames

            ctx.fillStyle = '#00ffccff'; // Bright neon green
            ctx.font = `${font_size}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > H && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        function animate() {
            drawMatrix();
            requestAnimationFrame(animate);
        }
        animate();

        // Resize canvas when window is resized
        window.addEventListener('resize', () => {
            applySidebarDimensions(); // Re-apply dimensions based on screen size
            columns = Math.floor(W / font_size);
            drops = []; // Reset drops for new column count
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        });
    }
});