$(document).ready(function () {
  const $teklifForm = $('form#teklif-form')
  const $teklifFormSubmitBtn = $('[data-submit-form="#teklif-form"]')
  const $hiddenSliderItems = $('div.anasayfa-slider div.slider-item.slider-hidden-item')
  const $anasayfaSlider = $('div.anasayfa-slider')
  const $sentSuccessfully = $('div.sent-successfully')
  const $closeSentSuccessfullyBtn = $sentSuccessfully.find('button.close-btn')


  $closeSentSuccessfullyBtn.on('click', function () {
    $sentSuccessfully.fadeOut(200)
  })

  $hiddenSliderItems.removeClass('slider-hidden-item')
  $anasayfaSlider.slick({
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    nextArrow: '<div class="slider-next"><i class="lni-chevron-right text-white"></i></div>',
    prevArrow: '<div class="slider-prev"><i class="lni-chevron-left text-white"></i></div>',
    dots: true,
    dotsClass: 'slider-dot'
  })

  handleEnterOnInputs($teklifForm)
  const teklifFormValidator = $teklifForm.validate({
    ...commonValidationOptions,
    messages: getValidationMessages($teklifForm),
    rules: {
      ad_soyad: {
        required: true
      },
      e_posta: {
        required: true,
        email: true
      },
      telefon: {
        pattern: /\d\d\d\d\ \d\d\d\ \d\d\ \d\d/
      },
      hizmet: {
        required: true
      },
      mesaj: {
        required: true
      }
    }
  })

  $teklifForm.on('submit', function (e) {
    e.preventDefault()
    const isValid = $teklifForm.valid()
    if (true) {
      $teklifFormSubmitBtn.attr('disabled', '')
      const body = {}
      const formData = new FormData($teklifForm[0])
      formData.forEach(function (value, key) {
        body[key] = value
      })
      console.log($teklifForm.attr('action'))
      fetch($teklifForm.attr('action'), {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        method: "POST",
      })
        .then(res => res.json())
        .then(json => {
          $teklifFormSubmitBtn.removeAttr('disabled')
          if (json.status === 'OK') {
            $sentSuccessfully.fadeIn(200, function () {
              $teklifForm[0].reset()
            })
          }
          else if (json.status === 'BAD_REQUEST') {
            teklifFormValidator.showErrors(json.payload)
          }
          else {
            console.log("ERROR")
          }
        })
    }
  })

})