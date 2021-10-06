$(document).ready(function(){
  
  $(function() {
  
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: true,
    navPosition: "bottom"
  });

  document.querySelector('.prev') .addEventListener('click', function () {
    slider.goTo('prev');
  });

  document.querySelector('.next') .addEventListener('click', function () {
    slider.goTo('next');
  });
  $('[data-modal=consult]').on('click', function() {
    $('.overlay, #consult').fadeIn('slow');
});
$('.modal__close').on('click', function() {
  $('.overlay, #consult, #thanks, #order').fadeOut('slow');
});

/* $('.button_mini').on('click', function() {
  $('.overlay, #order').fadeIn('slow');
});  */

$('.button_mini').each(function(i) {
  $(this).on('click', function() {
      $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
  });
  $('#consultation form').validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Пожалуйста, укажите своё имя",
      phone: "Пожалуйста, укажите номер телефона",
      email: {
        required: "Пожалуйста, укажите email",
        email: "Неправильно введён email"
      }
    }
  });
  $('#order form').validate();
  $('#consultation-form').validate();
});

$('input[name=phone]').mask("+7 (999) 999-99-99");

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data:$(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');

    $('form').trigger('reset');
  });
  return false;
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
});

$("a[href^='#']").click(function() {
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

});