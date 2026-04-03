//*========================================
//* 01 FUNCTIONS ON DOCUMENT READY        =
//*========================================
//* 02 FUNCTIONS CALC & RESIZE, SCROLL    =
//*========================================
//* 03 HEADER                             =
//*========================================
//* 04 SWIPER                             =
//*========================================
//* 05 POPUPS                             =
//*========================================
//* 06 INPUTS, KEY FOCUS                  =
//*========================================
//* 07 TABS, ACCORDION                    =
//*========================================
//* 11 OTHER JS                           =
//*========================================

let _functions = {},
  winW, winH, winScr, isTouchScreen, isAndroid, isIPhone, isMac, isIE, isChrome;

let params = new URL(document.location.toString()).searchParams;
let paramFilter = params.get("filter");
let dropdown = false;

jQuery(function ($) {
  "use strict";

  //*=================================
  //* 01 FUNCTIONS ON DOCUMENT READY =
  //*=================================
  isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
    isAndroid = navigator.userAgent.match(/Android/i),
    isIPhone = navigator.userAgent.match(/iPhone/i),
    isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0,
    isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent),
    isChrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0;



  var filters = [];
  var aosFilters = [];
  var lenFilters = [];
  var lvlFilters = [];
  var aosFilter = '';
  var lenFilter = '';
  var lvlFilter = '';
  var currSelector = '';
  var searchTerm = '';

  const $body = $('body');
  setTimeout(function () {
    $body.addClass('loaded');
  }, 500);


  if (isTouchScreen) {
    $('html').addClass('touch-screen');
  }
  if (isAndroid) {
    $('html').addClass('android');
  }
  if (isIPhone) {
    $('html').addClass('ios');
  }
  if (isMac) {
    $('html').addClass('mac');
  }
  if (isIE) {
    $('html').addClass('ie');
  }
  if (isChrome) {
    $('html').addClass('chrome');
  }


  function toggleFocus(target,state){
    $(target).find('a').each(function(){
      $(this).attr('tabindex',state);
    });
    $(target).find('iframe').each(function(){
      $(this).attr('tabindex',state);
    });
  }
//navigation menu dropdown

  $("li.scholars-dropdown a").click(function(e){
    e.preventDefault();
    $("#courses-dropdown").removeClass('active');
    $("#scholars-dropdown").hasClass('active') ? $("#scholars-dropdown").removeClass('active') : $('#scholars-dropdown').addClass('active');
    if(dropdown){
      dropdown = false;
      toggleFocus('#scholars-dropdown',-1);
    }else{
      toggleFocus('#scholars-dropdown',0);
      setTimeout(function() { dropdown = true; }, 5); 
    }
  });
  $("li.courses-dropdown a").click(function(e){
    e.preventDefault();
    $("#scholars-dropdown").removeClass('active');
    $("#courses-dropdown").hasClass('active') ? $("#courses-dropdown").removeClass('active') : $('#courses-dropdown').addClass('active');

    if(dropdown){
      dropdown = false;
      toggleFocus('#courses-dropdown',-1);
    }else{
      toggleFocus('#courses-dropdown',0);
      setTimeout(function() { dropdown = true; }, 5); 
    }
  });

  $(document).on("click", function (event) {
    if(dropdown){
      if($('#scholars-dropdown').hasClass('active')){
        if ($(event.target).closest("#scholars-dropdown.active").length === 0) {
          $('#scholars-dropdown').removeClass('active');
          dropdown = false;
        } 
      }else if($('#courses-dropdown').hasClass('active')){
        if ($(event.target).closest("#courses-dropdown.active").length === 0) {
          $('#courses-dropdown').removeClass('active');
          dropdown = false;
        } 
      }
    }
  });

// Slick slider Featured Course Carousel

  $('.cc-slider').slick({
    dots: false,
    infinite: false,
    initialSlide:2,
    cssEase: 'ease',
    arrows: true,
    centerMode: true,
    variableWidth: true,
    //focusOnSelect: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i></button>',

    });
  $('.cc-slider-simple').slick({
    dots: false,
    infinite: false,
    initialSlide:1,
    cssEase: 'ease',
    arrows: false,
    centerMode: true,
    variableWidth: true,

    });
  $('.cc-slide').click(function(e){
    console.log('click')
    if($(this) !==  $(document.activeElement)){
      console.log('not focused, proceed to slide');
      //e.preventDefault();
      var slideno = $(this).data('slide');
      if($(this).hasClass('active')){
        $(this).removeClass('active');
      }else{
        $('.cc-slide').removeClass('active');
        $(this).addClass('active'); 
      }
      setTimeout(
        function() 
        {
          $('.cc-slider').slick('slickGoTo',slideno);
        }, 305);
    }
    });


  $('.cc-slider .slick-prev').click(function() {
      var dataId = $('.cc-slider .slick-current').attr("data-slick-index");  
  });


  // Slick slider Testimonial Carousel

  $('.quote-slider').slick({
    dots: true,
    infinite: true,
    cssEase: 'linear',
    arrows: true,
    slidesToShow: 1,
    adaptiveHeight: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i><span class="visually-hidden">Previous</span></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i><span class="visually-hidden">Next</span></button>',

    });

  // Slick slider Faculty Carousel

  $('.faculty-slider').slick({
    dots: false,
    infinite: false,
    cssEase: 'linear',
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-chevron-left"></i><span class="visually-hidden">Previous</span></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-chevron-right"></i><span class="visually-hidden">Next</span></button>',
    
    });


  $('.faculty-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var dataId = $(slick.$slides[nextSlide]).data('slick-index');  
    console.log(dataId);
    if(dataId > 0){
      $(this).parent().addClass('active');
    }else{
      $(this).parent().removeClass('active');
    }
});

  // Slick slider Faculty Carousel

  $('.cp-slider').slick({
    dots: false,
    infinite: false,
    cssEase: 'linear',
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: true,
    swipe: false
  });
  $('.cp-tab').click(function(e){
    e.preventDefault();
    $('.cp-tab').removeClass('active');
    $(this).addClass('active');
    var slideno = $(this).data('slideno');
    $('.cp-slider').slick('slickGoTo',slideno);
  });


  //Faculty Modal
  $('.link-to-faculty-modal').click(function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('.faculty-modals').addClass('active');
    $(target).addClass('active');
    toggleFocus(target,0);
  });
  $('.link-to-faculty-modal2').click(function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $('.faculty-modals2').addClass('active');
    $(target).addClass('active');
    toggleFocus(target,0);
  });

