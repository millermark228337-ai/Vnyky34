// Основная функция для инициализации всего функционала
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initButtonInteractions();
    initGuideModals();
});

// Мобильное меню
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Анимация гамбургера
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Плавная прокрутка
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Учитываем высоту навигации
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимации при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.guide-card, .fact-card, .update-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Интерактивные эффекты для кнопок
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    
    buttons.forEach(button => {
        // Эффект при наведении
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Эффект при клике
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        // Добавляем функциональность для кнопок
        if (button.textContent.includes('Присоединиться к игре')) {
            button.addEventListener('click', function() {
                // В реальном проекте здесь будет ссылка на Roblox
                window.open('https://www.roblox.com/games/', '_blank');
            });
        }
        
        if (button.textContent.includes('Начать изучение')) {
            button.addEventListener('click', function() {
                const guidesSection = document.querySelector('#guides');
                if (guidesSection) {
                    const offsetTop = guidesSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

// Модальные окна для гайдов
function initGuideModals() {
    const guideButtons = document.querySelectorAll('.guide-card .btn-outline');
    
    guideButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const guideTitles = [
                'Начало игры - Основные механики',
                'Секретные локации - Скрытые места',
                'Экономика игры - Заработок и траты'
            ];
            
            const guideContents = [
                `
                <h3>Основные механики Dandy's World</h3>
                <p>Dandy's World предлагает уникальный игровой опыт с множеством механик:</p>
                <ul>
                    <li><strong>Исследование мира:</strong> Откройте огромный открытый мир с разнообразными локациями</li>
                    <li><strong>Квесты и задания:</strong> Выполняйте задания для получения наград и опыта</li>
                    <li><strong>Социальное взаимодействие:</strong> Общайтесь с другими игроками и создавайте команды</li>
                    <li><strong>Экономика:</strong> Зарабатывайте внутриигровую валюту и покупайте предметы</li>
                </ul>
                <p>Начните с прохождения обучающих заданий, чтобы освоить базовые механики.</p>
                `,
                `
                <h3>Секретные локации и пасхалки</h3>
                <p>Dandy's World полон скрытых мест и секретов:</p>
                <ul>
                    <li><strong>Заброшенный замок:</strong> Находится в северо-западной части карты за водопадом</li>
                    <li><strong>Подземный лабиринт:</strong> Вход скрыт в пещере за главным городом</li>
                    <li><strong>Небесный остров:</strong> Достигается с помощью специального портала</li>
                    <li><strong>Секретная комната разработчиков:</strong> Содержит отсылки к создателям игры</li>
                </ul>
                <p>Ищите необычные текстуры и взаимодействуйте с окружающей средой!</p>
                `,
                `
                <h3>Экономика и финансы в игре</h3>
                <p>Эффективное управление ресурсами - ключ к успеху:</p>
                <ul>
                    <li><strong>Заработок:</strong> Выполняйте квесты, участвуйте в ивентах, торгуйте с игроками</li>
                    <li><strong>Траты:</strong> Покупайте снаряжение, улучшения и косметические предметы</li>
                    <li><strong>Инвестиции:</strong> Вкладывайтесь в недвижимость и бизнес</li>
                    <li><strong>Экономические циклы:</strong> Следите за изменениями цен на рынке</li>
                </ul>
                <p>Начинайте с малого и постепенно расширяйте свой капитал!</p>
                `
            ];
            
            showModal(guideTitles[index], guideContents[index]);
        });
    });
}

// Функция показа модального окна
function showModal(title, content) {
    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    // Добавляем стили для модального окна
    const modalStyles = `
        <style>
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                background: var(--secondary-dark);
                border-radius: 15px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                z-index: 2001;
                border: 2px solid var(--accent-purple);
                box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid rgba(139, 92, 246, 0.3);
                padding-bottom: 1rem;
            }
            
            .modal-header h3 {
                color: var(--accent-purple-light);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-primary);
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.3s ease;
            }
            
            .modal-close:hover {
                color: var(--accent-purple);
            }
            
            .modal-body {
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            .modal-body ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            
            .modal-body li {
                margin-bottom: 0.5rem;
            }
            
            .modal-body strong {
                color: var(--accent-purple-light);
            }
        </style>
    `;
    
    // Добавляем стили и модальное окно в документ
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Функционал закрытия
    const closeModal = function() {
        document.body.removeChild(modal);
        // Удаляем добавленные стили
        const addedStyle = document.head.querySelector('style:last-child');
        if (addedStyle) {
            document.head.removeChild(addedStyle);
        }
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Закрытие по ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Дополнительные интерактивные эффекты
function initAdditionalEffects() {
    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Активное состояние навигации при скролле
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Инициализация дополнительных эффектов
initAdditionalEffects();

// Функциональность пасхалки теперь в transitions.js

// Консольное приветствие (опционально)
console.log(`
🌟 Добро пожаловать на сайт Dandy's World! 🌟
    
Сайт успешно загружен и готов к использованию.
    
Функции:
- Адаптивный дизайн
- Плавная прокрутка
- Интерактивные элементы
- Модальные окна с гайдами
- 🎯 Скрытая пасхалка (найди кнопку "сюда"!)
    
Приятного использования! 🎮
`);
