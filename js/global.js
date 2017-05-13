// global.js - global variables & functions
// NoName group

// dimension
var screenWidth = 1349;
var nexusWidth = 768;
var ipadWidth = 1024;
var canvasInitWidth = 944;
var canvasSnapWidth = 572;

// ratio
var nexusRatio = 0.55;
var ipadRatio = 0.67;
var proRatio = 0.90;
var whRatio = 1.87;

// factors
var fontFactor = 20;
var gridFactor = 21.0222;
var dimenFactor = 23.65;
var marginFactor = 37.84;
var strokeFactor = 189.20;
var radiusFactor = 47.30;
var ovalRadiusFactor = 28;

/**
 * Determine if the browser is mobile based.
 * @author: Fred Yang
 * @date: May 1, 2017
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
 * Determine if a string is a Json string.
 * @author: Fred Yang
 * @date: May 1, 2017
 * @param
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
