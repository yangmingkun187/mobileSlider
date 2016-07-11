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
        s.sliderPositions = [];
        s.$container = $(o.className);
        s.$wrapper = $(o.className + ' .slider-wrapper');
        s.width = s.$container.width();

        for(var i = 0, len = $slideItem.length; i < len; i++) {
            s.paginationHtml += '<span class="slider-pagination-item"></span>';
            $slideItem.eq(i).attr('data-slider-index',i);
            $slideItem.eq(i).css('width',s.width);
        }
        s.toHtml = function() {
            // 是否需要pagination
            o.pagination && $('.slider-pagination').append(s.paginationHtml);
            $('.slider-wrapper').prepend($slideItem.eq(-1).clone()).append($slideItem.eq(0).clone());
            
            // 因为新增了clone出来的两个item,所以这里需要再取一次
            s.slideItem = $(o.className + ' .slider-wrapper .slider-item');
            for(var i = 0, len = s.slideItem.length; i < len; i++) {
                s.sliderPositions.push(-s.width * i);
            }
            // 给两个clone出来的item增加辨识的class
            s.slideItem.eq(0).addClass('slider-duplicate');
            s.slideItem.eq(1).addClass('active');
            s.slideItem.eq(-1).addClass('slider-duplicate');
        };
        s.init = function() {
            document.querySelector(o.className).addEventListener('touchstart', s.onTouchStart, false);
            document.querySelector(o.className).addEventListener('touchmove', s.onTouchmove, false);
            document.querySelector(o.className).addEventListener('touchend', s.onTouchEnd, false);
            s.setWrapperTranslate(-s.width);
        };
        s.slideTo = function(slideIndex) {
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if(slideIndex < 0) slideIndex = 0;
            var translate = s.sliderPositions[slideIndex];
            if(startTranslate == s.sliderPositions[s.sliderPositions.length - 1] && translate == s.sliderPositions[2]) {
                s.setWrapperTranstion(0);
            } else if(startTranslate == 0 && translate == s.sliderPositions[s.sliderPositions.length - 2]) {
                s.setWrapperTranstion(0);
            } else {
                s.setWrapperTranstion(300);
            }
            s.setWrapperTranslate(translate);

            if(translate == s.sliderPositions[s.sliderPositions.length - 1]) {
                s.setWrapperTranstion(0);
                s.setWrapperTranslate(s.sliderPositions[1]);
            }
            if(translate == s.sliderPositions[0]) {
                s.setWrapperTranstion(0);
                s.setWrapperTranslate(s.sliderPositions.length - 2);
            }
            // setTimeout(s.setWrapperTranstion(0),1000);
        };
        // 设置wrapper的transform效果
        s.setWrapperTranslate = function(translate) {
            s.$wrapper.css({
                "transform": "translate3d(" + translate + "px, 0px, 0px);"
            })
        };
        s.setWrapperTranstion = function(duration) {
            s.$wrapper.css({
                "transition-duration": duration+"ms;"
            })
        };
        s.getWrapperTranslate = function(el) {
            var curStyle = window.getComputedStyle(el, null);
            var transformMatrix, matrix;
            if (window.WebKitCSSMatrix) {
                var curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
            if (window.WebKitCSSMatrix) {
                curTransform = transformMatrix.m41;
            }else {
                curTransform = parseFloat(matrix[4]);
            }
            return curTransform;
        };
        //
        var isTouched,
            isMoved,
            isTouchEvent,
            currentTranslate,
            startTranslate;
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        s.onTouchStart = function(e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            isMoved = false;
            isTouched = true;
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        };
        s.onTouchmove = function(e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;

            s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

            var diff = s.touches.diff = s.touches.currentX - s.touches.startX;

            if(!isMoved) {
                startTranslate = s.getWrapperTranslate(s.$wrapper[0]);
            }
            isMoved = true;

            currentTranslate = -diff + startTranslate;

            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function(e) {
            isTouched = isMoved = false;
            var index = 0;
            for (var i = 0, len = s.sliderPositions.length; i < len; i++) {
                if(s.sliderPositions[i] === startTranslate) {
                    index = i;
                }
            }
            s.slideItem.removeClass('active');
            if(s.touches.diff > 0) {
                if(index == s.sliderPositions.length - 1) {
                    s.slideTo(2);
                } else {
                    s.slideTo(index + 1);
                }
            } else {
                if(index == 0) {
                    s.slideTo(s.sliderPositions.length - 2);
                } else {
                    s.slideTo(index - 1);
                }
            }
        }

    }
    
    $.slider = function(option){
        var slider = new Slider(option);
        slider.init();
        slider.toHtml();
    };
})(Zepto);