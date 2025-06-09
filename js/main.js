  document.addEventListener('DOMContentLoaded', function () {
        const loginTab = document.getElementById('login-tab');
        const signupTab = document.getElementById('signup-tab');
        const formContainer = document.querySelector('.relative');
        const panelsContainer = document.querySelector('.panels-container');
        const videoContents = document.querySelectorAll('.video-content');
        const loginText = document.getElementById('login-text');
        const registerText = document.getElementById('register-text');

        const loginPhrase = "Acesse a sua conta na LUMI IA";
        const registerPhrase = "Crie a sua conta na LUMI IA";

        function animateText(element, text) {
            if (!element) return;
            element.innerHTML = '';
            const words = text.split(' ');
            let delay = 0;
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + (index < words.length - 1 ? ' ' : '');
                span.className = 'word';
                span.style.animationDelay = `${delay}s`;
                element.appendChild(span);
                delay += 0.3 + (Math.random() * 0.2);
            });
            setTimeout(() => {
                element.style.opacity = '0';
                setTimeout(() => {
                    animateText(element, text);
                }, 1000);
            }, 8000);
        }

        if (loginText) animateText(loginText, loginPhrase);
        if (registerText) animateText(registerText, registerPhrase);

        function updateForms() {
            const isRegisterMode = signupTab.checked;
            const mainTitle = document.getElementById('main-title');
            const mainSubtitle = document.getElementById('main-subtitle');

            if (isRegisterMode) {
                mainTitle.textContent = 'Criar conta';
                mainSubtitle.textContent = 'Crie uma conta Analista na LUMI IA';
                formContainer.classList.add('show-register');
                panelsContainer.classList.add('show-register');
                if (window.innerWidth >= 768) {
                    videoContents[0].classList.add('opacity-0');
                    videoContents[1].classList.remove('opacity-0');
                }
            } else {
                mainTitle.textContent = 'Bem-vindo de volta!';
                mainSubtitle.textContent = 'Acesse a sua conta na LUMI IA';
                formContainer.classList.remove('show-register');
                panelsContainer.classList.remove('show-register');
                if (window.innerWidth >= 768) {
                    videoContents[0].classList.remove('opacity-0');
                    videoContents[1].classList.add('opacity-0');
                }
            }
        }

        loginTab.addEventListener('change', updateForms);
        signupTab.addEventListener('change', updateForms);
        window.addEventListener('resize', updateForms);
        updateForms();
    });

     const textElement = document.getElementById('video-text');
    const messages = [
        "Acesse a sua conta na LUMI IA",
        "Crie a sua conta na Lumi IA"
    ];
    let msgIndex = 0;

    function typeText(text, callback) {
        textElement.textContent = "";
        textElement.classList.remove("show");
        setTimeout(() => {
            textElement.classList.add("show");
            let span = document.createElement("span");
            span.classList.add("typing-effect");
            span.textContent = text;
            textElement.appendChild(span);
            setTimeout(callback, 8000); // tempo total do efeito
        }, 500); // pequeno delay entre sumir e reaparecer
    }

    function cycleText() {
        typeText(messages[msgIndex], () => {
            textElement.classList.remove("show");
            msgIndex = (msgIndex + 1) % messages.length;
            setTimeout(cycleText, 1500); // tempo fora de tela
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        cycleText();
    });