'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(document).ready(function () {
  var $btnHamburger = $('.hamburger');
  $('.user-basket').click(function (event) {
    event.preventDefault();
  });
  $btnHamburger.click(function (elem) {
    var classN = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'active';
    event.stopPropagation();
    $btnHamburger.toggleClass(classN);
    $('#hamburgerNav').toggleClass(classN);
    $('.header__nav').toggleClass(classN);
    $('body').click(function () {
      $btnHamburger.removeClass(classN);
      $('#hamburgerNav').removeClass(classN);
      $('.header__nav').removeClass(classN);
    });
  }); // window.addEventListener('click', (event) => {
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
    var _$$owlCarousel;

    var setDots = function setDots() {
      return $(".top-banner .owl-dots").removeClass('disabled');
    };

    $('.top-banner').owlCarousel((_$$owlCarousel = {
      loop: true,
      margin: 10,
      nav: true,
      items: 1,
      dots: true
    }, _defineProperty(_$$owlCarousel, "nav", false), _defineProperty(_$$owlCarousel, "autoHeight", true), _defineProperty(_$$owlCarousel, "onInitialized", setDots), _defineProperty(_$$owlCarousel, "onChanged", setDots), _$$owlCarousel));
  }

  ;

  if ($('.review-slider')) {
    var setBtns = function setBtns() {
      return $(".review-slider .owl-nav").removeClass('disabled');
    };

    $('.review-slider').owlCarousel({
      loop: true,
      margin: 10,
      items: 1,
      navText: [],
      onInitialized: setBtns,
      onChanged: setBtns
    });
  }

  $('.b-collapse__header').click(function (e) {
    e = event.target;
    $(e).closest('.b-collapse').toggleClass('collapsed').children('.b-collapse__body').slideToggle(200); // $(e).siblings($('.b-collapse__body')).slideToggle(300)
  });
});