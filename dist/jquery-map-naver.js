/*
 * jQuery Map Naver
 * 
 * Description: naver map for javascript api
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
                used: 'naver',
                naver: {
                    api: {
                        uri: 'https://openapi.map.naver.com/openapi/v3/maps.js',
                        ncpClientId: ''
                    },
                    map: {
                        lat: 37.3595704,   // (number)
                        lng: 127.105399,   // (number)
                        center: null,      // (number)
                        zoom: 8,           // (number)
                        minZoom: 8,        // (number)
                        maxZoom: 14,       // (number)
                        zoomControl: true, // (boolean)
                        scrollWheel: false // (boolean)
                    }
                }
            }, options );

            switch( settings.used ) {
                case 'naver': naver_initialize(this, settings); break;
            }

            return this;
        }
    });

    /*
     * Naver
     */
    function naver_initialize(element, settings) {

        var api = settings.naver.api;
        var param = api.uri + '?ncpClientId=' + api.ncpClientId;

        $.getScript(param).done(function(script, textStatus) {
            $(element).each(function(index, el) {
                naver_instance(el, settings.naver.map);
            });
        })
        .fail(function(jqxhr, settings, exception) {
            $(element).each(function(index, el) {
                console.log(jqxhr);
            });
        });

    }

    function naver_instance(element, settings) {

        if ( ! $(element).length ) {
            return;
        }

        var $element = $(element);

        // Merging data-attribute and settings
        var opts = $.extend( true, {}, settings, $element.data('map-naver') );

        // coordinate
        opts.center = new naver.maps.LatLng(opts.lat, opts.lng);

        var map = new naver.maps.Map(element, opts);

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