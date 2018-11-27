var nua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nua);
var isIOS = /iPhone|iPad|iPod/i.test(nua);
var isIphone = /iPhone/i.test(nua);
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
var isWindowsOS = (navigator.platform == "Win32") || (navigator.platform == "Windows");
var isMacOS = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
var isIE = window.ActiveXObject || "ActiveXObject" in window
var isEdge = nua.indexOf("Edge") > -1;
var g_LastScrollTop = 0;
var g_GetWindowWdith = function () {
    return window.innerWidth > 100 ? window.innerWidth : screen.availWidth > 100 ? screen.availWidth : $(window).width();
};
var g_GetWindowsHeight = function () {
    return window.innerHeight > 100 ? window.innerHeight : screen.availHeight > 100 ? screen.availHeight : $(window).height();
};
var g_GotoUrl = function (url) {
    if (!isIOS) g_ShowHideLoading(true);
    if (location.href.indexOf(url) == -1) {
        location.href = url;
    } else location.reload(true);
};
var g_OpenUrl = function (url, features) {
    var wid;
    if (typeof (features) != "undefined") {
        wid = window.open(url, "", features);
        wid.focus();
    } else {
        wid = window.open("", "");
        wid.location.href = url;
    }
};
var g_PageScrollTo = function (obj, ms, h1) {
    var time = 0;
    try {
        time = parseInt(ms);
    } catch (e) {
        time = 1000;
    }
    if (time <= 0 || isNaN(time)) time = 1000;
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $body.stop().animate({
            'scrollTop': (typeof (obj) === 'undefined' ? 0 : $(obj).offset().top + (typeof (h1) === 'undefined' ? 0 : h1))
        },
        time, 'swing');
};


var g_ShowHideLoading = function (show) {
    if (show) $('#loadingDiv').css("display", "flex");
    else $('#loadingDiv').css("display", "none");
};
var g_IframeLoadEventHandler = function () {
    var that = this;
    if ($('#' + that.id).get(0)) {
        if (isIOS)
            g_SetIframeHeight(that.id, $($('#' + that.id).get(0).contentWindow.document.body).outerHeight());
        else setTimeout(function () { g_SetIframeHeight(that.id, $($('#' + that.id).get(0).contentWindow.document.body).outerHeight()); }, 1);
    }
};
var g_SetIframeLoadEvent = function (id, mode) {
    var iframe = document.getElementById(id);
    if (iframe) {
        if (mode) {
            if (iframe.addEventListener) {
                iframe.addEventListener("load", g_IframeLoadEventHandler);
                //iframe.addEventListener("resize", g_IframeLoadEventHandler);
            } else {
                iframe.onload = g_IframeLoadEventHandler;
                //iframe.onresize = g_IframeLoadEventHandler;
            }
        } else {
            if (iframe.removeEventListener) {
                iframe.removeEventListener("load", g_IframeLoadEventHandler);
                //iframe.removeEventListener("resize", g_IframeLoadEventHandler);
            } else {
                iframe.onload = null;
                //iframe.onresize = null;
            }
        }
    }
}
var g_ShowHideLogin = function (show, noclose) {
    if (show) {
        if (isIOS) g_LastScrollTop = g_WindowScrollTop;
        $(".login-all").fadeIn(250);
        $("body").addClass("dialog-open");
        if ($('#iframeLogin').get(0)) {
            g_SetIframeLoadEvent("iframeLogin", true);
            $('#iframeLogin').get(0).contentWindow.location.replace("/login.aspx?fid=iframeLogin");
        }
        //if (noclose == true) $(".login-all .close-btn").hide();
        //else $(".login-all .close-btn").show();
        if (noclose == true) {
            $('.login-all .close-btn').on('click', function () {
                top.location.replace("/");
            });
        } else {
            $('.login-all .close-btn').on('click', function () {
                g_ShowHideLogin();
            });
        }

        $(window).on('resize', ["iframeLogin"], g_SetDilogPosAndSize);
        $(window).on('orientationchange', ["iframeLogin"], g_SetDilogPosAndSize);
        //if (isIOS) $(window).on('scroll', ["iframeLogin"], g_SetDilogPosAndSize);
    } else {
        g_IframeContentLoaded = false;
        $(window).off('resize', g_SetDilogPosAndSize);
        $(window).off('orientationchange', g_SetDilogPosAndSize);
        g_SetIframeLoadEvent("iframeLogin", false);
        if ($('#iframeLogin').get(0)) $('#iframeLogin').get(0).contentWindow.location.replace("/loading.html");
        $(".login-all").fadeOut(250);
        $("body").removeClass("dialog-open");
        $(".login-all .close-btn").show();
        if (isIOS) {
            //$(window).off('scroll', g_SetDilogPosAndSize);
            $('html, body').scrollTop(g_LastScrollTop);
        }
    }
};

