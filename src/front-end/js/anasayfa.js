$(function () {
  $('div.anasayfa-slider div.slider-item.slider-hidden-item').removeClass('slider-hidden-item');
  $('div.anasayfa-slider').slick({
    //autoplay: true,
    //autoplaySpeed: 2000,
    infinite: true,
    nextArrow: '<div class="slider-next"><i class="lni-chevron-right text-white"></i></div>',
    prevArrow: '<div class="slider-prev"><i class="lni-chevron-left text-white"></i></div>',
    dots: true,
    dotsClass: 'slider-dot'
  });
})