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
    $('.main-questions__item-header').click((e) => {
        e = event.target;
        $(e).closest('.b-collapse').toggleClass('collapsed').children('.b-collapse__body').slideToggle(200);
    });
    $(".page-questions__item-header").on("click", function (e) {

        e.preventDefault();
        var $this = $(this);

        if (!$this.hasClass("accordion-active")) {
            $(".page-questions__item-body").slideDown(400);
            $(".page-questions__item-header").closest('.page-questions__item').removeClass("collapsed");
            // $('.accordion__arrow').removeClass('accordion__rotate');
        }

        $this.closest('.page-questions__item').addClass("collapsed");
        $this.next().slideUp(400);
        // $('.accordion__arrow',this).toggleClass('accordion__rotate');
    });

    // $('.page-questions__item-header').click((e) => {
    //     e = this;
    //     [...$('.page-questions__item-header')].forEach(elem => {

    //         if (e != $(elem)) {
    //             console.log(e, elem);

    //             $(elem).closest('.page-questions__item').addClass('collapsed').children('.page-questions__item-body').slideDown(400);
    //         } else {

    //             $(elem).closest('.page-questions__item').remove('collapsed').children('.page-questions__item-body').slideDown(400);
    //         }

    //     });
    //     $(e).closest('.page-questions__item').removeClass('collapsed').children('.page-questions__item-body').slideUp(400);
    // });

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

    if (document.querySelector('.woocommerce-message')) {
        if ($('.woocommerce-notices-wrapper').find('.woocommerce-message')) {
            $('.woocommerce-notices-wrapper').addClass('fixed');
        };
        $(window).click(function (event) {
            if (event.target == $('.woocommerce-message')) return;
            $('.woocommerce-notices-wrapper').hide();
            $('.woocommerce-notices-wrapper').removeClass('fixed');
        });
    };
    if (document.querySelector('.cart-empty')) {
        if (document.querySelector('.wc-backward')) {
            document.querySelector('.woocommerce-info ').style.height = `${document.querySelector('.woocommerce-info ').offsetHeight - document.querySelector('.header').offsetHeight - document.querySelector('.footer').offsetHeight}px`
            document.querySelector('.cart-empty').appendChild(document.querySelector('.wc-backward'));
        };
    };
    if (document.querySelector('.data-thumb')) {
        let copiedImg = document.querySelector('.data-thumb').cloneNode(true);
        document.querySelector('.woocommerce-message').insertBefore(copiedImg, '.wc-forward');
        let copiedTTl = document.querySelector('.product_title').cloneNode(true);
        document.querySelector('.woocommerce-message').insertBefore(copiedTTl, '.wc-forward');

    };

    // проверка на наличие блока кэнвас,утстановка размеров полотна
    if (document.querySelector('.top_images_product')) {
        // image container - canvas wrap
        let canvWrap = document.querySelector('.top_images_product');
        // creating tag canvas
        let canvas = document.createElement('canvas');
        // set id and sizes to canvas
        canvas.id = 'canvas';
        // canvas.style.width = "400px";
        // canvas.style.height = "400px";
        canvas.style.backgroundColor = "#f5d2c9";
        canvas.height = '434';
        canvas.width = '471';

        // get preview img and in next step,use like canvas (in future change this img for previews plates)
        // замена ноды картинки  на ноду холста
        let $imgInput = canvWrap.querySelector('img');
        // removing preview img
        canvWrap.removeChild(canvWrap.querySelector('img'));
        // set img like canvas
        canvWrap.appendChild(canvas);

        //taking an context for writing on canvas
        const ctx = canvas.getContext('2d');
        let devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1,

            ratio = devicePixelRatio / backingStoreRatio;

        if (devicePixelRatio !== backingStoreRatio) {

            // let oldWidth = canvas.width;
            // let oldHeight = canvas.height;
            // canvas.width = oldWidth * ratio;
            // canvas.height = oldHeight * ratio;
            // canvas.width = '100%';
            // canvas.height = '100%';
            // ctx.scale(ratio, ratio);
        }

        // шаблон квадрата
        function drawSquare(fill, posx, posy, sizew, sizeh, radius) {

            ctx.strokeStyle = 'transparent';
            ctx.fillStyle = `${fill || 'transparent'}`;
            roundRect(ctx, posx, posy, sizew, sizeh, radius, true);

            function roundRect(ctx, x = posx, y = posy, width, height, radius, fill, stroke) {
                if (typeof stroke === 'undefined') {
                    stroke = true;
                }
                if (typeof radius === 'undefined') {
                    radius = 5;
                }
                if (typeof radius === 'number') {
                    radius = { tl: radius, tr: radius, br: radius, bl: radius };
                } else {
                    var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
                    for (var side in defaultRadius) {
                        radius[side] = radius[side] || defaultRadius[side];
                    }
                }
                ctx.beginPath();
                ctx.moveTo(x + radius.tl, y);
                ctx.lineTo(x + width - radius.tr, y);
                ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
                ctx.lineTo(x + width, y + height - radius.br);
                ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
                ctx.lineTo(x + radius.bl, y + height);
                ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
                ctx.lineTo(x, y + radius.tl);
                ctx.quadraticCurveTo(x, y, x + radius.tl, y);
                ctx.closePath();
                if (fill) {
                    ctx.fill();
                }
                if (stroke) {
                    ctx.stroke();
                }

            }
            // ends
        };
        function drawCircle(fill,x,y,r) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            ctx.fillStyle = fill;
            ctx.fill();
        };
        const inputTextOne = document.querySelector('input[name="_text_one"]');
        const inputTextTwo = document.querySelector('input[name="_text_two"]');

        function changeValues() {
            // очищаем холст перед отрисовкой нового содержимого
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCircle('red',50,50,50);

            if (document.querySelector('input[name="_input_font"]:checked')) {
                ctx.font = `14px ${document.querySelector('input[name="_input_font"]:checked').value}`;
            };
            // рисуем текст,используя введенное значение
            if (document.querySelector('input[name="_color_palitra"]:checked')) {
                // ctx.fillStyle = `${document.querySelector('input[name="_color_palitra"]:checked').closest('.item_color_product').querySelectorAll('div > div')[0].style.backgroundColor}`
                ctx.fillStyle = '#fff';
            };
            if (document.querySelector('input[name="_color_palitra"]:checked')) {
                drawSquare(`${document.querySelector('input[name="_color_palitra"]:checked').closest('.item_color_product').querySelectorAll('div > div')[0].style.backgroundColor}`, 50, 50, 188.97 / 1.5, 188.97 / 1.5, 20);
            } else drawSquare(`transparent`);
            ctx.fillText(inputTextOne.value, 120, 90);
            ctx.fillStyle = '#fff';
            ctx.fillText(inputTextTwo.value, 120, 120);
            ctx.fillStyle = '#fff';
            if (document.querySelector('input[name="_icon_product"]:checked')) {
                ctx.drawImage(document.querySelector('input[name="_icon_product"]:checked').closest('.item_icon').querySelector('img'), 80, 60,
                document.querySelector('input[name="_icon_product"]:checked').closest('.item_icon').querySelector('img').width * 0.6,
                document.querySelector('input[name="_icon_product"]:checked').closest('.item_icon').querySelector('img').height * 0.6);
            };
        };

        inputTextOne.oninput = () => {
            changeValues();
        };
        inputTextTwo.oninput = () => {
            changeValues();
        };
        [...document.querySelectorAll('input[type="radio"]')].forEach(redio => {
            redio.addEventListener('click', () => {
                changeValues();
            });
        })
        /*
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
                    document.querySelector('#canvas').onclick = () => { console.log('sdfdjsidnhsfbdjsfn') };
        
                };
                */
        // }, 5000);
        /*
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

            // setTimeout(() => {
            //     const canvas = $('#canvas')[0];
            //     const ctx = canvas.getContext('2d');
            //     ctx.drawImage(s, 0, 0, 200, 200);

            //     const $inputSurname = $('.constructor__input--surname')[0];
            //     const $inputComment = $('.constructor__input--comment')[0];

            //     $inputComment.oninput = () => {
            //         // обнуляем холст
            //         // ctx.clearRect(0, 0, canvas.width, canvas.height);
            //         // задаем нужный щрифт
            //         ctx.font = '  28px times';
            //         // рисуем текст,используя введенное значение
            //         ctx.fillText($inputComment.value, 50, 100);

            //         function demoFromHTML() {
            //             const pdf = new jsPDF('p', 'pt', 'a4');
            //             pdf.addImage(s, "jpeg", 20, 50, 200, 200);
            //             pdf.setFontSize(28);
            //             pdf.addFont('times', 'Arial', 'normal')
            //             pdf.setFont('times');
            //             pdf.text(20, 200, $inputComment.value);
            //             // source can be HTML-formatted string, or a reference
            //             // to an actual DOM element from which the text will be scraped.
            //             let source = $('#canvas')[0];

            //             // we support special element handlers. Register them with jQuery-style 
            //             // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
            //             // There is no support for any other type of selectors 
            //             // (class, of compound) at this time.
            //             let specialElementHandlers = {
            //                 // element with id of "bypass" - jQuery style selector
            //                 '#bypassme': function (element, renderer) {
            //                     // true = "handled elsewhere, bypass text extraction"
            //                     return true
            //                 }
            //             };
            //             let margins = {
            //                 top: 80,
            //                 bottom: 60,
            //                 left: 40,
            //                 width: 522
            //             };
            //             // all coords and widths are in jsPDF instance's declared units
            //             // 'inches' in this case
            //             pdf.fromHTML(
            //                 source, // HTML string or DOM elem ref.
            //                 margins.left, // x coord
            //                 margins.top, { // y coord
            //                 'width': margins.width, // max width of content on PDF
            //                 'elementHandlers': specialElementHandlers
            //             },

            //                 function (dispose) {
            //                     // dispose: object with X, Y of the last line add to the PDF 
            //                     //          this allow the insertion of new lines after html
            //                     pdf.save('Test.pdf');
            //                 }, margins
            //             );
            //         };
            //         document.querySelector('#canvas').onclick = demoFromHTML;

            //     };
            // }, 1000);

        };
        
    */

    };
});


///Редактор товара
if (document.querySelector('.btn_tabs_card')) {
    let allBtnTabs = document.querySelectorAll('.btn_tabs_card');

    allBtnTabs.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn_tabs_card').forEach((item) => {
                item.classList.remove('btn_tabs_card--active');
            })
            let tabsBlock = document.querySelectorAll('.block__description_content');
            tabsBlock.forEach((block) => {
                block.classList.toggle('block__description_content--active');
            })
            // let key = e.target.getAttribute('data-key');
            // console.log(key);
            e.target.classList.toggle('btn_tabs_card--active');

        })
    })
}

if (document.querySelector('.information_product_card')) {
    setTimeout(() => {
        document.querySelector('.lds-facebook').style.display = 'none';
        document.querySelector('.information_product_card').style.opacity = '1';
    }, 2500)
}