var g_ShowHideLogin2 = function (show, noclose) {
    if (show) {
        if (isIOS) g_LastScrollTop = g_WindowScrollTop;
        $(".login-all").fadeIn(250);
        $("body").addClass("dialog-open");
        if ($('#iframeLogin').get(0)) {
            g_SetIframeLoadEvent("iframeLogin", true);
            $('#iframeLogin').get(0).contentWindow.location.replace("/login.aspx?mode=teacher&fid=iframeLogin");
        }
        //if (noclose == true) $(".login-all .close-btn").hide();
        //else $(".login-all .close-btn").show();
        if (noclose == true) {
            $('.login-all .close-btn').on('click', function () {
                top.location.replace("/");
            });
        } else {
            $('.login-all .close-btn').on('click', function () {
                g_ShowHideLogin2();
            });
        }

        $(window).on('resize', ["iframeLogin"], g_SetDilogPosAndSize);
        $(window).on('orientationchange', ["iframeLogin"], g_SetDilogPosAndSize);
        //if (isIOS) $(window).on('scroll', ["iframeLogin"], g_SetDilogPosAndSize);
    } else {
        g_IframeContentLoaded = false;
        $(window).off('resize', g_SetDilogPosAndSize);
        $(window).off('orientationchange', g_SetDilogPosAndSize);
        g_SetIframeLoadEvent("iframeLogin", false);
        if ($('#iframeLogin').get(0)) $('#iframeLogin').get(0).contentWindow.location.replace("/loading.html");
        $(".login-all").fadeOut(250);
        $("body").removeClass("dialog-open");
        $(".login-all .close-btn").show();
        if (isIOS) {
            //$(window).off('scroll', g_SetDilogPosAndSize);
            $('html, body').scrollTop(g_LastScrollTop);
        }
    }
};

var g_ShowHideGetPassword = function (show) {
    if (show) {
        if (isIOS) g_LastScrollTop = g_WindowScrollTop;
        $(".login-all").fadeIn(250);
        $("body").addClass("dialog-open");
        if ($('#iframeLogin').get(0)) {
            g_SetIframeLoadEvent("iframeLogin", true);
            $('#iframeLogin').get(0).contentWindow.location.replace("/getpassword.aspx?fid=iframeLogin");
        }
        $(window).on('resize', ["iframeLogin"], g_SetDilogPosAndSize);
        $(window).on('orientationchange', ["iframeLogin"], g_SetDilogPosAndSize);
        //if (isIOS) $(window).on('scroll', ["iframeLogin"], g_SetDilogPosAndSize);
    } else {
        g_IframeContentLoaded = false;
        $(window).off('resize', g_SetDilogPosAndSize);
        $(window).off('orientationchange', g_SetDilogPosAndSize);
        g_SetIframeLoadEvent("iframeLogin", false);
        if ($('#iframeLogin').get(0)) $('#iframeLogin').get(0).contentWindow.location.replace("/loading.html");
        $(".login-all").fadeOut(250);
        $("body").removeClass("dialog-open");
        if (isIOS) {
            //$(window).off('scroll', g_SetDilogPosAndSize);
            $('html, body').scrollTop(g_LastScrollTop);
        }
    }
};

