$(document).ready(function () {
  var windowWith = window.innerWidth;

  var stellarRatio = windowWith < 576 ? "0.7" : "1.5";


  $("div#stellar-header").attr("data-stellar-background-ratio", stellarRatio);

  $.stellar();
})
