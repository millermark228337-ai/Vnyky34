// Минимальная версия transitions.js для тестирования функциональности кнопок

// Обработка кнопки "сюда" на главной странице
function initEasterEggTransition() {
    const easterEggBtn = document.getElementById('easterEggBtn');
    
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Кнопка "сюда" нажата!');
            window.location.href = 'easter-egg.html';
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация кнопки "сюда"
    if (document.getElementById('easterEggBtn')) {
        initEasterEggTransition();
    }
    
    console.log('Минимальная версия transitions.js загружена');
});
