(function () {

  const setGlobalConstants = () => {
    window.POPUP_ANIMATE_DURATION = 300
    window.MENU_ANIMATE_DURATION = 200

    window.COMMON_VALIDATION_OPTIONS = {
      errorElement: 'div',
      errorClass: "validation-error",
      focusCleanup: true,
      focusInvalid: false,
      onkeyup: false
    }

    window.IS_TOUCH = (('ontouchstart' in window)
      || (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0))

    window.IS_MOBILE = window.innerWidth < 992
  }

  const setGlobalElements = () => {
    window.$mobileNavbar = $('div#mobile-navbar')
    window.$openMobileNavbarBtn = $('button#open-mobile-navbar')
    window.$closeMobileNavbarBtn = $('button#close-mobile-navbar')
    window.$mobileProductsMenu = $('div#mobile-products-menu')
    window.$openMobileProductsMenuBtn = $('button#open-mobile-products-menu')
    window.$closeMobileProdutsMenuBtn = $('button#close-mobile-products-menu')
  }

  const setGlobalFunctions = () => {

    window.createForm = ({ name, onSubmit, validateOptions }) => {
      const $form = $(`form[data-form-name="${name}"]`)
      const messages = {}
      $form.find('[name]').each((_, el) => {
        const $el = $(el)
        const name = $el.attr('name')
        messages[name] = {
          required: $el.data('validation-required-msg'),
          email: $el.data('validation-eposta-msg'),
          pattern: $el.data('validation-pattern-msg')
        }
      })
      const validator = $form.validate({ ...validateOptions, messages })
      const $submitBtn = $(`button[data-submit-btn="${name}"]`)
      $form.find('[name]:not([data-no-enter-submit="true"])').on('keyup', function (e) {
        if (e.which == 10 || e.which == 13) {
          onSubmit.call($form, { $submitBtn, validator })
        }
      })
      $submitBtn.on('click', () => {
        onSubmit.call($form, { $submitBtn, validator })
      })
    }

    window.dismissOnDocumentClick = (toggler, item) => {
      $(document).on('click', (e) => {
        const $el = $(e.target)
        if ((!$el.is(item) && $el.children(item).length < 1 && $el.parents(item).length < 1) &&
          (!$el.is(toggler) && $el.children(toggler).length < 1 && $el.parents(toggler).length < 1)) {
          $(item).fadeOut(MENU_ANIMATE_DURATION)
        }
      })
    }

    window.manageNavbar = mode => () => {
      const open = mode === 'open'
      $openMobileNavbarBtn.animate({
        opacity: open ? 0 : 1,
      }, 50)
      open && $mobileNavbar.css('display', 'flex')
      $mobileNavbar.animate({
        bottom: open ? '0px' : `${$(window).height()}px`,
        opacity: open ? 1 : 0
      }, POPUP_ANIMATE_DURATION, () => {
        !open && $mobileNavbar.css('display', 'none')
      })
    }

    window.manageProductsMenu = mode => () => {
      const open = mode === 'open'
      open && manageNavbar('close')()
      open && $mobileProductsMenu.css('display', 'flex')
      $mobileProductsMenu.animate({
        top: open ? '0px' : `${$(window).height()}px`,
        opacity: open ? 1 : 0
      }, POPUP_ANIMATE_DURATION, () => {
        !open && $mobileProductsMenu.css('display', 'none')
      })
    }

  }

  const documentReadyHandler = () => {
    setGlobalElements()
  }

  $(document).ready(documentReadyHandler)
  setGlobalFunctions()
  setGlobalConstants()

})()

