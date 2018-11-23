$(function () {
    var opened = false;

    let $expandToggle = $('.expandToggle');
    $expandToggle.click(
        () => {
            if (!opened) {
                $('.expandToggle p').text('收回內容');
                $('.expandToggle i').removeClass('fas fa-caret-down').addClass('fas fa-caret-up');
            } else {
                $('.expandToggle p').text('展開全部');
                $('.expandToggle i').removeClass('fas fa-caret-up').addClass('fas fa-caret-down');
            }
            opened = !opened;
            $('.billboard__item:nth-of-type(1n+2)').slideToggle();
        }
    )

});