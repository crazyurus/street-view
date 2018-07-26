define(function() {
	return {
		panorama: undefined,
		scale: undefined,
		init: function(element, index) {
			index = index || 0;
			this.scale = new AMap.Scale({
		        visible: false
		    });
			this.panorama = new AMap.Map(element, {
		        layers: [new AMap.TileLayer.Satellite()],
		        zoom: 19
		    });
			this.create(this.area[index]);
		},
		create: function(position) {
			var split = position.split(',');
			var lng = parseFloat(split[0]);
			var lat = parseFloat(split[1]);
			this.panorama.setCenter([lng, lat]);
		},
		position: {
			set: function(lng, lat) {
				var that = this;

				AMap.convertFrom([lng, lat], 'gps', function(status, data) {
					that.panorama.setCenter([data.locations[0].lng, data.locations[0].lat]);
				});
			}
		},
		controls: {
			navigation: {
				status: false,
				show: function() {
					this.controls.navigation.status = true;
					this.scale.show();
				},
				hide: function() {
					this.controls.navigation.status = false;
					this.scale.hide();
				},
				toggle: function() {
					this.controls.navigation.status = !this.controls.navigation.status;
					if(this.controls.navigation.status) this.scale.show();
					else this.scale.hide();
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
		area: ['114.348782,30.521973', '114.353978,30.518672', '114.34391,30.51378', '114.333004,30.508535', '114.353125,30.606459', '114.34298,30.505439']
	};
});