$('.faculty-modal-close-btn').click(function(e){
  e.preventDefault();
  $('.faculty-modals').removeClass('active');
  $('.faculty-modals2').removeClass('active');
  $('.faculty-modal').removeClass('active');

  toggleFocus('.faculty-modal',-1);
});

$('.faculty-modals').click(function(e){
  console.log('fm1');
    if ($.contains($('.faculty-modals .faculty-modal.active')[0],e.target)) {
      console.log(e.target);
    }else{
      console.log(e.target);
      e.preventDefault();
      $('.faculty-modals').removeClass('active');
      $('.faculty-modals .faculty-modal').removeClass('active');
      toggleFocus('.faculty-modal',-1);
    }

});

$('.faculty-modals2').click(function(e){
  console.log('fm2');
    if ($.contains($('.faculty-modals2 .faculty-modal.active')[0],e.target)) {
      console.log(e.target);
    }else{
      console.log(e.target);
      e.preventDefault();
      $('.faculty-modals2').removeClass('active');
      $('.faculty-modals2 .faculty-modal').removeClass('active');

      toggleFocus('.faculty-modal',-1);
    }

});
function stopVideo(element){
  var iframe = $(element).find('iframe');
  if(iframe){
    var iframeSrc = iframe.attr('src');
    iframe.attr('src',iframeSrc);
  }
}
$('.single-video-modal').click(function(e){
  console.log('svm');
    if ($.contains($('.single-video-modal.active .single-video-modal-main')[0],e.target)) {
      console.log(e.target);
    }else{
      console.log(e.target);
      e.preventDefault();
      stopVideo('.single-video-modal.active .single-video-modal-main');
      $('.single-video-modal').removeClass('active');
      toggleFocus(target,-1);
    }

});
$('.featured-video-link').click(function(e){
  console.log('hit');
  e.preventDefault();  
  var target = $(this).attr('href');
  console.log(target);
  var type = $(this).data('type');
  if(type == 'single'){
    console.log('set active');
    console.log(target);
    $(target).addClass('active');
    toggleFocus(target,0);
  }else{

  }
});

/*
$('.course-index').isotope({
  itemSelector: '.course-index-card',
  layoutMode: 'fitRows'
});
*/

