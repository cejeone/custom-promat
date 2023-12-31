var MAP_URL = "http://10.8.10.216/geoserver/promat/wms"; //for layer geoserver
var url_wms = MAP_URL;
var TILE_URL = "http://192.168.12.178/tiles/"; //foto udara tiles

var sub_unit;

var persil_baru;

var persil_lama;

var pilar_batas;

var pilar_bm;

var panorama_360;

var sewa_menyewa;

var sengketa;

var zonasi;

var garis_pilar;

var batas_rtk;

var marker = L.tileLayer.CustomWMS(url_wms, {
     layer: "marker",
     layers: "promat:v_marker",
     format: "image/png",
     transparent: true,
     maxZoom: 18,
     minZoom: 4,
});

// var foto_udara = L.tileLayer(TILE_URL + "Z{z}/{y}/{x}.png", {
//      maxZoom: 18,
//      minZoom: 4,
// }); //from tile url

var foto_udara = L.tileLayer.CustomWMS(url_wms, {
    layer: 'fotoudara',
    layers: 'fotoudara:fotoudara',
    format: 'image/png',
    transparent: true,
    maxZoom: 18,
    minZoom: 4,
}); //from geoserver

var search_layer = L.tileLayer.CustomWMS();
//});
