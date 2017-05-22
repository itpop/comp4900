// global.js - global variables & functions
// NoName group - Fred Yang

// dimension
var screenWidth = 1349;
var canvasInitWidth = 944;
var canvasSnapWidth = 571;

// width-height ratio
var whRatio = 1.87;

// factors
var fontFactor = 20.0;
var gridFactor = 21.0222;
var radiusFactor = 47.30;
var ovalFactor = 28.0;
var txtFactor = 37.84;

// overlap area radius
var olRadius = 3;

// Number.EPSILON not working on Safari
var EPSILON = 0.01;

/**
 * Determine if the browser is mobile based.
 * @param
 * @return. true if its mobile based browser, false otherwise.
 */
function checkMobile() {
    var val = false;
    var isAndroid = /(android)/i.test(navigator.userAgent);
    var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    var isWinMobile = /(mobile)|(WPDesktop)/i.test(navigator.userAgent);
    if (isAndroid || isIOS || isWinMobile) val = true;
    return val;
}

/**
 * Determine if the browser is iOS based.
 * @param
 * @return. true if its mobile based browser, false otherwise.
 */
function checkIOS() {
    var isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent);
    return isIOS;
}

/**
 * Determine if a string is a Json string.
 * @param
 *   str - the string to be tested
 * @return. true if its a Json string, false otherwise.
 */
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

/**
 * Capitalize the first letter.
 * @param
 *  str - the string to be converted
 * @return. 1st letter capitalized string.
 */
function firstUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize the first letter.
 * @param
 *   str - the color code
 * @return. map color code to color string.
 */
function getColor(str) {
    var color = 'white';
    if (str == '#f1f827') color = 'yellow';
    else if (str == '#424242') color = 'gray';
    else if (str == '#95ccff') color = 'blue';
    else if (str == '#ff0000') color = 'red';
    else if (str == '#000000') color = 'black';
    return color;
}
