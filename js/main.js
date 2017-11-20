function clickToMenu() {
    var menuButton = document.querySelector('.nav__hamburger-menu'),
        menuBlock = document.querySelector('.hamburger-menu__list'),
        logo = document.querySelector('.burger-logo-link'),
        menuButtonImage = document.querySelector('.nav__hamburger-menu-img'),
        menuStyle = getComputedStyle(menuBlock);

    menuButton.addEventListener('click', function (e) {
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

function clickToMenuAccordion() {
    var menuList = document.getElementById('menuList'),
        items = document.querySelectorAll('.menu__item');

    items.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            if (e.target.parentElement.tagName === 'A') {
                //if element(<li>) has not menu__item_active
                if (item.classList.value.indexOf('menu__item_active') === -1) {
                    items.forEach(function (i) {
                        i.classList.remove('menu__item_active');
                    });
                    item.className += ' menu__item_active';
                }
            }
        })
    })
}

function clickToTeamAccordion() {
    var teamList = document.getElementById('teamList'),
        items = document.querySelectorAll('.team-item');

    teamList.addEventListener('click', function (e) {
        e.preventDefault();
        var parentElement = e.target.parentElement,
            parentClassList = e.target.parentElement.classList;

        //if clicked link(a href)
        var classlist = e.target.classList;
        if (classlist.value.indexOf('team__trigger') !== -1) {

            //if parent element(<li>) has not class 'team-item_active', add it
            if (parentClassList.value.indexOf('team-item_active') === -1) {
                items.forEach(function (item) {
                    if (item.classList.length > 0) {
                        item.classList.remove('team-item_active')
                    }
                });
                parentElement.className += ' team-item_active';
            }
        }
    })
}

function showModal() {
    var reviewList = document.getElementById('reviewList'),
        modalClass = document.querySelector('.modal__block'),
        modalName = document.querySelector('.modal__name'),
        modalText = document.querySelector('.modal__text');

    reviewList.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName === 'A') {
            modalClass.style.display = 'block';
            modalName.innerText = e.target.parentElement.children[0].textContent;
            modalText.innerText = e.target.parentElement.children[1].textContent;
        }
    });

    modalClass.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
            modalClass.style.display = 'none';
        }
    })
}

clickToMenu();
clickToTeamAccordion();
clickToMenuAccordion();
showModal();