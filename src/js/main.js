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
        modalBlockClass = document.querySelector('.modal__block'),
        modalName = document.querySelector('.modal__name'),
        modalText = document.querySelector('.modal__text'),
        modalClass = document.querySelector('.modal');

    reviewList.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName === 'A') {
            modalBlockClass.style.display = 'block';
            modalClass.style.display = 'block';
            modalName.innerText = e.target.parentElement.children[0].textContent;
            modalText.innerText = e.target.parentElement.children[1].textContent;
        }
    });

    modalBlockClass.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
            modalBlockClass.style.display = 'none';
            modalClass.style.display = 'none';
        }
    })
}

function sendMailAjax(data) {
    $.ajax({
        url: '../server.php',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: data
    }).done(function (e) {
        console.log('DONE: ', e);
        showMessage('green', 'Заказ принят, ожидайте');
    }).fail(function (e) {
        if (e.status === 400){
            var result = $.parseJSON(e.responseText);
            console.log('FAIL: ', result);
            animateInvalidInput(result);
        } else if (e.status !== 200 || e.readyState !== 4) {
            var result = e.responseText;
            console.log('FAIL: ', result);
            showMessage('red', 'Заказ не отправлен, свяжитесь со службой поддержки');
        }
    });
}

function clickSubmitForm() {
    $(document).ready(function () {
        var form = $('#order__form');

        form.submit(function (e) {
            e.preventDefault();
            var data = form.serialize();
            sendMailAjax(data);
        });
    });
}

function animateInvalidInput(result){
    for(var item in result){
        $("[name=" + item + "]").addClass('invalid__input').delay(1000).queue(function(){
            $(this).removeClass('invalid__input').dequeue();
        });
    }
}

function showMessage(color, msg) {
    $('<span>', {
        'class': 'message__input',
        css: {
            'color': color
        },
        text: msg
    }).appendTo('body').delay(5000).queue(function(){
        $(this).remove('.message__input').dequeue();
    });
}

function yandexMap() {
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.75948062, 37.62562037],
                zoom: 15,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            }),

            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),

            myPlacemark = new ymaps.Placemark([55.76015673, 37.61931181], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'img/pic/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-5, -38]
            }),

            mySecondPlacemark = new ymaps.Placemark([55.76276449, 37.62866735], {}, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: 'img/pic/map-marker.png',
                iconImageSize: [46, 57],
                iconImageOffset: [-24, -24],
                iconContentOffset: [15, 15],
                iconContentLayout: MyIconContentLayout
            });

        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects
            .add(myPlacemark)
            .add(mySecondPlacemark);
    });
}

function fullPage() {
    $(document).ready(function() {
        $('#fullpage').fullpage({
            menu: '#circle-menu',
            fixedElements: '.pagination, #modal__block, .message__input',
            anchors:['burger', 'best', 'slider', 'team', 'menu', 'reviews', 'order', 'contacts']
        });
    });
}

clickToMenu();
clickToTeamAccordion();
clickToMenuAccordion();
showModal();
clickSubmitForm();
yandexMap();
fullPage();
