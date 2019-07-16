POPUP_ANIMATE_DURATION = 300
MENU_ANIMATE_DURATION = 200

function bodyClickFadeOut(list) {
  $('body').click(function (e) {
    var el = $(e.target);

    list.forEach(function ([toggle, selector]) {
      if ((!el.is(selector) && el.children(selector).length < 1 && el.parents(selector).length < 1) &&
        (!el.is(toggle) && el.children(toggle).length < 1 && el.parents(toggle).length < 1)) {
        $(selector).fadeOut(MENU_ANIMATE_DURATION);
      }
    });
  })
}

function hideNavbarButton() {
  $('button#open-mobile-navbar').animate({
    opacity: 0,
  }, 50);
}

function showNavbarButton() {
  $('button#open-mobile-navbar').animate({
    opacity: 1,
  }, 50);
}

function openNavbar() {
  $('div#mobile-navbar').css('display', 'flex');
  $('div#mobile-navbar').animate({
    bottom: '0px',
    opacity: 1
  }, POPUP_ANIMATE_DURATION);
  hideNavbarButton();
}

function closeNavbar() {
  $('div#mobile-navbar').animate({
    bottom: `${$(window).height()}px`,
    opacity: '0'
  }, POPUP_ANIMATE_DURATION, function () {
    $('div#mobile-navbar').css('display', 'none');
  });
  $('button#open-mobile-navbar').animate({
    opacity: 1,
  }, POPUP_ANIMATE_DURATION);
  showNavbarButton();
}

function openUrunler() {
  $('div#mobile-urunler').css('display', 'flex');
  $('div#mobile-urunler').animate({
    top: '0px',
    opacity: '1'
  }, POPUP_ANIMATE_DURATION);
  hideNavbarButton();
}

function closeUrunler() {
  $('div#mobile-urunler').animate({
    top: `${$(window).height()}px`,
    opacity: '0'
  }, POPUP_ANIMATE_DURATION, function () {
    $('div#mobile-urunler').css('display', 'none');
  });
  showNavbarButton();
}

function initMenus() {
  $('.menu-container').each(function () {
    var menu = $(this).find('.menu');
    $(this).find('.menu-toggle').click(function () {
      menu.fadeToggle(MENU_ANIMATE_DURATION);
    })
  })
}

$(document).ready(function () {
  var windowWith = window.innerWidth;

  initMenus()

  if (windowWith > 991) {
    $('div#stellar-header').paroller({
      factor: -1.3,
    });
  }

  bodyClickFadeOut([
    ['.menu-toggle', '.menu']
  ])


  $('button#open-mobile-navbar').click(openNavbar);

  $('button#close-mobile-navbar').click(closeNavbar);

  $('button#open-mobile-urunler').click(function () {
    closeNavbar();
    openUrunler();
  })

  $('button#close-mobile-urunler').click(closeUrunler)
})
