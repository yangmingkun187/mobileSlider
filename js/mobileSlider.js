(function($){
    function Slider(option){
        var s = this;
        
        var defaultOption = {
            className: 'slider',
            pagination: false,
            autoPlay: true,
            clickEvent: function(){}
        };
        var o = $.extend(defaultOption,option);

        var $slideItem = $('.slider-container .slider-wrapper .slider-item');

        s.paginationHtml = '';
        for(var i = 0, len = $slideItem.length; i < len; i++) {
            s.paginationHtml += '<span class="slider-pagination-item"></span>';
            $slideItem.eq(i).attr('data-slide-index',i);
        }
        s.toHtml = function() {
            $('.slider-pagination').append(s.paginationHtml);
            $('.slider-wrapper').prepend($slideItem.eq(-1).clone()).append($slideItem.eq(0).clone());
            s.slideItem = $('.slider-container .slider-wrapper .slider-item');
            s.slideItem.eq(0).addClass('slide-duplicate');
            s.slideItem.eq(-1).addClass('slide-duplicate');
        };
        s.slideTo = function() {

        }
    }
    
    $.slider = function(option){
        var slider = new Slider(option);
        slider.toHtml();
    };
})(Zepto);