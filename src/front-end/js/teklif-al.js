(function () {
  let $feedbackMessage
  let $closeFeedbackMessageBtn
  let $sentSuccessfully
  let $notSent

  const setElements = () => {
    $feedbackMessage = $("div.feedback-message")
    $closeFeedbackMessageBtn = $feedbackMessage.find("button.close-btn")
    $sentSuccessfully = $("div.sent-successfully")
    $notSent = $("div.not-sent")
  }

  const allDeviceScripts = () => {

    $closeFeedbackMessageBtn.on("click", function () {
      $feedbackMessage.fadeOut(200)
    })

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
              console.log(json.payload)
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

  const onlyDesktopScripts = () => { }

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