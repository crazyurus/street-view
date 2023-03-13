var paths = {
    "lib/baidu": "//api.map.baidu.com/api?v=2.0&ak=kZy544isO4fZ8nF6x5YqbzX2OHzS1MvF&s=1&callback=callback",
    "lib/amap": "//webapi.amap.com/maps?v=1.3&key=5266a04c8f939b3e846a522e110133fa&plugin=AMap.Scale&callback=callback"
}, current;

require.config({
    paths: paths
});

window.alert = layer.msg;

$(document).ready(function() {
    let date = new Date();
    $("#copyright-year").text(date.getFullYear());

    var map, type = storage.has('type') ? storage.get('type') : "720yun";

    if (type === "baidu") {
        require(["/vendor/touch-emulator.js"], function(TouchEmulator) {
            TouchEmulator();
        })
        Object.defineProperty(navigator, "userAgent", {writable: true});
        navigator.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12H143";
    } else {
        $("#btnAlbum").hide();
    }

    init(type);

    $("[value=" + type + "]").attr("disabled", "disabled");

    $("#dataType").val(type);

    $(".navbar a").click(function(e) {
        var index = $(this).parent().index();
        e.preventDefault();
        $("#area").text($(this).data("name")).data("id", index);
        map.create(map.area[index]);
    });

    $("#btnPosition").click(function() {
        var $this = $(this);
        if(window.navigator.geolocation) {
            $this.prop('disabled', true).text('定位中');
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;

                console.log(lat, lng);

                map.position.set.bind(map)(lng, lat);
                $("#area").text('定位').data("id", 6);
                $this.prop('disabled', false).text('定位');
            }, function() {
                $this.prop('disabled', false).text('定位');
                alert('定位失败');
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

    $(".changeType").on("click", function() {
        storage.set('type', this.value);
        location.reload();
    });

    function init(value) {
        current = value;
        if(paths['lib/' + value]) {
            require([paths['lib/' + value]], function() {
                window.callback = function() {
                    choose(current);
                }
            });
        }
        else choose(value);
    }

    function choose(value) {
        require(['/map/' + value + '.js'], function(_map) {
            var element = 'mapContainer';
            var $element = document.getElementById(element);
            $element.innerHTML = '';
            $element.style = '';
            $element.className = '';
            map = _map;
            map.init(element, $("#area").data("id"));
        });
    }
});
