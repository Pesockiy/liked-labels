'use strict';
$(document).ready(() => {
    const $btnHamburger = $('.hamburger');

    $('.user-basket').click((event) => {
        event.preventDefault();
    });

    // перемещение блока 
    if (window.innerWidth <= 758) {
        const $hamburgerNab = $('#hamburgerNav').clone();
        $('#hamburgerNav').remove();
        $('.nav.header__nav').prepend($hamburgerNab);
    };

    $('body').click(() => {
        $btnHamburger.removeClass('active');
        $('#hamburgerNav').removeClass('active');
        $('.header__nav').removeClass('active');
        if (window.innerWidth <= 758) {
            if (document.querySelector('.hamburger').classList.contains('active')) {
                console.log('120');
                $('body').addClass('ov-hidden');
            };
        };
    });
    $btnHamburger.click((elem, classN = 'active') => {
        event.stopPropagation();
        $btnHamburger.toggleClass(classN);
        $('#hamburgerNav').toggleClass(classN);
        $('.header__nav').toggleClass(classN);
    });
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
    });
});
