function layerAddToMap(layer) {
	
if(!persil_baru)
{
	persil_baru = L.tileLayer.CustomWMS(url_wms, {
		layer: 'persil',
		layers: 'promat:v_persil_baru',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!persil_lama)
{
	persil_lama = L.tileLayer.CustomWMS(url_wms, {
		layer: 'persil',
		layers: 'promat:v_persil_lama',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!pilar_batas)
{
	pilar_batas = L.tileLayer.CustomWMS(url_wms, {
		layer: 'pilar_batas',
		layers: 'promat:v_pilar_batas',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!pilar_bm)
{
	pilar_bm = L.tileLayer.CustomWMS(url_wms, {
		layer: 'pilar_bm',
		layers: 'promat:v_pilar_bm',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!panorama_360)
{
	panorama_360 = L.tileLayer.CustomWMS(url_wms, {
		layer: 'panorama_360',
		layers: 'promat:v_panorama360',
		transparent: true,
        maxZoom: 18,
        minZoom: 4,
		format: 'image/png'
	});
}

if(!sewa_menyewa)
{
	sewa_menyewa = L.tileLayer.CustomWMS(url_wms, {
		layer: 'sewamenyewa',
		layers: 'promat:v_sewa_menyewa',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!sengketa)
{
	sengketa = L.tileLayer.CustomWMS(url_wms, {
		layer: 'sengketa',
		layers: 'promat:v_sengketa',
		transparent: true,
		format: 'image/png',
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!zonasi)
{
	zonasi = L.tileLayer.CustomWMS(url_wms, {
		layer: 'zonasi',
		layers: 'promat:v_zonasi',
		format: 'image/png',
		transparent: true,
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!garis_pilar)
{
	garis_pilar = L.tileLayer.CustomWMS(url_wms, {
		layer: 'garis_pilar',
		layers: 'promat:v_garis_pilar',
		format: 'image/png',
		transparent: true,
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

if(!batas_rtk)
{
	batas_rtk = L.tileLayer.CustomWMS(url_wms, {
		layer: 'batas_rtk',
		layers: 'promat:v_batas_rtk',
		format: 'image/png',
		transparent: true,
        maxZoom: 18,
        minZoom: 4,
		CQL_FILTER: tenantFilter
	});
}

    switch (layer) {
        case 'power_plant':
            power_plant.addTo(map);
            $("input[value='info_power_plant']").prop('disabled', false);
            map.off('click', power_plant.getFeatureInfo, power_plant);
            break;
        case 'persil_baru':
            persil_baru.addTo(map);
            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(persil_lama)) {
                persil_lama.removeFrom(map);
                persil_lama.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(sengketa)) {
                sengketa.removeFrom(map);
                sengketa.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }

            $("input[value='info_persil_baru']").prop('disabled', false);
            map.off('click', persil_baru.getFeatureInfo, persil_baru);
            break;
        case 'persil_lama':
            persil_lama.addTo(map);

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(sengketa)) {
                sengketa.removeFrom(map);
                sengketa.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }


            $("input[value='info_persil_lama']").prop('disabled', false);
            map.off('click', persil_lama.getFeatureInfo, persil_lama);
            break;
        case 'pilar_bm':
            pilar_bm.addTo(map);
            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }

            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(sengketa)) {
                sengketa.removeFrom(map);
                sengketa.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }
            


            $("input[value='info_pilar_bm']").prop('disabled', false);
            map.off('click', pilar_bm.getFeatureInfo, pilar_bm);
            break;
        case 'pilar_batas':
            pilar_batas.addTo(map);

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }



            $("input[value='info_pilar_batas']").prop('disabled', false);
            map.off('click', pilar_batas.getFeatureInfo, pilar_batas);
            break;
        case 'panorama_360':
            panorama_360.addTo(map);


            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }



            $("input[value='info_panorama_360']").prop('disabled', false);
            map.off('click', panorama_360.getFeatureInfo, panorama_360);
            break;
        case 'sewa_menyewa':
            sewa_menyewa.addTo(map);


            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(sengketa)) {
                sengketa.removeFrom(map);
                sengketa.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }

            $("input[value='info_sewa_menyewa']").prop('disabled', false);
            map.off('click', sewa_menyewa.getFeatureInfo, sewa_menyewa);
            break;
        case 'sengketa':
            sengketa.addTo(map);


            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }


            $("input[value='info_sengketa']").prop('disabled', false);
            map.off('click', sengketa.getFeatureInfo, sengketa);
            break;


        case 'zonasi':
            zonasi.addTo(map);

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }

            $("input[value='info_zonasi']").prop('disabled', false);
            map.off('click', zonasi.getFeatureInfo, zonasi);
            break;
        
        case 'garis_pilar':
            garis_pilar.addTo(map);

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }



            $("input[value='info_garis_pilar']").prop('disabled', false);
            map.off('click', garis_pilar.getFeatureInfo, garis_pilar);
            break;
        
        case 'batas_rtk':
            batas_rtk.addTo(map);

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }


            $("input[value='info_batas_rtk']").prop('disabled', false);
            map.off('click', batas_rtk.getFeatureInfo, batas_rtk);
            break;
        

        case 'foto_udara':
            foto_udara.addTo(map);
            marker.addTo(map);
            

            if (map.hasLayer(power_plant)) {
                power_plant.removeFrom(map);
                power_plant.addTo(map);
            }
            if (map.hasLayer(persil_baru)) {
                persil_baru.removeFrom(map);
                persil_baru.addTo(map);
            }
            if (map.hasLayer(persil_lama)) {
                persil_lama.removeFrom(map);
                persil_lama.addTo(map);
            }
            if (map.hasLayer(pilar_bm)) {
                pilar_bm.removeFrom(map);
                pilar_bm.addTo(map);
            }
            if (map.hasLayer(pilar_batas)) {
                pilar_batas.removeFrom(map);
                pilar_batas.addTo(map);
            }
            if (map.hasLayer(panorama_360)) {
                panorama_360.removeFrom(map);
                panorama_360.addTo(map);
            }
            if (map.hasLayer(sewa_menyewa)) {
                sewa_menyewa.removeFrom(map);
                sewa_menyewa.addTo(map);
            }
            if (map.hasLayer(sengketa)) {
                sengketa.removeFrom(map);
                sengketa.addTo(map);
            }
            if (map.hasLayer(zonasi)) {
                zonasi.removeFrom(map);
                zonasi.addTo(map);
            }
            if (map.hasLayer(garis_pilar)) {
                garis_pilar.removeFrom(map);
                garis_pilar.addTo(map);
            }
            if (map.hasLayer(batas_rtk)) {
                batas_rtk.removeFrom(map);
                batas_rtk.addTo(map);
            }

            
            map.off('click', foto_udara.getFeatureInfo, foto_udara);
            break;
    }
    search_layer.removeFrom(map);
}

function layerRemoveFromMap(layer) {
    switch (layer) {
        case 'power_plant':
            power_plant.removeFrom(map);
            $("input[value='info_power_plant']").prop('checked', false);
            $("input[value='info_power_plant']").prop('disabled', true);
            break;
        case 'persil_baru':
            persil_baru.removeFrom(map);
            $("input[value='info_persil_baru']").prop('checked', false);
            $("input[value='info_persil_baru']").prop('disabled', true);
            break;
        case 'persil_lama':
            persil_lama.removeFrom(map);
            $("input[value='info_persil_lama']").prop('checked', false);
            $("input[value='info_persil_lama']").prop('disabled', true);
            break;
        case 'pilar_bm':
            pilar_bm.removeFrom(map);
            $("input[value='info_pilar_bm']").prop('checked', false);
            $("input[value='info_pilar_bm']").prop('disabled', true);
            break;
        case 'pilar_batas':
            pilar_batas.removeFrom(map);
            $("input[value='info_pilar_batas']").prop('checked', false);
            $("input[value='info_pilar_batas']").prop('disabled', true);
            break;
        case 'panorama_360':
            panorama_360.removeFrom(map);
            $("input[value='info_panorama_360']").prop('checked', false);
            $("input[value='info_panorama_360']").prop('disabled', true);
            break;
        case 'sewa_menyewa':
            sewa_menyewa.removeFrom(map);
            $("input[value='info_sewa_menyewa']").prop('checked', false);
            $("input[value='info_sewa_menyewa']").prop('disabled', true);
            break;
        case 'sengketa':
            sengketa.removeFrom(map);
            $("input[value='info_sengketa']").prop('checked', false);
            $("input[value='info_sengketa']").prop('disabled', true);
            break;
        case 'zonasi':
            zonasi.removeFrom(map);
            $("input[value='info_zonasi']").prop('checked', false);
            $("input[value='info_zonasi']").prop('disabled', true);
            break;
        case 'garis_pilar':
            garis_pilar.removeFrom(map);
            $("input[value='info_garis_pilar']").prop('checked', false);
            $("input[value='info_garis_pilar']").prop('disabled', true);
            break;
        case 'batas_rtk':
            batas_rtk.removeFrom(map);
            $("input[value='info_batas_rtk']").prop('checked', false);
            $("input[value='info_batas_rtk']").prop('disabled', true);
            break;
        case 'foto_udara':
            foto_udara.removeFrom(map);
            marker.removeFrom(map);

            break;
        
    }
}

function bookmark(longitude, latitude) {
    map.setView([latitude, longitude], 15);
    $('input[value="foto_udara"]').bootstrapSwitch('state', true);
    search_layer.removeFrom(map);
}

function clearAllLayer() {
	
	if(typeof power_plant != 'undefined')
	{
		power_plant.removeFrom(map);
	}
    $("input[value='power_plant']").bootstrapSwitch('state', false);
    $("input[value='info_power_plant']").prop('checked', false);
    $("input[value='info_power_plant']").prop('disabled', true);

	if(typeof persil_baru != 'undefined')
	{
		persil_baru.removeFrom(map);
	}
	
    $("input[value='persil_baru']").bootstrapSwitch('state', false);
    $("input[value='info_persil_baru']").prop('checked', false);
    $("input[value='info_persil_baru']").prop('disabled', true);

	if(typeof persil_lama != 'undefined')
	{
		persil_lama.removeFrom(map);
	}	
    $("input[value='persil_lama']").bootstrapSwitch('state', false);
    $("input[value='info_persil_lama']").prop('checked', false);
    $("input[value='info_persil_lama']").prop('disabled', true);

	if(typeof pilar_bm != 'undefined')
	{
		pilar_bm.removeFrom(map);
	}
	
    $("input[value='pilar_bm']").bootstrapSwitch('state', false);
    $("input[value='info_pilar_bm']").prop('checked', false);
    $("input[value='info_pilar_bm']").prop('disabled', true);

	if(typeof pilar_batas != 'undefined')
	{
		pilar_batas.removeFrom(map);
	}
	
    $("input[value='pilar_batas']").bootstrapSwitch('state', false);
    $("input[value='info_pilar_batas']").prop('checked', false);
    $("input[value='info_pilar_batas']").prop('disabled', true);

	if(typeof panorama_360 != 'undefined')
	{
		panorama_360.removeFrom(map);
	}
	
    $("input[value='panorama_360']").bootstrapSwitch('state', false);
    $("input[value='info_panorama_360']").prop('checked', false);
    $("input[value='info_panorama_360']").prop('disabled', true);

	if(typeof sewa_menyewa != 'undefined')
	{
		sewa_menyewa.removeFrom(map);
	}
	
    $("input[value='sewa_menyewa]").bootstrapSwitch('state', false);
    $("input[value='info_sewa_menyewa']").prop('checked', false);
    $("input[value='info_sewa_menyewa]").prop('disabled', true);

	if(typeof sengketa != 'undefined')
	{
		sengketa.removeFrom(map);
	}
	
    $("input[value='sengketa']").bootstrapSwitch('state', false);
    $("input[value='info_sengketa']").prop('checked', false);
    $("input[value='info_sengketa']").prop('disabled', true);

	if(typeof foto_udara != 'undefined')
	{
		foto_udara.remove();
	}
	
	if(typeof marker != 'undefined')
	{
		marker.removeFrom(map);
	}
	
    $("input[value='foto_udara']").bootstrapSwitch('state', false);
    $("input[value='info_foto_udara']").prop('checked', false);
    $("input[value='info_foto_udara']").prop('disabled', true);

	if(typeof zonasi != 'undefined')
	{
		zonasi.removeFrom(map);
	}
	
    $("input[value='zonasi']").bootstrapSwitch('state', false);
    $("input[value='info_zonasi']").prop('checked', false);
    $("input[value='info_zonasi']").prop('disabled', true);

	if(typeof garis_pilar != 'undefined')
	{
		garis_pilar.removeFrom(map);
	}
	
    $("input[value='garis_pilar']").bootstrapSwitch('state', false);
    $("input[value='info_garis_pilar']").prop('checked', false);
    $("input[value='info_garis_pilar']").prop('disabled', true);

	if(typeof batas_rtk != 'undefined')
	{
		batas_rtk.removeFrom(map);
	}
	
    $("input[value='batas_rtk']").bootstrapSwitch('state', false);
    $("input[value='info_batas_rtk']").prop('checked', false);
    $("input[value='info_batas_rtk']").prop('disabled', true);


}