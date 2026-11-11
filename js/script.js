const headerHTML = `
<header class="header">
    <a href="index.html" class="logo">
        <span class="circle circle-1"></span>
        <span class="circle circle-2"></span>
        <span class="circle circle-3"></span>
        <span class="circle circle-4"></span>
    </a>

    <button class="burger" id="burger" aria-label="Открыть меню">
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <ul class="menu" id="menu">
        <li><a href="index.html">Главная</a></li>
        <li><a href="about.html">О нас</a></li>
        <li><a href="desserts.html">Наши десерты</a></li>
        <li><a href="order.html">Сделать заказ</a></li>
        <li><a href="tasks/task2.html">Задания</a></li>
    </ul>

    <div class="social-icons">
        <a href="#" class="btn vk">VK</a>
        <a href="#" class="btn tg">TG</a>
    </div>
</header>
`;

const footerHTML = `
<section class="footer-section">
    <div class="footer-container">
        
        <div class="footer-left">
            <h2 class="footer-title">
                Остались вопросы?<br>
                Хотите оформить заказ?<br>
                Обсудить детали и дизайн?
            </h2>
            <h3>Наш менеджер отвечает на сообщения с 9:00 до 22:00 каждый день.</h3>
        
            <div class="footer-buttons">
                <a href="#" class="btn-social">Написать нам в Telegram</a>
                <a href="#" class="btn-social">Написать нам в VK</a>
            </div>
            <h5>bonbonie@gmail.com</h5>
        </div>

        <div class="footer-right">
            <img src="../img/tortik2.png" class="footer-character">
        </div>
    </div>
    <div class="footer-bg-text">BONBONIE</div>
</section>
`;


document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    if (header) {
        header.innerHTML = headerHTML;
        const burger = document.getElementById('burger');
        const menu = document.getElementById('menu');
        
        if (burger && menu) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('open');
                menu.classList.toggle('open');
            });
        }
    }

    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = footerHTML;
    }

    const headerButtons = document.querySelectorAll('.social-icons .btn');
    headerButtons.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault(); 
            alert(`"переход" в соцсеть из шапки :)`); 
        });
    });

    const footerButtons = document.querySelectorAll('.btn-social');
    footerButtons.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault(); 
            alert('"переход" в соцсеть из футера :)'); 
        });
    });
});


const buttons = document.querySelectorAll('.social-btn');
buttons.forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.preventDefault(); 
        alert('"переход" в соцсеть :)'); 
    });
  });