var g_ShowHideFbAssociate = function (show) {
    if (show) {
        $(".login-all").show();
        $("body").addClass("dialog-open");
        $("#iframeLogin").css("min-height", "500px");
        $("#iframeLogin").attr("src", "loading.html");
    } else {
        $("#iframeLogin").attr("src", "loading.html");
        $(".login-all").hide();
        $("#iframeLogin").css("min-height", "350px");
        $("body").removeClass("dialog-open");
    }
};
var g_ShowHideJoin = function (show) {
    if (show) {
        if (isIOS) g_LastScrollTop = g_WindowScrollTop;
        $("body").addClass("dialog-open");
        $(".join-all").fadeIn(250);
        if ($('#iframeJoinUs').get(0)) {
            g_SetIframeLoadEvent("iframeJoinUs", true);
            $('#iframeJoinUs').get(0).contentWindow.location.replace("/joinus.aspx?fid=iframeJoinUs&fmode=0");
        }
        $(window).on('resize', ["iframeJoinUs"], g_SetDilogPosAndSize);
        $(window).on('orientationchange', ["iframeJoinUs"], g_SetDilogPosAndSize);
        //if (isIOS) $(window).on('scroll', ["iframeJoinUs"], g_SetDilogPosAndSize);
    } else {
        g_IframeContentLoaded = false;
        $(window).off('resize', g_SetDilogPosAndSize);
        $(window).off('orientationchange', g_SetDilogPosAndSize);
        g_SetIframeLoadEvent("iframeJoinUs", false);
        if ($('#iframeJoinUs').get(0)) $('#iframeJoinUs').get(0).contentWindow.location.replace("/loading.html");
        $(".join-all").fadeOut(250);
        $("body").removeClass("dialog-open");
        if (isIOS) {
            //$(window).off('scroll', g_SetDilogPosAndSize);
            $('html, body').scrollTop(g_LastScrollTop);
        }
    }
};
var g_ShowHideRelogin = function (show) {
    if (show) {
        $(".relogin-all").show(500);
        $("body").addClass("dialog-open");
    } else {
        $(".relogin-all").hide(500);
        $("body").removeClass("dialog-open");
    }
};
var g_WindowScrollTop = 0;
var g_IframeContentLoaded = false;
var g_IframeContentHeight = 0;
var g_ShowHideFreeCourse = function (show) {
    g_ShowHideDialog("free-all", "iframeEnroll", show);
    //if (show) {
    //    if (isIOS) g_LastScrollTop = g_WindowScrollTop;
    //    $(".free-all").fadeIn(250);
    //    $("body").addClass("dialog-open");
    //    g_SetIframeLoadEvent("iframeEnroll", true);
    //    $(window).on('resize', ["iframeEnroll"], g_SetDilogPosAndSize);
    //    $(window).on('orientationchange', ["iframeEnroll"], g_SetDilogPosAndSize);
    //    //if (isIOS) $(window).on('scroll', ["iframeEnroll"], g_SetDilogPosAndSize);
    //} else {
    //    g_IframeContentLoaded = false;
    //    g_SetIframeLoadEvent("iframeEnroll", false);
    //    $(window).off('resize', g_SetDilogPosAndSize);
    //    $(window).off('orientationchange', g_SetDilogPosAndSize);
    //    $(".free-all").fadeOut(250);
    //    $("body").removeClass("dialog-open");
    //    if (isIOS) {
    //        $(window).off('scroll', g_SetDilogPosAndSize);
    //        $('html, body').scrollTop(g_LastScrollTop);
    //    }
    //}
};
var g_ShowHideDialog = function (classname, fid, show) {
    if (classname.indexOf('.') != 0) classname = "." + classname;
    if (show) {
        //if (isIOS)
        g_LastScrollTop = g_WindowScrollTop;
        $(classname).fadeIn(250);
        if (isIOS) $.lockbody();
        else $("body").addClass("dialog-open");
        g_SetIframeLoadEvent(fid, true);
        $(window).on('resize', [fid], g_SetDilogPosAndSize);
        $(window).on('orientationchange', [fid], g_SetDilogPosAndSize);
        //if (isIOS) $(window).on('scroll', ["iframeEnroll"], g_SetDilogPosAndSize);
    } else {
        $('#' + fid).css("height", "");
        g_IframeContentLoaded = false;
        g_SetIframeLoadEvent(fid, false);
        $(window).off('resize', g_SetDilogPosAndSize);
        $(window).off('orientationchange', g_SetDilogPosAndSize);
        if (isIOS) $.unlockBody();
        else $("body").removeClass("dialog-open");
        $(classname).fadeOut(250);
        if (isIOS) {
            //$(window).off('scroll', g_SetDilogPosAndSize);
            $('html, body').scrollTop(g_LastScrollTop);
        }
    }
}
var g_HideHamburgerMenu = function (isStuMenu) {
    if (g_GetWindowWdith() < 768 && !isStuMenu) return;
    var btn = $('.navbar-toggle[data-toggle=collapse]')[0];
    if (btn.attributes["aria-expanded"].value == "true") btn.click();
};
var g_HideFreeForm = function () {
    if (g_IsFreeFormOpen) g_ShowFreeForm();
};
var g_SetBodyScrollByHambugerMemu = function () {
    var btn = $('.navbar-toggle[data-toggle=collapse]')[0];
    if (btn.attributes["aria-expanded"].value == "true") $("body").addClass("dialog-open");
    else $("body").removeClass("dialog-open");
};
var g_SetIframeHeight = function (fid, height) {
    g_IframeContentLoaded = true;
    g_IframeContentHeight = height;
    g_SetDilogPosAndSize([fid]);
};
var g_SetDilogPosAndSize = function (data) {
    var val, top1, top2;
    if (typeof (data[0]) == "undefined") val = data.data;
    else val = data;
    var frame = $('#' + val[0]);
    var h1 = h2 = g_GetWindowsHeight();
    try {
        g_IframeContentHeight = $(frame.get(0).contentWindow.document.body).outerHeight() + 2;
        $(frame).css("height", "");
    } catch (e) { }
    var box = frame.closest('.login-box');
    if (box.length == 0) box = frame.closest('.st-tpbox');
    if (box.length == 0) box = frame.closest('.st-lrbox');
    if (box.length != 0) {
        top1 = box.position().top;
        top2 = frame.parent().position().top;
        if (h1 <= 768) {
            top1 = 20;
        } else {
            top1 = 50;
        }
        h2 = h1 - top1 * 2 - top2 * 2;
        if (h2 > g_IframeContentHeight) {
            h2 = g_IframeContentHeight;
            top1 = Math.floor((h1 - h2 - top2 - 50) / 2);
        }
    } else {
        box = frame.closest('.st-cfbox');
        top1 = box.offset().top;
        top2 = frame.offset().top;
        top2 = top2 - top1;
        top1 = box.position().top;
        if (h1 < 480) {
            top1 = 20;
            h2 = h1 - top1 * 2 - top2 - 28;
        } else {
            h2 = h1 - top1 * 2 - top2 - 24;
        }
        if (h2 > g_IframeContentHeight) {
            h2 = g_IframeContentHeight + 2;
            top1 = Math.floor((h1 - h2 - top2 - top1) / 2);
        }
    }
    box.css("top", top1 + "px").css("margin-bottom", top1 + "px");
    if (isIOS) {
        //h2 += top1 * 2 + top2 * 2;
        var dilog = frame.closest('.popup-box .login-group');//$('.popup-box .login-group');
        dilog.css("display", "block").css("-webkit-overflow-scrolling", "touch").css("height", h2 + "px").css("overflow", "auto");
        //dilog.css("display", "block").css("height", h2 + "px").css("overflow", "auto");
        //alert(h1 + "," + h2 + "," + frame.height() + "," + g_IframeContentHeight + "," + dilog.height());
        $('html, body').scrollTop(0);
        //dilog.css("position", "absolute").css("height", ($(window).height() + 60) + "px").css("top", "0px");
        //dilog.css("position", "absolute").css("height", "auto").css("top", "0px");
        frame.css("height", g_IframeContentHeight + "px").css("overflow", "auto").css("-webkit-overflow-scrolling", "touch");
    } else {
        frame.css("height", h2 + "px").css("overflow", "auto").css("-webkit-overflow-scrolling", "touch");
    }

    if (typeof (frame.get(0).contentWindow.g_ScrollToFocusObj) != "undefined" && !isIOS) {
        frame.get(0).contentWindow.g_ScrollToFocusObj();
    }
};
var g_ScrollToFocusObj = function () {
    if ($(':focus').length == 0) return;
    var obj = $(':focus')[0];
    obj.focus();
    try {
        document.getElementById(obj.id).scrollIntoView(true);
    } catch (e) { }
};
var g_CheckDateFormatEx = function (obj, fixmsg) {
    var strValue = obj.val(), m, d;
    if (obj.value != "") {
        if ((strValue.length > 10) || (strValue.length < 8)) {
            alert((fixmsg == "" ? "日期" : fixmsg) + "格式錯誤...");
            obj.value = "";
            obj.focus();
            return false;
        }
        if (strValue.length == 8) {
            strV = strValue.substring(0, 4) + "/" + strValue.substring(4, 6) + "/" + strValue.substring(6, 8);
            strValue = strV;
        }
        var objRegExp = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
        if (!objRegExp.test(strValue));
        else {
            var arrayDate = strValue.split(RegExp.$1);
            var intDay = parseInt(arrayDate[2], 10);
            var intYear = parseInt(arrayDate[0], 10);
            var intMonth = parseInt(arrayDate[1], 10);
            if (intMonth > 12 || intMonth < 1) {
                alert((fixmsg == "" ? "日期" : fixmsg) + "不合法...");
                obj.value = "";
                obj.focus();
                return false;
            }
            var arrayLookup = {
                '1': 31,
                '3': 31,
                '4': 30,
                '5': 31,
                '6': 30,
                '7': 31,
                '8': 31,
                '9': 30,
                '10': 31,
                '11': 30,
                '12': 31
            };
            if (arrayLookup[intMonth] != null) {
                if (intDay <= arrayLookup[intMonth] && intDay != 0) {
                    m = intMonth.toString();
                    if (m.length == 1) intMonth = "0" + m;
                    d = intDay.toString();
                    if (d.length == 1) intDay = "0" + d;
                    var strOk = intYear.toString() + "/" + intMonth.toString() + "/" + intDay.toString();
                    obj.value = strOk;
                    return true;
                }
            }
            if (intMonth - 2 == 0) {
                var booLeapYear = (intYear % 4 == 0 && (intYear % 100 != 0 || intYear % 400 == 0));
                if (((booLeapYear && intDay <= 29) || (!booLeapYear && intDay <= 28)) && intDay != 0) {
                    m = intMonth.toString();
                    if (m.length == 1) intMonth = "0" + m;
                    d = intDay.toString();
                    if (d.length == 1) intDay = "0" + d;
                    strOk = intYear.toString() + "/" + intMonth.toString() + "/" + intDay.toString();
                    obj.value = strOk;
                    return true;
                }
            }
        }
        obj.value = "";
        alert((fixmsg == "" ? "日期" : fixmsg) + "格式錯誤...");
        obj.focus();
        return false;
    }
    return true;
};
var g_SetCookie = function (ckName, value, days) {
    aDay = new Date();
    aDay.setTime(aDay.getTime() + (days * 1000 * 60 * 60 * 24));
    expDay = aDay.toGMTString();
    document.cookie = ckName + "=" + escape(value) + ";expires=" + expDay + ";path=/";
};
var g_DelCookie = function (ckName) {
    document.cookie = ckName + "=;expires=Mon,02-Oct-28 00:00:01 GMT";
};
var g_GetCookie = function (ckName) {
    var results = document.cookie.match(new RegExp("(^|;) ?" + ckName + "=([^;]*)(;|$)"));
    if (results) return (unescape(results[2]));
    else return "";
};

