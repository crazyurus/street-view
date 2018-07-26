define(function() {
	return {
		panorama: undefined,
		init: function(element, index) {
			index = index || 0;
			this.panorama = new BMap.Panorama(element, {
			    navigationControl: this.controls.navigation.status,
			    albumsControl: this.controls.album.status
			});
			this.create(this.area[index]);
		},
		create: function(id) {
			this.panorama.setId(id);
		},
		position: {
			set: function(lng, lat) {
				var point = new BMap.Point(lng, lat);
				var that = this;

				var convertor = new BMap.Convertor();
				convertor.translate([point], 1, 5, function(data) {
					that.panorama.setPosition(new BMap.Point(data.points[0].lng, data.points[0].lat));
				});
			}
		},
		controls: {
			navigation: {
				status: false,
				show: function() {
					this.controls.navigation.status = true;
					this.panorama.setOptions({ 
						navigationControl: true 
					});
				},
				hide: function() {
					this.controls.navigation.status = false;
					this.panorama.setOptions({ 
						navigationControl: false 
					});
				},
				toggle: function() {
					this.controls.navigation.status = !this.controls.navigation.status;
					this.panorama.setOptions({ 
						navigationControl: this.controls.navigation.status 
					});
				}
			},
			album: {
				status: false,
				show: function() {
					this.controls.album.status = true;
					this.panorama.setOptions({ 
						albumsControl: true
					});
				},
				hide: function() {
					this.controls.album.status = false;
					this.panorama.setOptions({ 
						albumsControl: false 
					});
				},
				toggle: function() {
					this.controls.album.status = !this.controls.album.status;
					this.panorama.setOptions({ 
						albumsControl: this.controls.album.status 
					});
				}
			}
		},
		area: ['09000200011604180911073552H', '09000200011604191043080622H', '09000200011604171104132232H', '09000200011604131200153759H', '09000200011604131144533889Q', '09000200011604131045243479H']
	};
});