document.addEventListener('DOMContentLoaded', () => {
    // a. 햄버거 메뉴 토글
    const hamburgerMenu = document.querySelector('#hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isOpen);    // 접근성 향상
    });


    // b. 부드러운 스크롤
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
        });
    });

    
    // c. 스크롤 탑 버튼
    const scrollTopBtn = document.querySelector('#scroll-top-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    
    // d. 네비게이션 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    
    // e. 다크모드
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // 테마 불러오기 (페이지 로드 시 실행)
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkModeToggle.textContent = '☀️';
        } else {
            document.documentElement.removeAttribute('data-theme');
            darkModeToggle.textContent = '🌙';
        }
    }

    // 테마 변경
    function toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

        if (isDark) {
            // 다크 → 라이트
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        } else {
            // 라이트 → 다크
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        }
    }

    darkModeToggle.addEventListener('click', toggleTheme);
    loadTheme();


    // f. 스크롤 애니메이션


    // 폼 UX
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    // 에러 메시지 표시
    function showError(input, error, message) {
        input.classList.add('error');
        error.textContent = message;
    }

    // 에러 메시지 제거
    function clearError(input, error) {
        input.classList.remove('error');
        error.textContent = '';
    }

    // 입력 시 에러 메시지 제거
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));

    // 유효성 검사
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, '이름을 입력해주세요.');
            return false;
        }
        clearError(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, emailError, '이메일을 입력해주세요.');
            return false;
        }
        if (!email.includes('@') || !email.includes('.')) {
            showError(emailInput, emailError, '이메일 형식이 올바르지 않습니다.');
            return false;
        }
        clearError(emailInput, emailError);
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, '메시지를 입력해주세요.');
            return false;
        }
        clearError(messageInput, messageError);
        return true;
    }

    // 폼 제출
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            successMessage.textContent = '문의가 성공적으로 접수되었습니다!';
            contactForm.reset();
        } else {
            successMessage.textContent = '';
        }
    });
});