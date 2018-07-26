<?php
if($_SERVER['HTTPS'] != 'on') header('location: https://view.wutnews.net/mobile.php');
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="renderer" content="webkit">
    <title>全景校园</title>
	<link rel="stylesheet" href="./mobile/main.css">
    <script type="text/javascript" src="//api.map.baidu.com/api?v=2.0&ak=kZy544isO4fZ8nF6x5YqbzX2OHzS1MvF&s=1"></script>
</head>
<body>
<header>
	<p>武汉理工大学全景校园</p>
	<p>Token团队</p>
	<p id="area"></p>
</header>
<div id="container"></div>
<footer>
	<div>
        <div data-id="09000200011604180911073552H">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_xy.png)"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>西院</div>
                    </div>
                </div>
            </div>
        </div>
        <div data-id="09000200011604191043080622H">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_dy.png);"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>东院</div>
                    </div>
                </div>
            </div>
        </div>
        <div data-id="09000200011604171104132232H">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_jh.png)"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>鉴湖</div>
                    </div>
                </div>
            </div>
        </div>
        <div data-id="09000200011604131200153759H">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_nh.png)"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>南湖</div>
                    </div>
                </div>
            </div>
        </div>
        <div data-id="09000200011604131144533889Q">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_yq.png);"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>余家头</div>
                    </div>
                </div>
            </div>
        </div>
        <div data-id="09000200011604131045243479H">
            <div class="image" style="background-image: url(./mobile/image/main_area_pic_ss.png);"></div>
            <div class="caption">
                <div>
                    <div>
                        <div>升升公寓</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
<script src="//apps.bdimg.com/libs/zepto/1.1.4/zepto.min.js"></script>
<script src="./assets/mobile.js"></script>
</body>
</html>