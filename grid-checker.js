var gridChecker = function (ColumnWidth, ColumnMargin, LineHeight, InnerPadding, Target) {
	'use strict';

	var container,
		column,
		inner,
		line,
		s,
		i,
		t,
		columnNumber,
		lineNumber,
		target = document.getElementById(Target) || document.getElementsByTagName('body')[0];

	columnNumber = parseInt(target.offsetWidth / (ColumnWidth + ColumnMargin), 10);
	lineNumber = parseInt(window.innerHeight / LineHeight, 10);

	s = 'height: 100%;';
	s += 'position: absolute;';
	s += 'top: 0;';
	s += 'background-color: white;';
	s += 'opacity: .3;';
	s += 'filter:alpha(opacity=30);';
	s += 'overflow: hidden';

	container = document.createElement('div');
	container.setAttribute('id', 'grid-checker');
	container.setAttribute('style', s);

	s = 'margin: 0 ' + InnerPadding + 'px;';
	s += 'background-color: Gray;';
	s += 'height: 100%;';
	s += 'opacity: .4;';
	s += 'filter:alpha(opacity=40);';

	inner = document.createElement('div');
	inner.setAttribute('class', 'gc-inner');
	inner.setAttribute('style', s);

	s = 'width: ' + ColumnWidth + 'px;';
	s += 'margin: 0 ' + ColumnMargin + 'px;';
	s += 'height: 100%;';
	s += 'background-color: pink;';
	s += 'float: left;';

	column = document.createElement('div');
	column.className = "gc-column";
	column.setAttribute('style', s);
	column.appendChild(inner.cloneNode(true));

	for (i = 0; i < columnNumber; i += 1) {
		container.appendChild(column.cloneNode(true));
	}

	s = "position: absolute;";
	s += 'width: 100%;';
	s += 'height: ' + LineHeight + 'px;';
	s += 'z-index: 90;';
	s += 'opacity: .2;';
	s += 'filter:alpha(opacity=20);';

	for (i = 0; i < lineNumber; i += 1) {
		line = document.createElement('div');
		line.className = "gc-row";
		t = s;
		t += 'top: ' + (i * LineHeight) + 'px;';
		t += 'background-color: ';
		t += (i % 2 === 0) ? 'blue' : 'white';
		t += ';';
		line.setAttribute('style', t);
		container.appendChild(line.cloneNode(true));
	}

	target.appendChild(container);
};