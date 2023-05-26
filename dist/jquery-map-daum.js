/*
 * jQuery Map Daum
 * 
 * Description: daum map for javascript api
 * Plugin URL: https://github.com/w3labkr/jquery-map
 * Plugin Version: 1.1.0
 * Author: W3LabKr
 * Author URL: https://w3labkr.com
 * Dependency: jQuery
 * License: MIT License
 */

// the semi-colon before the function invocation is a safety net against concatenated 
// scripts and/or other plugins that are not closed properly
;(function ( $, window, document, undefined ) {
    
    $.fn.extend({
        map: function(options) {

            // the added first parameter of TRUE to signify a DEEP COPY:
            var settings = $.extend( true, {}, {
                used: 'daum',
                daum: {
                    api: {
                        uri: '//dapi.kakao.com/v2/maps/sdk.js',
                        appkey: ''
                    },
                    map: {
                        lat: 33.450701,  // (number)
                        lng: 126.570667, // (number)
                        center: null,    // (number)
                        level: 3         // (number)
                    }
                }
            }, options );

            switch( settings.used ) {
                case 'daum': daum_initialize(this, settings); break;
            }

            return this;
        }
    });

    /*
     * Daum
     */
    function daum_initialize(element, settings) {

        var api = settings.daum.api;
        var param = api.uri + '?appkey=' + api.appkey;

        $.getScript(param).done(function(script, textStatus) {
            $(element).each(function(index, el) {
                daum_instance(el, settings.daum.map);
            });
        })
        .fail(function(jqxhr, settings, exception) {
            $(element).each(function(index, el) {
                console.log(jqxhr);
            });
        });

    }

    function daum_instance(element, settings) {

        if ( ! $(element).length ) {
            return;
        }

        var $element = $(element);

        // Merging data-attribute and settings
        var opts = $.extend( true, {}, settings, $element.data('map-daum') );

        // coordinate
        opts.center = new daum.maps.LatLng(opts.lat, opts.lng);

        var map = new daum.maps.Map(element, opts);

        // remove initialize image
        var $initialize = $element.parents('.map-area').find('.map-initialize');
        
        if ( !! $initialize.length ) {
            setTimeout(function(){
                $initialize.fadeOut();
            }, 250 );
        }

    }

    /*
     * Detect screen width
     */
    function isScreen(screen){

        var max_width;

        switch( screen ) {
            case 'screen' : max_width = 1920; break;
            case 'tablet' : max_width = 1023; break;
            case 'mobile' : max_width = 767; break;
        }

        if( !!window.matchMedia || !!window.msMatchMedia ){
            return window.matchMedia('(max-width:'+ max_width +'px)').matches;
        } else {
            return ($(window).width() <= max_width) ? true : false;
        }
        
    };

})( jQuery, window, document );