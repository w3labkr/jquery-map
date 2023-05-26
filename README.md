# jQuery Map   

The jquery map plugin supports Daum, Naver, and Google Maps. This plugin was created in 2019 and is no longer maintained.

## Demo   
<https://w3labkr.github.io/jquery-map/>   


## Structure

```txt
o
|-- dist
|   |-- jquery-map-daum.js
|   |-- jquery-map-daum.min.js
|   |-- jquery-map-google.js
|   |-- jquery-map-google.min.js
|   |-- jquery-map-naver.js
|   |-- jquery-map-naver.min.js
|   |-- jquery-map.js
|   `-- jquery-map.min.js
|-- CHANGELOG
|-- LICENSE
`-- README.md
```

## Installation

```html
<script src="jquery.js"></script>
<script src="jquery-map.min.js"></script>
```

## Options

```txt
| map       | feature   | property              | type      | value                                                         |
|--------   |---------  |-------------------    |---------  |-------------------------------------------------------------  |
| google    | api       | uri                   | string    | 'https://maps.googleapis.com/maps/api/js'                     |
| google    | api       | key                   | string    | ''                                                            |
| google    | api       | language              | string    | 'en'                                                          |
| google    | api       | region                | string    | 'AU'                                                          |
| google    | map       | lat                   | number    | -34.397                                                       |
| google    | map       | lng                   | number    | 150.644                                                       |
| google    | map       | zoom                  | number    | 8                                                             |
| google    | map       | icon                  | string    | '/path/marker.png'                                            |
| google    | map       | draggable             | boolean   | true                                                          |
| google    | map       | scrollwheel           | boolean   | false                                                         |
| google    | map       | styleWizard           | string    | 'standard', 'silver', 'retro', 'dark', 'night', 'aubergine'   |
| google    | map       | zoomControl           | boolean   | true                                                          |
| google    | map       | mapTypeControl        | boolean   | false                                                         |
| google    | map       | scaleControl          | boolean   | false                                                         |
| google    | map       | streetViewControl     | boolean   | false                                                         |
| google    | map       | rotateControl         | boolean   | false                                                         |
| google    | map       | fullscreenControl     | boolean   | false                                                         |
| naver     | api       | uri                   | string    | 'https://openapi.map.naver.com/openapi/v3/maps.js'            |
| naver     | api       | ncpClientId           | string    | ''                                                            |
| naver     | map       | lat                   | number    | 37.3595704                                                    |
| naver     | map       | lng                   | number    | 127.105399                                                    |
| naver     | map       | zoom                  | number    | 8                                                             |
| naver     | map       | minZoom               | number    | 8                                                             |
| naver     | map       | maxZoom               | number    | 14                                                            |
| naver     | map       | zoomControl           | boolean   | true                                                          |
| naver     | map       | scrollWheel           | boolean   | false                                                         |
| daum      | api       | uri                   | string    | '//dapi.kakao.com/v2/maps/sdk.js'                             |
| daum      | api       | appkey                | string    | ''                                                            |
| daum      | map       | lat                   | number    | 33.450701                                                     |
| daum      | map       | lng                   | number    | 126.570667                                                    |
| daum      | map       | level                 | number    | 3                                                             |
```


## Usage

```html
<section class="map-area">
    <div class="map-content">
        <div class="map-initialize" style="background-image: url(assets/images/map/map-standard.jpg);"></div>
        <div class="map-responsive">
            <div class="map map-google"></div>
        </div>
    </div>
</section>
```

```javascript
$('.map-google').map();
```

## Example

### Simple Example

```javascript
$('.map-google').map();
```

### Example with options

```javascript
$('.map-google').map({
    google: {
        api: {
            uri: 'https://maps.googleapis.com/maps/api/js',
            key: '', // API KEY
            language: 'en',
            region: 'AU'
        },
        map: {
            lat: -34.397,
            lng: 150.644,
            zoom: 12
        }
    }
});
```

```javascript
$('.map-naver').map({
    used: 'naver',
    naver: {
        api: {
            ncpClientId: ''
        },
        map: {
            lat: 37.3595704,
            lng: 127.105399,
            zoom: 12
        }
    }
});
```

```javascript
$('.map-daum').map({
    used: 'daum',
    daum: {
        api: {
            appkey: ''
        },
        map: {
            lat: 33.450701,
            lng: 126.570667,
            level: 8
        }
    }
});
```

### Example with data-attribute   

```html
<section class="map-area">
    <div class="map-content">
        <div class="map-initialize" style="background-image: url(assets/images/map/map-retro.jpg);"></div>
        <div class="map-responsive">
            <div class="map map-google" data-map-google='{"lat":-34.397,"lng":150.644,"icon":"","styleWizard":"retro"}'></div>
        </div>
    </div>
</section>
```

```javascript
<script>
    $('.map-google').map();
</script>
```

## Browser Support   
IE9+, Edge, Chrome, Firefox, Opera, Safari

## Changelog   
Please see [CHANGELOG](CHANGELOG) for more information what has changed recently.

## License   
This software is licensed under the [MIT LICENSE](LICENSE)
