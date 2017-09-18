$(function () {
  //on scroll check if we are more than 100 pixels below top, if so show our scroll to top button
  $(document).on('scroll', function () {

    //add or remove class
    if ($(window).scrollTop() > 100) {
      $('.scroll-top-wrapper').addClass('show');
    } else {
      $('.scroll-top-wrapper').removeClass('show');
    }
  });
  //makes our scroll button actually scroll
  $('.scroll-top-wrapper').on('click', scrollToTop);
});

//scrolls to top by finding the offset of the body from the top, then animates a scroll to top
function scrollToTop() {
  verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('body');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({
    scrollTop: offsetTop
  }, 500, 'linear');
}