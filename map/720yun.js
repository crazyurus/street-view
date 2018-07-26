define(function() {
	return {
		panorama: undefined,
		init: function(element, index) {
			var container = document.getElementById(element);
			index = index || 0;
			this.panorama = document.createElement('iframe');
			container.appendChild(this.panorama);
			this.create(this.area[index]);
		},
		create: function(id) {
			this.panorama.src = '//720yun.com/t/62422wak94i?pano_id=' + id;
		},
		position: {
			set: function(lng, lat) {
				alert('找不到定位地点');
			}
		},
		controls: {
			navigation: {
				status: false,
				show: function() {
					return;
				},
				hide: function() {
					return;
				},
				toggle: function() {
					return;
				}
			},
			album: {
				status: false,
				show: function() {
					alert('暂不支持此方法');
				},
				hide: function() {
					alert('暂不支持此方法');
				},
				toggle: function() {
					alert('暂不支持此方法');
				}
			}
		},
		area: ['56914', '56945', '56888', '56889', '59148', '57005']
	};
});