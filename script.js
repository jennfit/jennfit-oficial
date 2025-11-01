// ====== ANIMACIÓN AL HACER SCROLL ======
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todos los articles
document.querySelectorAll('article').forEach(article => {
    article.style.opacity = '0';
    article.style.transform = 'translateY(50px)';
    article.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(article);
});

// Observar imágenes de la galería
document.querySelectorAll('.galeria img').forEach((img, index) => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(img);
});

// ====== CREAR PARTÍCULAS EN EL HEADER ======
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 20, 147, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Agregar animación de flotación
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-10px, 10px);
        }
        75% {
            transform: translate(10px, 10px);
        }
    }
`;
document.head.appendChild(style);

// ====== EFECTO PARALLAX EN HERO ======
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('#inicio img');
    if (heroImg && scrolled < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 - scrolled * 0.0003})`;
    }
});

// ====== CAMBIAR ESTILO DEL NAV AL HACER SCROLL ======
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(255, 20, 147, 0.3)';
    } else {
        header.style.boxShadow = '0 5px 30px rgba(255, 20, 147, 0.5)';
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

header.style.transition = 'all 0.3s ease-in-out';

// ====== EFECTO HOVER EN CARDS DE PLANES ======
document.querySelectorAll('article').forEach(article => {
    article.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    article.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ====== CLICK EN IMÁGENES DE GALERÍA (EFECTO ZOOM) ======
document.querySelectorAll('.galeria img').forEach(img => {
    img.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.95)';
        overlay.style.zIndex = '10000';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'pointer';
        overlay.style.animation = 'fadeIn 0.3s ease';

        const imgZoom = document.createElement('img');
        imgZoom.src = this.src;
        imgZoom.style.maxWidth = '90%';
        imgZoom.style.maxHeight = '90%';
        imgZoom.style.borderRadius = '10px';
        imgZoom.style.boxShadow = '0 20px 60px rgba(255, 20, 147, 0.6)';
        imgZoom.style.border = '3px solid #ff1493';
        imgZoom.style.animation = 'zoomIn 0.3s ease';

        overlay.appendChild(imgZoom);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
    });
});

// Agregar animaciones para el overlay
const overlayStyle = document.createElement('style');
overlayStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.5);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(overlayStyle);

// ====== NAVEGACIÓN SMOOTH CON OFFSET ======
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ====== RESALTAR LINK ACTIVO EN NAVEGACIÓN ======
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Estilo para link activo
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    nav a.active {
        color: #ff1493;
    }
    nav a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ====== EFECTO DE BRILLO EN TARJETAS DE PLANES ======
document.querySelectorAll('article').forEach(article => {
    article.addEventListener('mousemove', (e) => {
        const rect = article.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        article.style.setProperty('--mouse-x', `${x}px`);
        article.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Agregar estilos para el efecto de brillo
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    article {
        --mouse-x: 50%;
        --mouse-y: 50%;
    }
    article::after {
        content: '';
        position: absolute;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(255, 20, 147, 0.3), transparent 70%);
        top: var(--mouse-y);
        left: var(--mouse-x);
        transform: translate(-50%, -50%);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
    }
    article:hover::after {
        opacity: 1;
    }
`;
document.head.appendChild(glowStyle);

// ====== EFECTO DE ESCRITURA QUE SE REPITE ======
function typeWriterLoop(element, text, typeSpeed = 80, deleteSpeed = 50, pauseTime = 3000) {
    let i = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting && i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, typeSpeed);
        } else if (!isDeleting && i === text.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
        } else if (isDeleting && i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(type, deleteSpeed);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            setTimeout(type, 500);
        }
    }

    element.textContent = '';
    type();
}

// ====== INICIALIZAR ======
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    console.log('💪 Website de Jenniffer Lagares Coach cargado correctamente 💕');
    console.log('🎨 Tema: Negro y Rosa');

    // Activar efecto de escritura SOLO en el párrafo de inicio
    const heroP = document.querySelector('#inicio p');
    if (heroP) {
        const text = 'Tu cuerpo, tu mente y tu salud merecen lo mejor. Entrena conmigo y alcanza tus objetivos.';
        typeWriterLoop(heroP, text);
    }
});

// ====== 🎊 EASTER EGG: KONAMI CODE 🎊 ======
let konami = [];
const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);

    if (konami.join('').toLowerCase() === code.join('').toLowerCase()) {
        document.body.classList.toggle('party-mode');
        console.log('💪 ¡MODO BEAST ACTIVADO! 💪');
        createConfetti();
    }
});

// Estilos para el modo party
const partyStyle = document.createElement('style');
partyStyle.textContent = `
    body.party-mode {
        animation: rainbow-bg 3s infinite;
    }
    @keyframes rainbow-bg {
        0%, 100% { background: #000; }
        25% { background: #1a001a; }
        50% { background: #330033; }
        75% { background: #1a001a; }
    }
    body.party-mode article {
        animation: party-shake 0.5s infinite;
    }
    @keyframes party-shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(1deg); }
        75% { transform: rotate(-1deg); }
    }
`;
document.head.appendChild(partyStyle);

// Función para crear confetti
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '99999';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Animación para el confetti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);