//預載圖片
var MM_preloadImages = function () { //v3.0
    var d = document; if (d.images) {
        if (!d.MM_p) d.MM_p = new Array();
        var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
            if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
    }
};

var g_Logout = function () { };
var g_FbStatus = "";
var g_FbLogout = function (notreload) {
    var logout = false;
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            FB.logout(function (response) {
                console.log("FB登出成功...");
                if (!notreload) top.location.reload();
            })
        } else if (!notreload) top.location.reload();
    })
};
var g_IsFbLogin = function () {
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            $.post("ws_sitedataprovider.asmx/FbLogin", {
                    mpAccessToken: response.authResponse.accessToken
                },
                function (data, textStatus, jqXHR) {
                    if (data.firstChild.innerHTML == "true") {
                        g_FbStatus = "login";
                    } else {
                        g_FbStatus = "nologin";
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                g_FbStatus = "nologin";
            })
        } else {
            g_FbStatus = "nologin";
        }
    })
};
var g_FbLogin = function () {
    FB.login(function (response) {
            if (response.status === 'connected') {
                $.post("ws_sitedataprovider.asmx/FbLogin", {
                        mpAccessToken: response.authResponse.accessToken
                    },
                    function (data, textStatus, jqXHR) {
                        if (data.firstChild.innerHTML == "true") {
                            alert("登入成功...");
                            parent.g_ShowHideLogin();
                            top.location.reload();
                        } else {
                            alert("登入失敗，請重新登入...");
                        }
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown.message);
                    alert("登入失敗，請稍後再試...");
                })
            } else if (response.status === 'not_authorized') {
                alert("登入授權失敗...");
            } else {
                alert("登入授權失敗...");
            }
        },
        {
            scope: 'public_profile,email'
        })
};
var g_FbRegister = function () {
    if (g_FbStatus == "login") {
        alert("已經註冊過FB會員，目前為FB會員登入狀態...");
    } else {
        FB.login(function (response) {
                if (response.status === "connected") {
                    $.post("ws_sitedataprovider.asmx/FbRegister", {
                            mpAccessToken: response.authResponse.accessToken
                        },
                        function (data, textStatus, jqXHR) {
                            if (data.firstChild.innerHTML == "1") {
                                alert("FB會員註冊成功...");
                                top.location.assign("/profile-fb.aspx?mode=0#title")
                            } else if (data.firstChild.innerHTML == "2") {
                                if (confirm("您已經註冊過FB會員，您要修改會員資料嗎？")) top.location.assign("/profile-fb.aspx#title");
                                else parent.g_ShowHideJoin(false);
                            } else {
                                alert("FB會員註冊失敗...");
                            }
                        }).fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown.message);
                        alert("FB會員註冊失敗...");
                    })
                } else if (response.status === 'not_authorized') {
                    alert("登入授權失敗...");
                } else {
                    alert("登入授權失敗...");
                }
            },
            {
                scope: 'public_profile,email'
            })
    }
};
var g_FbAssociate = function () {
    FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
            $.post("ws_sitedataprovider.asmx/FbAssociate", {
                    mpAccessToken: response.authResponse.accessToken
                },
                function (data, textStatus, jqXHR) {
                    var result = data.firstChild.innerHTML;
                    if (result.indexOf(":") == -1) {
                        alert("FB驗證失敗...");
                    } else {
                        result = result.split(":");
                        alert(result[1]);
                        if (result[0] == "1" || result[0] == "-1") top.location.reload();
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown.message);
                alert("FB驗證失敗...");
            })
        } else {
            FB.login(function (response) {
                    if (response.status === 'connected') {
                        $.post("ws_sitedataprovider.asmx/FbAssociate", {
                                mpAccessToken: response.authResponse.accessToken
                            },
                            function (data, textStatus, jqXHR) {
                                var result = data.firstChild.innerHTML;
                                if (result.indexOf(":") == -1) {
                                    alert("FB驗證失敗...");
                                } else {
                                    result = result.split(":");
                                    alert(result[1]);
                                    if (result[0] == "1" || result[0] == "-1") top.location.reload();
                                }
                            }).fail(function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown.message);
                            alert("FB驗證失敗...");
                        })
                    } else if (response.status === 'not_authorized') {
                        alert("登入授權失敗...");
                    } else {
                        alert("登入授權失敗...");
                    }
                },
                {
                    scope: 'public_profile,email'
                })
        }
    })
};
var g_iScrollObj;
$(document).ready(function () {
    g_ShowHideLoading(false);
    try {
        $('img[usemap]').rwdImageMaps();
    } catch (e) { }
    try {
        $('.navbar-toggle').on('click', g_HideFreeForm);
        $('.dropdown-toggle').on('click', function () {
            g_HideHamburgerMenu();
            g_HideFreeForm();
        });
    } catch (e) { }
});
$(window).scroll(function () {
    g_WindowScrollTop = $(this).scrollTop();
    if ($(this).scrollTop() > 1024) {
        $('.gotop').show();
    } else {
        $('.gotop').hide();
    }
});