function hasResults(){
  if ( $(".course-index-card:visible").length < 1){
    $('.no-results-found').fadeIn(200);
  }else{
    $('.no-results-found').hide();
  }
}



//Course Index AoS Filter
$('.cihf-dropdown select').on('change', function(e) {
  var target = this.value;
  if($(this).is("#cihf-aos")){
    if(target !== aosFilter){
      aosFilter = target;
    }
  }else if($(this).is('#cihf-len')){
    if(target !== lenFilter){
      lenFilter = target;
    } 
  }else if($(this).is('#cihf-lvl')){
    if(target !== lvlFilter){
      lvlFilter = target;
    }
  }


  var selector = '.course-index-card:not(';
  var selectCount = 0;

  if(aosFilter !== ''){
      selector = selector + '.' + aosFilter;
      selectCount++;
  }
  if(lenFilter !== ''){
      selector = selector + '.' + lenFilter;
      selectCount++;
  }
  if(lvlFilter !== ''){
      selector = selector + '.' + lvlFilter;
      selectCount++;
  }

  selector = selector + ')';
  console.log(selector);

  if(selectCount > 0 || $('#search-term').hasClass('active')){
    $('.active-filters').addClass('has-filters'); 
  }else{
    $('.active-filters').removeClass('has-filters');
  }
  /*
  $('.active-filters button').each(function(i, obj) {
    $(obj).removeClass('active');
    if(aosFilters.length > 0){
      if($(obj).data('filter') == aosFilters[0]){
        $(obj).addClass('active');
      }
    }
    if(lenFilters.length > 0){
      if($(obj).data('filter') == lenFilters[0]){
        $(obj).addClass('active');
      }
    }
    if(lvlFilters.length > 0){
      if($(obj).data('filter') == lvlFilters[0]){
        $(obj).addClass('active');
      }
    }

  });
  */

  
  //$(this).prop("selectedIndex", 0);

  currSelector = selector;
  if($('#search-term').hasClass('active')){
    courseSearch();
  }else{
    $('.course-index-card').show();
    if(selectCount > 0){
      $(currSelector).fadeOut(200); 
    }
  }

  setTimeout(function() { hasResults(); }, 210);

});

//Course Index Filter
/*
$('.cihf-dropdown select').on('change', function(e) {
if(this.value != ''){
  var target = this.value;
  console.log(target);
  if(jQuery.inArray(target, filters) < 0){
    filters.push(target); 
  }
  console.log(filters);


  var selector = '.course-index-card:not(';

  for(var i = 0; i < filters.length; i++) { 
    selector = selector + '.' + filters[i];
  }

  selector = selector + ')';
  console.log(selector);

  $('.active-filters').addClass('has-filters');
  $('.active-filters button').each(function(i, obj) {
    if($(obj).data('filter') == target){
      $(obj).addClass('active');
    }
  });
  $(this).val('');
  currSelector = selector;
  $(selector).fadeOut(200);
  setTimeout(function() { hasResults(); }, 210);

}
});
*/

//search function
function courseSearch(){
  var origVal = $('#course-search').val();
  var value = origVal.toLowerCase();
  console.log(value);

  $('.active-filters').addClass('has-filters');

  $('#search-term').html('"' + origVal + '"<i class="fa-solid fa-xmark"></i>');
  $('#search-term').data('term',value);
  $('#search-term').addClass('active');

  searchTerm = value;
  console.log(currSelector);

  $('.course-index-card').show();
  $(currSelector).fadeOut(200);

  $(".course-index-card").filter(function() {
    console.log('searching for:');
    console.log(value);
    if($(this).text().toLowerCase().indexOf(value) < 0){
      $(this).fadeOut(200);
    }
  });
  setTimeout(function() { hasResults(); }, 410);
}

  //course search on enter key press
  $("#course-search").on("keypress", function(e) {

    if(e.which == 13) {
      courseSearch();
    }
  });

  //course search on click of search icon
  $("#course-search-button").click(function(e) {
    e.preventDefault();
    courseSearch();
  });



