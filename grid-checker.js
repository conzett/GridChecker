var timeOut,
	oldResize = window.onresize,
	gridChecker,
	gridsArg,
	targetArg;

window.onresize = function () {
	'use strict';
	if (oldResize) {
        oldResize();
    }
    if (timeOut != null) {
	    clearTimeout(timeOut);
	}
	timeOut = setTimeout(function () {gridChecker(gridsArg, targetArg)}, 250);
};

gridChecker = function (Grids, Target) {
	'use strict';

	/*  Module

		width : 102px,
		height : 100%,
		margin : "0 3px",
		color : #336699
	*/

	var container,
		i,
		j,
		containerStyle,
		innerContainerStyle,
		parseMargin,
		generate,
		target = document.getElementById(Target) || document.getElementsByTagName('body')[0],
		targetWidth = target.offsetWidth;

	Grids = Grids || [];
	gridsArg = Grids;
	targetArg = Target;

	parseMargin = function (Margin) {
		var a = Margin.split(" ");

		for (i = 0; i < 4; i += 1) {
			a[i] = a[i] || a[i - 2] || a[i - 1];
		}

		return a;
	};

	generate = function (Module, Index) {
		var m = parseMargin(Module.margin),
			moduleWidth = Module.width,
			moduleHeight = Module.height,
			moduleColor = Module.color || '#336699',
			offsetWidth,
			offsetHeight,
			module,
			x,
			y,
			total,
			style,
			container;

		offsetWidth = (parseInt(moduleWidth, 10) + parseInt(m[1], 10) + parseInt(m[3], 10));
		offsetHeight = (parseInt(moduleHeight, 10) + parseInt(m[0], 10) + parseInt(m[2], 10));

		x = parseInt(targetWidth / offsetWidth, 10);
		y = (offsetHeight) ? parseInt(window.innerHeight / offsetHeight, 10) + 1 : 1;
		total = x * y;

		container = document.createElement('div');
		container.setAttribute('class', 'gc-grid-' + Index);
		container.setAttribute('style', innerContainerStyle);

		style = 'margin: ' + m[0] + " " + m[1] + " " + m[2] + " " + m[3] + ' !important;';
		style += 'background-color: ' + moduleColor + ' !important;';
		style += 'height: 100% !important;';
		style += 'width: ' + moduleWidth + ' !important;';
		style += 'padding: 0 !important;';
		style += 'border: none !important;';
		style += 'float: left !important;';

		if (moduleHeight) {
			style += 'height: ' + moduleHeight + ' !important;';
		}

		for (i = 0; i < total; i += 1) {
			module = document.createElement('div');
			module.className = "gc-module-" + Index;
			module.setAttribute('style', style);
			container.appendChild(module.cloneNode(true));
		}

		return container;
	};

	containerStyle = 'margin: 0 !important; ';
	containerStyle += 'border: none !important; ';
	containerStyle += 'width: ' + targetWidth + 'px !important; ';
	containerStyle += 'padding: 0 !important; ';
	containerStyle += 'opacity: .7 !important; ';
	containerStyle += 'filter:alpha(opacity=70) !important; ';
	containerStyle += 'overflow: hidden !important; ';

	innerContainerStyle = containerStyle + 'height: 100% !important; ';
	innerContainerStyle += 'position: absolute !important; ';
	innerContainerStyle += 'top: 0 !important; ';

	container = document.getElementById('grid-checker');

	if (container !== null) {
		container.parentNode.removeChild(container);
	}

	container = document.createElement('div');
	container.setAttribute('id', 'grid-checker');
	container.setAttribute('style', containerStyle);

	for (j = 0; j < Grids.length; j += 1) {
		container.appendChild((generate(Grids[j], j + 1)).cloneNode(true));
	}

	target.appendChild(container);
};