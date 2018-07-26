var paths = {
	"lib/baidu": "//api.map.baidu.com/api?v=2.0&ak=kZy544isO4fZ8nF6x5YqbzX2OHzS1MvF&s=1&callback=callback",
	"lib/tencent": "//map.qq.com/api/js?v=2.exp&libraries=convertor&key=527BZ-YISWP-L5UDG-LYWEM-2MNE2-Q4BZY&callback=callback",
    "lib/amap": "//webapi.amap.com/maps?v=1.3&key=5266a04c8f939b3e846a522e110133fa&plugin=AMap.Scale&callback=callback"　　　　
}, current;
require.config({　　　　
    paths: paths　
});
window.alert = layer.msg;

layer.tips('武汉理工大学Token团队', '#author', {
	tips: 1,
	time: 10000
});

$(document).ready(function() {

	var map, type = storage.has('type') ? storage.get('type') : "baidu";
	init(type);
	$("#dataType").val(type);

	$(".navbar a").click(function(e) {
		var index = $(this).parent().index();
		e.preventDefault();
		$("#area").text($(this).data("name")).data("id", index);
		map.create(map.area[index]);
	});

	setTimeout(function () {
		if ($('#PanoramaFlashWraperTANGRAM__i').text() === '您未安装Flash Player播放器或者版本过低') {
			layer.alert('浏览校园街景前需要允许浏览器运行Flash（浏览器右上角会提示）', {
				icon: 5,
				closeBtn: false,
				btn: ['运行Flash'],
				yes: function () {
					location.href = 'https://get.adobe.com/cn/flashplayer/';
				}
			});
		}
	}, 2500);

	//$(window).resize(function() {
		//$("#mapContainer").css({ height: $(window).height() - 180 });
	//});

	$("#btnPosition").click(function() {
		var $this = $(this);
		if(window.navigator.geolocation) {
			$this.prop('disabled', true).text('定位中');
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				
				map.position.set.bind(map)(lng, lat);
				$("#area").text('定位').data("id", 6);
				$this.prop('disabled', false).text('定位');
				$.post('https://web.wutnews.net/room/index/position', {
					longitude: lng,
					latitude: lat,
					type: 'gps'
				}, function(result) {
					$("#pos").data("lng", result.data.longitude).data("lat", result.data.latitude);
				});
			}, function() {
				$this.prop('disabled', false).text('定位');
				if(location.protocol != 'https:') {
					layer.open({
		  				title: '定位失败', 
		  				icon: 0,
		  				content: '由于正在使用HTTP协议访问网站，浏览器没有开放定位权限，请使用更安全的协议',
						btn: ['取消', '使用HTTPS协议'],
						btn2: function() {
							location.replace('https://view.wutnews.net/');
						}
					});
				}
				else alert('定位失败');
			}); 
	    }
	    else alert('暂不支持定位');
	});

	$("#mapContainer").bind("fullscreenchange webkitfullscreenchange mozfullscreenchange", function() {
		var fullscreenEnabled = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;
		if(!fullscreenEnabled) {
			map.controls.navigation.hide.call(map);
			$("#mapContainer").removeAttr("style").css({ position: 'relative'});
		}
	});

	$("#btnSwitch").click(function() {
		var $navbar = $(".navbar");

		if($navbar.hasClass('open')) $navbar.removeClass('open');
		else $navbar.addClass('open');
	});

	$("#btnFull").click(function() {
		var element = document.getElementById('mapContainer');
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
		$('#mapContainer').css({position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, margin: 0, 'z-index': 9999});
		map.controls.navigation.show.call(map);
		if (requestMethod) requestMethod.call(element); 
		else if (typeof window.ActiveXObject !== "undefined") { 
			var wscript = new ActiveXObject("WScript.Shell"); 
			if (wscript !== null) wscript.SendKeys("{F11}"); 
		}
	});

	$("#btnAlbum").click(function() {
		map.controls.album.toggle.call(map);
		$("#btnAlbum").text(map.controls.album.status ? '隐藏相册' : '显示相册');
	});

	$("#btnFeedback").click(function() {
		window.open('https://support.qq.com/products/23796');
	});

	$("#btnMobile").click(function() {
		layer.open({
			type: 1,
			title: false,
			skin: 'layer-mask',
			closeBtn: false,
			shade: 0.8,
			id: 'layMobile',
			resize: false,
			btnAlign: 'c',
			moveType: 1,
			content: $('.mask').html()
		});
	});

	$("#btnMap").click(function() {
		var id = $("#area").data("id");
		var $item = $(".navbar a").eq(id);
		var title = id == 6 ? $item.text() : '武汉理工大学' + $item.text();
		var url = '//ditu.amap.com/regeo?lng=' + $item.data('lng') + '&lat=' + $item.data('lat') + '&src=wutnews&name=' + title;
		layer.open({
			type: 2,
			title: title + "地图",
			maxmin: true,
			scrollbar: true,
			shadeClose: true,
			area : ['88%', '88%'],
			content: url,
			success: function() {
				$(".layui-layer-max").attr("title", "在新窗口查看").attr("href", url).attr("target", "_blank").off('click');
			}
		});
	});

	$("#dataTypedataSource").change(function() {
		switch(this.value) {
			case "street":
				$("#dataSource").html('<option selected value="baidu">百度</option><option value="tencent">腾讯</option>');
				break;
			case "aerial":
				$("#dataSource").html('<option selected value="720yun">极鹿</option>');
				break;
			case "satellite":
				$("#dataSource").html('<option selected value="amap">高德</option><option disabled value="google">谷歌</option>');
				init("amap");
				break;
		}
	});

	$("#dataType").change(function() {
		init(this.value);
	});

	function init(value) {
		current = value;
		if(paths['lib/' + value]) {
			require(['lib/' + value], function() {
				window.callback = function() {
					choose(current);
				}
			});
		}
		else choose(value);
	}

	function choose(value) {
		require(['map/' + value], function(_map) {
			var element = 'mapContainer';
			var $element = document.getElementById(element);
			$element.innerHTML = '';
			$element.style = '';
			map = _map;
			map.init(element, $("#area").data("id"));
			storage.set('type', value);
		});
	}
});

var _hmt = _hmt || [];
require(["https://hm.baidu.com/hm.js?03e5867527c2fde768c38612cb4848bf"]);