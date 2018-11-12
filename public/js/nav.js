// 導覽列初始化

$(function() {
    var testing = true;

    $('.dropdown-base').on('mouseenter click', function () { // mouseenter
        var w1=g_GetWindowWdith();
        if( w1 > 768){
            if (isMobile && !isIOS && testing) { // for android
                $('.dropdown-base').removeClass('open');
                $('.dropdown-menu').css('display', 'none');
            }
            if (!$(this).hasClass('open')) {
                $('.dropdown-toggle', $(this)).dropdown();
                $(this).addClass('open');
                if (isMobile && !isIOS && testing) { // for android
                    $('.dropdown-menu', $(this)).css('display', 'block');
                }
            }
        }
    }).mouseleave(function () { // mouseleave,  DO NOT USE mouseout
        var w1=g_GetWindowWdith();
        if( w1 > 768){
            $(this).blur().removeClass('open');
            if (isMobile && !isIOS && testing) { // for android
                $('.dropdown-base').removeClass('open');
                //$('.dropdown-menu', $(this)).css('display', 'none');
                $('.dropdown-menu').css('display', 'none');
            }
        }
    });

    $('#loginBtn').bind('click', function() {
        g_ShowHideLogin(true);
    });
    $('#joinBtn').bind('click', function() {
        g_ShowHideJoin(true);
    });

    //設定LOGO圖示
    var initLogo = function() {
        var w1=g_GetWindowWdith();
        if(w1 <= 361) {
            $(".logo").attr("src", "build/images/logo1_s.png");
        } else {
            $(".logo").attr("src", "build/images/logo1.png");
        }
        if(w1 < 921 ) {
            $('.dropdown-menu[aria-labelledby=lmenu05]').addClass("dropdown-menu-right");
        } else {
            $('.dropdown-menu[aria-labelledby=lmenu05]').removeClass("dropdown-menu-right");
        }
    };

    initLogo();
    $(window).bind("load", initLogo);
    $(window).bind("resize", initLogo);
    $(window).bind("orientationchange", initLogo);
});