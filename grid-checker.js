var timout = false,
	oldResize = window.onresize,
	gridChecker,
	args = [];

window.onresize = function () {
	'use strict';
	if (oldResize) {
        oldResize();
    }
    if (timout !== false) {
	    clearTimeout(timout);
	    timout = setTimeout(function () { gridChecker.apply(this, args); }, 500);
	}
};

gridChecker = function (ColumnWidth, ColumnMargin, RowHeight, InnerPadding, Target) {
	'use strict';

	var container,
		column,
		inner,
		row,
		s,
		i,
		t,
		columnNumber,
		rowNumber,
		rowContainer,
		target = document.getElementById(Target) || document.getElementsByTagName('body')[0];

	for (i = 0; i < arguments.length; i += 1) {
		args[i] = arguments[i];
	}

	ColumnWidth = ColumnWidth || 60;
	ColumnMargin = ColumnMargin || 10;
	RowHeight = RowHeight || 18;
	InnerPadding = InnerPadding || 6;

	columnNumber = parseInt(target.offsetWidth / (ColumnWidth + ColumnMargin), 10);
	rowNumber = parseInt(window.innerHeight / RowHeight, 10);
	container = document.getElementById('grid-checker');

	if (container !== null) {
		container.parentNode.removeChild(container);
	}

	s = 'height: 100% !important;';
	s += 'position: absolute  !important;';
	s += 'top: 0 !important;';
	s += 'margin: 0 !important;';
	s += 'border: none !important;';
	s += 'padding: 0 !important;';
	s += 'background-color: white !important;';
	s += 'opacity: .3 !important;';
	s += 'filter:alpha(opacity=30) !important;';
	s += 'overflow: hidden !important;';

	container = document.createElement('div');
	container.setAttribute('id', 'grid-checker');
	container.setAttribute('style', s);

	s = 'margin: 0 ' + InnerPadding + 'px  !important;';
	s += 'background-color: Gray !important;';
	s += 'height: 100% !important;';
	s += 'opacity: .4 !important;';
	s += 'filter:alpha(opacity=40) !important;';
	s += 'padding: 0 !important;';
	s += 'border: none !important;';

	inner = document.createElement('div');
	inner.setAttribute('class', 'gc-inner');
	inner.setAttribute('style', s);

	s = 'width: ' + ColumnWidth + 'px !important;';
	s += 'margin: 0 ' + ColumnMargin + 'px !important;';
	s += 'padding: 0 !important;';
	s += 'border: none !important;';
	s += 'height: 100% !important;';
	s += 'background-color: pink !important;';
	s += 'float: left !important;';

	column = document.createElement('div');
	column.className = "gc-column";
	column.setAttribute('style', s);
	column.appendChild(inner.cloneNode(true));

	for (i = 0; i < columnNumber; i += 1) {
		container.appendChild(column.cloneNode(true));
	}

	s = "position: absolute !important;";
	s += 'width: 100% !important;';
	s += 'opacity: .2 !important;';
	s += 'margin: 0 !important;';
	s += 'padding: 0 !important;';
	s += 'border: none !important;';
	s += 'filter:alpha(opacity=20) !important;';

	rowContainer = document.createElement('div');
	rowContainer.setAttribute('class', 'gc-row-container');
	rowContainer.setAttribute('style', s);

	s = 'height: ' + RowHeight + 'px !important;';
	s += 'margin: 0 !important;';
	s += 'padding: 0 !important;';
	s += 'border: none !important;';

	row = document.createElement('div');
	row.className = "gc-row";

	for (i = 0; i < rowNumber; i += 1) {
		t = s + 'background-color: ';
		t += (i % 2 === 0) ? 'blue' : 'white';
		t += ' !important;';
		row.setAttribute('style', t);
		rowContainer.appendChild(row.cloneNode(true));
	}

	container.appendChild(rowContainer);
	target.appendChild(container);

};