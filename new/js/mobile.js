var paths = {
    "lib/baidu": "//api.map.baidu.com/api?v=2.0&ak=PBUXSyTG4eaYzoUcghMrkkDqfGeoFZHu&s=1&callback=callback",
    "lib/amap": "//webapi.amap.com/maps?v=1.3&key=2ee8cce8b08a27705bac1ffa38a6097c&plugin=AMap.Scale&callback=callback"
}, current;

require.config({
    paths: paths
});

// +----------------------
// | 状态定义区域
// | 定义页面内所需各组件状态
// | 便于事件间共享组件状态
// +----------------------

// 面板是否关闭
var panelClosed = true;
let panelAnimationStatus = false;

// 面板位置状态
var currentBottom = 165;
var nextBottom = 0;


window.onload = function() {
    // +----------------------
    // | 初始化区域
    // | 进行页面加载的初始化操作
    // | 以及相关的事件绑定
    // +----------------------

    // 去除微信/QQ内下拉橡皮筋效果
    // 解决掌理内页面overflow无效的BUG
    // 总结：垃圾X5
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, {
        passive: false      // 兼容iOS
    });

    // 配置全景类型
    var map, type = storage.has('type') ? storage.get('type') : "amap";

    // 初始化Copyright中的年份标识
    let date = new Date();
    document.getElementById("copyright-year").innerHTML = date.getFullYear();

    // 可抽拉面板初始化动画
    panelToggleAnimation(0.6, currentBottom);

    // 允许鼠标对可抽拉面板的手柄进行拖动操作
    dragPanel(document.getElementById("panel"));

    // Tab栏部分逻辑
    let navButton = document.getElementsByClassName("nav-button");
    for (let i = 0; i < navButton.length; i++) {
        // 注册每个Tab按钮的点击事件（没有jQuery/Zepto就是麻烦）
        navButton[i].addEventListener("click", function(event) {
            if (map !== undefined) {
                let targetElement = event.target || event.srcElement;

                // 解决点击到文字后，只能获取到文字节点的问题
                if (targetElement.tagName === "SPAN") {
                    targetElement = targetElement.parentNode;
                }

                // 取消所有节点的激活状态
                for (let j = 0; j < navButton.length; j++) {
                    navButton[j].className = "nav-button";
                }

                // 对当前点击节点设置激活状态
                targetElement.className = "nav-button active";

                // 移动对应的高亮条到节点下方
                document.getElementById("selection-indicator").style = "left: " + (i * 100) + "px";

                // 开始切换到相应地点
                let index = this.dataset.order;

                // 切换校区
                map.create(map.area[index]);
            }
        });
    }

    // 初始化全景
    init(type);

    // 监听主框架触摸 / 点击事件，如果该事件发生时可抽拉面板处于打开状态，则自动关闭
    autoClosePanel();

    // 监听全景模式切换
    for (let i = 0; i < document.getElementsByClassName("select-location").length; i++) {
        let currentNode = document.getElementsByClassName("select-location")[i];

        currentNode.addEventListener("click", switchMode);
    }

    // 监听反馈按钮点击事件
    document.getElementById("feedback-button").addEventListener("click", function() { location.href = "https://jq.qq.com/?_wv=1027&k=5NCfGYB" });

    // 监听定位按钮点击事件
    document.getElementById("function-panel").addEventListener("click", function () {
        document.getElementsByClassName("function-panel-button")[0].className += " loading";
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            map.position.set.bind(map)(lng, lat);
        }, function() {
            alert('定位失败');
        });
        setTimeout(function () {
            document.getElementsByClassName("function-panel-button")[0].className = "function-panel-button";
        }, 2000);
    });

    // +----------------------
    // | 函数定义区域
    // | 定义可复用的各方法
    // +----------------------

    // 初始化各个全景模式
    function init(value) {
        setModeButton(value);

        // TODO: 待解决问题——高德地图在切换到其他地图后不能切换回高德地图
        // 目前暂时使用刷新的方式解决
        if (value === "amap" && current !== undefined) {
            storage.set("type", "amap");
            location.reload();
        }

        current = value;

        if(paths["lib/" + value]) {
            require([paths["lib/" + value]], function() {
                window.callback = function() {
                    choose(current);
                }
            });
        }
        else choose(value);

        function choose(value) {
            require(['/map/' + value + '.js'], function(_map) {
                var element = 'main-frame';
                var $element = document.getElementById(element);
                $element.innerHTML = '';
                $element.style = '';
                $element.className = '';
                map = _map;
                map.init(element, document.getElementById("area").dataset.id);
                storage.set("type", value);
            });
        }
    }

    // 切换模式
    function switchMode(event) {
        let currentNode = event.target || event.srcElement;
        while (currentNode.className !== "select-location") {
            currentNode = currentNode.parentNode;
        }
        init(currentNode.id);
        if (currentNode.id === "baidu") {
            autoClosePanel();
        }
    }

    // 设置当前模式按钮高亮
    function setModeButton(type) {
        // 取消高亮
        let button = document.getElementsByClassName("select-location");
        for (let i = 0; i < button.length; i++) {
            button[i].className = "select-location";
        }
        // 设置高亮
        document.getElementById(type).className += " active"
    }

    // 自动关闭面板
    function autoClosePanel(currentMode) {
        var listenInterval = setInterval(function () {
            try {
                document.querySelector("#main-frame > div:nth-child(3) > div:nth-child(1)").addEventListener("touchstart", function() {
                    panelToggleAnimation(0.7, currentBottom);
                });
                clearInterval(listenInterval);
            } catch (e) { }
        }, 100);
    }

    // 面板抽拉动画
    // panelAnimationStatus为当前动画状态，避免多次触发造成动画抽动
    // panelClosed为面板是否完全关闭状态，以实现面板的开/关
    function panelToggleAnimation(time, initializationHeight) {
        if (panelAnimationStatus === false) {
            panelAnimationStatus = true;
            let animationCounter = panelClosed ? 0 : time;

            // 动画持续时间
            const animationTime = time;

            let panelInitialization = setInterval(function() {
                if (panelClosed) animationCounter += 0.01;
                else animationCounter -= 0.01;

                let targetHeight = EasingFunctions.easeInOutQuint(animationCounter / animationTime) * initializationHeight;

                currentBottom = targetHeight;

                if (animationCounter.toFixed(2) === animationTime.toFixed(2)
                    || animationCounter.toFixed(2) <= 0) {
                    clearInterval(panelInitialization);
                    panelAnimationStatus = false;
                    panelClosed = !panelClosed;
                }
                else document.getElementById("panel").style = "bottom: " + (targetHeight.toFixed(5) - 260) + "px;"
            }, 10);
        }
    }
}

