/*
 * jQuery Map
 * 
 * Description: maps for javascript api
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
                used: 'google', // google, naver, daum
                google: {
                    api: {
                        uri: 'https://maps.googleapis.com/maps/api/js',
                        key: '', // API KEY
                        language: 'en',
                        region: 'AU'
                    },
                    map: {
                        lat: -34.397,             // (number)
                        lng: 150.644,             // (number)
                        center: {},               // (number)
                        zoom: 8,                  // (number)
                        icon: '',                 // (string) '/path/marker.png'
                        draggable: true,          // (boolean)
                        scrollwheel: false,       // (boolean)
                        styleWizard: 'standard',  // (string) 'standard','silver','retro','dark','night','aubergine'
                        zoomControl: true,        // (boolean)
                        mapTypeControl: false,    // (boolean)
                        scaleControl: false,      // (boolean)
                        streetViewControl: false, // (boolean)
                        rotateControl: false,     // (boolean)
                        fullscreenControl: false  // (boolean)
                    }
                },
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
                },
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
                case 'google': google_initialize(this, settings); break;
                case 'naver': naver_initialize(this, settings); break;
                case 'daum': daum_initialize(this, settings); break;
            }

            return this;
        }
    });

    /*
     * Google
     */
    function google_initialize(element, settings) {

        var api = settings.google.api;
        var param = api.uri + '?key='+ api.key +'&language='+ api.language +'&region='+ api.region +'';

        $.getScript(param).done(function(script, textStatus) {
            $(element).each(function(index, el) {
                google_instance(el, settings.google.map);
            });
        })
        .fail(function(jqxhr, settings, exception) {
            $(element).each(function(index, el) {
                console.log(jqxhr);
            });
        });

    }

    function google_instance(element, settings) {

        if ( ! $(element).length ) {
            return;
        }

        var $element = $(element);

        // Merging data-attribute and settings
        var opts = $.extend( true, {}, settings, $element.data('map-google') );

        // coordinate
        opts.center.lat = opts.lat;
        opts.center.lng = opts.lng;

        // style wizard
        opts.styles = google_wizard( opts.styleWizard.toLowerCase() );

        // disable draggable mobile only 
        if ( isScreen('mobile') ) {
            opts.draggable = false;
        }

        var map = new google.maps.Map( element, opts );

        // Marker
        if ( opts.icon !== '' ) {
            var marker = new google.maps.Marker({
                map      : map,
                position : map.getCenter(),
                icon     : opts.icon
            });
        }

        // responsive position center
        google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(map.getCenter()); 
        });

        // remove initialize image
        var $initialize = $element.parents('.map-area').find('.map-initialize');

        if ( !! $initialize.length ) {
            setTimeout(function(){
                $initialize.fadeOut();
            }, 250 );
        }

    }

    function google_wizard(style) {

        var output = [];

        switch(style) {
            case 'standard':
                output = [];
                break;
            case 'silver':
                output = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];
                break;
            case 'retro':
                output = [{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]}];
                break;
            case 'dark':
                output = [{"elementType":"geometry","stylers":[{"color":"#212121"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#212121"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#757575"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#181818"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"poi.park","elementType":"labels.text.stroke","stylers":[{"color":"#1b1b1b"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#8a8a8a"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#373737"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#3c3c3c"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#3d3d3d"}]}];
                break;
            case 'night':
                output = [{"elementType":"geometry","stylers":[{"color":"#242f3e"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#746855"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#242f3e"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#263c3f"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#6b9a76"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#38414e"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#212a37"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#9ca5b3"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#746855"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#1f2835"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#f3d19c"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#2f3948"}]},{"featureType":"transit.station","elementType":"labels.text.fill","stylers":[{"color":"#d59563"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#17263c"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#515c6d"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#17263c"}]}];
                break;
            case 'aubergine':
                output = [{"elementType":"geometry","stylers":[{"color":"#1d2c4d"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#8ec3b9"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#1a3646"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#64779e"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#4b6878"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#334e87"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#023e58"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#283d6a"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#6f9ba5"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#023e58"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#3C7680"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#304a7d"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#2c6675"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#255763"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#b0d5ce"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#023e58"}]},{"featureType":"transit","elementType":"labels.text.fill","stylers":[{"color":"#98a5be"}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"color":"#1d2c4d"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#283d6a"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#3a4762"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#0e1626"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#4e6d70"}]}];
                break;
        }

        return output;
    }

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