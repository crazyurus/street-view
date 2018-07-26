$(document).ready(function() {
	if(window.navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			$.post("location.php", {
	            latitude: lat,
	            longitude: lng
			}, function(location) {
	            lat = location.latitude;
	            lng = location.longitude;
	            var center = new qq.maps.LatLng(lat, lng); 
	            service = new qq.maps.PanoramaService();
	            var radius;
	    		service.getPano(center, radius, function(result) {
	            	paint(result.svid);
	            });
	        });
		}); 
    }

	$("footer > div > div").click(function() {
		var id = $(this).data("id").substr(1);
		$("footer > div > div").removeClass('active');
		$(this).addClass('active');
		$("#area").text('当前校区：' + $(this).find('.caption').text());
		location.href = '#' + id;
		paint(id);
	});
});	

function paint(id) {
	container = $("#container")[0];
	pano = new qq.maps.Panorama(container, {
		pano: id,
		disableMove: false,
		addressControl: true,
		disableFullScreen: false,
		addressControlOptions: {
			position: qq.maps.ControlPosition.TOP_RIGHT
		},
		zoom: 1
	});
}