// +----------------------
// | 外部依赖区域
// | 定义函数所需的外部依赖
// | 主要以工具为主
// +----------------------

// easeing函数库，使动画尽可能平滑
EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}



// +----------------------
// | 单次方法区域
// | 定义不常使用但较为复杂的方法
// +----------------------

// 使得面板可拖动
function dragPanel(handle) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    handle.ontouchstart = touchDown;


    function touchDown(e) {
        if (e.touches.length === 1) {
            e = e || window.event;

            pos3 = parseFloat(e.touches[0].clientX);
            pos4 = parseFloat(e.touches[0].clientY);

            document.ontouchend = closeDragElement;

            document.ontouchmove = elementDragTouch;
        }
    }

    function elementDragTouch(e) {
        if (e.touches.length === 1) {
            e = e || window.event;

            pos1 = parseFloat(pos3 - e.touches[0].clientX);
            pos2 = parseFloat(pos4 - e.touches[0].clientY);
            pos3 = parseFloat(e.touches[0].clientX);
            pos4 = parseFloat(e.touches[0].clientY);

            elementMove();
        }
    }

    function elementMove() {
        nextBottom = currentBottom + pos2;

        // 避免超出限制
        if (currentBottom > 260 || nextBottom > 260) nextBottom = 260;
        if (currentBottom < 0 || nextBottom < 0) nextBottom = 0;

        panelClosed = (currentBottom < 30 || nextBottom < 30) ;

        document.getElementById("panel").style = "bottom: " + (magnet(nextBottom) - 260) + "px;"

        currentBottom = nextBottom;

        // 增加分隔线处磁吸效果
        function magnet(val) {
            if (val > 155 && val < 175) return 165;
            else return val;
        }
    }

    function closeDragElement() {
        document.ontouchstart = null;
        document.ontouchmove = null;
    }
}
