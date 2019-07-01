$(document).ready(function () {
  const windowWith = window.innerWidth

  const stellarRatio = windowWith < 576 ? "0.7" : "1.5"


  $("div#stellar-header").attr("data-stellar-background-ratio", stellarRatio)

  $.stellar()

  $(".grid").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows"
  })
})
