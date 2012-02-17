var containerID = "grid-checker",
    fixtureID = "qunit-fixture",
    moduleClass = "gc-module-1",
    buttonID = "gc-button-1",
    gridID = "gc-grid-1",
    gridID2 = "gc-grid-2",
    hideButtonID = "gc-hide-all",
    showButtonID = "gc-show-all";

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
    gridChecker([], fixtureID);
    var element = document.getElementById(containerID);
    equals(element.parentNode.getAttribute('id'), fixtureID, "Expect the ID of the parent to be " + fixtureID);
});

test("Generated width of columns is correct.", function () {
    'use strict';
    var testWidth = 102,
        actuWidth,
        element,
        module = { width : "102px", margin : "0 3px"};
    gridChecker([module], fixtureID);
    element = document.getElementsByClassName(moduleClass)[0];
    actuWidth = (element) ? element.style.width : '0px';
    equals(actuWidth, testWidth + "px", "Expect the width of the column to be " + testWidth);
});

test("Generated width of columns plus margins is correct.", function () {
    'use strict';
    var offsetWidth = 108,
        actuWidth,
        element,
        module = { width : "102px", margin : "0 3px"};
    gridChecker([module], fixtureID);
    element = document.getElementsByClassName(moduleClass)[0];
    actuWidth = (element) ? element.offsetWidth : 0;
    actuWidth += parseInt(element.style.marginRight, 10) + parseInt(element.style.marginLeft, 10);
    equals(actuWidth, offsetWidth, "Expect the width of the column plus margin to be " + offsetWidth);
});

test("Correct number of columns generated for target width", function () {
    'use strict';
    var columns,
        fixture,
        module = { width : "102px", margin : "0 3px"};

    fixture = document.getElementById(fixtureID);
    fixture.setAttribute('style', 'width:550px');

    gridChecker([module], fixtureID);
    columns = document.getElementsByClassName(moduleClass);
    equals(columns.length, 5, "Expect 5 columns for a container of width 550px");
});

test("Generated height of columns is correct.", function () {
    'use strict';
    var testHeight = 90,
        actuHeight,
        element,
        module = { width : "102px", margin : "3px", height : testHeight + "px"};
    gridChecker([module], fixtureID);
    element = document.getElementsByClassName(moduleClass)[0];
    actuHeight = (element) ? element.style.height : '0px';
    equals(actuHeight, testHeight + "px", "Expect the height of the module to be " + testHeight);
});

test("Generated height of columns plus margins is correct.", function () {
    'use strict';
    var testHeight = 90,
        offsetHeight = 96,
        actuHeight,
        element,
        module = { width : "102px", margin : "3px", height : testHeight + "px"};
    gridChecker([module], fixtureID);
    element = document.getElementsByClassName(moduleClass)[0];
    actuHeight = (element) ? element.offsetHeight : 0;
    actuHeight += parseInt(element.style.marginTop, 10) + parseInt(element.style.marginBottom, 10);
    equals(actuHeight, offsetHeight, "Expect the height of the module plus margin to be " + offsetHeight);
});

test("Check for generation of buttons.", function () {
    'use strict';
    var button,
        module1 = { width : "102px", margin : "3px", height : "90px"};
    gridChecker([module1], fixtureID);
    button = document.getElementById(buttonID);
    ok((button.length !== null), "Expect one buttons the number of modules, to be generated");
});

test("Toggle the grids when the appropriate button is clicked.", function () {
    'use strict';
    var button,
        grid,
        module1 = { width : "102px", margin : "3px", height : "90px"};
    gridChecker([module1], fixtureID);
    button = document.getElementById(buttonID);
    grid = document.getElementById(gridID);
    ok((grid.style.display !== 'none'), "Expect the grid to not be initially hidden");
    button.click();
    ok((grid.style.display === 'none'), "After clicking the button expect it to be hidden");
    button.click();
    ok((grid.style.display !== 'none'), "Back to being visible again");
});

test("Grids can be specified visible or hidden on creation.", function () {
    'use strict';
    var grid,
        module1 = { width : "102px", margin : "3px", height : "90px", visible : false};
    gridChecker([module1], fixtureID);
    grid = document.getElementById(gridID);
    ok((grid.style.display === 'none'), "Expect the grid to be initially hidden");
});

test("Test hiding all grids.", function () {
    'use strict';
    var button,
        grid,
        grid2,
        module1 = { width : "102px", margin : "3px", height : "90px"},
        module2 = { width : "90px", margin : "3px", height : "90px"};
    gridChecker([module1, module2], fixtureID);
    button = document.getElementById(hideButtonID);
    grid = document.getElementById(gridID);
    grid2 = document.getElementById(gridID2);
    ok((grid.style.display !== 'none' && grid2.style.display !== 'none'), "Expect both grids to be initially visible");
    button.click();
    ok((grid.style.display === 'none' && grid2.style.display === 'none'), "After clicking the button expect them to be hidden");
});

test("Test showing all grids.", function () {
    'use strict';
    var button,
        grid,
        grid2,
        module1 = { width : "102px", margin : "3px", height : "90px", visible : false},
        module2 = { width : "90px", margin : "3px", height : "90px", visible : false};
    gridChecker([module1, module2], fixtureID);
    button = document.getElementById(showButtonID);
    grid = document.getElementById(gridID);
    grid2 = document.getElementById(gridID2);
    ok((grid.style.display === 'none' && grid2.style.display === 'none'), "Expect both grids to be initially hidden");
    button.click();
    ok((grid.style.display !== 'none' && grid2.style.display !== 'none'), "After clicking the button expect them to be visible");
});