//Remove Selectable Filter term from filter
// defunct
  /*
$('.filter-btn-cat').click(function(e){
  var target = $(this).data('filter');
  console.log(target);

  if($(this).data('type') == 'subject'){
    console.log(aosFilters);
    aosFilters = aosFilters.filter(x => x !== target);
  }else if($(this).data('type') == 'length'){
    console.log(lenFilters);
    lenFilters = lenFilters.filter(x => x !== target);
  }else if($(this).data('type') == 'level'){
    console.log(lvlFilters);
    lvlFilters = lvlFilters.filter(x => x !== target);
  }

  var selector = '.course-index-card:not(';

  if(aosFilters.length > 0){
      selector = selector + '.' + aosFilters[0];
  }
  if(lenFilters.length > 0){
      selector = selector + '.' + lenFilters[0];
  }
  if(lvlFilters.length > 0){
      selector = selector + '.' + lvlFilters[0];
  }

  selector = selector + ')';
  console.log(selector);

  currSelector = selector;


  if(lenFilters.length < 1 && aosFilters.length < 1 && lvlFilters.length < 1){
    console.log('no more select filters');
    currSelector = '';
    aosFilters = [];
    lenFilters = [];
    lvlFilters = [];
  }
  if(lenFilters.length < 1 && searchTerm === '' && aosFilters.length < 1 && lvlFilters.length < 1){
    console.log('no more of ALL filters');
    $('.course-index-card').fadeIn(200);
    $('.active-filters').removeClass('has-filters');

    $('.filter-btn').removeClass('active');
    $("#cihf-aos").prop("selectedIndex", 0);
    $("#cihf-len").prop("selectedIndex", 0);
    $("#cihf-lvl").prop("selectedIndex", 0);
    filters = [];
    aosFilters = [];
    lenFilters = [];
    lvlFilters = [];
    currSelector = '';
    searchTerm = '';
  }


  if($('#search-term').hasClass('active')){
    console.log('still a search term');
    courseSearch();
  }else{
    $('.course-index-card').show();
    $(currSelector).fadeOut(200);
  }

  $(this).removeClass('active');
  $("#cihf-aos").prop("selectedIndex", 0);
  $("#cihf-len").prop("selectedIndex", 0);
  $("#cihf-lvl").prop("selectedIndex", 0);

  setTimeout(function() { hasResults(); }, 210);
});
*/

/*
$('.filter-btn-cat').click(function(e){
  var target = $(this).data('filter');
  console.log(target);
  filters = filters.filter(x => x !== target);
  console.log(filters);

  var selector = '.course-index-card:not(';

  for(var i = 0; i < filters.length; i++) { 
    selector = selector + '.' + filters[i];
  }

  selector = selector + ')';

  console.log(selector);

  currSelector = selector;
  $('.course-index-card').show();
  $(selector).fadeOut(200);

  if(filters.length < 1 && searchTerm === ''){
    console.log('no more filters');
    $('.course-index-card').fadeIn(200);
    $('.active-filters').removeClass('has-filters');
  }

  $(this).removeClass('active');
  $("#cihf-aos").prop("selectedIndex", 0);
  $("#cihf-len").prop("selectedIndex", 0);
  $("#cihf-lvl").prop("selectedIndex", 0);

  setTimeout(function() { hasResults(); }, 210);
});
*/

//Remove Search Term from search results
$('#search-term').click(function(e){

  var target = $(this).data('filter');

  searchTerm = '';
  $(this).removeClass('active');
  if(lenFilter !== '' && aosFilter !== '' && lvlFilter !== ''){
    $('.active-filters').removeClass('has-filters');

    $('.filter-btn').removeClass('active');
    aosFilter = '';
    lenFilter = '';
    lvlFilter = '';
    currSelector = '';
    searchTerm = '';
  }

  $('#course-search').val('');
  $('.course-index-card').show();
  $(currSelector).fadeOut(200);

  setTimeout(function() { hasResults(); }, 210);

});

//Clear all filter terms, reset all variables;
$('#filter-reset').click(function(e){
  $('.course-index-card').fadeIn(200);
  $('.active-filters').removeClass('has-filters');
  $('.filter-btn').removeClass('active');
  $("#cihf-aos").prop("selectedIndex", 0);
  $("#cihf-len").prop("selectedIndex", 0);
  $("#cihf-lvl").prop("selectedIndex", 0);
  $('#course-search').val('');
  aosFilter = '';
  lenFilter = '';
  lvlFilter = '';
  currSelector = '';
  searchTerm = '';
});

