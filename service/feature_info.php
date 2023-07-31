<!DOCTYPE html>
<html>

<body>

     <?php
$url = $_POST["url"];
$layer = $_POST["layer"];
$token = $_POST["token"];

$urlServer = "http://promat.plnindonesiapower.co.id";

$url = "http://192.168.12.178:8080/geoserver/promat/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=promat%3Aview_sub_unit&LAYERS=promat%3Aview_sub_unit&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=application%2Fjson&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A900913&STYLES=&WIDTH=101&HEIGHT=101&BBOX=13070555.743517904%2C-707727.1914564292%2C13564091.586900594%2C-214191.34807373775";

/*$response = get_web_page($url);
$resArr = array();
$resArr = json_decode($response);
$ObjectId = $resArr->features[0]->properties->Id;

if($layer == "view_sub_unit")
{
	$layer  = "sub_unit";
}

//call to cmdbuild api to get properties
$urlCmdbuild = $urlServer."/services/rest/v3/classes/".$layer."/cards/".$ObjectId."/";
$header = array( 'Cmdbuild-authorization' => $token );
//$data = array('username' => 'jsafsd@gmail.com', 'password' => 'lassrd');
$postResponse = get_web_page_get($urlCmdbuild,$header);
print_r($postResponse);
*/

/*echo '
{"content":"<table class=\"table table-bordered table-striped\" style=\"width: 100%;\">\r\n    <tr>\r\n        <td><strong>Kode Pilar<\/strong><\/td>\r\n        <td>BM01                <\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Lintang<\/strong><\/td>\r\n        <td>-7.394599<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Bujur<\/strong><\/td>\r\n        <td>109.614753<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Tinggi Geometrik<\/strong><\/td>\r\n        <td>251.1447<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Tinggi Orthometrik<\/strong><\/td>\r\n        <td>0<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>X UTM<\/strong><\/td>\r\n        <td>347115.68063849<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Y UTM<\/strong><\/td>\r\n        <td>9182391.3154983<\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Desa<\/strong><\/td>\r\n        <td>Bawang                                            <\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Power Plant<\/strong><\/td>\r\n        <td>PLTA PB SOEDIRMAN        <\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Kondisi<\/strong><\/td>\r\n        <td><\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Lampiran<\/strong><\/td>\r\n        <td>\r\n                            <a href=\"http:\/\/localhost:8091\/app\/pages\/panorama.html?token='.$token.'\" target=\"_blank\">BM01.pdf<\/a>\r\n                    <\/td>\r\n    <\/tr>\r\n    <tr>\r\n        <td><strong>Link<\/strong><\/td>\r\n        <td><a href=\"https:\/\/promat.indonesiapower.co.id\/data\/pilar\/edit_pilar_bm\/BM01%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20\" target=\"_blank\">Detail Pilar BM<\/a><\/td>\r\n    <\/tr>\r\n<\/table>"}'*/

//echo '{"content":"data tidak ditemukan"}';

function get_web_page($url) {
    $options = array(
        CURLOPT_RETURNTRANSFER => true,   // return web page
        CURLOPT_HEADER         => false,  // don't return headers
        CURLOPT_FOLLOWLOCATION => true,   // follow redirects
        CURLOPT_MAXREDIRS      => 10,     // stop after 10 redirects
        CURLOPT_ENCODING       => "",     // handle compressed
        CURLOPT_USERAGENT      => "test", // name of client
        CURLOPT_AUTOREFERER    => true,   // set referrer on redirect
        CURLOPT_CONNECTTIMEOUT => 120,    // time-out on connect
        CURLOPT_TIMEOUT        => 120,    // time-out on response
    ); 

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);

    $content  = curl_exec($ch);

    curl_close($ch);

    return $content;
}

function get_web_page_get($url,$header)
{
	$url = $url;

    //$data = array('username' => 'jsafsd@gmail.com', 'password' => 'lassrd');

    $ch = curl_init($url);

    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_AUTOREFERER,1);
	curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
    //curl_setopt($ch,CURLOPT_POST,1);
    //curl_setopt($ch,CURLOPT_POSTFIELDS,$data);

    $result = curl_exec($ch);

    curl_close($ch);

    return $result;
}

?>

     <script>
          var url = '<?php echo $_POST["url"];?>';
          var token = '<?php echo $_POST["token"];?>';
          var layer = '<?php echo $_POST["layer"];?>';
          var urlToken =
               'http://promat.plnindonesiapower.co.id/services/rest/v3/sessions?scope=service&returnId=true';
          var urlClass = "http://promat.plnindonesiapower.co.id/services/rest/v3/classes/";
          var urlRest = "http://promat.plnindonesiapower.co.id/services/rest/v3/";

          if (layer == "view_sub_unit") {
               layer = "sub_unit";
          }

          $.ajax({
               url: urlClass + layer + "/cards",
               type: 'GET',
               async: true,
               headers: {
                    'Cmdbuild-authorization': token
               },
               contentType: 'application/json',
               data: '',
               success: function (data) {
                    console.log(data);
               },
               error: function (request, status, error) {
                    console.log(error);
               }
          });
     </script>

</body>

</html>