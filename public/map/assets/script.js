
		$(document).on("click",".close-detail-rekam",function(){
			$(".detail-rekam-jejak").removeClass("open");
		})
		
		var listmarkers = [];
		var v = window.datarekamjejak;
		var y = window.id_geo;
		var t = L.Browser.mobile;
		var map = L.map("image2d", {
			attributionControl: !1,
			zoomControl: !1,
			doubleClickZoom: t,
			scrollWheelZoom: t,
			touchZoom: t,
			dragging: t,
			closePopupOnClick: !1,
			zoomSnap: 0,
			preferCanvas: !0,
			maxBoundsViscosity: 1
		});
	
		mapcountry = L.geoJSON(y, {
			style: {
				fillColor: "#222",
				weight: 1,
				opacity: 0,
				color: "#222",
				fillOpacity: 1
			}
		})
		e = 0;
		mapmarker = L.geoJSON(v, {
			pointToLayer: function(t, e) {
				return new L.marker(e,{
					icon: L.divIcon({
						className: "map-marker-icon",
						iconSize: [12.5, 20.5],
						iconAnchor: [6.5, 20.5],
						html: '<img src="'+t.properties.icon_image+'" class="small custom-marker" /><img src="map/images/marker-shadow.png" class="shadow-marker" />'
					}),
					title: t.properties.title+" ("+t.properties.year+")"
				}).bindTooltip(t.properties.title+" ("+t.properties.year+")",{offset: [0,-20.5], direction: "top"})
			},
			onEachFeature: function(i, n) {
				listmarkers.push(n);
				n.on("click", function(e) {
					detrekam = $(".detail-rekam-jejak");
					detrekam.find(".image-map img").attr("src",i.properties.image_zoom);
					detrekam.find("#title").html(i.properties.title);
					detrekam.find("#location").html(i.properties.location);
					detrekam.find("#description").html(i.properties.description);
					detrekam.find("#year").html(i.properties.year);
					$(".detail-rekam-jejak").addClass("open");
					heightTitle = detrekam.find("#title").innerHeight();
					heightMeta = detrekam.find(".meta-map").innerHeight();
					heightText = detrekam.find(".text-map").innerHeight() - 200;
					totalHeight = heightTitle + heightMeta + 40;
					heightDesc = heightText - totalHeight;
					detrekam.find("#description").css("height",heightDesc);
				}),
				e++
			}
		})
		mapbound = L.rectangle(mapcountry.getBounds(), {
			color: "#ff7800",
			weight: 1
		})
		mapoverlay = new L.imageOverlay('map/images/mapindo.png',mapcountry.getBounds())
		map.invalidateSize();
		mapmarker.addTo(map);
		mapoverlay.addTo(map);
		map.fitBounds(mapcountry.getBounds(), {
			animate: true
		}),
		L.Browser.mobile && map.setZoom(5.5, {
			animate: true
		})
		var mapviewport = L.DomUtil.create("div", "map-viewport-center");
		var mapcontainer = map.getContainer();
		mapcontainer.insertBefore(mapviewport, t.firstChild),
        L.Browser.mobile && map.setMaxBounds(mapcountry.getBounds());
		
		// jangan dihapus butuh
		// map.addEventListener('click', function(ev) {
		   // lat = ev.latlng.lat;
		   // lng = ev.latlng.lng;
		   // console.log(lng+""+lat);
		// })
		$(window).resize(function(){			
			map.fitBounds(mapcountry.getBounds(), {
				animate: true
			});
		});