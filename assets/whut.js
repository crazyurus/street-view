var panorama = new BMap.Panorama('mapContainer');
$(document).ready(function() {

	$(".ainput").textPlaceholder();

	$("#scroll_box").textSlider({
		line: 1,
		speed: 500,
		timer: 3000
	});

	$("#slider4").responsiveSlides({
		auto: true,
		pager: false,
		nav: false,
		speed: 1000,
		namespace: "callbacks",
		before: function() {
			$('.events').append("<li>before event fired.</li>");
		},
		after: function() {
			$('.events').append("<li>after event fired.</li>");
		}
	});

	$(".side_nav a").click(function(e) {
		e.preventDefault();
		createMap($(this).data("id"));
	});

	$("#mapContainer").bind("fullscreenchange webkitfullscreenchange mozfullscreenchange", function() {
		var fullscreenEnabled = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;
		if(!fullscreenEnabled) {
			panorama.setOptions({ navigationControl:false });
			$("#mapContainer").removeAttr("style").css({ position: 'relative'});
		}
	});

	createMap('09000200011604180911073552H');
});

function createMap(id) {
	panorama.setId(id);
	panorama.setOptions({
	    navigationControl: false,
	    albumsControl: true
	});
}

var show_album = true;
function toggleAlbum() {
	show_album = !show_album;
	panorama.setOptions({ albumsControl: show_album });
	$("#btnAlbum").text(show_album ? '隐藏相册' : '显示相册');
}

function requestFullScreen() {
	var element = document.getElementById('mapContainer');
	var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	$('#mapContainer').css({position:'fixed', width: '100%', height: '100%', top: 0, left: 0, margin: 0});
	panorama.setOptions({ navigationControl: true });
	if (requestMethod) { 
		requestMethod.call(element); 
	} else if (typeof window.ActiveXObject !== "undefined") { 
		var wscript = new ActiveXObject("WScript.Shell"); 
		if (wscript !== null) { 
			wscript.SendKeys("{F11}"); 
		} 
	} 
} 

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?03e5867527c2fde768c38612cb4848bf";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();