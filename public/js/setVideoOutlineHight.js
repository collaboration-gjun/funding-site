$(function () {
    setHeight()

    function setHeight() {
        let imgHeight = $('.imageOnly img').height();
        let outline = $('.outlineSection');
        let videoHeight = $('.embed-responsive-item').height();
        // console.log("video height: " + videoHeight);
        if(videoHeight===100){
            outline.css('height', `${imgHeight}px`);
        } else {
            outline.css('height', `${videoHeight}px`);
        }

    }

    $(window).on('resize', function () {
        setHeight()
    })
})