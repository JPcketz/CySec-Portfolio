document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.sidebar ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const scrollOffset = window.innerWidth <= 992 ? 80 : 20; 

                window.scrollTo({
                    top: offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const applySidebarDimensions = () => {
            if (window.innerWidth > 992) { 
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) {
                    canvas.width = sidebar.offsetWidth;
                    canvas.height = sidebar.offsetHeight;
                    W = sidebar.offsetWidth;
                    H = sidebar.offsetHeight;
                }
            } else { 
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                W = window.innerWidth;
                H = window.innerHeight;
            }
        };

        applySidebarDimensions(); 

        const font_size = 30;
        let columns = Math.floor(W / font_size);
        let drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?';

        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 
            ctx.fillRect(0, 0, W, H); 

            ctx.shadowColor = '#00f7ffff';
            ctx.shadowBlur = 50;
            ctx.fillStyle = '#00d9ffff'; 
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

        window.addEventListener('resize', () => {
            applySidebarDimensions(); 
            columns = Math.floor(W / font_size);
            drops = []; 
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
        });
    }
});