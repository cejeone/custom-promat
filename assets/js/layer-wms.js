var ObjectId = 0;
var urlPanorama = "";

L.TileLayer.CustomWMS = L.TileLayer.WMS.extend({

    onAdd: function (map) {
        L.TileLayer.WMS.prototype.onAdd.call(this, map);
        map.on('click', this.getFeatureInfo, this);
    },

    onRemove: function (map) {
        L.TileLayer.WMS.prototype.onRemove.call(this, map);
        map.off('click', this.getFeatureInfo, this);
    },

    getFeatureInfo: function (evt) {
        var url = this.getFeatureInfoUrl(evt.latlng),
                showResults = L.Util.bind(this.showGetFeatureInfo, this);
		
        /*$.ajax({
            url: BASE_URL + 'service/feature_info.php',
            type: 'post',
            data: {url : url, layer: this.wmsParams.layer, token: token},
            dataType: 'json',
            success: function (data, status, xhr) 
			{
                showResults(null, evt.latlng, data);
            },
            error: function (xhr, status, error) {
                showResults(error);
            }
        });*/
		
        console.log(url);
		
		//var jsonDummy = '{"type":"FeatureCollection","features":[{"type":"Feature","id":"sub_unit.fid--184ad9a5_18382db798c_-703a","geometry":{"type":"Point","coordinates":[109.6052714,-7.39526065]},"geometry_name":"Geometry","properties":{"Id":93351,"Code":"PLTA PB SOEDIRMAN        "}}],"totalFeatures":"unknown","numberReturned":1,"timeStamp":"2022-09-29T14:28:09.748Z","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}}}';
		
		//jsonDummy = JSON.parse(jsonDummy);
		
		var layerName = this.wmsParams.layer;	
		
		$.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function (data, status, xhr) 
			{
				console.log(data);
				if(data.features.length > 0)
				{
					ObjectId = data.features[0].properties.Id;
					$.ajax({
					url: urlClass+layerName+"/cards/"+ObjectId,
					type: 'GET',
					async:true,
					headers: { 'Cmdbuild-authorization': token },
					contentType: 'application/json',
					data: '', 
					success: function(data){
						console.log(data);		
						var itemData = data.data;
						
						var obj = {};
						var popupHtml = "";
						
						//SET CONTENT BASED ON LAYER CLICKED
							if (layerName == 'sub_unit') 
						{
							popupHtml =
							`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
								<div class="table-responsive" style="height: 200px;">
									<table class="table table-striped">
										<tr>
											<td>Kode Sub Unit</td>
											<td>` + itemData.Code + `</td>
										</tr>
										<tr>
											<td>Jumlah Mesin</td>
											<td>` + itemData.jumlah_mesin + ` buah </td>
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
											<td>Detail</td>
											<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
										</tr>
										<tr>
											<td>Lampiran</td>
											<td>[ATTACHMENTS]</td>
										</tr>
									</table>
								</div>`;
							}		
							if (layerName == 'pilar_bm') 
							{
								popupHtml =
								`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
									<div class="table-responsive popup" style="height: 200px;">
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
												<td>Sub Unit</td>
												<td>` + itemData._kode_sub_unit_description + `</td>
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
												<td>Status Pilar</td>
												<td>` + itemData._status_pilar_description + `</td>
											</tr>
											<tr>
												<td>Detail</td>
												<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
											</tr>
											<tr>
												<td colspan="2"><b>Lampiran :</b></td>
											</tr>
											<tr>
												<td colspan="2">
													<ul>
														[ATTACHMENTS]
													</ul>
												</td>
											</tr>
										</table>
									</div>`;
							}	
							if (layerName == 'pilar_batas') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
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
															<td>Lintang</td>
															<td>` + itemData.koordinat_lintang + `</td>
														</tr>
														<tr>
															<td>Bujur</td>
															<td>` + itemData.koordinat_bujur + `</td>
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
															<td>Detail</td>
															<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}
							if (layerName == 'persil') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3" >` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
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
															<td>Kecamatan</td>
															<td>` + itemData._kecamatan_description + `</td>
														</tr>
														<tr>
															<td>Detail</td>
															<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}
			
							if (layerName == 'sengketa') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
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
															<td>Detail</td>
															<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}			
							if (layerName == 'zonasi') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
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
															<td>Detail</td>
															<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}
							if (layerName == 'sewamenyewa') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
													<table class="table table-striped">
														<tr>
															<td>Nomor Kontrak</td>
															<td>` + itemData.Code + `</td>
														</tr>
														<tr>
															<td>Keterangan</td>
															<td>` + itemData.Description + `</td>
														</tr>
														<tr>
															<td>Pemilik</td>
															<td>` + itemData._pihak_kesatu_description + `</td>
														</tr>
														<tr>
															<td>Penyewa</td>
															<td>` + itemData._pihak_kedua_description + `</td>
														</tr>
														<tr>
															<td>Pengunaan</td>
															<td>` + itemData._jenis_penggunaan_description + `</td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}			
							if (layerName == 'garis_pilar') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
													<table class="table table-striped">
														<tr>
															<td>Kode Garis Pilar</td>
															<td>` + itemData.Code + `</td>
														</tr>
														<tr>
															<td>Keterangan</td>
															<td>` + itemData.Description + `</td>
														</tr>
														<tr>
															<td>Tanggal</td>
															<td>` + itemData.tanggal + `</td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}			
							if (layerName == 'garis_rtk') 
							{
								popupHtml =
												`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
												<div class="table-responsive popup" style="height: 200px;">
													<table class="table table-striped">
														<tr>
															<td>Kode Batas RTK</td>
															<td>` + itemData.Code + `</td>
														</tr>
														<tr>
															<td>Keterangan</td>
															<td>` + itemData.Description + `</td>
														</tr>
														<tr>
															<td>Tanggal</td>
															<td>` + itemData.tanggal + `</td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
												</div>`;
							}			
							if (layerName == 'panorama_360') 
							{
								popupHtml =
									`<H5 class="title-popup text-center mb-3">` + itemData.Description + `</H5>
									<div class="foto-panorama text-center">
											[URLPANORAMA]
									</div>				
												<div class="table-responsive popup" style="max-height: 100px;">
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
															<td>Detail</td>
															<td><a href='[LINK_DATA]' target='_blank'>Lihat Data</a></td>
														</tr>
														<tr>
															<td colspan="2"><b>Lampiran :</b></td>
														</tr>
														<tr>
															<td colspan="2">
																<ul>
																	[ATTACHMENTS]
																</ul>
															</td>
														</tr>
													</table>
													
												</div>`;
												
								//strPanorama = "<div id='panorama-"+ObjectId+"'></div>";
								//urlPanorama = "http://localhost:8091/1707_2.jpg";											
								//popupHtml = popupHtml.replace("[URLPANORAMA]",strPanorama);			//[URLPANORAMA]																												
							}

							//console.log('<iframe width="400" height="200" allowfullscreen style="border-style:none;" src="'+urlTest+'plugins/pannellum/pannellum.htm#panorama='+urlTest+'1707_2.jpg&amp;autoLoad=true"></iframe>');
							
							var strData = urlApp+"ui/#classes/"+layerName+"/cards/"+ObjectId;
							popupHtml = popupHtml.replace("[LINK_DATA]",strData);	
							//popupHtml = popupHtml.replace("[URLPANORAMA]","<div id='panorama-test'>test</div>");
							/*popupHtml = popupHtml.replace("[URLPANORAMA]",'<iframe width="400" height="200" allowfullscreen style="border-style:none;" src="http://103.233.103.22:8092/plugins/pannellum/pannellum.htm#panorama=http://103.233.103.22:8092/1707_2.jpg&amp;autoLoad=true"></iframe>');*/							
							//popupHtml = popupHtml.replace("[URLPANORAMA]",'<iframe width="400" height="200" allowfullscreen style="border-style:none;" src="http://localhost:8091/app/plugins/pannellum/pannellum.htm#panorama=http://localhost:8091/1707_2.jpg&amp;autoLoad=true"></iframe>');
											
							
						$.ajax({
							url: urlClass+layerName+"/cards/"+ObjectId+"/attachments?limit=0&detailed=true&page=1&start=0",
							type: 'GET',
							async:false,
							headers: { 'Cmdbuild-authorization': token },
							contentType: 'application/json',
							data: '', 
							success: function(data){
								console.log("Attachments: "+ObjectId);														
														
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
									strAttach += "<li><a href='" + urlClass + layerName+"/cards/" + ObjectId + "/attachments/" + FileId + "/"+FileName +"' target='_blank'>"+FileName+"</a></li>";
									//}
								}
																		
								console.log(strAttach);
								if(strAttach == "")
								{
									strAttach = "Tidak ada Lampiran";
								}

								popupHtml = popupHtml.replace("[ATTACHMENTS]",strAttach);
								
								if(objAttachments.length > 0)
								{
									var FirstFileName = objAttachments[0]?.FileName;
									var FirstFileId = objAttachments[0]?._id;
									urlPanorama = urlClass + layerName+"/cards/" + ObjectId + "/attachments/" + FirstFileId + "/"+FirstFileName;
									popupHtml = popupHtml.replace("[URLPANORAMA]",'<iframe class="img-panorama" allowfullscreen style="border-style:none;" src="'+urlTest+'plugins/pannellum/pannellum.htm#panorama='+urlPanorama+'&amp;token='+token+'&amp;autoLoad=true"></iframe>');
								}
														
								obj.content = popupHtml;
												
								showResults(null, evt.latlng, obj);	
								
								
		
							},
							error: function (request, status, error) {
									console.log(error);
							}
						});
						
						
							
					},
					error: function (request, status, error) {
						console.log(error);
					}
					});
				}
            },
            error: function (xhr, status, error) {
                showResults(error);
            }
        })
		
    },

    getFeatureInfoUrl: function (latlng) {
        var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
                size = this._map.getSize(),
                params = {
                    request: 'GetFeatureInfo',
                    service: 'WMS',
                    srs: 'EPSG:4326',
                    styles: this.wmsParams.styles,
                    transparent: this.wmsParams.transparent,
                    version: this.wmsParams.version,
                    format: this.wmsParams.format,
                    bbox: this._map.getBounds().toBBoxString(),
                    height: size.y,
                    width: size.x,
                    layers: this.wmsParams.layers,
                    query_layers: this.wmsParams.layers,
                    info_format: 'application/json'
                };

        params[params.version === '1.3.0' ? 'i' : 'x'] =  Math.round(point.x);
        params[params.version === '1.3.0' ? 'j' : 'y'] =  Math.round(point.y);

        return this._url + L.Util.getParamString(params, this._url, true);
    },

    showGetFeatureInfo: function (err, latlng, data) {
        if (err) {
            // console.log(err);
            return;
        }

        L.popup({maxWidth: 400,maxHeight:400})
                .setLatLng(latlng)
                .setContent(data.content)
                .openOn(this._map);
		
    }
});

L.tileLayer.CustomWMS = function (url, options) {
    return new L.TileLayer.CustomWMS(url, options);
};

//<tr>
	//<td>Desa</td>
	//<td>` + itemData._desa_description + `</td>
//</tr>