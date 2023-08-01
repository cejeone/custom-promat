<?php
$urlToken = "http://10.8.10.215/services/rest/v3/sessions?scope=service&returnId=true";
$urlClass = "http://10.8.10.215/services/rest/v3/classes/";
$urlRest = "http://10.8.10.215/services/rest/v3/";

$keyword = $_POST["q"];
$layer = $_POST["layer"];
$token = $_POST["token"];

//$layer = "panorama360";
$urlCmdbuild = $urlClass.$layer."/cards/?_dc=1665396760732&filter=%7B%22query%22%3A%22".$keyword."%22%7D&page=1&start=0&limit=50&sort=%5B%7B%22property%22%3A%22Description%22%2C%22direction%22%3A%22ASC%22%7D%5D";

//$token = "0fwuqrd5rhbia034xw0nn3ct";

//echo $token;
$header = array( 'Cmdbuild-authorization' => $token );
$postResponse = get_web_page_get($urlCmdbuild,$token);
$arrResponse = json_decode($postResponse,true);
$arrData = $arrResponse['data'];
$arrMeta = $arrResponse['meta'];

//ECHO $arrResponse;

$arrItems = [];
foreach($arrData as $item)
{
	$name = $item["Code"];
	$geometry = $item["geometry"];
	
	if($layer == "sub_unit")
	{
		$IdTenant = $item["_id"];
	}
	else
	{
		$IdTenant = $item["_tenant"];
	}
	
	if (str_starts_with($geometry, 'POINT')) 
	{
		$geometry = str_replace("POINT(","",$geometry);
		$geometry = str_replace(")","",$geometry);

	}
	if (str_starts_with($geometry, 'POLYGON')) 
	{
		$geometry = str_replace("POLYGON((","",$geometry);
		$geometry = str_replace("))","",$geometry);
		$geometry = explode(",", $geometry);
		$geometry = $geometry[0];
	}
	
	$geometry = $item["_id"]." ".$geometry;
	
	array_push($arrItems,array('id' => $geometry, 'name' => $name, 'IdTenant' => $IdTenant));	
}



$arrItem = array(["id" => "00201               ", "name" => "00201                - PLTA PB SOEDIRMAN        "],["id" => "00202               ", "name" => "00202                - PLTA TEST        "]);
$data = array("total_counts" => $arrMeta['total'], "items" => $arrItems);

header("Content-Type: application/json");
echo json_encode($data);
//echo "\n";
//echo '{"total_counts":10,"items":[{"id":"00201               ","name":"00201                - PLTA PB SOEDIRMAN        "}]}'; 

function get_web_page_get($url,$token)
{
	$url = $url;
    $ch = curl_init($url);

	$headers = array(
	   "Accept: application/json",
	   "Content-Type: application/json",
	   "Cmdbuild-authorization:".$token
	);

    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_AUTOREFERER,1);
	curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    $result = curl_exec($ch);

    curl_close($ch);
	
	/*$options = array(
	  'http'=>array(
		'method'=>"GET",
		'header'=>$header
	  )
	);
	$context=stream_context_create($options);
	$data=file_get_contents($url,false,$context);
	*/


    return $result;
}

function get_web_page_post($url,$header)
{
	$url = $url;

    $data = array('username' => 'admin', 'password' => 'admin');

    $ch = curl_init($url);

    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch,CURLOPT_AUTOREFERER,1);
	//curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
    curl_setopt($ch,CURLOPT_POST,1);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$data);

    $result = curl_exec($ch);

    curl_close($ch);

    return $result;
}

?>