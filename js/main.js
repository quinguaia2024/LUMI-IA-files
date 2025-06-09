     document.addEventListener('DOMContentLoaded', function () {
            const loginTab = document.getElementById('login-tab');
            const signupTab = document.getElementById('signup-tab');
            const formContainer = document.querySelector('.relative');
            const panelsContainer = document.querySelector('.panels-container');
            const videoContents = document.querySelectorAll('.video-content');
            const loginText = document.getElementById('login-text');
            const registerText = document.getElementById('register-text');

            const loginPhrase = "Acessa a tua conta na LUMI IA";
            const registerPhrase = "Crie a sua conta na Lumi IA";

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
                    mainSubtitle.textContent = 'Acessa a sua conta na Lumi IA';
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