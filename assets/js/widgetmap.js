$(document).ready(function () {

     $("#widget-fullmap").on("click", function () {
          $("#map-wrapper").removeClass("col-lg-8");
          $("#map-wrapper").css("padding", "0");
          $("#page-content").removeClass("mini");
          $("#count-left").css("display", "none");
          $("#count-right").css("display", "none");
          $("#count-bottom").css("display", "none");
          $("#widget-fullmap").css("display", "none");
          $(".btn-minimap").css("display", "block");
          $("#base-map").height($(".full-height").height()).width("100%");
          map.invalidateSize();
          $(".db-right").css("display", "none");
     });

     $("#widget-minimap").on("click", function () {
          $("#map-wrapper").addClass("col-lg-8");
          $("#page-content").addClass("mini");
          $("#count-left").css("display", "");
          $("#count-right").css("display", "");
          $("#count-bottom").css("display", "");
          $("#widget-fullmap").css("display", "");
          $(".btn-minimap").css("display", "none");
          $("#base-map").height($(".full-height").height()).width("100%");
          map.invalidateSize();
          $(".db-right").css("display", "");
     });


     $(".btn-legend").on("click", function () {
          $(".btn-legend").addClass("active");
          $(".menu-popup.legend").addClass("open");

     });

     $("#widget-bookmark").on("click", function () {
          $("#bookmark").toggleClass("active");
          $("#menu-bookmark").toggleClass("open");
          $("#menu-basemap").removeClass("open");
          $("#menu-layer").removeClass("open");
          $("#menu-legend").removeClass("open");
          $("#basemap").removeClass("active");
          $("#layer").removeClass("active");
          $("#legend").removeClass("active");
     });

     $("#widget-basemap").on("click", function () {
          $("#basemap").toggleClass("active");
          $("#menu-basemap").toggleClass("open");
          $("#menu-bookmark").removeClass("open");
          $("#menu-layer").removeClass("open");
          $("#menu-legend").removeClass("open");
          $("#layer").removeClass("active");
          $("#bookmark").removeClass("active");
          $("#legend").removeClass("active");
     });

     $("#widget-layer").on("click", function () {
          $("#layer").toggleClass("active");
          $("#menu-layer").toggleClass("open");
          $("#menu-bookmark").removeClass("open");
          $("#menu-basemap").removeClass("open");
          $("#menu-legend").removeClass("open");
          $("#basemap").removeClass("active");
          $("#bookmark").removeClass("active");
          $("#legend").removeClass("active");
     });

     $(".close-widget").on("click", function () {
          $("#menu-layer").removeClass("open");
          $("#menu-bookmark").removeClass("open");
          $("#menu-basemap").removeClass("open");
          $("#layer").removeClass("active");
          $("#bookmark").removeClass("active");
          $("#basemap").removeClass("active");
     });

     $(".menu-popup.legend").on("click", function () {
          $(".btn-legend").removeClass("active");
          $("#popup-legend-bottom").removeClass("open");

     });

     $("#close-legend").on("click", function () {
          $("#legend").removeClass("active");
          $("#menu-popup-legend").removeClass("open");
     });


     $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();   
     });


});