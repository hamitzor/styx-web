(function () {
  let $mainSlider
  let $hiddenSliderItems
  let $feedbackMessage
  let $closeFeedbackMessageBtn
  let $sentSuccessfully
  let $notSent
  let $headerStellar

  const setElements = () => {
    $mainSlider = $("div#main-slider")
    $hiddenSliderItems = $mainSlider.find("div.slider-item.slider-hidden-item")
    $feedbackMessage = $("div.feedback-message")
    $closeFeedbackMessageBtn = $feedbackMessage.find("button.close-btn")
    $sentSuccessfully = $("div.sent-successfully")
    $notSent = $("div.not-sent")
    $headerStellar = $("div#header-stellar")
  }

  const allDeviceScripts = () => {
    $closeFeedbackMessageBtn.on("click", function () {
      $feedbackMessage.fadeOut(200)
    })

    const mainSliderOptions = {
      autoplay: true,
      autoplaySpeed: 7000,
      infinite: true,
      nextArrow: `<div class="slider-next"><i class="lni-chevron-right text-white"></i></div>`,
      prevArrow: `<div class="slider-prev"><i class="lni-chevron-left text-white"></i></div>`,
      dots: true,
      dotsClass: "slider-dot"
    }
    $hiddenSliderItems.removeClass("slider-hidden-item")
    $mainSlider.slick(mainSliderOptions)

    const offerFormValidateOptions = {
      ...COMMON_VALIDATION_OPTIONS,
      rules: {
        ad_soyad: {
          required: true
        },
        eposta: {
          required: true,
          email: true
        },
        tel: {
          pattern: /\d\d\d\d\ \d\d\d\ \d\d\ \d\d/
        },
        hizmet: {
          required: true
        },
        mesaj: {
          required: true
        }
      }
    }
    const offerFormOnSubmit = function ({ $submitBtn, validator }) {
      const isFormValid = this.valid()
      if (isFormValid) {
        $submitBtn.attr("disabled", "")
        const body = {}
        const formData = new FormData(this[0])
        formData.forEach((value, key) => {
          body[key] = value
        })
        fetch(this.attr("action"), {
          headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body),
          method: "POST",
        })
          .then(res => res.json())
          .then(json => {
            $submitBtn.removeAttr("disabled")
            if (json.status === "OK") {
              $sentSuccessfully.fadeIn(200, () => {
                this[0].reset()
              })
            }
            else if (json.status === "BAD_REQUEST") {
              validator.showErrors(json.payload)
            }
            else {
              $notSent.fadeIn(200, () => {
                this[0].reset()
              })
            }
          })
      }
    }
    createForm({
      name: "offer-form",
      validateOptions: offerFormValidateOptions,
      onSubmit: offerFormOnSubmit
    })
  }

  const onlyDesktopScripts = () => {
    $headerStellar.paroller({
      factor: -1.3,
    })
  }

  const onlyMobileScripts = () => { }

  const onlyTouchScripts = () => { }

  const documentReadyHandler = () => {
    setElements()
    allDeviceScripts()
    IS_MOBILE && onlyMobileScripts()
    !IS_MOBILE && onlyDesktopScripts()
    IS_TOUCH && onlyTouchScripts()
  }

  $(document).ready(documentReadyHandler)
})()