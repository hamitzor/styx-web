(function () {
  window.contactInitMap = () => {
    $(document).ready(() => {
      const $map = $('div#gm-location')
      const location = { lat: 39.975591, lng: 32.735205 }
      const map = new google.maps.Map($map[0], {
        center: location,
        zoom: 11
      })

      new google.maps.Marker({
        position: location,
        map,
        icon: $map.data('styx-icon')
      })
    })
  }
  const documentReadyHandler = () => { }
  $(document).ready(documentReadyHandler)
})()