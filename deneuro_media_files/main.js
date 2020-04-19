jQuery(document).ready(function ($) {

  //typewriter
  let howButton = document.querySelector('a[href="#how"]');
  let typewriter = document.querySelector("#typewriter");
  // function setTypewriterWidth(){
  //   typewriter.style.width = howButton.clientWidth+'px';
  // }
  // setTypewriterWidth();
  // window.addEventListener('resize', setTypewriterWidth)
  // async function typrewriter(element, array, keyPressDelay){
  //   let arrayIndex = 0;
  //   let charIndex = 0;
  //   console.log(array)
  //   while(true){
  //     await write(element,array[arrayIndex], keyPressDelay)
  //     await new Promise(resolve=>setTimeout(resolve,arrayIndex == array.length -1 ? 2000 : 1000));
  //     await backspace(element, array[arrayIndex], keyPressDelay);
  //     await new Promise(resolve=>setTimeout(resolve,500));
  //     arrayIndex = (arrayIndex+1)%array.length;
  //   }
  // }
  // async function write(element, string, delay){
  //   for(let i = 0; i < string.length; i++){
  //     let randDelay = Math.random()*50 + delay;
  //     element.textContent += string[i];
  //     await new Promise(resolve=>setTimeout(resolve,randDelay));
  //   }
  //   return true;
  // }
  // async function backspace(element, string, delay){
  //   for(let i = string.length; i >= 0; i--){
  //     let randDelay = Math.random()*50 + delay;
  //     element.textContent = element.textContent.slice(0,i);
  //     await new Promise(resolve=>setTimeout(resolve,randDelay));
  //   }
  //   return true;
  // }
  // typrewriter(document.querySelector("#typewriter_text"), 
  //   ["Machine Learning, Intelligent, In-transit,", "Real Time Concrete Management"], 
  // 100);

  // Header fixed and Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-fixed')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }

    
  });

  //create our solutions section

  const aboutUs = {
    title: "A few words about our solution",
    paragraph: "We are leveraging three cutting edge technologies to bring deep insights to the Rheology of every concrete load in-transit.",
    solutions: {
      Technology: [
        {
          iconSource: '/images/icons/iot.svg',
          title: 'IoT',
          heading: 'Our proprietary CloudBox collects data from our on-truck sensor array and feeds it into cloud system.'
        },
        {
          iconSource: '/images/icons/ml.svg',
          title: 'Machine Learning',
          heading: 'We analyse many data points from every concrete mix design to calculate instantaneous concrete characteristics and predict the characteristics of the current load on arrival to site.'
        },
        {
          iconSource: '/images/icons/robo.svg',
          title: 'Artificial Intelligence',
          heading: "We automate interventions to ensure that your concrete arrives to site within specification."
        },{
          iconClassName: 'fa fa-dollar',
          title: 'Surplus Marketplace',
          heading: "If all else fails and surplus occurs, we match the concrete spec with local demand."
        },
      ],
      "Business Model": [
        {
          iconClassName: 'fa fa-dollar',
          title: 'Zero cost up front',
          heading: 'We provide the equipment, installation and maintenance with zero upfront cost.'
        },
        {
          iconClassName: 'fa fa-gift',
          title: 'Service Model',
          heading: 'We charge a fixed weekly fee based on requested service offerings and functionality.'
        }
      ]
    } 
  }

  function createSectionTitle(title, paragraph){
    let t = document.createElement("h2");
    t.className = 'title';
    t.textContent = title;
    let p = document.createElement('p');
    p.textContent = paragraph;

    let div = document.createElement("div");
    div.appendChild(t);
    div.appendChild(p);
    div.style.marginBottom = "12px";
    return div;
  }
  function createSolution(solution){
    let div = document.createElement('div');
    div.className = "icon-box wow fadeInUp";
    
    let iconDiv = document.createElement('div');
    iconDiv.className = "icon";
    let icon;
    if(solution.iconClassName){
      icon = document.createElement('i');
      icon.className = solution.iconClassName;
      iconDiv.appendChild(icon);
    } else if (solution.iconSource){
      icon = document.createElement('img');
      icon.src = solution.iconSource;
      iconDiv.appendChild(icon);
    }
    
    let title = document.createElement("h4");
    title.className = 'title';
    title.textContent = solution.title;
    let description = document.createElement('p');
    description.className = 'description';
    description.textContent = solution.heading;

    div.appendChild(iconDiv);
    div.appendChild(title);
    div.appendChild(description);
    return div;
  }
  function createAboutUs(aboutUs){ 
    let about = document.querySelector('#aboutus');
    let sectionTitle = createSectionTitle(aboutUs.title, aboutUs.paragraph);
    about.appendChild(sectionTitle);
    Object.keys(aboutUs.solutions).forEach(key=>{
      let t = document.createElement('h4');
      t.textContent = key;
      about.appendChild(t);
      aboutUs.solutions[key].map(createSolution).forEach(s=>about.appendChild(s));
    });
  }
  // createAboutUs(aboutUs);
  

  // Porfolio filter
  $("#portfolio-flters li").click(function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);

    $(".portfolio-item").fadeOut().css('transform', 'scale(0)');

    setTimeout(function () {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  //toggle sign-me-up and enter email
  $('#how .btn-get-started').click(()=>{
    let button = document.querySelector('#how .btn-get-started');
    let input = document.querySelector('#how #sign-me-up-input');
    button.classList.add('height0');
    input.classList.remove('height0');
  })
  $('#how button').click((e)=>{
    let input = document.querySelector('#how #sign-me-up-input');
    let comment = document.querySelector('#how .comment');
    let email = sanitarize(e.target.parentElement.children[0].value);
    if(email.indexOf('@') == -1)
      return;
    fetch('/interest', {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email})
    }).then(r=>r.json()).then(console.log)
    input.classList.add('height0');
    comment.classList.remove('height0');
    console.log(input, comment)
  });
  function sanitarize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/\(\)]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }
});
