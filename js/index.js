'use strict';
$(document).ready(() => {
    const $btnHamburger = $('.hamburger');

    $('.user-basket').click((event) => {
        event.preventDefault();

    });


    if (window.innerWidth <= 758) {
        const $hamburgerNab = $('#hamburgerNav').clone();
        $('#hamburgerNav').remove();
        $('.nav.header__nav').prepend($hamburgerNab);
    };

    $btnHamburger.click((elem, classN = 'active') => {
        event.stopPropagation();
        $btnHamburger.toggleClass(classN);
        $('#hamburgerNav').toggleClass(classN);
        $('.header__nav').toggleClass(classN);
        $('body').click(() => {
            $btnHamburger.removeClass(classN);
            $('#hamburgerNav').removeClass(classN);
            $('.header__nav').removeClass(classN);
        });
        if (window.innerWidth <= 758) {
            $('body').toggleClass('ov-hidden');
        };
    });
    // window.addEventListener('click', (event) => {
    //     const e = event.target;
    //     if (e != btnHamburger) {
    //         return
    //     } else {
    //         const hamburgerNav = document.getElementById('hamburgerNav');
    //         toggleClass(btnHamburger);
    //         toggleClass(hamburgerNav);
    //     };
    // });
    if ($('.top-banner')) {
        const setDots = () => $(".top-banner .owl-dots").removeClass('disabled');
        $('.top-banner').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            items: 1,
            dots: true,
            nav: false,
            autoHeight: true,
            onInitialized: setDots,
            onChanged: setDots
        });
    };
    if ($('.review-slider')) {
        const setBtns = () => $(".review-slider .owl-nav").removeClass('disabled');
        $('.review-slider').owlCarousel({
            loop: true,
            margin: 10,
            items: 1,
            navText: [],
            onInitialized: setBtns,
            onChanged: setBtns
        });
    }
    $('.b-collapse__header').click((e) => {
        e = event.target;
        $(e).closest('.b-collapse').toggleClass('collapsed').children('.b-collapse__body').slideToggle(200);
        // $(e).siblings($('.b-collapse__body')).slideToggle(300)
    });
});
