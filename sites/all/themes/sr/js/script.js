if ((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)) {
  window.onpageshow = function(evt) {
    // If persisted then it is in the page cache, force a reload of the page.
    if (evt.persisted) {
      document.body.style.display = "none";
      location.reload();
    }
  };
}

var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

(function($, Drupal, window, document, undefined) {

  /*
   * Center HTML element
   * by Kelvin
   *
   * @param mode: (string) 'h'/'v'/'both'
   */
  $.fn.center = function(mode) {
    this.css({
      'position': 'absolute'
    });
    if (mode != "h" && mode != "v") {
      mode = "both";
    }
    if (mode == "h" || mode == "both") {
      this.css({
        "left": Math.max(0, (($(window).width() - this.width()) / 2) + $(window).scrollLeft()) + "px"
      });
    }
    if (mode == "v" || mode == "both") {
      this.css({
        "top": Math.max(0, (($(window).height() - this.height()) / 2) + $(window).scrollTop()) + "px"
      });
    }
    return this;
  }

  /*
   * Capitalise first letter of whole sentence or each word
   * by Kelvin
   *
   * @param str: (string) [the string to process]
   * @param each: (boolean) [true to capitalise each word]
   */

  function capitaliseFirstLetter(str, each) {
    if (each) {
      var newStr = '';
      var arr = str.split(' ');
      for (var i in arr) {
        newStr += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        if (i != arr.length)
          newStr += " ";
      }
      return newStr;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /*
   * Trim space from start and end
   * from web
   *
   * @param str: (string) [the string to process]
   */

  function trimSpace(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        str = str.substring(0, i + 1);
        break;
      }
    }
    return str;
  }

  /*
   * extend the prototype of Object to check it's size
   */
  Object.size = function(obj) {
    var size = 0,
            key;
    for (key in obj) {
      if (obj.hasOwnProperty(key))
        size++;
    }
    return size;
  };

  /*
   * sticky footer, for short page
   */

  function stickyFooter() {
    var winH = $(window).height();
    var mainH = $('#main').outerHeight() + ($('body').hasClass('admin-menu') ? 29 : 0);
    var footerH = $('#footer').height();

    var contentH;
    contentH = mainH + footerH;
    console.log(winH+" "+mainH+" "+footerH+" "+contentH);

    if (winH > contentH) {
      /*if(isChrome){
        $('#footer').css({
          'position': 'absolute',
          'bottom': -footerH
        });
        $('body').css({
          'background': '#222'
        });
      }
      else{*/
        $('#footer').css({
          'position': 'fixed',
          'bottom': 0
        });
        $('html').css({
          'background': 'white'
        });
      //}
    }
    else {
      //console.log("static");
      $('#footer').css({
        'position': 'static',
        'bottom': 'auto'
      });
      $('html').css({
        'background': '#222'
      });
    }
  }

  /*
   * cross browser detecting scrolltop
   */
  function getScrollTop() {
    if (typeof pageYOffset != 'undefined') {
      //most browsers
      return pageYOffset;
    }
    else {
      var B = document.body; //IE 'quirks'
      var D = document.documentElement; //IE with doctype
      D = (D.clientHeight) ? D : B;
      return D.scrollTop;
    }
  }


  $(window).load(function() {

    /*
     * global style
     * =======================================================================
     */

    var winH;
    var headerH = $('#header-top-wrap').outerHeight(true) + ($('#header-bottom').children().length ? $('#header-bottom-wrap').outerHeight(true) : 0);
//    console.log(headerH);
    var footerH = $('#footer').height();
    var diff;

    $(window).resize(function() {
      winH = $(window).height();
    }).resize();


    // ========== header ==========
    // main pulldown menu, change implementation for iPad
    $('#triangle-hotspot').click(function(e) {
      $(this).toggleClass('hover');
    });

    /*$('body').click(function(e){
    if($(e.target).is('a')){
      return;
    }else{
      $('#triangle-hotspot').toggleClass('hover');
    }
  });*/

    // fixed ipad no-refresh issue after clicked back button
//    var event;
//    if (Modernizr.touch) {
//      event = 'touchstart';
//    } else {
//      event = 'click';
//    }
//    $('*').bind('click', function(e) {
//      e.stopPropagation();
//      console.log(e.target);
//      if ($('#header-left').find(e.target).length == 0) {
//        $('#triangle-hotspot').removeClass('hover');
//      }
//    });


    // header left section > page title
    // using crumbs module to gen breadcrumb, but it doesn't allow us to alter the structure
    // so customize it via js
    /*
     var count = $('#block-crumbs-breadcrumb ol li').length;
     $('#block-crumbs-breadcrumb ol li').each(function(i, v) {
     var text = trimSpace($(this).text().replace(/›/gi, ''));
     
     if (count == 1) {
     $('#header-left').after('<h2 id="page-title">' + text + '</h2>');
     $('.region-breadcrumb').remove();
     } else {
     // section why-sr has special design
     // show parent title only
     if ($('body').hasClass('section-why-sr')) {
     if (i == 0) {
     $('#header-left').after('<h2 id="page-title"><a href="/why-sr">' + text + '</a></h2>');
     }
     } else {
     if (i == 0) {
     $('#header-left').after('<h2 id="parent-title"><a href="' + $(this).find('a').attr('href') + '">' + text + '</a></h2>');
     } else if (i == 1) {
     $('#parent-title').after('<h2 id="page-title">' + text + '</h2>');
     }
     }
     $('.region-breadcrumb').remove();
     }
     });
     */

    // arrange page-title's position if it has 2 rows
    //    if ($('#page-title').height() > 20) {
    //      $('#page-title').css('padding-top', 10);
    //    }

    var pageTitleArr = $('#page-title').text().split(' ');
    if (pageTitleArr.length > 3) {
      pageTitleArr = pageTitleArr.slice(0, 3);
      var newPageTitle = pageTitleArr.join(' ') + '...';
      $('#page-title').text(newPageTitle);
    }


    $('body.section-why-sr #parent-title').remove();

    // header right section > search
    $('#search-trigger').click(function() {
      return false;
    })
    $('#edit-keys').keyup(function() {
      if ($(this).val() == '') {
        $('#search-area').removeClass('expanded');
      } else {
        $('#search-area').addClass('expanded');
      }
    });

    // header right section > dropdown share menu
    $('#social-trigger, #header-right-pulldown-close').click(function(e) {
      e.preventDefault();
      $('#social-trigger').toggleClass('active');
      $('#header-right-pulldown').toggleClass('show');
    });

    // main menu 2nd level hightlight item
    if ($('body').hasClass('about-us') || $('body').hasClass('node-type-about-us'))
      $('#about-us').addClass('active-trail');

    if ($('body').hasClass('our-people') || $('body').hasClass('node-type-our-pepople'))
      $('#our-people').addClass('active-trail');

    if ($('body').hasClass('thought-leadership') || $('body').hasClass('node-type-thought-leadership'))
      $('#thought-leadership').addClass('active-trail');
    // ========== end of header ==========


    // ========== #main ==========
    if ($('#header-bottom div.block').length) {
      $('#main').css('padding-top', '+=45');
    }
    // ========== end of #main ==========


    // ========== scroll to top ==========
    $s = $('#scrolltop').click(function(e) {
      //      $(window).scrollTo(0, 800, {offset: 0});
      e.preventDefault();
      $.smoothScroll({
        scrollTarget: 'body',
        speed: 800
      });
    });

    if ($('html').hasClass('no-touch')) {
      $(window).live("resize", function() {
        $s.css({
          "right": Math.max(0, (($(window).width() - 55) / 2) + $(window).scrollLeft()) - 540 + "px"
        })
      }).resize();
    }


    $(window).scroll(function() {
//      alert(getScrollTop());
      if (getScrollTop() > 50) {
        $s.addClass('shown');
      } else {
        $s.removeClass('shown');
      }
    });


    // ========== end of scroll to top ==========


    // ========== nav control (about us, our people, etc) ==========
    if ($('nav.control').length) {
      var scrollOffset = 0;
      if ($('#header').length) {
        scrollOffset = 0 - $('#header').outerHeight();
      }
      if ($('body').hasClass('admin-menu')) {
        scrollOffset -= 29;
      }
      var duration = 800;
      var hash = window.location.hash;
      if (hash.length) {
        $.smoothScroll({
          scrollTarget: hash,
          speed: duration,
          offset: scrollOffset
        });
      }
      $('nav.control a').click(function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        $.smoothScroll({
          scrollTarget: targetId,
          speed: duration,
          offset: scrollOffset
        });
      });
    }

    // ========== end of nav control ==========


    // ========== sidebar ==========
    if ($('.region-sidebar').length) {

      var sideH;
      var footerT;
      /*
       $(window).resize(function(e) {
       winH = $(window).height();
       footerT = $('#footer').offset().top;
       diff = footerT - winH;
       
       $('.region-sidebar').css({
       'height': winH - headerH + diff
       });
       
       //        $('#Demo').perfectScrollbar('update');
       }).resize();
       
       // fixed sidebar, if footer is shown in screen, adjust it's height
       $(window).scroll(function(e) {
       var winS = $(window).scrollTop();
       // check if footer is in screen
       var footerShownH = (winS - diff) > 0 ? (winS - diff) : 0;
       $(".region-sidebar").height(winH - headerH - footerShownH);
       sideH = $(".region-sidebar").height();
       //        $('#Demo').perfectScrollbar('update');
       }).scroll();
       */
      $('.region-sidebar').perfectScrollbar({
        wheelSpeed: 30,
        wheelPropagation: true
      });

      $(window).bind('resize scroll', function() {
        winH = $(window).height();
        var winS = $(window).scrollTop();
        footerT = $('#footer').offset().top;


//        diff = footerT - winH;
        var footerShownH = winH - (footerT - winS) > 0 ? winH - (footerT - winS) : 0;


        $('.region-sidebar').css({
          'height': winH - headerH - footerShownH
        });



//        $(".region-sidebar").height(winH - headerH - footerShownH);

//        $('#Demo').perfectScrollbar('update');

        setTimeout(function() {
          $('.region-sidebar').perfectScrollbar('update');
        }, 300);

        sideH = $(".region-sidebar").height();
      });

      $('.region-sidebar').bind('resize scroll click', function() {
        setTimeout(function() {
          $('.region-sidebar').perfectScrollbar('update');
        }, 400);
      });

      /*
       var sideH;
       var footerT = $('#footer').offset().top;
       diff = footerT - winH;
       
       $('.region-sidebar').css({
       'height': winH - headerH + diff
       }).niceScroll({
       'autohidemode': false,
       'touchbehavior': false,
       'cursorwidth': 12,
       'cursorborderradius': 1,
       'cursorcolor': '#b2b2b2',
       'cursorborder': '1px solid #969696',
       'nativeparentscrolling': true,
       'horizrailenabled': false
       });
       sideH = $(".region-sidebar").height();
       
       
       $(window).resize(function(e) {
       winH = $(window).height();
       footerT = $('#footer').offset().top;
       diff = footerT - winH;
       
       $('.region-sidebar').css({
       'height': winH - headerH + diff
       }).getNiceScroll().resize();
       
       sideH = $(".region-sidebar").height();
       
       //        $('.nicescroll-rails').css({
       //          'left': $('.region-sidebar').next().offset().left + parseInt($('.region-sidebar').css('padding-left')) - 2
       //        });
       
       });
       
       // fixed sidebar, if footer is shown in screen, adjust it's height
       $(window).scroll(function(e) {
       var winS = $(window).scrollTop();
       // check if footer is in screen
       var footerShownH = (winS - diff) > 0 ? (winS - diff) : 0;
       $(".region-sidebar").height(winH - headerH - footerShownH);
       //        $(".region-sidebar").getNiceScroll().resize();
       sideH = $(".region-sidebar").height();
       
       $(".region-sidebar").getNiceScroll().resize();
       }).scroll();
       
       
       
       
       setTimeout(function() {
       rightH = $('.view-news').outerHeight(true);
       
       var nice = $(".region-sidebar").niceScroll({
       'autohidemode': false,
       'touchbehavior': false,
       'cursorwidth': 12,
       'cursorborderradius': 1,
       'cursorcolor': '#b2b2b2',
       'cursorborder': '1px solid #969696',
       'nativeparentscrolling': true
       });
       
       $(window).resize(function(e) {
       winH = $(window).height();
       var footerT = $('#footer').offset().top;
       diff = footerT - winH;
       
       if (rightH < winH - headerH - footerH) {
       $('.view-news').css({
       'min-height': (winH - headerH - footerH) + 'px',
       'height': 'auto !important',
       'height': (winH - headerH - footerH) + 'px'
       });
       } else {
       $('.view-news').css({
       'min-height': rightH + 'px',
       'height': 'auto !important',
       'height': rightH + 'px'
       });
       }
       
       $('.region-sidebar').css({
       'height': winH - headerH,
       //            'top': headerH,
       //            'left': $('#content').offset().left
       });
       
       $(".region-sidebar").getNiceScroll().resize();
       sideH = $(".region-sidebar").height();
       
       $('.nicescroll-rails').css({
       'left': $('.region-sidebar').offset().left + $('.region-sidebar').width() + parseInt($('.region-sidebar').css('padding-left')) - 2
       })
       }).resize();
       
       setTimeout(function() {
       $(window).resize();
       }, 100);
       
       
       $('.region-sidebar .accordion > a').click(function() {
       // accordion animation need 0.5s, so trigger nicescroll resize method after animation
       setTimeout(function() {
       $(".region-sidebar").getNiceScroll().resize();
       }, 600);
       });
       
       // fixed sidebar, if footer is shown in screen, adjust it's height
       $(window).scroll(function(e) {
       var winS = $(window).scrollTop();
       // check if footer is in screen
       var footerShownH = (winS - diff) > 0 ? (winS - diff) : 0;
       $(".region-sidebar").height(winH - headerH - footerShownH);
       $(".region-sidebar").getNiceScroll().resize();
       sideH = $(".region-sidebar").height();
       }).scroll();
       }, 130);
       */

    }
    // ========== end of sidebar ==========


    // ========== other snippet ==========
    // accordion
    $('.accordion').each(function() {
      if ($(this).find(">ul").length) {
        $(this).find(">a").addClass('suffix');
      }

      $(this).find('>a').each(function(i, v) {
        var $ac = $(this).parent();
        var $ul = $(this).next();
        var h = 0;

        $ac.find('li').each(function(i, v) {
          h += $(v).outerHeight(true);
        });
        if ($ac.hasClass('selected')) {
          $ul.css({'height': h});
        }

        $(this).click(function(e) {
          e.preventDefault();

          if (!$ac.hasClass('selected')) {
            $ac.addClass('selected');
            $ul.css({'height': h});
          } else {
            $ac.removeClass('selected');
            $ul.css({'height': 0});
          }
        });
      });
    });



    // ========== end of other snippet ==========

    // end of global style



    /*
     * Front page
     * =======================================================================
     */
    // fullscreen background slideshow 
    if ($('body').hasClass('front')) {
      $('<div id="maximage" />').appendTo('#content').append($('#block-views-main-page-slideshow-block .view-content > div')).after('<div id="nav" />');

      var headerH = $('#header').height() + ($('body').hasClass('admin-menu') ? 29 : 0);

      $('#maximage').maximage({
        cycleOptions: {
          fx: 'scrollHorz',
          speed: 1200,
          timeout: 6000,
          pager: '#nav',
          pauseOnPagerHover: true,
          after: function() {
            var i = $('#nav a.activeSlide').index();
            $('#maximage > div').removeClass('active');
            $('#maximage > div').eq(i).addClass('active');
          }
        },
        onFirstImageLoaded: function() {
          var duration = 2000;
//          alert('haha');
//          $('#cycle-loader').fadeOut(duration);
          $('#cycle-loader').animate({"opacity": 0}, duration);
//          $('#cycle-loader').hide(duration);
          $('#content').show();
          $('#maximage').fadeIn(duration);

          $('.in-slide-content').eq(0).fadeIn(duration);
          $('#nav').fadeIn(duration);

          setTimeout(function() {
            $('.mc-image:eq(0)').siblings().find('.in-slide-content').css('opacity', 1);
          }, duration + 1000);
        }
      });
//setInterval(function() {
//  console.log($('#maximage').css('opacity'));
//}, 50);
      $(window).resize(function() {
        $('#content').css({
          'width': $(window).width(),
          'height': $(window).height() - headerH
        });
      }).resize();

      $('#block-views-main-page-slideshow-block').remove();


      var playing = true;
      $('#nav a').live('click', function(e) {
        if (playing) {
          $('#maximage').cycle('toggle');
          playing = false;
        }

        e.preventDefault();
      });


      $('.mc-image .center-wrap a').hover(
              function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $('#maximage').cycle('pause');
                $(this).parent().parent().next().addClass('show');
              },
              function(e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                $('#maximage').cycle('resume');
                $(this).parent().parent().next().removeClass('show');
              }
      );


    }
    // end of Front page




    /*
     * Our Work page
     * =======================================================================
     */
    if ($('body').hasClass('our-work')) {

      // isotope implementation
      var segment = 12;
      var total = $('.isotope-element').length;
      var totalGroup = Math.ceil(total / segment);
      var loadedGroups = [];
      var duration = 500;
      var options = {
        filter: ''
      };
      var currentFilter = '';

      // LOADMORE FUNCTION:
      // for example, if filter 1 has 11 items, load 3 items at the start
      // after loadmore button is clicked, insert 3 items
      // the class of them is:
      // 1st row items: 4,3,2,1
      // 2nd row items: 4,3,2
      // 3rd row items: 4,3
      // 4th row items: 4
      // 
      // at the beginning, 1 is included in filter
      // after loadmore button is clicked 1 time, filter will be 1,2
      // 2nd time is 1,2,3, 3rd time is 1,2,3,4
      // so loadmore function is done
      //
      // click deliverable filter links is only for hashchange
      // not using click event to trigger isotope
      // isotope is triggered by hashchange event one way only to avert the conflict
      // and the loadmore filters(1,2,3,4) shouldn't be shown in url
      // just append them to isotope option
      $('#deliverable a').each(function(i, v) {
        var $this = $(this);
        var href = $(this).attr('href').replace(/^#/, '');
        var option = $.deparam(href, true);

        // save loaded group to array
        // initialed with 1
        // for the loadmore use
        var filter = option.filter.substring(1);
        loadedGroups[filter] = [];
        loadedGroups[filter]['current'] = 1;

        // and record the total amount of items of each category
        loadedGroups[filter]['total'] = $('.' + filter).length;
        loadedGroups[filter]['totalGroups'] = Math.ceil(loadedGroups[filter]['total'] / segment);

        $(this).click(function(e) {
          // highlight the link
          $('#deliverable .selected').removeClass('selected');
          $(this).addClass('selected');
        });
      });


      // filter Expertise is tabs only
      $('#expertise a').each(function(i, v) {
        var $this = $(this);
        // copy 1st item's hashlink of each row to expertise
        $this.attr('href', $('#deliverable div').eq(i).find('a:eq(0)').attr('href'));

        $this.click(function(e) {
          // highlight the link
          $('#deliverable .selected').removeClass('selected');
          $('#deliverable div').hide();
          $('#deliverable div').eq(i).show().find('a:eq(0)').addClass('selected');

          $('#expertise .selected').removeClass('selected');
          $this.addClass('selected');
        });
      });


      // add group class and data-category to each isotope
      // for the loadmore use
      $('.isotope-element').each(function(i, v) {
        var $this = $(this);
        var cat = $this.attr('data-category').split(' ');
        var groupsArr = [];

        for (var j in cat) {
          var index = $('.' + cat[j]).index($this) + 1;
          var currentGroup = Math.ceil(index / segment);
          for (var k = totalGroup; k >= currentGroup; k--) {
            groupsArr.push('group_' + cat[j] + '_' + k);
          }
        }

        var groups = groupsArr.join(' ');
        $this.addClass(groups);
        $this.attr('data-category', $this.attr('data-category') + ' ' + groups);
      });


      // listen hashchange to start the isotope      
      $(window).bind('hashchange', function(event) {
        // get options object from hash
        options = $.deparam.fragment();
        options.itemSelector = '.isotope-element';
        options.layoutMode = 'fitRows';

        if (!options.filter) {
          window.location.hash = 'filter=.branding';
          currentFilter = 'branding';
          options.filter = '.branding';
        } else {
          var filter = options.filter.split('.');
          if (!filter[0])
            filter.shift();
          currentFilter = filter[0];
          var insertGroup = '.group_' + currentFilter + '_' + loadedGroups[currentFilter]['current'];
          options.filter += insertGroup;
          $('#isotope-container').isotope(options);
          $('#isotope-container').isotope('reLayout');


          // toggle loadmore button
          if (loadedGroups[currentFilter]['current'] >= loadedGroups[currentFilter]['totalGroups']) {
            $('#loadmore').hide();
          } else {
            if (!$('#loadmore').is(':visible'))
              $('#loadmore').show();
          }
        }

        var parent = $('#deliverable a[href="#filter=.' + currentFilter + '"]').parent().index('#deliverable div');
        $('#expertise a').eq(parent).trigger('click');
        $('#deliverable a[href="#filter=.' + currentFilter + '"]').trigger('click');
      })
              // trigger hashchange to capture any hash data on init
              .trigger('hashchange');


      // click loadmore to save loaded group
      // and trigger the hashchange
      $('#loadmore').click(function(e) {
        e.preventDefault();

        loadedGroups[currentFilter]['current']++;
        $(window).trigger('hashchange');

        return false;
      });


      // bbq hash history {
      $('#deliverable a, #expertise a, #loadmore').click(function(e) {
        // set hash, triggers hashchange on window
        $.bbq.pushState({
          filter: '.' + currentFilter
        });
      });



      // stick footer to bottom when page is short
      $('#content').resize(function(e) {
        stickyFooter();
      }).resize();

      $(window).resize(function(e) {
        stickyFooter();
      }).resize();

      var title = $('#page-title').text();
      $('#page-title').text('');
      $('<a>').appendTo('#page-title').text(title).attr('href', '/our-work#filter=.branding');
    }

    // detail page, set the banner text position, 
    // and the banner size while resizing the browser
    if ($('body').hasClass('node-type-our-work')) {
      var pTop = parseInt($('#maincontent').css('top'));
      //      console.log(pTop);
      var $img = $('body.node-type-our-work #banner img');
      var imgW = $img.width();
      var imgH = $img.height();
      var imgRatio = imgW / imgH;

      $(window).on("resize", function() {
        var winW = $(window).width();
        var containerRatio = winW / pTop;

        if (containerRatio > imgRatio) {
          $img.width(winW);
          $img.height($img.width() / imgRatio);
        } else {
          $img.height(pTop);
          $img.width($img.height() * imgRatio);
        }

        var newLeft = ($(window).width() - $img.width()) / 2;
        if (newLeft > 0)
          newLeft = 0;

        $img.css({
          'position': 'relative',
          'left': newLeft + 'px'
        });

        // banner text
//        $('body.node-type-our-work #banner-text').css({
//          "left": Math.max(0, (($(window).width() - $('#o-r').width()) / 2) + $(window).scrollLeft()) - 45 + "px",
//          "top": 660 - $("#banner-text").height()
//        });

      }).resize();

      // detail page, clone the next & prev link to bottom of page
      $('body.node-type-our-work #pager').clone().prependTo('#carousel .view-header').attr('id', 'pager2');
      if ($('#pager2 #prev').is('a') && $('#pager2 #next').is('a')) {
        $('#pager2 #prev').text('Previous Project | ');
      } else {
        $('#pager2 #prev').text('Previous Project');
      }
//      console.log('hah');
      $('#pager2 #next').text('Next Project');

      // superbox
      $.superbox.settings = {
        boxId: "superbox", // Id attribute of the "superbox" element
        boxClasses: "", // Class of the "superbox" element
        overlayOpacity: .8, // Background opaqueness
        boxWidth: "690", // Default width of the box
        boxHeight: "467", // Default height of the box
        loadTxt: "Loading...", // Loading text
        closeTxt: "Close", // "Close" button text
        prevTxt: "Previous", // "Previous" button text
        nextTxt: "Next" // "Next" button text
      };
      $.superbox();


      // hide the prev/next arrow of carousel if there are only 3 items
      if ($('#carousel .jcarousel > li').length <= 3) {
        $('.jcarousel-prev').hide();
        $('.jcarousel-next').hide();
      }

    }
    // end of Our work page



    /*
     * Why SR page
     * =======================================================================
     */
    if ($('body').hasClass('our-people')) {
      // superbox
      $.superbox.settings = {
        boxId: "superbox", // Id attribute of the "superbox" element
        boxClasses: "", // Class of the "superbox" element
        overlayOpacity: .8, // Background opaqueness
        boxWidth: "690", // Default width of the box
        boxHeight: "467", // Default height of the box
        loadTxt: "Loading...", // Loading text
        closeTxt: "Close", // "Close" button text
        prevTxt: "Previous", // "Previous" button text
        nextTxt: "Next" // "Next" button text
      };
      $.superbox();
      $('a[rel~="superbox[image]"]').click(function(e) {
        $(this).find('.thumb-hover h3').clone().prependTo('#superbox-innerbox');
        $(this).find('.thumb-hover h4').clone().prependTo('#superbox-innerbox');
      });
    }

    if ($('body').hasClass('thought-leadership')) {
      var contentH = $('.view-thought-leadership').outerHeight();

      // align center the content
      //      var contentW = $('#content .region-sidebar').outerWidth() + $('#content .view-thought-leadership').outerWidth();
      //      $(window).resize(function (e) {
      //        $('#content .region-sidebar').css({
      //          'padding-left': ($(window).width() - contentW) / 2
      //        })
      //      }).resize();

      // detect current page category, then highlight corresponding item in cat list
      var args = window.location.toString().split('/');
      //      console.log(args);
      for (var i in args) {
        if (args[i] == 'thought-leadership') {
          var arg1 = args[(+i) + 1];
          var arg2 = args[(+i) + 2];

          $('#block-sr-thought-leadership-' + arg1 + ' ul li a').each(function(i, v) {
            if ($(this).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '') == arg2) {
              $(this).addClass('current');
            }
          });

          break;
        }
      }
    }
    // detail page, set the banner size while resizing the browser
    if ($('body').hasClass('node-type-thought-leadership')) {
      var pTop = parseInt($('#maincontent').css('padding-top'));
      var $img = $('body.node-type-thought-leadership #banner img');
      var imgW = $img.width();
      var imgH = $img.height();
      var imgRatio = imgW / imgH;

      $(window).on("resize", function() {
        var winW = $(window).width();
        var containerRatio = winW / pTop;

        if (containerRatio > imgRatio) {
          $img.width(winW);
          $img.height($img.width() / imgRatio);
        } else {
          $img.height(pTop);
          $img.width($img.height() * imgRatio);
        }

        var newLeft = ($(window).width() - $img.width()) / 2;
        if (newLeft > 0)
          newLeft = 0;

        $img.css({
          'position': 'relative',
          'left': newLeft + 'px'
        });

      }).resize();
    }
    // end of Why SR page



    /*
     * Culture & careers page
     * =======================================================================
     */
    if ($('body').hasClass('culture-careers')) {
      // This resize demo only works properly with MovingBoxes v2.2.3+
      //
      var timer;
      $(window).resize(function() {
        clearTimeout(timer);
        var slider = $('#slideshow').data('movingBoxes');
        slider.options.width = $(window).width(); // make 50% browser width
        slider.options.panelWidth = 980; // make 70% of wrapper width
        // prevent updating continuously, aka throttle resize
        timer = setTimeout(function() {
          slider.update(false);
        }, 50);
      });

      $('#slideshow').movingBoxes({
        // overall width of movingBoxes
        // width: 300, // Deprecated, but still works in v2.2.2
        // current panel width adjusted to 50% of overall width
        // panelWidth: 0.5, // Deprecated, but still works in v2.2.2    

        // **** Appearance ****
        // start with this panel
        startPanel: 1,
        // non-current panel size: 80% of panel size
        reducedSize: 1,
        // if true, slider height set to max panel height; if false, height will auto adjust.
        fixedHeight: true,
        // **** Behaviour ****
        // animation time in milliseconds
        speed: 500,
        // if true, hash tags are enabled
        hashTags: false,
        // if true, the panel will "wrap" (it really rewinds/fast forwards) at the ends
        wrap: true,
        // if true, navigation links will be added
        buildNav: false,
        // function which returns the navigation text for each panel
        navFormatter: function(index, panel) {
          return "&#9679;"
        },
        // anything other than "linear" or "swing" requires the easing plugin
        easing: 'swing',
        initAnimation: false,
        // **** Selectors & classes ****
        // current panel class
        currentPanel: 'current',
        // added to the navigation, but the title attribute is blank unless the link text-indent is negative
        tooltipClass: 'tooltip',
        // **** Callbacks ****
        // e = event, slider = MovingBoxes Object, tar = current panel #
        // callback when MovingBoxes has completed initialization
        initialized: function(e, slider, tar) {
        },
        // callback upon change panel initialization
        initChange: function(e, slider, tar) {
          // alert( 'Changing panels to #' + tar );
        },
        // callback before any animation occurs
        beforeAnimation: function(e, slider, tar) {
        },
        // callback after animation completes
        completed: function(e, slider, tar) {
          // get name from title
          // var name = slider.$panels.eq(tar-1).find('h2').text().split(' ')[0]; 
          // alert( "Now on " + name + "'s panel" );
        }
      });

      // slideshow-text position
      $(window).resize(function() {
        $('#slideshow-text').css({
          'left': (($(window).width() - 980)) / 2 + 35 + 'px'
        });
      }).resize();


      // superbox
      $.superbox.settings = {
        boxId: "superbox", // Id attribute of the "superbox" element
        boxClasses: "", // Class of the "superbox" element
        overlayOpacity: 1, // Background opaqueness
        boxWidth: "850", // Default width of the box
        boxHeight: "600", // Default height of the box
        loadTxt: "Loading...", // Loading text
        closeTxt: "Close", // "Close" button text
        prevTxt: "Previous", // "Previous" button text
        nextTxt: "Next" // "Next" button text
      };
      $.superbox();

      // slideshow in superbox
      $(window).bind('hashchange', function(event) {
        var hash = location.hash;
        var selector = '';
        var index = '';

        if (hash.indexOf('#event') == 0) {
          $('a[href="' + hash + '"]').trigger('click');
        }

        if (hash.indexOf('#gallery') == 0) {
          selector = hash;
          index = hash.charAt(hash.length - 1);
          $('.event-gallery-big').find(selector).siblings().removeClass('active');
          $('.event-gallery-big').find(selector).addClass('active');
          $('#superbox-innerbox .event-gallery-thumbs a').removeClass('current');
          $('#superbox-innerbox .event-gallery-thumbs a').eq(index).addClass('current');
        }
      }).trigger('hashchange');

      // jobs scroll down
      $('#careers-links a').click(function(e) {
        var $this = $(this);
        e.preventDefault();
        var index = $this.parent().index();

        $('#careers-container ul li').eq(index).find('a').trigger('click');
        $.smoothScroll({
          scrollTarget: '#careers',
          speed: 800
        });
      });

      $('#careers-container li a').click(function(e) {
        e.preventDefault();

        var selector = $(this).attr('href');
//        console.log(selector);
        $(selector).siblings().removeClass('active');
        $(selector).addClass('active');

        $('#careers-container').find('a').removeClass('current');
        $(this).addClass('current');
      });
    }
    // end of Culture & careers page



    /*
     * Clients page
     * =======================================================================
     */

    if ($('body').hasClass('clients')) {
      // use block_load to load views block, can't output semantic structure, damn
      $('.isotope-element:eq(0)').unwrap().unwrap().unwrap();

      // isotope implementation
      var segment = 15;
      var total = $('.isotope-element').length;
      var totalGroup = Math.ceil(total / segment);
      var loadedGroups = [];
      var duration = 500;
      var options = {
        filter: ''
      };
      var currentFilter = '';

      // LOADMORE FUNCTION:
      // for example, if filter 1 has 11 items, load 3 items at the start
      // after loadmore button is clicked, insert 3 items
      // the class of them is:
      // 1st row items: 4,3,2,1
      // 2nd row items: 4,3,2
      // 3rd row items: 4,3
      // 4th row items: 4
      // 
      // at the beginning, 1 is included in filter
      // after loadmore button is clicked 1 time, filter will be 1,2
      // 2nd time is 1,2,3, 3rd time is 1,2,3,4
      // so loadmore function is done
      //
      // click deliverable filter links is only for hashchange
      // not using click event to trigger isotope
      // isotope is triggered by hashchange event one way only to avert the conflict
      // and the loadmore filters(1,2,3,4) shouldn't be shown in url
      // just append them to isotope option
      $('#filter a').each(function(i, v) {
        var $this = $(this);
        var href = $(this).attr('href').replace(/^#/, '');
        var option = $.deparam(href, true);
        //        console.log(option);
        // save loaded group to array
        // initialed with 1
        // for the loadmore use
        var filter = option.filter.substring(1);
        loadedGroups[filter] = [];
        loadedGroups[filter]['current'] = 1;

        // and record the total amount of items of each category
        loadedGroups[filter]['total'] = $('.' + filter).length;
        loadedGroups[filter]['totalGroups'] = Math.ceil(loadedGroups[filter]['total'] / segment);

        $(this).click(function(e) {
          // highlight the link
          $('#filter .selected').removeClass('selected');
          $(this).addClass('selected');
        });
      });


      // add group class and data-category to each isotope
      // for the loadmore use
      $('.isotope-element').each(function(i, v) {
        var $this = $(this);
        var cat = $this.attr('data-category').split(' ');
        var groupsArr = [];

        for (var j in cat) {
          var index = $('.' + cat[j]).index($this) + 1;
          var currentGroup = Math.ceil(index / segment);
          for (var k = totalGroup; k >= currentGroup; k--) {
            groupsArr.push('group_' + cat[j] + '_' + k);
          }
        }

        var groups = groupsArr.join(' ');
        $this.addClass(groups);
        $this.attr('data-category', $this.attr('data-category') + ' ' + groups);
      });


      // listen hashchange to start the isotope      
      $(window).bind('hashchange', function(event) {
        // get options object from hash
        options = $.deparam.fragment();
        options.itemSelector = '.isotope-element';
        options.layoutMode = 'fitRows';

        if (!options.filter) {
          window.location.hash = 'filter=.all';
          currentFilter = 'all';
          options.filter = '.all';
        } else {
          var filter = options.filter.split('.');
          if (!filter[0])
            filter.shift();
          currentFilter = filter[0];
          //          console.log(loadedGroups);
          //          console.log(filter);
          var insertGroup = '.group_' + currentFilter + '_' + loadedGroups[currentFilter]['current'];
          options.filter += insertGroup;
          $('#isotope-container').isotope(options);

          // toggle loadmore button
          if (loadedGroups[currentFilter]['current'] >= loadedGroups[currentFilter]['totalGroups']) {
            $('#loadmore').hide();
          } else {
            if (!$('#loadmore').is(':visible'))
              $('#loadmore').show();
          }
        }


        $('#filter a[href="#filter=.' + currentFilter + '"]').trigger('click');
      })
              // trigger hashchange to capture any hash data on init
              .trigger('hashchange');


      // click loadmore to save loaded group
      // and trigger the hashchange
      $('#loadmore').click(function(e) {
        e.preventDefault();

        loadedGroups[currentFilter]['current']++;
        $(window).trigger('hashchange');

        return false;
      });


      // bbq hash history {
      $('#filter a, #loadmore').click(function(e) {
        // set hash, triggers hashchange on window
        $.bbq.pushState({
          filter: '.' + currentFilter
        });
      });

      // isotope relayout
      $('#tileview').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        //        $('#isotope-container').isotope('destroy');

        $this.siblings().removeClass('selected');
        $this.addClass('selected');
        $('.view-clients-filter').removeClass('listview-filter').addClass('tileview-filter');
        $('#isotope-container').removeClass('listview').addClass('tileview');
        $('#isotope-container').isotope('reLayout');

      });

      $('#listview').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        //        $('#isotope-container').isotope('destroy');

        $this.siblings().removeClass('selected');
        $this.addClass('selected');
        $('.view-clients-filter').removeClass('tileview-filter').addClass('listview-filter');
        $('#isotope-container').removeClass('tileview').addClass('listview');
        $('#isotope-container').isotope('reLayout');

      });

      $('#tileview').trigger('click');

      // if user clicks on ‘Clients’
      // please go back to all client listing without filtering
      var title = $('#page-title').text();
      $('#page-title').text('');
      $('<a>').appendTo('#page-title').text(title).attr('href', $('#client').attr('href') + '#filter=.all');

      $('#content').resize(function(e) {
        stickyFooter();
      }).resize();

      $(window).resize(function(e) {
        stickyFooter();
      }).resize();
    }
    // end of Clients page



    /*
     * News page
     * =======================================================================
     */
    if ($('body').hasClass('news') || $('body').hasClass('node-type-news')) {
      var contentH = $('.view-news').outerHeight();

      // align center the content
      //      var contentW = $('#content .region-sidebar').outerWidth() + $('#content .view-news').outerWidth();
      //      $(window).resize(function (e) {
      //        $('#content .region-sidebar').css({
      //          'padding-left': ($(window).width() - contentW) / 2
      //        })
      //      }).resize();

      // detect current page category, then highlight corresponding item in cat list
      var args = window.location.toString().split('/');
      //      console.log(args);
      for (var i in args) {
        if (args[i] == 'news') {
          var arg1 = args[(+i) + 1];
          var arg2 = args[(+i) + 2];

          $('#block-sr-news-' + arg1 + ' ul li a').each(function(i, v) {
            if ($(this).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '') == decodeURIComponent(arg2)) {
              $(this).addClass('current');
            }
          });

          break;
        }
      }

      //      var title = $('#page-title').text();
      //      $('#page-title').text('');
      //      $('<a>').appendTo('#page-title').text(title).attr('href', '/news');
    }
    // end of News page



    /*
     * Contact page
     * =======================================================================
     */
    // calc the google map link
    // then apply to A-link and gmap button
    if ($('body').hasClass('section-contact')) {
      var elementsH = $('#header').outerHeight() + $('#footer').outerHeight();
      var ind = window.location.href.substr(window.location.href.length - 1);

      $(window).on('resize', function() {
        $('body.section-contact #block-quicktabs-contact-tabs').center('h');
      }).resize();

      $.vegas('slideshow', {
        step: ind,
        backgrounds: [{
            src: '/sites/all/themes/sr/images/contact/bg-1.jpg',
            fade: 1000
          }, {
            src: '/sites/all/themes/sr/images/contact/bg-2.jpg',
            fade: 1000
          }, {
            src: '/sites/all/themes/sr/images/contact/bg-3.jpg',
            fade: 1000
          }, {
            src: '/sites/all/themes/sr/images/contact/bg-4.jpg',
            fade: 1000
          }, {
            src: '/sites/all/themes/sr/images/contact/bg-5.jpg',
            fade: 1000
          }],
        loading: false,
        walk: function(step) {
          $(window).resize(function() {
            //            console.log($(window).height());
            if ($(window).height() < 920) {
              $('#footer').css({
                'position': 'relative',
                'margin-top': $('body').hasClass('admin-menu') ? 560 : 589
              });
            } else {
              $('#footer').css({
                'position': 'absolute',
                'bottom': 0
              });
            }
          }).resize();
        }
      });
      $.vegas('pause');
      $('.quicktabs-tabs a').each(function(i, v) {
        $(this).click(function() {
          $.vegas('jump', i);
        });
      });

      $('body.section-contact .view-contact-info div.address-info').each(function(i, v) {
        var newAddr = $(this).find('.hidden').text().replace(/(,| |[\n])/gi, '+');
        newAddr = newAddr.replace(/([\+]+)/gi, '+');
        if (newAddr.indexOf('+') == 0) {
          newAddr = newAddr.slice(1);
        }
        ;
        if (newAddr.lastIndexOf('+') == newAddr.length - 1) {
          newAddr = newAddr.slice(0, newAddr.length - 1);
        }
        var url = 'https://maps.google.com.hk/maps?saddr=&daddr=' + newAddr;
        //        $(this).parent().find('.get-direction-link').attr('href', url);
        $(this).parent().find('.get-direction-link').click(function(e) {
          e.preventDefault();
          $(".quicktabs-tabs li").eq(i + 1).find('a').trigger('click');
        });

        // gmap get direction button
        $('<a href="' + url + '" target="_blank" class="gmap-get-direction">Get directions</a>').appendTo($(".quicktabs-tabpage>.view-contact-map>.view-content").eq(i));
      });
    }
	
	// set the subscript project title of PH2O
	if ($('body').hasClass('page-node-748')) {
		$("#banner-text-top h3").html("PH<sub>2</sub>O");
		$(".pics").children().attr("alt","PH₂O");
		document.title = 'PH₂O | Sedgwick Richardson';
	}
	
	if ($('body').hasClass('our-work') || $('body').hasClass('section-clients')) {
		$(".isotope-element").each(function(){
			if($(this).find("h3").text()=="PH2O"){
				$(this).find("h3").html("PH<sub>2</sub>O");
			}
		});
	}


  });

  window.onpageshow = function(event) {
//    console.log(event);
    if (event.persisted) {
      window.location.reload();
    }
  };

})(jQuery, Drupal, this, this.document);