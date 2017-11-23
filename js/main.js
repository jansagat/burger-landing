function clickToMenu() {
    var menuButton = document.querySelector('.nav__hamburger-menu'),
        menuBlock = document.querySelector('.hamburger-menu__list'),
        logo = document.querySelector('.burger-logo-link'),
        menuButtonImage = document.querySelector('.nav__hamburger-menu-img'),
        menuStyle = getComputedStyle(menuBlock);

    menuButton.addEventListener('click', function (e) {
        console.log('click');
        if (menuStyle.display === 'none') {
            menuBlock.style.display = "flex";
            logo.style.zIndex = 1;
            menuButtonImage.src = './img/pic/close-menu.png';
            menuButton.style.zIndex = 1;
        } else {
            menuBlock.style.display = "none";
            logo.style.zIndex = 0;
            menuButtonImage.src = './img/pic/ham-button.png';
            menuButton.style.zIndex = 0;
        }
    })
}

clickToMenu();