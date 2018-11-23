$(function () {
    let lastTab = 0;

    $('.multipleInfo').each(function () {
        let $tabList = $(this).find('.multipleInfo__header'),
            $tabItems = $tabList.find('li'),
            $items = $(this).find('.multipleInfo__item');

        $tabItems.each(function (currentTab,obj) {
            $(obj).on('click', function (e) {
                e.preventDefault();
                $items.eq(lastTab).css({display: 'none'});
                $items.eq(currentTab).css({display: 'block'});
                lastTab = currentTab;
                // console.log('lastTab:'+lastTab+' ,topCourseCurrentTab:'+topCourseCurrentTab+' ,obj:'+$(obj).attr('href'));

                // Add active class to the tab which was clicked!!
                let $this = $(obj);
                // console.log($this.attr('href'));
                if($this.hasClass('active')) {
                    return;
                }

                $tabItems.removeClass('active');
                $this.addClass('active');

                // $topCoursePanels.css('display', 'none');
                // $($this.attr('href')).css('display', 'block');
            });
        });


        $tabItems.eq(0).trigger('click');
    });
});