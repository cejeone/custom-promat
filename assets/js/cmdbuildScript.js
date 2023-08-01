var token = "";
		
var users = [];
var userData = {};
var userTenant = [];
var idTenantFilter = "";
var tenantFilter = "";
			
var classList = ['sub_unit','persil','pilar_bm','pilar_batas','sengketa','zonasi','panorama_360','sewamenyewa','basemap'];
var layerList = ['Sub Unit','Persil','Pilar BM','Pilar Batas','Sengketa','Zonasi','Panorama 360','Sewa Menyewa','Foto Udara'];
//var classList = ['sub_unit','pilar_bm','pilar_batas'];
//var layerList = ['Sub Unit','Pilar BM','Pilar Batas'];
var arrData = [];
var iconData = [];
var arrLayers = [];
var arrLayerGroups = [];
var layerControl;

GetCmdbuildToken(usernameCmdbuild,passwordCmdbuild);

function GetCmdbuildToken(username,password){
	$.ajax({
		url: urlToken,
		type: 'POST',
		async:true,
		contentType: 'application/json',
		data: '{"username":"'+username+'", "password":"'+password+'"}', 
		success: function(e){
		   token = e.data._id;
		   if(token != ''){
				arrLayers = [];			
				// GetIcon();
				// SetZoomLevel();
				
				//get all users
				GetAllUsers();		
				
				//LoadDataCards();
		
				//SetWMSLayer();
				// GetDataCards(classList[0]);	
				
				//console.log(arrData);
			}
	
		},
		error: function (request, status, error) {
			alert(request.responseText);
		}
	});
}

/*FILTER */
function GetUserById(userId)
		{		
			$.ajax({
			url: urlUsers+"/"+userId,
			type: 'GET',
			async:true,
			headers: { 'Cmdbuild-authorization': token },
			contentType: 'application/json',
			data: '', 
			success: function(data){
				//console.log(data);
				userData = data.data;
				
				userTenant = userData.userTenants;
				
				SetTenantFilter(userTenant);
				//console.log(userTenant);				
				
				updateMapFilter();
				
				GetDataFunctionDashboardCountBM()
				GetDataFunctionDashboardCountPatok()
				GetDataFunctionDashboardCountPersil()
				GetDataFunctionDashboardCountPanorama()
				GetDataFunctionDashboardPie();
			   	// GetDataFunctionDashboardDoughnut();
			   	GetDataBookmark();
			},
			error: function (request, status, error) {
				alert(error);
			}
			});
		}

function updateMapFilter()
{
	 sub_unit = L.tileLayer.CustomWMS(url_wms, {
		layer: 'sub_unit',
		layers: 'promat:v_sub_unit',
		format: 'image/png',
		transparent: true,
		maxZoom: 18,
		 minZoom: 4,
		crossOrigin: true,
		CQL_FILTER: idTenantFilter
	});
	
	sub_unit.addTo(map);

}
function SetTenantFilter(userTenant)
{
	var arrIdTenant = [];
	var arrCodeTenant = [];
	for(var i = 0;i<userTenant.length;i++)
	{
		// arrIdTenant.push("Id = "+userTenant[i]._id);
		// arrCodeTenant.push("TenantCode = "+userTenant[i]._id);
		arrIdTenant.push("id = "+userTenant[i]._id);
		arrCodeTenant.push("id_tenant = "+userTenant[i]._id);
	}
	
	idTenantFilter = arrIdTenant.join(' or ');
	tenantFilter = arrCodeTenant.join(' or ');
}

function GetAllUsers()
		{			
			$.ajax({
			url: urlUsers,
			type: 'GET',
			async:true,
			headers: { 'Cmdbuild-authorization': token },
			contentType: 'application/json',
			data: '', 
			success: function(data){
				users = data.data;
				//console.log(users);
				var userIdCmdbuild = GetIdByUsername(users,userToken);
				//get data by id 
				GetUserById(userIdCmdbuild);							
			},
			error: function (request, status, error) {
				alert(error);
			}
			});
		}

function GetIdByUsername(arrUser,username)
		{
			for(var i = 0;i<arrUser.length;i++)
			{
				var item = arrUser[i];
				if(item.username == username)
				{
					return item._id;
				}
			}
					
			return "";
		}

