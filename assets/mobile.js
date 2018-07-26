var panorama = new BMap.Panorama('container');
$(document).ready(function() {
	if(window.navigator.geolocation) { 
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			var point = new BMap.Point(lng, lat);

			var convertor = new BMap.Convertor();
			convertor.translate([point], 1, 5, function(data) {
				lat = data.points[0].lat;
	            lng = data.points[0].lng;

				panorama.setPosition(new BMap.Point(lng, lat));
				panorama.setOptions({
				    navigationControl: false
				});
			});
		}); 
    }

	$("footer > div > div").click(function() {
		var id = $(this).data("id");
		$("footer > div > div").removeClass('active');
		$(this).addClass('active');
		$("#area").text('当前校区：' + $(this).find('.caption').text());
		location.href = '#' + id;
		panorama.setId(id);
	});
});	