/* control scale */
L.control.scale().addTo(map);

//header-logo /* BY UBED */
L.control.custom({
    position: 'topleft',
    content: `
    <div class="header-logo-map">
        <div class="header-bg">
            <div class="title-search">
                <div class="title-ip">
                    <span>PROMAT</span>
                </div>
                <div class="btn-search">
                    <button type="button" class="btn-widget" id="search" title="Pencarian">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `,
    classes: 'header-map',
    id: 'header-map'
}).addTo(map);

//widget-left /* BY UBED */
L.control.custom({
    position: 'topleft',
    content: '' +
        '<div class="btn-group-widget">' +
        '   <button type="button" class="btn-widget" id="zoom_in" title="Zoom In">' +
        '       <i class="fa fa-plus"></i>' +
        '   </button>' +
        '   <button type="button" class="btn-widget" id="zoom_out" data-value="zoom-out" title="Zoom Out">' +
        '       <i class="fa fa-minus"></i>' +
        '   </button>' +
        '   <button type="button" class="btn-widget" id="full_extend" title="Full Extend">' +
        '      <i class="fa fa-arrows-alt"></i>' +
        '   </button>' +
        // '   <button type="button" class="btn-widget" id="show_location" title="Show My Location">' +
        // '       <i class="fa fa-street-view"></i>' +
        // '   </button>' +
        '   <button type="button" class="btn-widget" id="go_to" title="Go To">' +
        '       <i class="fa fa-location-arrow"></i>' +
        '   </button>' +
        '</div>',
    classes: 'control-inline',
    id: 'control_inline',
}).addTo(map);

L.control.custom({
    position: 'topleft',
    classes: 'control-measurement',
    id: 'control-measurement',
}).addTo(map);

var parent = document.getElementById('control-measurement');

var measureControl = L.control.measure({
    position: 'topleft',
    activeColor: 'blue',
    completedColor: 'red',
    primaryLengthUnit: 'meters',
    secondaryLengthUnit: 'kilometers',
    primaryAreaUnit: 'hectares',
    secondaryAreaUnit: 'sqmeters',
}).addTo(map);

var measureContainer = measureControl.getContainer();
parent.appendChild(measureContainer);

$('#zoom_in').on('click', function () {
    var zoom = map.getZoom();
    zoom++;
    map.setZoom(zoom, {});
});

$('#zoom_out').on('click', function () {
    var zoom = map.getZoom();
    zoom--;
    map.setZoom(zoom, {});
});

/* control layer basemap */

var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 4,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Source: Esri'
});

var baselayers = {
    'Open Street Map': osm,
    'Esri World Imagery': Esri_WorldImagery,

};

osm.addTo(map);

var layerControl = L.control.layers.minimap(baselayers, {}, {
    collapsed: false,
}).addTo(map);

var menu_basemap = layerControl.getContainer();
var minimap = document.getElementById('content-menu-map');

function setParent(el, newParent) {
    newParent.appendChild(el);
}
setParent(menu_basemap, minimap);

$('.leaflet-minimap-container')[0].addEventListener('click', function () {
    Esri_WorldImagery.remove(map);
    osm.addTo(map);
    osm.bringToBack(map);
    setParent(menu_basemap, minimap);
});
$('.leaflet-minimap-container')[1].addEventListener('click', function () {
    osm.remove(map);
    Esri_WorldImagery.addTo(map);
    Esri_WorldImagery.bringToBack(map);
    setParent(menu_basemap, minimap);
});




