// modified from move37

var
		stop1 = document.getElementById('stop1'),
    	stop2 = document.getElementById('stop2'),
    	stop3 = document.getElementById('stop3'),
    	stop4 = document.getElementById('stop4'),
    	stop5 = document.getElementById('stop5'),
    	stop6 = document.getElementById('stop6'),
    	gradientTL,
    	drawlinesTL,
    	maskPaths = document.querySelectorAll('#bg-mask path');
    	//maskPaths = []

function initGradient() {
	gradientTL = new TimelineMax({paused: true, repeat: -1});
	gradientTL
		.fromTo(stop1, 15,
			{
				attr:{offset:0},
			},
			{
				attr:{offset:-4},
				ease:Linear.easeNone
			},
			"0"
		)
		.fromTo(stop2, 15,
			{
				attr:{offset:1}
			},
			{
				attr:{offset:-3},
				ease:Linear.easeNone
			},
			"0"
		)
		.fromTo(stop3, 15,
			{
				attr:{offset:2}
			},
			{
				attr:{offset:-2},
				ease:Linear.easeNone
			},
			"0"
		)
		.fromTo(stop4, 15,
			{
				attr:{offset:3}
			},
			{
				attr:{offset:-1},
				ease:Linear.easeNone
			},
			"0"
		)
		.fromTo(stop5, 15,
			{
				attr:{offset:4}
			},
			{
				attr:{offset:1},
				ease:Linear.easeNone
			},
			"0"
		)
		.fromTo(stop6, 15,
			{
				attr:{offset:5}
			},
			{
				attr:{offset:0},
				ease:Linear.easeNone
			},
			"0"
		);

	maskPaths = Array.prototype.slice.call(maskPaths, 0);

	drawlinesTL = new TimelineMax({paused: true, repeat: -1, repeatDelay: 0.8});
	drawlinesTL
		.yoyo(true)
		.fromTo(maskPaths, 1,
			{	
				"stroke-dasharray": 350,

				"stroke-dashoffset":10,
			},
			{
				"stroke-dasharray": 160,

				"stroke-dashoffset":30,
				ease: Quad.easeInOut,
			},
		)	
	drawlinesTL.play().timeScale(0.3);
	gradientTL.play();
}

initGradient();
