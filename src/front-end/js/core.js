POPUP_ANIMATE_DURATION = 300
MENU_ANIMATE_DURATION = 200

function openNavbar() {
  $('div#mobile-navbar').css('display', 'flex');
  $('div#mobile-navbar').animate({
    bottom: '0px',
    opacity: '1'
  }, POPUP_ANIMATE_DURATION);
}

function closeNavbar() {
  $('div#mobile-navbar').animate({
    bottom: `${$(window).height()}px`,
    opacity: '0'
  }, POPUP_ANIMATE_DURATION, function () {
    $('div#mobile-navbar').css('display', 'none');
  });
}

function openHizmetler() {
  $('div#mobile-hizmetler').css('display', 'flex');
  $('div#mobile-hizmetler').animate({
    top: '0px',
    opacity: '1'
  }, POPUP_ANIMATE_DURATION);
}

function closeHizmetler() {
  $('div#mobile-hizmetler').animate({
    top: `${$(window).height()}px`,
    opacity: '0'
  }, POPUP_ANIMATE_DURATION, function () {
    $('div#mobile-hizmetler').css('display', 'none');
  });
}

function initMenu() {
  $('.menu-container').each(function () {
    var menu = $(this).find('.menu');
    $(this).find('.menu-toggle').click(function () {
      menu.fadeToggle(MENU_ANIMATE_DURATION)
    })
  })
}

$(document).ready(function () {
  var windowWith = window.innerWidth;

  var stellarRatio = windowWith < 576 ? '0.2' : '1.3';

  initMenu()
  $('div#stellar-header').attr('data-stellar-background-ratio', stellarRatio);

  $.stellar();


  $('button#open-mobile-navbar').click(openNavbar);

  $('button#close-mobile-navbar').click(closeNavbar);

  $('button#open-mobile-hizmetler').click(function () {
    closeNavbar();
    openHizmetler();
  })

  $('button#close-mobile-hizmetler').click(closeHizmetler)
})
