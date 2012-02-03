var containerID = "grid-checker",
    fixtureID = "qunit-fixture",
    columnClass = "gc-column",
    rowClass = "gc-row";

module("Main", {
    setup: function () {
        'use strict';
    },
    teardown: function () {
        'use strict';

        /*  Clean up container elements that 
            might have been appended outside
            of the fixture */

        var element = document.getElementById(containerID);
        element.parentNode.removeChild(element);
    }
});

test("Grid checker element is generated.", function () {
    'use strict';
    gridChecker();
    var element = document.getElementById(containerID);
    ok(element, "Expect the " + containerID + " element to exist.");
});

test("Grid checker element is appended to specified target.", function () {
    'use strict';
    gridChecker(0, 0, 0, 0, fixtureID);
    var element = document.getElementById(containerID);
    equals(element.parentNode.getAttribute('id'), fixtureID, "Expect the ID of the parent to be " + fixtureID);
});

test("Generated width of columns is correct.", function () {
    'use strict';
    var testWidth = 102,
        actuWidth,
        element;
    gridChecker(testWidth, 0, 0, 0, fixtureID);
    element = document.getElementsByClassName(columnClass)[0];
    actuWidth = (element) ? element.style.width : '0px';
    equals(actuWidth, testWidth + "px", "Expect the width of the column to be " + testWidth);
});

test("Generated width of columns plus margins is correct.", function () {
    'use strict';
    var testWidth = 102,
        testMargin = 3,
        offsetWidth = 108,
        actuWidth,
        element;
    gridChecker(testWidth, testMargin, 0, 0, fixtureID);
    element = document.getElementsByClassName(columnClass)[0];
    actuWidth = (element) ? element.offsetWidth : 0;
    actuWidth += parseInt(element.style.marginRight, 10) + parseInt(element.style.marginLeft, 10);
    equals(actuWidth, offsetWidth, "Expect the width of the column plus margin to be " + offsetWidth);
});

test("Correct number of columns generated for target width", function () {
    'use strict';
    var testWidth = 102,
        testMargin = 3,
        columns,
        fixture;

    fixture = document.getElementById(fixtureID);
    fixture.setAttribute('style', 'width:550px');

    gridChecker(testWidth, testMargin, 0, 0, fixtureID);
    columns = document.getElementsByClassName(columnClass);
    equals(columns.length, 5, "Expect 5 columns for a container of width 550px");
});

test("Correct height of rows", function () {
    'use strict';
    var testRows = 18,
        rows;

    gridChecker(102, 3, testRows, 0, fixtureID);
    rows = document.getElementsByClassName(rowClass);
    equals(rows[0].offsetHeight, 18, "Expect the height to be 18");
});