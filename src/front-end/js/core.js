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
      factor: -1.2,
    });
  }

  bodyClickFadeOut([
    ['.menu-toggle', '.menu']
  ])


  $('button#open-mobile-navbar').click(openNavbar);

  $('button#close-mobile-navbar').click(closeNavbar);

  $('button#open-mobile-hizmetler').click(function () {
    closeNavbar();
    openHizmetler();
  })

  $('button#close-mobile-hizmetler').click(closeHizmetler)
})