/* control navigation */
$('#show_location').on('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

function showPosition(position) {
    var latLng = new L.LatLng(position.coords.latitude, position.coords.longitude);

    L.marker(latLng, {
        icon: L.icon.glyph({
            prefix: 'fa',
            glyph: 'fa-fw fa-location-arrow fa-flip-horizontal',
            glyphSize: '18px'
        })
    }).addTo(map);

    map.fitBounds(L.latLngBounds([latLng]));
}

$('#full_extend').on('click', function () {
    map.setView([-2.600029, 118.015776], 5);
});

//update /* BY UBED */
$('#go_to').on('click', function () {
    if (!$('#go_to').hasClass('active')) {
        $('#go_to').addClass('active');

        var center = map.getCenter();
        var zoom = map.getZoom();

        var control = L.control.custom({
            position: 'topleft',
            content: `
                <div class="header-goto">
                    <div class="text-btn">
                        <span>Go To</span>
                        <label id="btn_close_go" style="cursor: pointer"><i class="fa-solid fa-xmark close-widget"></i></label>
                    </div>
                </div>
                <div class="form">
                    <div class="form-group">
                        <label>Longitude</label>
                        <input type="number" id="longitude" class="form-control" value="` + center.lng + `">
                    </div>
                    <div class="form-group">
                        <label>Latitude</label>
                        <input type="number" id="latitude" class="form-control" value="` + center.lat + `">
                    </div>
                    <div class="form-group">
                        <label>Zoom</label>
                        <input type="number" id="zoom" class="form-control zoom" min="0" max="18" value="` + zoom + `">
                    <button type="button" class="btn-custom" id="btn_go">GO</button>
                    </div>
                </div>`,
            classes: 'leaflet-control-goto'
        }).addTo(map);

        $('#btn_go').on('click', function () {
            var lng = $('#longitude').val();
            var lat = $('#latitude').val();
            var zoom = $('#zoom').val();

            if (lng && lat && zoom) {
                map.setView([lat, lng], zoom);
                var latLng = new L.LatLng(lat, lng);
                console.log(latLng);

                var new_event_marker;
                if (typeof (new_event_marker) === 'undefined') {
                    new_event_marker = new L.marker(latLng, {
                        icon: L.icon.glyph({
                            prefix: 'fa',
                            glyph: 'fa-fw fa-location-arrow fa-flip-horizontal',
                            glyphSize: '18px'
                        }),
                        draggable: true,
                    }).bindPopup(
                        `<table class="table longlat table-borderless">
                            <tr>
                                <th scope="row">Longitude</th>
                                <td>` + lng + `</td>
                            </tr>
                            <tr>
                                <th scope="row">Latitude</th>
                                <td>` + lat + `</td>
                            </tr>
                        </table>
                        <div class="btn-remove">
                            <button type='button' class='btn-custom hilang-marker' onclick='removeit()'> Click to Remove </button>
                        </div>`).addTo(map);

                    //update go to dragable
                    new_event_marker.on('dragend', function (e) {
                        var coords = e.target.getLatLng();
                        var lat = coords.lat;
                        var lng = coords.lng;

                        new_event_marker._popup.setContent(
                            `<table class="table longlat table-borderless">
                            <tr>
                                <th scope="row">Longitude</th>
                                <td>` + lng + `</td>
                            </tr>
                            <tr>
                                <th scope="row">Latitude</th>
                                <td>` + lat + `</td>
                            </tr>
                        </table>
                        <div class="btn-remove">
                            <button type='button' class='btn-custom hilang-marker' onclick='removeit()'> Click to Remove </button>
                        </div>`)

                        console.log(coords);
                    })
                } else {
                    new_event_marker.setLatLng(latLng);

                }
                control.remove();

                $('#go_to').removeClass('active');
            } else {
                show_notif('Please fill all input.', 'error', 3000, false);
            }
        });

        $('#btn_close_go').on('click', function () {
            control.remove();

            $('#go_to').removeClass('active');
        });
    }
});


function removeit() {
    $(".leaflet-popup").hide();
    $(".leaflet-marker-icon").hide();
}


//update /* BY UBED */
$('#search').on('click', function () {
    if (!$('#search').hasClass('active')) {
        $('#search').addClass('active');

        var control = L.control.custom({
            position: 'topleft',
            content: `
                <div class="header-search">
                    <div class="text-btn">
                        <span>Pencarian</span>
                        <label id="btn_close_search" style="cursor: pointer"><i class="fa-solid fa-xmark close-widget"></i></label>
                    </div>
                </div>
                <div class="content-search">
                    <div class="form-group">
                        <label>Layer</label>
                        <select class="form-control" name="layer" id="select-layer">
                            <option value="sub_unit">Sub Unit</option>
                            <option value="persil_baru">Persil Baru</option>
                            <option value="persil_lama">Persil Lama</option>
                            <option value="pilar_bm">Pilar BM</option>
                            <option value="pilar_batas">Pilar Batas</option>
                            <option value="sengketa">Sengketa</option>
                            <option value="zonasi">Zonasi</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Keyword</label>
                        <select name="keyword" class="form-control keyword" id="select-keyword"></select>
                    </div>
                    <div class="form-group btn-submit">
                        <button type="button" class="btn-custom" id="btn_submit_search">Cari</button>
                    </div>
                    
                </div>`,
            classes: 'leaflet-control-search'
        }).addTo(map);

        var keyword = null;
        var layer = $("select[name='layer'] option:selected").val();

        $('#btn_close_search').on('click', function () {
            control.remove();
            $('#search').removeClass('active');
        });

        $('#select-layer').on('change', function () {
            layer = $(this).val();
            $('.keyword').val([]).trigger('change');
        });

        $(".keyword").select2({
            placeholder: "-- Keyword --",
            ajax: {
                url: BASE_URL + "service/search.php",
                dataType: 'json',
                delay: 250,
                type: 'POST',
                data: function (params) {
                    return {
                        q: params.term, // search term
                        layer: layer,
                        token: token
                    };
                },
                processResults: function (data, page) {
                    var listItems = data.items;
                    var returnItems = [];
                    for (var i = 0; i < listItems.length; i++) {
                        if (isUserTenant(userTenant, listItems[i].IdTenant))
                            returnItems.push(listItems[i]);
                    }

                    return {
                        results: returnItems
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 1,
            templateResult: formatData,
            templateSelection: formatDataSelection
        }).on('change', function (e) {
            keyword = $(".keyword option:selected").val();
        });

        $('#btn_submit_search').on('click', function () {
            //alert(keyword);
            var arrKeyword = keyword.split(' ');
            //console.log(arrKeyword.length);
            if (keyword != null) {
                if (arrKeyword.length == 2) {
                    alert('Objek tidak memiliki data geometri', 'error', 3000, false);
                } else {
                    //show_notif('<img src="' + BASE_URL + 'assets/img/loading-spinner.gif" border="0" alt="animated-telephone-image-0151"/>', 'alert', false, true);
                    search_layer.removeFrom(map);
                    search(layer, keyword);
                }
            } else {
                alert('Please input keyword.', 'error', 3000, false);
            }
        });
    }
});

function formatData(repo) {
    if (repo.loading)
        return repo.text;

    var markup = repo.name;
    return markup;
}

function formatDataSelection(repo) {
    return repo.name || repo.text;
}

function search(layer, keyword) {
    clearAllLayer();

    var idLayer = keyword.split(' ')[0];
    switch (layer) {
        case 'sub_unit':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'sub_unit',
                layers: 'promat:sub_unit',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
        case 'persil_baru':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'persil_baru',
                layers: 'promat:persil_baru',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
        case 'persil_lama':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'persil_lama',
                layers: 'promat:persil_lama',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
        case 'pilar_bm':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'pilar_bm',
                layers: 'promat:pilar_bm',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
        case 'pilar_batas':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'pilar_batas',
                layers: 'promat:pilar_batas',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
        case 'sengketa':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'sengketa',
                layers: 'promat:sengketa',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;

        case 'zonasi':
            search_layer = L.tileLayer.CustomWMS(url_wms, {
                layer: 'zonasi',
                layers: 'promat:zonasi',
                format: 'image/png',
                filter: '<PropertyIsEqualTo><PropertyName>Id</PropertyName><Literal>' + idLayer + '</Literal></PropertyIsEqualTo>',
                transparent: true
            }).addTo(map);
            break;
    }

    /*$.post(BASE_URL + 'map/search', {
        layer: layer, keyword: keyword, simata_token: simata_token
    }, function (data) {
        console.log(data);
        map.setView([data.coordinat.y, data.coordinat.x], data.zoom);
        n.close();
    }, 'json');*/


    var lon = keyword.split(' ')[1];
    var lat = keyword.split(' ')[2];

    map.setView([lat, lon], 18);

}