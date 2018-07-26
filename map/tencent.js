define(function() {
	return {
		panorama: undefined,
		init: function(element, index) {
			index = index || 0;
			this.panorama = new qq.maps.Panorama(element, {
				addressControl: false,
		        addressControlOptions: {
		            position: qq.maps.ControlPosition.BOTTOM_LEFT
		        },
		        disableCompass: !this.controls.navigation.status
			});
			this.create(this.area[index]);
		},
		create: function(id) {
			this.panorama.setPano(id);
		},
		controls: {
			navigation: {
				status: true,
				show: function() {
					this.controls.navigation.status = true;
					this.panorama.setOptions({ 
						disableCompass: false 
					});
				},
				hide: function() {
					this.controls.navigation.status = false;
					this.panorama.setOptions({ 
						disableCompass: true 
					});
				},
				toggle: function() {
					this.controls.navigation.status = !this.controls.navigation.status;
					this.panorama.setOptions({ 
						disableCompass: !this.controls.navigation.status 
					});
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
		area: ['10141019131025103432500', '10141114121023105255100', '10141114121023130822300', '10141114121023132150100', '10141013121230121701200', '10141019131023115300200']
	};
});