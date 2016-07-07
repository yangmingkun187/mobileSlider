(function($){
    function Slider(option){
        var s = this;
        
        var defaultOption = {
            className: '.slider-container',
            pagination: false,
            autoPlay: true,
            clickEvent: function(){}
        };
        var o = $.extend(defaultOption,option);

        var $slideItem = $(o.className + ' .slider-wrapper .slider-item');

        s.paginationHtml = '';
        for(var i = 0, len = $slideItem.length; i < len; i++) {
            s.paginationHtml += '<span class="slider-pagination-item"></span>';
            $slideItem.eq(i).attr('data-slider-index',i);
        }
        s.toHtml = function() {
            // 是否需要pagination
            o.pagination && $('.slider-pagination').append(s.paginationHtml);
            $('.slider-wrapper').prepend($slideItem.eq(-1).clone()).append($slideItem.eq(0).clone());
            
            // 因为新增了clone出来的两个item,所以这里需要再取一次
            s.slideItem = $(o.className + ' .slider-wrapper .slider-item');
            
            // 给两个clone出来的item增加辨识的class
            s.slideItem.eq(0).addClass('slider-duplicate');
            s.slideItem.eq(-1).addClass('slider-duplicate');
        };
        s.init = function() {
            document.querySelector(o.className).addEventListener('touchstart', s.onTouchStart, false);
            document.querySelector(o.className).addEventListener('touchmove', s.onTouchmove, false);
            document.querySelector(o.className).addEventListener('touchend', s.onTouchEnd, false);
        };
        s.slideTo = function() {

        };
        s.onTouchStart = function() {
        
        };
        s.onTouchmove = function() {

        };
        s.onTouchEnd = function() {

        }

    }
    
    $.slider = function(option){
        var slider = new Slider(option);
        slider.toHtml();
    };
})(Zepto);