//Initial Load of search results based on url parameter
$(document).ready(function(){

if(paramFilter != null){
  var target = paramFilter;
  console.log(target);
  if(target.includes('subject')){
    aosFilter = target;
    $('#cihf-aos').val(target);
  }else if(target.includes('level')){
    lvlFilter = target;
    $('#cihf-lvl').val(target);
  }else if(target.includes('length')){
    lenFilter = target;
    $('#cihf-len').val(target);
  }


  var selector = '.course-index-card:not(';
  var selectCount = 0;

  if(aosFilter !== ''){
      selector = selector + '.' + aosFilter;
      selectCount++;
  }
  if(lenFilter !== ''){
      selector = selector + '.' + lenFilter;
      selectCount++;
  }
  if(lvlFilter !== ''){
      selector = selector + '.' + lvlFilter;
      selectCount++;
  }

  selector = selector + ')';
  console.log(selector);

  if(selectCount > 0 || $('#search-term').hasClass('active')){
    $('.active-filters').addClass('has-filters'); 
  }
  /*
  $('.active-filters button').each(function(i, obj) {
    $(obj).removeClass('active');
    if(aosFilters.length > 0){
      if($(obj).data('filter') == aosFilters[0]){
        $(obj).addClass('active');
      }
    }
    if(lenFilters.length > 0){
      if($(obj).data('filter') == lenFilters[0]){
        $(obj).addClass('active');
      }
    }
    if(lvlFilters.length > 0){
      if($(obj).data('filter') == lvlFilters[0]){
        $(obj).addClass('active');
      }
    }

  });
  */
  currSelector = selector;
  if(selectCount > 0){
    $(selector).fadeOut(200);  
  }
  setTimeout(function() { hasResults(); }, 210);
}
});


  // ACCORDION
  $(".accordion__item.active .accordion__content").slideDown(0);
  $(document).on("click", ".accordion__main", function () {
    let isActive = $(this).parent().hasClass("active");
    $(this)
      .parent()
      .removeClass("active")
      .find(".accordion__content")
      .attr("tabindex", -1)
      .slideUp(500);
    $(this).attr("aria-expanded", false);
    if (!isActive) {
      $(this)
        .parent()
        .addClass("active")
      $(this)
        .parent()
        .find(".accordion__content")
        .removeAttr("tabindex")
        .slideDown(500);
      $(this).attr("aria-expanded", true);
    }
  });
  // accordion accessibility

  $(".accordion").each(function (aIndex) {
    $(this)
      .find(".accordion__item")
      .each(function (iIndex) {
        $(this)
          .find(".accordion__main")
          .attr({
            id: `accordion-tab-${aIndex}-${iIndex}`,
            "aria-controls": `accordion-panel-${aIndex}-${iIndex}`,
          });
        $(this)
          .find(".accordion__content")
          .attr({
            id: `accordion-panel-${aIndex}-${iIndex}`,
            "aria-labelledby": `accordion-tab-${aIndex}-${iIndex}`,
          });
      });
  });
  $('.mobile-button').click(function(){
    $('.mobile-button').toggleClass('active');
    $('header').toggleClass('open-menu');
    $('.dropdown-menu').removeClass('active');
  });
  $( ".mobile-button" ).on( "keypress", function(e) {
    if(e.keyCode == 13){
      $('.mobile-button').toggleClass('active');
      $('header').toggleClass('open-menu');
      $('.dropdown-menu').removeClass('active'); 
    }
  });
  $('.mobile-dropdown-return').click(function(e){
    e.preventDefault();
    $('.dropdown-menu').removeClass('active');
  });
  //navigation active states based on page
  $(document).ready(function(){
    var body_classes = $('body').attr('class');
    console.log(body_classes);

    if(body_classes.indexOf("single-course") >= 0){
      console.log('single-course');
      $('li.courses-dropdown').addClass('active');
      return false;
    }
    if(body_classes.indexOf("page-template-page-courses-index") >= 0){
      console.log('course-index');
      $('li.courses-dropdown').addClass('active');
    }
    if(body_classes.indexOf("page-child") >= 0){
      console.log('child page');
      $('li.scholars-dropdown').addClass('active');
      return false;
    }
    var id_pos_start = body_classes.indexOf('page-id');
    var page_id = body_classes.substr(id_pos_start);
    if(page_id.indexOf(' ') >= 0){
      console.log('not end of class');
      var id_pos_end = page_id.indexOf(' ');
      page_id = page_id.substr(0,id_pos_end); 
    }
    console.log(page_id);
    page_id = 'li.' + page_id.toString();
    console.log(page_id);
    $(page_id).addClass('active');
  });




});



