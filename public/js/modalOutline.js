const outlineBtn = $('.titleBox-toggle'),
outlineBG = $('.modalCourseOutline'),
close = $('.fa-times-circle');

$(function () {
    outlineBtn.click(
        () => {
            outlineBG.addClass('modalCourseOutline--is-visible');
        }
    );
    close.click(
        () => {
            outlineBG.removeClass('modalCourseOutline--is-visible');
        }
    )
})