/*FILTER */
		
function GetDataCards(className){
	$.ajax({
		url: urlClass+className+"/cards",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		data: '', 
		success: function(data){
			//console.log(data);
			var objData = data.data;
			var obj = {};
			obj.ClassName = className;
			obj.Data = objData;		
			
			GetGeoattributesDataCards(obj,className);
			
			LoadCardGeom(className);
			
			
			// console.log(arrLayerGroups);			
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetGeoattributesDataCards(obj,className)
{
	$.ajax({
		url: urlClass+className+"/geoattributes?visible=true",
		type: 'GET',
		async:false,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		data: '', 
		success: function(data){
		//console.log(data);
		var arrGeometries = data.data;
		obj.GeoattributesData = arrGeometries;
		arrData.push(obj);
	},
	error: function (request, status, error) {
		console.log(error);
	}
	});
}
		
function GetIcon()
{
	$.ajax({
	url: urlRest+"uploads/?path=images/gis",
	type: 'GET',
	async:true,
	headers: { 'Cmdbuild-authorization': token },
	contentType: 'application/json',
	data: '', 
	success: function(data){
	// console.log("icon");
	// console.log(data);
	iconData = data.data;
	},
	error: function (request, status, error) {
	console.log(error);
	}
});
}

function GetIconByIconId(iconId)
{
	for(var i = 0;i<iconData.length;i++)
	{
		var item = iconData[i];
		if(item._id == iconId)
		{
			return item;
		}
	}
			
	return "";
} 

function GetCardDataByClassName(className)
{
	for(var i = 0;i<arrData.length;i++)
	{
		var item = arrData[i];
		if(item.ClassName == className)
		{
			return item.Data;
		}
	}
			
	return "";
} 

function GetCardGeoattributeDataByClassName(className)
{
	for(var i = 0;i<arrData.length;i++)
	{
		var item = arrData[i];
		if(item.ClassName == className)
		{
			return item.GeoattributesData;
		}
	}
			
	return "";
} 

function GetCardDataById(dataId, arrClassData){
	for(var i = 0;i<arrClassData.length;i++){
		
		var item = arrClassData[i];
		if(item._id == dataId){
			return item;
		}
	}

	return "";
}

function GetLayerDescByName(className){
	for(var i = 0;i<classList.length;i++){
		
		var item = classList[i];
		if(item == className){
			return layerList[i];
		}
	}

	return "";
}

function GetLayerGroupByName(className)
{
	// console.log(className);
	for(var i = 0;i<arrLayerGroups.length;i++){
		
		var item = arrLayerGroups[i];
		if(item.Name == className){
			return item.Obj;
		}
	}

	return "";
	
}
		
function LoadCardGeom(className)
{		
	var cardData = GetCardDataByClassName(className);
	var cardGeoattributeData = GetCardGeoattributeDataByClassName(className);
	//console.log(className);
	//console.log(cardData);
		
	/*var styleRule = GetGeoStyleRules("peta_rencana_tambang");
	var itemRule = GetGeoStyleRulesById("peta_rencana_tambang",styleRule[0]._id)
	console.log("RencanaTambangData Style Rules");
	console.log(styleRule[0]);
	console.log(itemRule);*/
			
	var arrDataLayers = [];
	var arrObjLayers = [];
			
	for(var l = 0;l<cardGeoattributeData.length;l++)
	{
		var geomData = cardGeoattributeData[l];
		var geomId = geomData._id;
		var geomName = geomData.owner_type;
		var geomType = geomData.type;
		var geomSubType = geomData.subtype;
		var zoomMin = geomData.zoomMin;
		var zoomMax = geomData.zoomMax;
		var zoomDef = geomData.zoomDef;
		var geomStyle = geomData.style;
		var geomIconId = geomData._icon;
		var geomIndex = geomData.index;
			
		console.log("GeomData");
		console.log(geomData);
		console.log("geomIconId");
		console.log(geomIconId);
		var icon = GetIconByIconId(geomIconId);
		console.log("icon geom");
		console.log(icon);
		if(geomType == "geometry")
		{
			/*$.ajax({
				url: urlClass+"_ANY/cards/_ANY/geovalues/center?attribute="+geomId+"&filter=&forOwner="+className+"",
				type: 'GET',
						async:false,
						headers: { 'Cmdbuild-authorization': token },
						contentType: 'application/json',
						data: '', 
						success: function(data){
							centerMapRencanaTambang = data.data;
							//console.log(centerMapBorehole);
						},
						error: function (request, status, error) {
								console.log(error);
							}
						});*/

					
				
					$.ajax({
					url: urlClass+"_ANY/cards/_ANY/geovalues?attribute="+geomId+"&area=8700077.702681486%2C-2425843.402248945%2C16576149.097186048%2C1507300.3251930843&limit=0&attach_nav_tree=false",
					type: 'GET',
					async:false,
					headers: { 'Cmdbuild-authorization': token },
					contentType: 'application/json',
					data: '', 
					success: function(data){
						
						var datas = data.data;
						
						//console.log("geom data: ");
 						//console.log(datas);
					
						if(datas.length > 0)
						{						
							
							if(geomSubType == "point" || geomSubType == "polygon")
							{
								var arrFeatures = [];
								for(var j = 0;j<datas.length;j++)
								{								
									var objLayer = {};
									objLayer.Name = geomName;
									objLayer.Styles = geomStyle;
									objLayer.Icon = icon;
									objLayer.GeomType = geomSubType;
									objLayer.GeomIndex = geomIndex;									
									

									var ownerId = datas[j]._owner_id;									
									var itemData = GetCardDataById(ownerId,cardData);
									//console.log(ownerId);
									
									var popupHtml = 'Kode: '+itemData.Code;
									
									//get attachments
									/*$.ajax({
									url: urlClass+className+"/cards/"+ownerId+"/attachments?limit=0&detailed=true&page=1&start=0",
									type: 'GET',
										async:false,
										headers: { 'Cmdbuild-authorization': token },
										contentType: 'application/json',
										data: '', 
										success: function(data){
											console.log("Attachments: "+ownerId);
											console.log(data.data);
										},
										error: function (request, status, error) {
												console.log(error);
											}
									});*/
					
									
									var attachId = "";
									
									if (className == 'sub_unit') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive" style="height: 200px;">
											<table class="table table-striped">
												<tr>
													<td>Kode Sub Unit</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Jumlah Mesin</td>
													<td>` + itemData.jml_mesin + ` buah </td>
												</tr>
												<tr>
													<td>Kapasitas</td>
													<td>` + itemData.kapasitas + `</td>
												</tr>
												<tr>
													<td>Status</td>
													<td>` + itemData.status + `</td>
												</tr>
												<tr>
													<td>Unit</td>
													<td>` + itemData._unit_description + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
								if (className == 'pilar_bm') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Pilar BM</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Label</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Desa</td>
													<td>` + itemData._desa_description + `</td>
												</tr>
												<tr>
													<td>Lintang</td>
													<td>` + itemData.koordinat_lintang + `</td>
												</tr>
												<tr>
													<td>Bujur</td>
													<td>` + itemData.koordinat_bujur + `</td>
												</tr>
												<tr>
													<td>X</td>
													<td>` + itemData.koordinat_x + `</td>
												</tr>
												<tr>
													<td>Y</td>
													<td>` + itemData.koordinat_y + `</td>
												</tr>
												<tr>
													<td>Zona UTM</td>
													<td>` + itemData.koordinat_zone_utm + `</td>
												</tr>
												<tr>
													<td>Tinggi Geometrik</td>
													<td>` + itemData.tinggi_geometrik + ` meter</td>
												</tr>
												<tr>
													<td>Tinggi Orthometrik</td>
													<td>` + itemData.tinggi_orthometrik + ` meter</td>
												</tr>
												<tr>
													<td>Kondisi</td>
													<td>` + itemData._kondisi_description + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
								if (className == 'pilar_batas') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Pilar Batas</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Label</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Desa</td>
													<td>` + itemData._desa_description + `</td>
												</tr>
												<tr>
													<td>Lintang</td>
													<td>` + itemData.koordinat_lintang + `</td>
												</tr>
												<tr>
													<td>Bujur</td>
													<td>` + itemData.koordinat_bujur + `</td>
												</tr>
												<tr>
													<td>X</td>
													<td>` + itemData.koordinat_x + `</td>
												</tr>
												<tr>
													<td>Y</td>
													<td>` + itemData.koordinat_y + `</td>
												</tr>
												<tr>
													<td>Zona UTM</td>
													<td>` + itemData.koordinat_zone_utm + `</td>
												</tr>
												<tr>
													<td>Tinggi Geometrik</td>
													<td>` + itemData.tinggi_geometrik + ` meter</td>
												</tr>
												<tr>
													<td>Tinggi Orthometrik</td>
													<td>` + itemData.tinggi_orthometrik + ` meter</td>
												</tr>
												<tr>
													<td>Kondisi</td>
													<td>` + itemData._kondisi_description + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
								if (className == 'persil') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Persil</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Label</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Nomor Peta</td>
													<td>` + itemData.nomor_peta + `</td>
												</tr>
												<tr>
													<td>Desa</td>
													<td>` + itemData._desa_description + `</td>
												</tr>
												<tr>
													<td>Kecamatan</td>
													<td>` + itemData._kecamatan_description + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
								
								if (className == 'zonasi') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Zonasi</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Nama Zonasi</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Jenis Lahan</td>
													<td>` + itemData.jenis_lahan + `</td>
												</tr>
												<tr>
													<td>Harga Njob</td>
													<td>` + itemData.harga_njob + `</td>
												</tr>
												<tr>
													<td>Harga Appraisal</td>
													<td>` + itemData.harga_appraisal + `</td>
												</tr>
												<tr>
													<td>Tanggal</td>
													<td>` + itemData.tanggal + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
								if (className == 'panorama360') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Panorama</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Nama Panorama</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Tanggal Pengambilan</td>
													<td>` + itemData.jenis_lahan + `</td>
												</tr>
												<tr>
													<td>Lintang</td>
													<td>` + itemData.koordinat_lintang + `</td>
												</tr>
												<tr>
													<td>Bujur</td>
													<td>` + itemData.koordinat_bujur + `</td>
												</tr>
												<tr>
													<td>Lokasi Gambar</td>
													<td>` + itemData.lokasi_gambar + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
											[URLPANORAMA]</iframe>
										</div>`;

								}
								if (className == 'sengketa') {
									popupHtml =
										`<h6 class="mb-3">` + itemData.Description + `</h6>
										<div class="table-responsive popup">
											<table class="table table-striped">
												<tr>
													<td>Kode Sengketa</td>
													<td>` + itemData.Code + `</td>
												</tr>
												<tr>
													<td>Penggugat</td>
													<td>` + itemData.Description + `</td>
												</tr>
												<tr>
													<td>Alamat</td>
													<td>` + itemData.alamat + `</td>
												</tr>
												<tr>
													<td>Tanggal Buka Kasus</td>
													<td>` + itemData.tanggal_buka_kasus + `</td>
												</tr>
												<tr>
													<td>Tanggal Tutup Kasus</td>
													<td>` + itemData.tanggal_tutup_kasus + `</td>
												</tr>
												<tr>
													<td>Keterangan</td>
													<td>` + itemData.keterangan + `</td>
												</tr>
												<tr>
													<td>Lintang</td>
													<td>` + itemData.koordinat_lintang + `</td>
												</tr>
												<tr>
													<td>Bujur</td>
													<td>` + itemData.koordinat_bujur + `</td>
												</tr>
												<tr>
													<td>Lampiran</td>
													<td>[ATTACHMENTS]</td>
												</tr>
											</table>
										</div>`;
								}
										
									if(geomSubType == "point")
									{						
										var urlImage = urlRest+"uploads/"+icon._id+"/download?_dc=1662462991239";
										//var urlImage = "http://localhost:8091/batas16px.png";
										var myIcon = L.icon({
											iconUrl: urlImage,
											iconSize: [20, 20]
										});
									
										var pointCoord = [];
										pointCoord[0] = datas[j].x;
										pointCoord[1] = datas[j].y;
										
										//console.log(pointCoord);
										
										var latlng = new L.Point(pointCoord[0], pointCoord[1]);
										var point = L.Projection.SphericalMercator.unproject(latlng);
										//point = map.layerPointToLatLng(latlng);
								
										const markerOptions = {
											myCustomId: ownerId,
											icon: myIcon
											};
	
										arrFeatures.push(L.marker([point.lat, point.lng], markerOptions ).bindPopup(popupHtml).on("click", (e) => {
											var mycustomid = e.target.options.myCustomId;
											console.log(urlClass+className+"/cards/"+mycustomid+"/attachments?limit=0&detailed=true&page=1&start=0");
											
											var popup = e.target.getPopup();
											var content = popup.getContent();
														
											var strPanorama = "<div id='panorama-"+mycustomid+"'>HALOOOO</div>";
											var urlPanorama = "http://localhost:8091/1707_2.jpg";											
											popup.setContent(content.replace("[URLPANORAMA]",strPanorama));
														
											pannellum.viewer('panorama-'+mycustomid, {
												"type": "equirectangular",
												"panorama": urlPanorama,
												"autoLoad": true
											});
											/*$.ajax({
												url: urlClass+className+"/cards/"+mycustomid+"/attachments?limit=0&detailed=true&page=1&start=0",
												type: 'GET',
													async:false,
													headers: { 'Cmdbuild-authorization': token },
													contentType: 'application/json',
													data: '', 
													success: function(data){
														console.log("Attachments: "+mycustomid);														
														
																												
														
														var objAttachments = data.data;
														console.log(objAttachments);
														
														var strAttach = "";
														for(var ia = 0;ia < objAttachments.length;ia++)
														{
															//if(objAttachments[i])
															//{
																console.log(objAttachments[ia]?.FileName);
																var FileName = objAttachments[ia]?.FileName;
																var FileId = objAttachments[ia]?._id;
																strAttach += "<a href='" + urlClass + className+"/cards/" + mycustomid + "/attachments/" + FileId + "/"+FileName +"' target='_blank'>"+FileName+"</a><br>";
															//}
														}
														
														console.log(strAttach);
														if(strAttach == "")
														{
															strAttach = "Tidak ada Lampiran";
														}
														
														var strPanorama = "<div id='panorama-"+mycustomid+"'></div>";
														var urlPanorama = "http://103.233.103.22:8092/1707_2.jpg";
														if(objAttachments.length > 0)
														{
															var FirstFileName = objAttachments[0]?.FileName;
															var FirstFileId = objAttachments[0]?._id;
															urlPanorama = urlClass + className+"/cards/" + mycustomid + "/attachments/" + FirstFileId + "/"+FirstFileName;
														}
														console.log(strPanorama);
														popup.setContent(content.replace("[ATTACHMENTS]",strAttach).replace("[URLPANORAMA]",strPanorama));
														
														pannellum.viewer('panorama-'+mycustomid, {
															"type": "equirectangular",
															"panorama": urlPanorama,
															"autoLoad": true
														});
													},
													error: function (request, status, error) {
															console.log(error);
														}
												});*/
										}));
										//arrFeatures.push(L.marker([point.lat, point.lng]).bindPopup('Kode: '+itemData.Code));
										
										/*L.marker([point.lat, point.lng]).addTo(map).bindPopup(
												"dsadsa"					
											) ;*/
									}	
									
									if(geomSubType == "polygon")
									{
										var polyCoords = [];
										var coords = datas[j].points;
										
										for (var i in coords) {							
										  var c = coords[i];
										  
										  var latlng = new L.Point(c.x, c.y);
										  var point = L.Projection.SphericalMercator.unproject(latlng); //edit naufal
										
										  polyCoords.push(point);
										}									
										
										const markerOptions = {
											myCustomId: ownerId
											};
											
										arrFeatures.push(L.polygon([polyCoords],markerOptions).bindPopup(popupHtml).on("click", (e) => {
											var mycustomid = e.target.options.myCustomId;
											console.log(urlClass+className+"/cards/"+mycustomid+"/attachments?limit=0&detailed=true&page=1&start=0");
											
											$.ajax({
												url: urlClass+className+"/cards/"+mycustomid+"/attachments?limit=0&detailed=true&page=1&start=0",
												type: 'GET',
													async:false,
													headers: { 'Cmdbuild-authorization': token },
													contentType: 'application/json',
													data: '', 
													success: function(data){
														console.log("Attachments: "+mycustomid);														
														
														var popup = e.target.getPopup();
														var content = popup.getContent();														
														
														var objAttachments = data.data;
														console.log(objAttachments);
														
														var strAttach = "";
														for(var ia = 0;ia < objAttachments.length;ia++)
														{
															//if(objAttachments[i])
															//{
																console.log(objAttachments[ia]?.FileName);
																var FileName = objAttachments[ia]?.FileName;
																var FileId = objAttachments[ia]?._id;
																strAttach += "<a href='" + urlClass + className+"/cards/" + mycustomid + "/attachments/" + FileId + "/"+FileName +"' target='_blank'>"+FileName+"</a><br>";
															//}
														}
														
														console.log(strAttach);
														if(strAttach == "")
														{
															strAttach = "Tidak ada Lampiran";
														}
														
														popup.setContent(content.replace("[ATTACHMENTS]",strAttach));
													},
													error: function (request, status, error) {
															console.log(error);
														}
												});
										}));
									}
								}

								console.log(map);
								var objLayer = L.layerGroup(arrFeatures);
								
								var objLayerGroup = {};
								objLayerGroup.Name = className;
								objLayerGroup.Obj = objLayer;
								objLayerGroup.ZoomMax = zoomMax;
								objLayerGroup.ZoomMin = zoomMin;
								arrLayerGroups.push(objLayerGroup);
								
								objLayer.addTo(map);

								//layerControl.addOverlay(objLayer, GetLayerDescByName(className));
							}
						}
					},
					error: function (request, status, error) {
							console.log(error);
						}
					});												
				}
			}
}		

function SetZoomLevel()
{
	var prevZoom = map.getZoom();
	map.on('zoomend',function(e){
	//debugger;
	var currZoom = map.getZoom();
    var diff = prevZoom - currZoom;
		if(diff > 0){
		   console.log('zoomed out'+currZoom);
		} else if(diff < 0) {
		  console.log('zoomed in'+currZoom);
		} else {
		  // alert('no change');
		}
		
		var isSubUnitChecked = $('input:checkbox[name=layer][value=sub_unit]').is(':checked');
		var isPersilBaruChecked = $('input:checkbox[name=layer][value=persil_baru]').is(':checked');
		var isPersilLamaChecked = $('input:checkbox[name=layer][value=persil_lama]').is(':checked');
		var isPilarBmChecked = $('input:checkbox[name=layer][value=pilar_bm]').is(':checked');
		var isPilarBatasChecked = $('input:checkbox[name=layer][value=pilar_batas]').is(':checked');
		var isPanoramaChecked = $('input:checkbox[name=layer][value=panorama_360]').is(':checked');
		var isSewamenyewaChecked = $('input:checkbox[name=layer][value=sewa_menyewa]').is(':checked');
		var isSengketaChecked = $('input:checkbox[name=layer][value=sengketa]').is(':checked');
		var isZonasiChecked = $('input:checkbox[name=layer][value=zonasi]').is(':checked');
			
		var layerSubUnit = GetLayerGroupByName(classList[0]);	
		var layerPersilBaru = GetLayerGroupByName(classList[1]);	
		var layerPersilLama = GetLayerGroupByName(classList[2]);			
		var layerPilarBm = GetLayerGroupByName(classList[3]);
		var layerPilarBatas = GetLayerGroupByName(classList[4]);
		var layerSengketa = GetLayerGroupByName(classList[5]);
		var layerZonasi = GetLayerGroupByName(classList[6]);
		var layerPanorama = GetLayerGroupByName(classList[7]);
		var layerSewamenyewa = GetLayerGroupByName(classList[8]);
		
		/*if(currZoom >= 15)
		{			
			//remove wms layer
			if(map.hasLayer(pilar_bm))
				pilar_bm.removeFrom(map);
			
			if(map.hasLayer(pilar_batas))
				pilar_batas.removeFrom(map);
			
			if(map.hasLayer(panorama_360))
				panorama_360.removeFrom(map);
			
			//add feature layer based on checked
			if(isPilarBmChecked)
			{
				if(!layerPilarBm)
				{
					GetDataCards(classList[3]);	
				}
				else
				{
					map.addLayer(layerPilarBm);
				}
			}
			if(isPilarBatasChecked)
			{
				if(!layerPilarBatas)
				{
					GetDataCards(classList[4]);	
				}
				else
				{
					map.addLayer(layerPilarBatas);
				}
			}
			if(isPanoramaChecked)
			{
				if(!layerPanorama)
				{
					GetDataCards(classList[9]);	
				}
				else
				{
					map.addLayer(layerPanorama);
				}
			}
		}
		else if(currZoom < 15)
		{
			//remove feature layer
			if(layerPanorama)
			{
				map.removeLayer(layerPanorama);
			}
			if(layerPilarBm)
			{
				map.removeLayer(layerPilarBm);
			}
			if(layerPilarBatas)
			{
				map.removeLayer(layerPilarBatas);
			}
			
			//add wms layer based on checked
			if(isPilarBmChecked)
			{
				pilar_bm.addTo(map);
			}
			if(isPilarBatasChecked)
			{
				pilar_batas.addTo(map);
			}
			if(isPanoramaChecked)
			{
				panorama_360.addTo(map);
			}
		}*/
	});
}

//Dashboard
function CountDashboardData(arrDataTenant, arrDashboardData)
{
	
			// console.log(arrDataTenant);
			
			// console.log(arrDashboardData);
			
	var dashDataCount = 0;
	for(var i = 0;i<arrDashboardData.length;i++)
	{
		var objDash = arrDashboardData[i];
		if(isUserTenant(arrDataTenant, objDash.idtenant))
			dashDataCount = dashDataCount + objDash.jumlah;
	}
	
	return dashDataCount;
}

function getFilterDashboardData(arrDataTenant, arrDashboardData)
{	
	var arrdashDataCount = [];
	var sudahSurvey = 0;
	var belumSurvey = 0;
	var objFilter = {};
	
	for(var i = 0;i<arrDashboardData.length;i++)
	{
		var objDash = arrDashboardData[i];
		if(isUserTenant(arrDataTenant, objDash.idtenant))
		{
			if(objDash.Status == "Belum Disurvey")
			{
				belumSurvey = belumSurvey + objDash.Jumlah;
			}
			
			if(objDash.Status == "Sudah Disurvey")
			{
				sudahSurvey = sudahSurvey + objDash.Jumlah;
			}
		}
	}
	
	var objBelumSurvey = {};
	objBelumSurvey.Status = "Belum Disurvey";
	objBelumSurvey.Jumlah = belumSurvey;
	arrdashDataCount.push(objBelumSurvey);
	
	var objSurvey = {};
	objSurvey.Status = "Sudah Disurvey";
	objSurvey.Jumlah = sudahSurvey;
	arrdashDataCount.push(objSurvey);
	
	return arrdashDataCount;
}

function isUserTenant(arrDataTenant, idTenant)
{
	for(var j = 0;j<arrDataTenant.length;j++)
	{
		var objTenant = arrDataTenant[j];
		if(objTenant._id == idTenant)
			return true;
	}
	
	return false;
}

function GetDataFunctionDashboardPie(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_sub_unit_by_status_map/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;
			
			var newData = getFilterDashboardData(userTenant, objData);
			// console.log(newData);
			labels = [];
			values = [];
			for (i = 0; i < newData.length; i++) {
				
				labels.push(newData[i].Status);
				values.push(newData[i].Jumlah);
			}
			var piebarColors = [
				"#b91d47",
				"#00aba9",

			];

			new Chart("piename", {
				type: "pie",
				data: {
					labels: labels,
					datasets: [{
						backgroundColor: piebarColors,
						data: values
					}]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
							

						},
					}
				},
			});
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataFunctionDashboardDoughnut(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_persil_by_sertifikat/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;
			
			labels = [];
			values = [];
			for (i = 0; i < length; i++) {
				labels.push(objData[i].Status);
				values.push(objData[i].Jumlah);
			}

			var barColors = [
				"#b91d47",
				"#00aba9",
			];

			new Chart("doughnutname", {
				type: "doughnut",
				data: {
					labels: labels,
					datasets: [{
						backgroundColor: barColors,
						data: values
					}]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'bottom',
							

						},
					}
				},
			});


			
			// document.getElementById("patok-count").innerHTML=objData[1].Jumlah;
		
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataFunctionDashboardCountPatok(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_patok_total_map/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;

			// if (objData[0].Jumlah_Patok = ' ') {
			// 	document.getElementById("patok-count").innerHTML=<i class="fa-solid fa-loader"></i>;
			// }

			var jml = CountDashboardData(userTenant,objData);
			document.getElementById("patok-count").innerHTML=jml;
		
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataFunctionDashboardCountBM(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_bm_total_map/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;

			var jml = CountDashboardData(userTenant,objData);
			document.getElementById("BM-count").innerHTML=jml;
		
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataFunctionDashboardCountPersil(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_persil_total_map/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;

			var jml = CountDashboardData(userTenant,objData);
			document.getElementById("persil-count").innerHTML=jml;
		
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataFunctionDashboardCountPanorama(){
	$.ajax({
		url: urlFunction + "__dashboard_jumlah_panorama_total/outputs",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		dataType: 'json',
		data: '',
		success: function(data){
			// console.log(data);
			var objData = data.data;
			length = objData.length;

			document.getElementById("panorama-count").innerHTML=objData[0].Jumlah;
		
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}

function GetDataBookmark(){
	$.ajax({
		url: urlClass+"sub_unit/cards",
		type: 'GET',
		async:true,
		headers: { 'Cmdbuild-authorization': token },
		contentType: 'application/json',
		data: '', 
		success: function (data) {
			var objData = data.data;
			length = objData.length;


			var table = document.getElementById('bookmark-auto')


				// for (var i = 0; i < length; i++){
				// 	var unit = objData[i]._unit_description;
				// 	var desc = objData[i].Description;
				// 	var geometry = objData[i].geometry;


				// 	if (unit == "Bali PGU") {
				// 			var row = `
				// 				<div class="form-group">
				// 					<label class="col-md-12"><i class="fa-regular fa-star"></i>
				// 						<a class="bookmark-item" type="button" onclick="bookmark${geometry.replace('POINT', '').replace(' ', ',')};"> ${desc}</a></label>
				// 					</div>
				// 				`
				// 			table.innerHTML += row
				// 	}
				// 	if (unit == "Semarang PGU") {
				// 			var row = `
				// 				<div class="form-group">
				// 					<label class="col-md-12"><i class="fa-regular fa-star"></i>
				// 						<a class="bookmark-item" type="button" onclick="bookmark${geometry.replace('POINT', '').replace(' ', ',')};"> ${desc}</a></label>
				// 					</div>
				// 				`
				// 			table.innerHTML += row
				// 	}

				// }
			

			// unitdesc = [];
			// desc = [];
			// geom = [];
			// for (var i = 0; i < length; i++){
			// 	objData.sort((a, b) => parseFloat(a.unit) - parseFloat(b.unit));

			// 	unitdesc.push(objData[i]._unit_description);
			// 	desc.push(objData[i].Description);
			// 	geom.push(objData[i].geometry);
			// 	{
			// 			for (var i = 0; i < geom.length; i++) {
			// 				geom[i] = String(geom[i]).replace('POINT', '');
			// 				geom[i] = String(geom[i]).replace(' ', ',');
			// 			};
			// 	}

			// }

			// for (var i = 0; i < length; i++){
			// 	var row = `
			// 			<div class="form-group">
               //                     <label class="col-md-12"><i class="fa-regular fa-star"></i>
               //                          <a class="bookmark-item" type="button" onclick="bookmark${geom[i]};">${desc[i]}</a></label>
               //                     </div>
			// 			`
			// 	table.innerHTML += row
			// }
			
			
			
			for (var i = 0; i < length; i++){
				objData.sort((a, b) => parseFloat(a.unit) - parseFloat(b.unit));
				var row = `
								<div class="form-group bookmark">
									<label class="col-md-12"><i class="fa-regular fa-star"></i>
										<a class="bookmark-item" type="button" onclick="bookmark${String(objData[i].geometry).replace('POINT', '').replace(' ', ',')};">${objData[i]._unit_code} - ${objData[i].Description}</a></label>
									</div>
								`
							table.innerHTML += row
			}


			// console.log(unitdesc, desc, geom);
				
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});
}
