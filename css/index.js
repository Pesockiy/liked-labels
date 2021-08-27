'use strict';
$(document).ready(() => {

    function showMoreGoods(container, maxShow) {

        let $goodsMain = $(container);

        [...$goodsMain].forEach((item) => {

            if (`${item} + .show-more`) {

                let $goodsMainItems = $(item).find('.goods__item');
                let minShow = $goodsMainItems.length;

                let $itemsToShow = $(item).find('.goods__item').splice(maxShow, minShow);

                $itemsToShow.forEach(item => {
                    $(item).hide();
                });

                if (minShow <= maxShow) {
                    // $(item).siblings('.show-more').hide();
                    $(item).siblings('.show-more').hide();
                };

                $(window).click((event) => {
                    if (!event.target.classList.contains('show-more')) return;
                    let btn = event.target;
                    event.preventDefault();
                    // console.log($(btn).prev());
                    let local = $(btn).prev().find('.goods__item').splice(maxShow, minShow);

                    $(event.target).prev()
                    local.forEach(item => {
                        $(item).show();
                    });

                    $(btn).hide();
                });
            };
        });
    };


    const $btnHamburger = $('.hamburger');
    const $navItems = document.querySelectorAll('.header__nav-list .nav__list-item');

    // проверка наличия выпадающего списка для скрытия пиктограммы стрелки
    $navItems.forEach(nodeItem => {

        if (nodeItem.querySelector('.nav__link + .nav__list--inner')) {

            nodeItem.querySelector('.nav__link').classList.add('arrow');
        };
    });


    if (window.innerWidth <= 758) {
        const $hamburgerNab = $('#hamburgerNav').clone();
        $('#hamburgerNav').remove();
        $('.nav.header__nav').prepend($hamburgerNab);
    };


    $btnHamburger.click((elem, classN = 'active') => {
        event.stopPropagation();
        $btnHamburger.addClass(classN);
        $('#hamburgerNav').addClass(classN);
        $('.header__nav').addClass(classN);

        if (window.innerWidth <= 758) {
            if ($('.hamburger').hasClass('active')) {
                $('body').addClass('ov-hidden');
            } else {
                $('body').removeClass('ov-hidden');
                $btnHamburger.removeClass('active');
                $('#hamburgerNav').removeClass('active');
                $('.header__nav').removeClass('active');
            }
        };
    });
    $(window).click(() => {
        $btnHamburger.removeClass('active');
        $('body').removeClass('ov-hidden');
        $('#hamburgerNav').removeClass('active');
        $('.header__nav').removeClass('active');
    });

    if ($('.top-banner')) {
        const setDots = () => $(".top-banner .owl-dots").removeClass('disabled');
        $('.top-banner').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            autoplay: true,
            autoplayTimeout: 5000,
            dots: true,
            nav: false,
            autoHeight: true,
            onInitialized: setDots,
            onChanged: setDots
        });
    };
    if ($('.b-choice')) {
        $('.b-choice').owlCarousel({
            loop: true,
            items: 5,
            margin: 14
        });
    };
    if ($('.review-slider')) {
        const setBtns = () => $(".review-slider .owl-nav").removeClass('disabled');
        $('.review-slider').owlCarousel({
            loop: true,
            margin: 10,
            items: 1,
            navText: [],
            onResize: setBtns,
            onInitialized: setBtns,
            onChanged: setBtns
        });
    }
    $('.b-collapse__header').click((e) => {
        e = event.target;
        $(e).closest('.b-collapse').toggleClass('collapsed').children('.b-collapse__body').slideToggle(200);
    });

    if (document.querySelector('.goods--main')) {
        // let $goodsMain = $('.goods--main');
        // let $goodsMainItems = $goodsMain.find('.goods__item');
        // let $itemsToShow = $goodsMain.find('.goods__item').splice(6, 3);

        // $itemsToShow.forEach(item => {
        //     $(item).hide();
        // });

        // if ($goodsMainItems.length <= 6) {
        //     $('.show-more').hide();
        // };
        // $('.show-more').click((event) => {
        //     event.preventDefault();
        //     $itemsToShow.forEach(item => {
        //         $(item).show();
        //     });
        //     $('.show-more').hide();
        // });
        showMoreGoods('.goods--main', 6)
    };

    if (document.querySelector('.goods--cards')) {
        showMoreGoods('.goods--cards', 8);
    };

    if(document.querySelector('.woocommerce-message')) {
        $(window).click(function(event) {
            if(event.target == $('.woocommerce-message')) return;
            $('.woocommerce-notices-wrapper').hide();
        });
    }

    if (document.querySelector('#canvas')) {

        const $imgInput = $('[type="file"]')[0];
        let s;
        // добавляем изображение на страницу
        $imgInput.onchange = function (ev) {
            const f = ev.target.files[0];
            const fr = new FileReader();
            const $img = document.createElement('img');
            $img.alt = '';

            fr.onload = function (ev2) {
                $img.setAttribute('src', ev2.target.result)
            };

            fr.readAsDataURL(f);
            // document.body.append($img);
            s = $img;

            setTimeout(() => {
                const $canvas = $('#canvas')[0];
                const ctx = $canvas.getContext('2d');
                ctx.drawImage(s, 0, 0, 200, 200);

                const $inputSurname = $('.constructor__input--surname')[0];
                const $inputComment = $('.constructor__input--comment')[0];

                $inputComment.oninput = () => {
                    // обнуляем холст
                    // ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // задаем нужный щрифт
                    ctx.font = '  28px times';
                    // рисуем текст,используя введенное значение
                    ctx.fillText($inputComment.value, 50, 100);
                    function demoFromHTML() {
                        const pdf = new jsPDF('p', 'pt', 'a4');
                        pdf.addImage(s, "jpeg", 20, 50, 200, 200);
                        pdf.setFontSize(28);
                        pdf.addFont('times', 'Arial', 'normal')
                        pdf.setFont('times');
                        pdf.text(20, 200, $inputComment.value);
                        // source can be HTML-formatted string, or a reference
                        // to an actual DOM element from which the text will be scraped.
                        let source = $('#canvas')[0];

                        // we support special element handlers. Register them with jQuery-style 
                        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
                        // There is no support for any other type of selectors 
                        // (class, of compound) at this time.
                        let specialElementHandlers = {
                            // element with id of "bypass" - jQuery style selector
                            '#bypassme': function (element, renderer) {
                                // true = "handled elsewhere, bypass text extraction"
                                return true
                            }
                        };
                        let margins = {
                            top: 80,
                            bottom: 60,
                            left: 40,
                            width: 522
                        };
                        // all coords and widths are in jsPDF instance's declared units
                        // 'inches' in this case
                        pdf.fromHTML(
                            source, // HTML string or DOM elem ref.
                            margins.left, // x coord
                            margins.top, { // y coord
                            'width': margins.width, // max width of content on PDF
                            'elementHandlers': specialElementHandlers
                        },

                            function (dispose) {
                                // dispose: object with X, Y of the last line add to the PDF 
                                //          this allow the insertion of new lines after html
                                pdf.save('Test.pdf');
                            }, margins
                        );
                    };
                    document.querySelector('#canvas').onclick = demoFromHTML;

                };
            }, 1000);

        };
    };
});

