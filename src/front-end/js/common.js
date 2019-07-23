(function () {

  const initMenus = () => {
    const $menuContainers = $('.menu-container')
    $menuContainers.each(function () {
      const menu = $(this).find('.menu')
      $(this).find('.menu-toggle').click(() => {
        menu.fadeToggle(MENU_ANIMATE_DURATION)
      })
    })
    dismissOnDocumentClick('.menu-toggle', '.menu')
  }

  const allDeviceScripts = () => {
    initMenus()
  }

  const onlyDesktopScripts = () => { }

  const onlyMobileScripts = () => {
    $openMobileNavbarBtn.click(manageNavbar('open'))
    $closeMobileNavbarBtn.click(manageNavbar('close'))
    $openMobileProductsMenuBtn.click(manageProductsMenu('open'))
    $closeMobileProdutsMenuBtn.click(manageProductsMenu('close'))
  }

  const onlyTouchScripts = () => { }

  const documentReadyHandler = () => {
    allDeviceScripts()
    IS_MOBILE && onlyMobileScripts()
    !IS_MOBILE && onlyDesktopScripts()
    IS_TOUCH && onlyTouchScripts()
  }

  $(document).ready(documentReadyHandler)
})()