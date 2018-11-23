var opened = false;

$(function() {

    $('.mobile-nav-menu-li-title-1').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next().hide();
            return;
        }else if($(this).hasClass('contentNO')){
            return;
        }

        $('.mobile-nav-menu-li-title-2.active').removeClass('active').next().hide();

        $('.mobile-nav-menu-li-title-1.active').removeClass('active').next().hide();
        $(this).addClass('active').next().show();

    });

    $('.mobile-nav-menu-li-title-2').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next().hide();
            return;
        }

        $('.mobile-nav-menu-li-title-2.active').removeClass('active').next().hide();
        $(this).addClass('active').next().show();

    });


    $('.contentsMask').click(function() {
        subMenuToggle();
    });

    $('.openBtn').click(function() {
        subMenuToggle();
    });

    function subMenuToggle() {
        var type = 1;
        var masked = false;

        if (!opened) {
            ////$('.subMenu').css('top', 0);
            //if (type == "1" || type == "3") {
            //    $('.subMenu').css('position', 'fixed');
            //    $('.subMenu').css('height', '100%');
            //} else {
            //    $('.subMenu').css('position', 'absolute');
            //    $('.subMenu').css('height', 'auto');
            //    $(window).scrollTop(0);
            //}
        }

        //$('.subMenu').css('left', opened ? -240 : 0);
        $('.subMenu').css({
            'transform': 'translateX(' + (opened ? -240 : 0) + 'px)',
            '-webkit-transform': 'translateX(' + (opened ? -240 : 0) + 'px)',
            '-moz-transform': 'translateX(' + (opened ? -240 : 0) + 'px)',
            '-ms-transform': 'translateX(' + (opened ? -240 : 0) + 'px)',
            '-o-transform': 'translateX(' + (opened ? -240 : 0) + 'px)'
        });

        if (!opened) {
            //if (type == "1" || type == "2") {
            //$('.mainContents').css('left', opened ? 0 : 240);
            $('.mainContents').css({
                'transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-webkit-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-moz-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-ms-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-o-transform': 'translateX(' + (opened ? 0 : 240) + 'px)'
            });
            //}
        } else {
            //$('.mainContents').css('left', opened ? 0 : 240);
            $('.mainContents').css({
                'transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-webkit-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-moz-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-ms-transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                '-o-transform': 'translateX(' + (opened ? 0 : 240) + 'px)'
            });
        }

        //if (masked) {
        //    if (opened) {
        //        $('.contentsMask').hide();
        //    } else {
        //        $('.contentsMask').show();
        //    }
        //}
        if (!opened) {
            $('.openBtn').addClass('active');
        } else {
            $('.openBtn').removeClass('active');
        }
        opened = !opened;
    }

    $(window).on("load", resizeMainContents);
    $(window).on("resize", resizeMainContents);
    $(window).on("orientationchange", resizeMainContents);

    function resizeMainContents() {
        var prewinWidth = 768;
        var winxs2 = 992;
        var ww = $(window).width();

        if (ww != prewinWidth) {
            if (ww > winxs2 && prewinWidth <= winxs2) {
                //$('.mainContents').css('left', 0);
                $('.mainContents').css({
                    'transform': 'translateX(' + (opened ? 0 : 240) + 'px)',
                    '-webkit-transform': 'translateX(0px)',
                    '-moz-transform': 'translateX(0px)',
                    '-ms-transform': 'translateX(0px)',
                    '-o-transform': 'translateX(0px)'
                });
            } else if (ww <= winxs2 && prewinWidth > winxs2) {
                //$('.mainContents').css('left', opened ? 240 : 0);
                $('.mainContents').css({
                    'transform': 'translateX(' + (opened ? 240 : 0) + 'px)',
                    '-webkit-transform': 'translateX(' + (opened ? 240 : 0) + 'px)',
                    '-moz-transform': 'translateX(' + (opened ? 240 : 0) + 'px)',
                    '-ms-transform': 'translateX(' + (opened ? 240 : 0) + 'px)',
                    '-o-transform': 'translateX(' + (opened ? 240 : 0) + 'px)'
                });
            }
        }
        prewinWidth = ww;
        //console.log($('.subMenu').height())
        //$('.subMenu').height($(window).height() - 65);
        //console.log($(window).height());
        //console.log($('.subMenu').height());

    }
});
