POPUP_ANIMATE_DURATION = 300
MENU_ANIMATE_DURATION = 200

const commonValidationOptions = {
  errorElement: 'div',
  errorClass: "validation-error",
  focusCleanup: true,
  focusInvalid: false,
  onkeyup: false
}

function handleEnterOnInputs($form) {
  $form.find('[name]:not([data-no-enter-submit="true"])').each(function (i, el) {
    const $el = $(el)

    $el.on('keyup', function (e) {
      if (e.which == 10 || e.which == 13) {
        $form.submit()
      }
    })
  })
}

function getValidationMessages($form) {
  const messages = {}
  $form.find('[name]').each(function (i, el) {
    const $el = $(el)
    const name = $el.attr('name')
    messages[name] = $el.data('validation-msg')
  })
  return messages
}

$(document).ready(function () {
  const $headerStellar = $('div#header-stellar')
  const $mobileNavbar = $('div#mobile-navbar')
  const $openMobileNavbarBtn = $('button#open-mobile-navbar')
  const $closeMobileNavbarBtn = $('button#close-mobile-navbar')
  const $mobileUrunler = $('div#mobile-urunler')
  const $openMobileUrunlerBtn = $('button#open-mobile-urunler')
  const $closeMobileUrunlerBtn = $('button#close-mobile-urunler')
  const $menuContainers = $('.menu-container')
  const $submitBtns = $('button[type="submit"]')
  const $body = $('body')

  function handleSubmitBtnClicks() {
    $submitBtns.on('click', function (e) {
      const $btn = $(e.target)
      const $form = $($btn.data('submit-form'))
      $form.submit()
    })
  }
  function handleBodyClickFadeOuts(list) {
    $body.click(function (e) {
      var el = $(e.target)

      list.forEach(function ([toggle, selector]) {
        if ((!el.is(selector) && el.children(selector).length < 1 && el.parents(selector).length < 1) &&
          (!el.is(toggle) && el.children(toggle).length < 1 && el.parents(toggle).length < 1)) {
          $(selector).fadeOut(MENU_ANIMATE_DURATION)
        }
      })
    })
  }
  function hideNavbarButton() {
    $openMobileNavbarBtn.animate({
      opacity: 0,
    }, 50)
  }
  function showNavbarButton() {
    $openMobileNavbarBtn.animate({
      opacity: 1,
    }, 50)
  }
  function openNavbar() {
    $mobileNavbar.css('display', 'flex')
    $mobileNavbar.animate({
      bottom: '0px',
      opacity: 1
    }, POPUP_ANIMATE_DURATION)
    hideNavbarButton()
  }
  function closeNavbar() {
    $mobileNavbar.animate({
      bottom: `${$(window).height()}px`,
      opacity: '0'
    }, POPUP_ANIMATE_DURATION, function () {
      $mobileNavbar.css('display', 'none')
    })
    showNavbarButton()
  }
  function openUrunler() {
    closeNavbar()
    $mobileUrunler.css('display', 'flex')
    $mobileUrunler.animate({
      top: '0px',
      opacity: '1'
    }, POPUP_ANIMATE_DURATION)
    hideNavbarButton()
  }
  function closeUrunler() {
    $mobileUrunler.animate({
      top: `${$(window).height()}px`,
      opacity: '0'
    }, POPUP_ANIMATE_DURATION, function () {
      $mobileUrunler.css('display', 'none')
    })
    showNavbarButton()
  }
  function initMenus() {
    $menuContainers.each(function () {
      var menu = $(this).find('.menu')
      $(this).find('.menu-toggle').click(function () {
        menu.fadeToggle(MENU_ANIMATE_DURATION)
      })
    })
  }

  initMenus()
  handleBodyClickFadeOuts([
    ['.menu-toggle', '.menu']
  ])
  handleSubmitBtnClicks()

  if (window.innerWidth < 992) {
    $openMobileNavbarBtn.click(openNavbar)
    $closeMobileNavbarBtn.click(closeNavbar)
    $openMobileUrunlerBtn.click(openUrunler)
    $closeMobileUrunlerBtn.click(closeUrunler)
  }
  else {
    $headerStellar.paroller({
      factor: -1.3,
    })
  }
})
