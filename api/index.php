<?php
if(preg_match('/android|iphone/i', $_SERVER['HTTP_USER_AGENT'])) header('location: '.($_SERVER['HTTPS'] == 'on' ? 'https' : 'http').'://view.wutnews.net/mobile.php');
?>
<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
		<meta name="renderer" content="webkit">
		<title>武汉理工大学全景校园</title>
		<link href="./assets/main.css" rel="stylesheet" type="text/css">
		<link href="./assets/index.css" rel="stylesheet" type="text/css">
	</head>

	<body>
		<header>
			<div class="head-right">
				<div class="head-choose">
					全景类型：
					<select id="dataType" style="margin-right: 18px;">
						<option selected value="baidu">街景</option>
						<option value="720yun">航拍</option>
						<option value="amap">卫星</option>
					</select><button id="btnPosition" style="margin-right: 18px;">定位</button><button id="btnFeedback">反馈</button>
					<!--数据来源：-->
					<select id="dataSource" style="display: none">
						<option selected value="baidu">百度</option>
						<option value="tencent">腾讯</option>
					</select>
				</div>
				<div class="head-button">
					<button id="btnSwitch">切换校区</button>　
					<button id="btnFull">全屏浏览</button>　
					<button id="btnAlbum">显示相册</button>　
					<button id="btnMap">查看地图</button>　
					<button id="btnMobile">手机版</button>
				</div>
			</div>
			<div class="head-logo">
				<img src="./images/logo.png" width="229" height="99" alt="">
			</div>
		</header>

		<section class="location">当前位置：&nbsp;<span id="area" data-id="0">西院</span></section>

		<section id="mapContainer"></section>

		<section class="navbar open">
			<ul>
				<li>
					<a href="#" data-lat="30.521973" data-lng="114.348782" data-name="西院">马房山校区西院</a>
				</li>
				<li>
					<a href="#" data-lat="30.518672" data-lng="114.353978" data-name="东院">马房山校区东院</a>
				</li>
				<li>
					<a href="#" data-lat="30.51378" data-lng="114.34391" data-name="鉴湖">南湖校区北院（鉴湖）</a>
				</li>
				<li>
					<a href="#" data-lat="30.508535" data-lng="114.333004" data-name="南湖">南湖校区南院</a>
				</li>
				<li>
					<a href="#" data-lat="30.606459" data-lng="114.353125" data-name="余家头">余家头校区</a>
				</li>
				<li>
					<a href="#" data-lat="30.505439" data-lng="114.34298" data-name="升升">升升公寓</a>
					<a href="#" id="pos" data-lat="0" data-lng="0" data-name="定位" style="display: none;">定位地点</a>
				</li>
			</ul>
		</section>

		<footer>
			<p>&copy; <?php echo date('Y'); ?> 武汉理工大学经纬网.　All Rights Reserved.</p>
			<p>Powered By <a href="http://token.team/" style="text-decoration: underline;color: #eee" target="_blank" id="author" title="武汉理工大学Token团队">Token团队</a></p>
		</footer>

		<div class="mask">
			<p><img src="./assets/qrcode.png" src="二维码"></p>
			<p><strong>扫一扫，在手机上浏览街景</strong></p>
			<p><a href="javascript: layer.closeAll();" style="color: #eee;" title="返回全景">返回全景</a></p>
		</div>

		<script src="//apps.bdimg.com/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="./vendor/layer.js"></script>
		<script src="./vendor/require.js"></script>
		<script src="./vendor/storage.js"></script>
		<script src="./assets/index.js?ver=20171202"></script>
	</body>

</html>