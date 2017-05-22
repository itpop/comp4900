// design.js - handle Design page
// NoName group

/**
 * Point constructor
 * @param
 *  x - x coordinate
 *  y - y coordinate
 * @return
 */
function Point(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * Get distance between 2 points
 * @param
 *  p1 - point p1
 *  p2 - point p2
 * @return - distance between p1 and p2
 */
function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

/**
 * Design playbook view model
 * @param
 * @return
 */
function DesignPlaybookViewModel () {
    var self = this;
    var c = new fabric.Canvas("canvas");
    var ctx = c.getContext("2d");

    // pattern path
    var defPath = "xml/football/defense/";
    var offPath = "xml/football/offense/";
    var defIPath = "Icons/football/defense/";
    var offIPath = "Icons/football/offense/";

    var objSelected;
    var line, cline, dLine, isDown, isCDown, isDDown;
    var lineDraw = xDraw = cDraw = rDraw = tDraw = clDraw = oDraw = textC = selection = true;
    var snapToGrid = ctrlDown = false;
    var clcVisible = true;
    var loadMenu = false;

    // Get the <span> element that closes the modal
    var closeMenu = document.getElementsByClassName("miniclose")[0];
    var canvasWrapper = document.getElementById('canvasWrapper');
    canvasWrapper.tabIndex = 1000;
    c.setWidth(canvasWrapper.clientWidth);
    c.setHeight((c.width) / whRatio);
    var grid = grid = c.width / gridFactor;

    // preload canvas ratio for mobile compatible
    var preloadRatio = c.width / canvasInitWidth;
    var circleRadius = c.width / radiusFactor;
    var dimenWidth = 2 * circleRadius;
    var strokeWidth = 0.25 * circleRadius;
    var ovalRadius = c.width / ovalFactor;
    var fontSize = c.width / fontFactor;

    var copiedObjects = new Array ();
    self.colour = ko.observable ("#ffffff");
    var editCanvas = false;
    var editCanvasId;
    var editCanvasName;
    var editCanvasInfo;
    var editCanvasItem;
    var initMenu;
    var lineLeft, lineTop;
    var dashed = arrowHead = false;
    var isMobile = checkMobile();

    // touch support set as true
    fabric.isTouchSupported = true;

    // resize the window
    $(window).resize(function () {
        setupBackground ();
        c.setWidth(canvasWrapper.clientWidth);
        c.setHeight((c.width) / whRatio);
        grid = c.width / gridFactor;
        if (snapToGrid) {
            noSnapObjectsToGrid();
            snapToGrid = true;
            snapObjectsToGrid();
        }
    });

    // add canvas listeners
    c.on({
        'object:selected': onObjectSelected,
        'object:moving': onObjectMoving,
        'before:selection:cleared': onBeforeSelectionCleared,
    });

    // close the minumenu
    closeMenu.onclick = function() {
        $("#menuModal").css("display","none");
        objSelected = null;
        initMenu = true; 
    }

    // mouse right click
    $("#canvasWrapper").mousedown(function(e){
        if(e.which == 3) { // right click
            objSelected = null;
            var objFound = false;
            var clickPoint = new fabric.Point(e.offsetX, e.offsetY);
            e.preventDefault();
            $('.menu-properties').removeClass('item-none');

            c.forEachObject(function (obj) {
                if (!objFound && obj.containsPoint(clickPoint)) {
                    objFound = true;

                    if (obj.get('type') == 'line') {
                        objSelected = addConnect(obj);
                        c.add(objSelected);
                        c.remove(obj);
                    } else {
                        objSelected = obj;
                    }
                }
            });

            if (objSelected) {
                var type = objSelected.get('type');
                //console.log('[right menu] type: ' + type);

                if (type == 'circle' || type == 'path' || type == 'i-text' 
                    || type == 'ellipse') {
                    $('.menu-properties').addClass('item-none');
                }
            }
        }
    });

    // Trigger action when the contextmenu is about to be shown
    $(document).bind("contextmenu", function (event) {
        if (objSelected) {   
            // avoid the real one
            event.preventDefault();
            
            // Show contextmenu
            $(".custom-menu").finish().toggle(100).
            
            // at the right position (mouse click)
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
            return true;
        }

        return false;
    });

    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {        
        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {            
            // Hide it
            $(".custom-menu").hide(100);
        }
    });

    // If the menu element is clicked
    $(".custom-menu li").click(function(e) {
        // set to select state
        $('#selectBtn').click();

        switch($(this).attr("data-action")) {            
            // A case for each action. Your actions here
            case "do-properties": 
                var ex = e.pageX;
                var ey = e.pageY;
                var x = ex - 200;
                var y = ey - 60;

                //if (ex > c.width + c.originX- mrWidth) {
                if (ex > 1020) {
                    x -= 200;
                }

                $("#menuModal").css("display","block");
                $('#menuModal').css({'top':y,'left':x, 'position':'absolute', 'padding':'5px'});
                $('#menuModal').draggable();

                // initialize menu
                var type = objSelected.get('type');
                var name = objSelected.get('name');
                var color = objSelected.get('stroke');
                if (!color) color = "#ffffff";
                console.log('[Load] type: ' + type + ', name: ' + name);

                /*if (type == 'circle' || type == 'path' || type == 'i-text' 
                    || type == 'ellipse') {
                    return;
                }*/

                if (name == 'solid') {
                    name = 'line';
                } else {
                    name = 'player';
                }
                //console.log('[Load] type: ' + type + ', name: ' + name + ', color: ' + color);
                $('#miniTitle').html(firstUpper(name) + ' properties');
                //$(".clColor select").val(getColor(color));
                //$(".clStyle select").val(style);
                $(".clColor option[value='" + getColor(color) + "']").prop('selected', true);

                if (name == 'player') { // players
                    $(".clStyle option[value=" + name + "]").prop('selected', true);
                    $('#dvStyle').removeClass('item-none');
                    $('#dvLocation').removeClass('item-none');
                    $('#dvLabel').removeClass('item-none');
                    $('#dvLineStyle').addClass('item-none');
                    $('#dvArrowBegin').addClass('item-none'); 
                    $('#dvArrowEnd').addClass('item-none'); 
                } else { // lines
                    $(".clLineStyle option[value=" + type + "]").prop('selected', true);
                    $('#dvLineStyle').removeClass('item-none');
                    $('#dvArrowBegin').removeClass('item-none'); 
                    $('#dvArrowEnd').removeClass('item-none');            
                    $('#dvStyle').addClass('item-none');
                    $('#dvLocation').addClass('item-none');
                    $('#dvLabel').addClass('item-none');
                }

                if (initMenu) {
                    $(".clStyle select").selectmenu('refresh');
                    $(".clLocation select").selectmenu('refresh');
                    $(".clColor select").iconselectmenu('refresh', true);
                    $(".clLineStyle select").iconselectmenu('refresh', true);
                    $(".clArrowBegin select").iconselectmenu('refresh');
                    $(".clArrowEnd select").iconselectmenu('refresh');
                    $('#labelName').html('');
                }

                break;
            case "do-delete":
                if (objSelected.get('name') == 'curve') {
                    deleteCurveLine(objSelected);
                } else {
                    c.remove(objSelected);
                }

                objSelected = null;
                break;
        }
      
        // Hide it after the action was triggered
        $(".custom-menu").hide(100);
    });

    // color select
    $("#elementColor")
        .iconselectmenu({
            change: function(event, ui) { 
                if (objSelected) {
                    //console.log(this.value);
                    if (this.value == 'blue') {
                        objSelected.setStroke('#95ccff');
                    } else {
                        objSelected.setStroke(this.value);
                    }
                    c.renderAll(); 
                }
            }
        })
        .iconselectmenu("menuWidget")
        .addClass("ui-menu-icons avatar");

    // style select
    $("#elementStyle").selectmenu({ 
        change: function( event, ui ) { 
            if (objSelected) {
                var type = objSelected.get('type');
                var name = objSelected.get('name');

                //console.log('change: type: ' + type + ' name: ' + name);
                var x = objSelected.get('left');
                var y = objSelected.get('top');
                if (name == 'O' && this.value == 'X') {
                    objSelected.set({name: 'X'});
                    objSelected.item(0).set({opacity: 0});
                    objSelected.item(1).set({opacity: 1});
                    c.renderAll();          
                } else if (name == 'X' && this.value == 'O') {
                    objSelected.set({name: 'O'});
                    objSelected.item(0).set({opacity: 1});
                    objSelected.item(1).set({opacity: 0});
                    c.renderAll();
                }
            }
        }
    });

    // label location select
    $("#elementLocation").selectmenu({ 
        change: function( event, ui ) { 
            updateLabel(objSelected);
        }
    });

    // line style select
    $("#elementLineStyle").iconselectmenu({ 
        change: function( event, ui ) { 
            if (objSelected) {
                var color = objSelected.get('stroke');
                if (!color) color = "#ffffff";

                var i = getIndexOfObj(objSelected, 'zigzag');
                //console.log('Index: ' + i + ', size: ' + objSelected.size());

                if (this.value == 'solid') {
                    if (i < objSelected.size()) {
                        objSelected.removeWithUpdate(objSelected.item(i));
                        c.remove(objSelected.item(i));
                    }
                    objSelected.item(0).set({opacity: 1});                       
                    objSelected.item(0).set({name: 'solid', strokeDashArray: []});
                } else if (this.value == 'dashed') {
                    if (i < objSelected.size()) {
                        objSelected.removeWithUpdate(objSelected.item(i));
                        c.remove(objSelected.item(i));
                    }
                    objSelected.item(0).set({opacity: 1});
                    objSelected.item(0).set({name: 'dashed', strokeDashArray: [10, 10]});
                } else { // zigzag
                    if (i >= objSelected.size()) {
                        objSelected.addWithUpdate(addPolyline(objSelected, color));
                        c.add(objSelected);
                        lineLeft = objSelected.getLeft();
                        lineTop = objSelected.getTop();
                    }
                    objSelected.item(0).set({opacity: 0});
                }
                c.renderAll();           
            }
        }
    })
    .iconselectmenu("menuWidget")
    .addClass("ui-menu-icons avatar");

    // arrow style: begin select
    $("#elementArrowBegin").iconselectmenu({ 
        change: function( event, ui ) { 
            updateArrow(this.value, 'begin');
        }
    })
    .iconselectmenu("menuWidget")
    .addClass("ui-menu-icons avatar");

    // arrow style: end select
    $("#elementArrowEnd").iconselectmenu({ 
        change: function( event, ui ) { 
            updateArrow(this.value, 'end');
        }
    })
    .iconselectmenu("menuWidget")
    .addClass("ui-menu-icons avatar");

    // update arrow style
    function updateArrow(val, name) {
        if (!objSelected) return;

        var otype = objSelected.item(0).get('type');
        var oname = objSelected.item(0).get('name');
        var color = objSelected.get('stroke');
        if (!color) color = "#ffffff";
        //console.log('arrow: ' + otype + ', type: ' + oname + ', value: ' + val);

        x1 = objSelected.item(0).get('x1');
        y1 = objSelected.item(0).get('y1');
        x2 = objSelected.item(0).get('x2');
        y2 = objSelected.item(0).get('y2');
        px = objSelected.getLeft();
        py = objSelected.getTop();
        //w = objSelected.getWidth();
        //h = objSelected.getHeight();
        w = Math.abs(x2 - x1);
        h = Math.abs(y2 - y1);

        angle = Math.abs(Math.atan((y2 - y1) / (x2 - x1)) / Math.PI * 180);
        //console.log('[Arrow]: ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + angle);
        //console.log('[Arrow2]: ' + px + ' ' + py + ' ' + w + ' ' + h);

        dx = px - (x1 + x2) / 2;
        dy = py - (y1 + y2) / 2;

        if (name == 'begin') {
            x = x1 + dx, y = y1 + dy;
            //x = x1, y = y1;
        } else {
            x = x2 + dx, y = y2 + dy;
            //x = x2, y = y2;
        }

        if (y2 >= y1) {
            if (x2 >= x1) {
                angle = (name == 'begin' ? angle - 90 : angle + 90);
            } else {
                angle = (name == 'begin' ? 90 - angle : -90 - angle);
            }            
        } else {
            if (x2 >= x1) {
                angle = (name == 'begin' ? -90 - angle : 90 - angle);
            } else {
                angle = (name == 'begin' ? angle + 90 : angle - 90);
            }
        }
        
        var i = getIndexOfObj(objSelected, name);
        //console.log('Index: ' + i + ' ,name: ' + name + ', size: ' + objSelected.size());

        if (i < objSelected.size()) {
            objSelected.removeWithUpdate(objSelected.item(i));
            c.remove(objSelected.item(i));            
        }

        if (val == 'arrow') {
            objSelected.addWithUpdate(addArrow(x, y, angle, name, color));
            c.add(objSelected);
            //objSelected.item(0).setCoords();
            lineLeft = objSelected.getLeft();
            lineTop = objSelected.getTop();
        } else if (val == 'block') {
            objSelected.addWithUpdate(addBlock(x, y, angle, name, color));
            c.add(objSelected);
            //objSelected.item(0).setCoords();
            lineLeft = objSelected.getLeft();
            lineTop = objSelected.getTop();
        }

        //console.log('update arrow: ' + objSelected.get('type') + ' ' + objSelected.get('name'));
        c.renderAll();
    }

    // update label
    function updateLabel() {
        if (!objSelected) return;
        //console.log('updateLabel: ' + objSelected.get('type'));
        var name = $('#labelName').val();
        var pos = $('#elementLocation').val();
        //console.log(pos);
        if (!name) {
            showDialog("Label text shouldn't be empty.");
        } else {
            if (objSelected) {
                var txt, group;
                var x = objSelected.getLeft();
                var y = objSelected.getTop() + objSelected.item(0).getTop();
                var lx = x;
                var ly = y;
                //console.log('center: ' + lx + ' ' + ly);

                if (pos == 'A') {
                    ly =  y - dimenWidth / 2 - 15;
                } else if (pos == 'B') {
                    ly = y + dimenWidth / 2 + 15;
                }   

                //console.log('size: ' + objSelected.size());
                if (objSelected.size() > 2) {
                    objSelected.removeWithUpdate(objSelected.item(2));
                    c.remove(objSelected.item(2));
                }
                objSelected.addWithUpdate(addText(lx, ly, name, 0.5));
                c.renderAll();
            }
        }
    }
    
    // update label
    $('#labelUpdate').click (function () {
        updateLabel();
    });

    // add keydown listener for canvasWrapper
    canvasWrapper.addEventListener('keydown', function(e) {        
        if (e.keyCode == 17) ctrlDown = true; // ctrl
        if(e.which == 46) { // delete key
            removeGroup();
        }

        if (selection) return;
        if (ctrlDown && e.keyCode == 65) {  // key 'a'
            if (!snapToGrid)
                c.setActiveGroup(new fabric.Group(c.getObjects())).renderAll();
            else  {
                var objs = c.getObjects (), groupObjs = new Array ();
                for (var i = 0; i < objs.length; ++i) {
                    if (c.item (i).name != "gridLine")
                        groupObjs.push(c.item (i));
                }
                c.setActiveGroup(new fabric.Group(groupObjs)).renderAll();
            }
        }
    });

    // add keyup listener for canvasWrapper
    canvasWrapper.addEventListener('keyup', function(e) {
        if (e.keyCode == 17) // ctrl
            ctrlDown = false;
    });
  
    // add touchstart, touchmove, touchend listeners
    document.addEventListener('touchstart', function() {
        console.log('touchstart', arguments);
    }, false);
    document.addEventListener('touchmove', function() {
        console.log('touchmove', arguments);
    }, false);
    document.addEventListener('touchend', function() {
        console.log('touchend', arguments);
    }, false);    

    // Canvas: set up background
    function setupBackground () {
        var img = new Image();
        img.onload = function() {
           c.setBackgroundImage(img.src, c.renderAll.bind(c), {
                width: c.width,
                height: c.height,
                originX: 'left',
                originY: 'top',
                left: 0,
                top:  0
            });
        };
        img.src = "img/footballField.png"
        if (snapToGrid)
            snapObjectsToGrid ();
    };
    
    // find index of element in group specified
    function getIndexOfObj(group, name) {
        var index = 0;
        var found = false;
        group.forEachObject(function(o) {
            if (!found && o.name == name) found = true;
            if (!found) index++;
        });

        return index;
    }

    // list elements in group specified
    function listGroup(group) {
        console.log('---------------');
        group.forEachObject(function(o) {
            console.log(o.name);
        });
    }

    // remove object group specified
    function removeGroup() {
        var objArr = c.getActiveGroup();
        if (objArr == null) {
            var obj = c.getActiveObject();
            if (obj != null && obj.name != "gridLine")
                c.remove (obj);
        } else {
            c.getActiveGroup().forEachObject(function(o) {
                if (o.name != "gridLine") c.remove (o);
            });
            c.discardActiveGroup().renderAll();
        }
        c.renderAll ();
    }

    // handle curve line circle visibility
    function clcHandle() {
        if (!clcVisible)
            hideLineCircles();
        else
            showLineCircles();
    }
    
    // unselect objects
    function unselectobjects () {
        c.selection = false;
        c.forEachObject(function(o) {
          o.selectable = false;
        });
    }

    // formation item: load file, name and image.
    //function FormationItem(file, name, img, classActive = false) {
    function FormationItem(file, name, img, classActive) {
        if (classActive === undefined) {
            classActive = false;
        }
        this.xml = file;
        this.playname = name;
        this.thumbnail = img;
        this.classActive = classActive;
    }
    
    // defense & offense standard/premium arrays
    self.defensePremiumArray = ko.observableArray ();
    self.defenseStandardArray = ko.observableArray ();
    self.offensePremiumArray = ko.observableArray ();
    self.offenseStandardArray = ko.observableArray ();

    // defense premium pattern
    self.defensePremiumArray.push (new FormationItem(
        "xml/none.xml", "NONE", defIPath + "noneDef.png", true
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "4_3_over.xml" ,"4-3 Over", defIPath + "4_3Over.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "4_3_normal.xml", "4-3 Normal", defIPath + "4_3Normal.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "4_3_under.xml", "4-3 Under", defIPath + "4_3Under.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "3_4_normal.xml", "3-4", defIPath + "3_4.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "nickel_normal.xml", "Nickel Normal", defIPath + "nickelNormal.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "nickel_3_3_5.xml", "Nickel 3-3-5", defIPath + "nickel3_3_5.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "dime_normal.xml", "Dime Normal", defIPath + "dimeNormal.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "dime_cloud.xml", "Dime Cloud", defIPath + "dimeCloud.png"
    ));

    self.defensePremiumArray.push (new FormationItem (
        defPath + "goalline.xml", "Goalline", defIPath + "goallineDef.png"
    ));
  
    // defense standard pattern
    self.defenseStandardArray.push (new FormationItem(
        "xml/none.xml", "NONE", defIPath + "noneDef.png", true
    ));

    self.defenseStandardArray.push (new FormationItem (
        defPath + "4_3_normal.xml", "4-3", defIPath + "4_3Normal.png"
    ));

    self.defenseStandardArray.push (new FormationItem (
        defPath + "3_4_normal.xml", "3-4", defIPath + "3_4.png"
    ));
    
    // offense premium pattern
    self.offensePremiumArray.push (new FormationItem(
        "xml/none.xml", "NONE", offIPath + "noneOff.png", true
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "i_normal.xml", "I Normal", offIPath + "iNormal.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "i_twins.xml", "I Twins", offIPath + "iTwins.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "i_2_tight.xml", "I 2 Tight", offIPath + "i2Tight.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "pro_form.xml", "PRO FORM", offIPath + "proForm.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "single_back.xml", "Single Back", offIPath + "singleBack.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "single_2_tight.xml", "Single2Tight", offIPath + "Single2Tight.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "shotgun.xml", "Shotgun", offIPath + "shotgun.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "shotgun_empty.xml", "Shotgun Empty", offIPath + "shotgunEmpty.png"
    ));

    self.offensePremiumArray.push (new FormationItem (
        offPath + "goalline.xml", "Goalline", offIPath + "goallineOff.png"
    ));
    
    // offense standard pattern
    self.offenseStandardArray.push (new FormationItem(
        "xml/none.xml", "NONE", offIPath + "noneOff.png", true
    ));

    self.offenseStandardArray.push (new FormationItem (
        offPath + "i_normal.xml", "I FORM", offIPath + "iNormal.png"
    ));

    self.offenseStandardArray.push (new FormationItem (
        offPath + "pro_form.xml", "PRO FORM", offIPath + "proForm.png"
    ));
    
    $('#defensePlaysCarousel').on('slid.bs.carousel', function(){
        var i = $('#defensePlaysCarousel .active').index();
        for (j = 0; j < self.defensePremiumArray().length; j++) {
            self.defensePremiumArray()[j].classActive = false;
        }
        //console.log (i);
        self.defensePremiumArray()[i].classActive = true;
        $('#defensePlaysCarousel.item').removeClass('active').eq(i).addClass('active');
    });
    
    $('#offensePlaysCarousel').on('slid.bs.carousel', function(){
        var i = $('#offensePlaysCarousel .active').index();
        for (j = 0; j < self.offensePremiumArray().length; j++) {
            self.offensePremiumArray()[j].classActive = false;
        }
        self.offensePremiumArray()[i].classActive = true;
        $('#offensePlaysCarousel.item').removeClass('active').eq(i).addClass('active');
    });
    
    $('#loadPlay').click(function() {
        var dItem, oItem;
        ko.utils.arrayForEach(self.defensePremiumArray(), function(item) {
            if(item.classActive == true)
                dItem = item;
        });
        
        ko.utils.arrayForEach (self.offensePremiumArray(), function(item) {
            if (item.classActive) {
                oItem = item;
            }
        });
        console.log('dItem: ' + dItem);
        console.log('dItem.xml: ' + dItem.xml);
        console.log('oItem: ' + oItem);
        dataSend = { "defence" : dItem.xml, "offence" : oItem.xml };
        $.ajax({
            type : 'POST',
            url  : 'designBackend.php',
            data : dataSend,
            success : function (response) {
                c.clear ();
                setupBackground ();
                //console.log (response);
                var jsonArr = jQuery.parseJSON (response);
                //console.log (jsonArr);
                for (var i = 0; i < jsonArr.length; ++i) {
                    if (jsonArr[i]['type'] == 'O') {                        
                        player = addPlayer(jsonArr[i]['x'] * preloadRatio, jsonArr[i]['y'] * preloadRatio);
                        player.item(1).set({opacity: 0});
                        c.add(player);
                    } else if (jsonArr[i]['type'] == 'X') {                        
                        player = addPlayer(jsonArr[i]['x'] * preloadRatio, jsonArr[i]['y'] * preloadRatio);
                        player.set({name: 'X'});
                        player.item(0).set({opacity: 0});
                        c.add(player);
                    }
                }
                c.renderAll ();
            }
        });
    });    

    // add arrow
    function addArrow(x, y, angle, name, color) {
        var arrow = new fabric.Triangle({
            name: name,
            width: 10,
            height: 10,
            selectable: false,
            fill: color, //'rgba(0,0,0,0)',
            stroke: color, //self.colour (),
            strokeWidth: strokeWidth,
            originX : 'center',
            originY : 'center',
            left   : x,
            top    : y,
            angle: angle,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return arrow;
    }

    // add block
    function addBlock(x, y, angle, name, color) {
        var block  = new fabric.Rect ({
            name: name,
            width: 15,
            height: 1,
            selectable: false,
            fill: color, //'rgba(0,0,0,0)',
            stroke : color, //self.colour (),
            strokeWidth : strokeWidth,
            originX : 'center',
            originY : 'center',
            left   : x,
            top    : y,
            angle  : angle,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return block;
    }

    // add circle
    function addCircle(x, y) {
        var circle = new fabric.Circle ({
           radius : circleRadius,
           fill: 'rgba(0,0,0,0)',
           originX : 'center',
           originY : 'center',
           stroke : self.colour (),
           strokeWidth : strokeWidth,
           left   : x,
           top    : y,
           selectable: false,
           perPixelTargetFind: true,
           shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return circle;
    }

    // add player
    function addPlayer(x, y) {
        var circle = addCircle(x, y);
        var cross = addText(x, y, 'X');
        var player = new fabric.Group([circle,cross],{
            // any group attributes here
            originX: 'center',
            originY: 'center',
            name: 'O',
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return player;
    }

    // add connect
    function addConnect(line) {
        var x = line.getLeft();
        var y = line.getTop();
        var w = line.getWidth();
        var h = line.getHeight();
        //console.log(x + ' ' + y + ' ' + w);

        var txt = addText(x, y, '');
        var connect = new fabric.Group([line, txt],{
            // any group attributes here
            name: 'solid',
            originX: 'center',
            originY: 'center',
            left: x,
            top: y,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });

        return connect;
    }

    // add text
    function addText(x, y, text, zoom) {
        var fsize = (zoom === undefined ? fontSize : zoom * fontSize);
        
        var txt  = new fabric.Text(text, {
            name: 'label',
            left: x, 
            top : y,
            originX : 'center',
            originY : 'center',
            fontFamily: 'Arial',
            fontSize: fsize,
            textAlign: 'center',
            fill: self.colour (),
            selectable: false,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return txt;
    }

    // add editable text
    function addIText(x, y, text, zoom) {
        var fsize = (zoom === undefined ? fontSize : zoom * fontSize);
        var txt = new fabric.IText(text, {
            name: 'edit',
            left: x, 
            top : y,
            originX : 'center',
            originY : 'center',
            fontFamily: 'Arial',
            fontSize: fsize,
            textAlign: 'center',
            fill: self.colour (),
            selectable: false,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });
        return txt;
    }

    // add line
    function addLine(x, y, dashed) {
        //console.log('addLine: ' + x + ' ' + y);
        var points = [ x, y, x, y ];
        line = new fabric.Line(points, {
            name: 'solid',
            strokeWidth: strokeWidth,
            fill: self.colour (),
            stroke: self.colour (),
            originX: 'center',
            originY: 'center',
            selectable: false,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });

        if (dashed) {
            line.set({name: 'dashed', strokeDashArray: [10, 10]});
        }

        return line;
    }

    // add line with endpoints
    function addLineWithEndpoints(x1, y1, x2, y2, dashed) {
        var points = [ x1, y1, x2, y2 ];
        pline = new fabric.Line(points, {
            name: 'solid',
            strokeWidth: strokeWidth,
            fill: self.colour (),
            stroke: self.colour (),
            //originX: 'center',
            //originY: 'center',
            selectable: false,
            perPixelTargetFind: true,
            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });

        if (dashed) {
            pline.set({name: 'dashed', strokeDashArray: [10, 10]});
        }

        return pline;
    }

    // add polyline
    function addPolyline(obj, color, interval, offset) {
        if (interval === undefined) interval = 20;
        if (offset === undefined) offset = 4;

        var j = 1;
        var points = [];
                
        x1 = p1 = obj.item(0).get('x1');
        y1 = m1 = obj.item(0).get('y1');
        x2 = p2 = obj.item(0).get('x2');
        y2 = m2 = obj.item(0).get('y2');
        px = objSelected.getLeft();
        py = objSelected.getTop();
        w = Math.abs(x2 - x1);
        h = Math.abs(y2 - y1);

        if (y2 >= y1 && x2 < x1 || y2 < y1 && x2 < x1) {
            x1 = p2, y1 = m2, x2 = p1, y2 = m1;
        }

        var length = 0.95* Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        var angle = (Math.atan((y2 - y1) / (x2 - x1)) / Math.PI * 180);
      
        dx = px - (x1 + x2) / 2;
        dy = py - (y1 + y2) / 2;
        x1 += dx, y1 += dy, x2 += dx, y2 += dy;

        points[0] = {
            x: x1,
            y: y1
        };

        for (i = 0; i * interval < length; i++) {
            points[j++] = {
                x: x1 + (i * interval) + 5,
                y: y1 - offset
            };
            points[j++] = {
                x: x1 + (i * interval) + 15,
                y: y1 + offset
            };
        }
        /*points[j] = {
            x: x1 + length,
            y: y1
        };*/

        var poly = new fabric.Polyline(points, {
            name: 'zigzag',
            fill: 'rgba(0,0,0,0)', //self.colour (),
            stroke: color, //self.colour(),
            left: x1,
            top: y1 - 4,
            //originX: 'center',
            //originY: 'center',
            strokeWidth: 0.8 * strokeWidth
            //strokeLineJoin: 'bevil'
            //shadow: 'rgba(0,0,0,1) 5px 5px 7px',
        },
        false);
        
        poly.set('angle', (angle)).setCoords();

        return poly;
    }

    // load canvas from JSON object
    function loadCanvasFromJSONRow (canvasObj) {
        c.clear ();
        c.loadFromJSON(canvasObj, c.renderAll.bind(c), function(o, object) {
            // fabric.log(o, object);
        });
        c.forEachObject(function(object){ 
           object.selectable = false; 
        });
    }
    
    if (sessionStorage.length > 0) {
        editCanvasId   = sessionStorage.getItem('id');
        editCanvasName  = sessionStorage.getItem('name');
        editCanvasInfo   = sessionStorage.getItem('info');
        editCanvasItem = sessionStorage.getItem('canvas');
        loadCanvasFromJSONRow (editCanvasItem);
        $("#playName").val(editCanvasName);
        $("#playInfo").val(editCanvasInfo);
        sessionStorage.clear ();
        editCanvas = true;
    }
    
    // setup background
    setupBackground ();
    
    // generate canvas grids
    function generateGrid () {
        for (var i = 0; i < (c.width / grid); ++i)
            c.add(new fabric.Line([ i * grid, 0, i * grid, c.width], 
                { stroke: '#ccc', selectable: false, name :'gridLine'}));
        for (var i = 0; i < (c.height / grid); ++i)
            c.add(new fabric.Line([ 0, i * grid, c.width, i * grid], 
                { stroke: '#ccc', selectable: false, name :'gridLine' }))
    }
    
    // snap objects to grid
    function snapObjectsToGrid () {
        generateGrid ();
        c.on ('object:moving', function (options) { 
            if (!snapToGrid) return;
            options.target.set({
              left: Math.round (options.target.left / grid) * grid,
              top:  Math.round (options.target.top / grid) * grid
            });
        });
        
        c.on ('object:added', function (options) { 
            if (!snapToGrid) return;
            options.target.set ({
                left: Math.round (options.target.left / grid) * grid,
                top:  Math.round (options.target.top / grid) * grid
            });
        });
    }
    
    // unselect snap objects to grid
    function noSnapObjectsToGrid () {
        snapToGrid = false;
        var objs = c.getObjects ();
        for (var i = c.getObjects ().length - 1; i > 0; --i)
            if (c.item (i).name != null && c.item (i).name == "gridLine")
                c.remove (c.item (i));
    }
        
    $('#SnapGridCheck').change (function () {
       if ($(this).is(":checked")) {
           snapToGrid = true;
           snapObjectsToGrid ();
       } else
           noSnapObjectsToGrid ();
    });

    $('#CLCVisibleCheck').change (function () {
        if (clcVisible)
            hideLineCircles();
        else
            showLineCircles();
        clcVisible = !clcVisible;
    });

    $('#yellowBtn').click (function () {
        self.updateColour("#f1f827");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#yellowBtn').addClass('border');
    });
    
    $('#whiteBtn').click (function () {
        self.updateColour("#ffffff");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#whiteBtn').addClass('border');
    });
    
    $('#grayBtn').click (function () {
        self.updateColour("#424242");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#grayBtn').addClass('border');
    });
    
    $('#blueBtn').click (function () {
        self.updateColour("#95ccff");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#blueBtn').addClass('border');
    });
    
    $('#redBtn').click (function () {
        self.updateColour("#ff0000");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#redBtn').addClass('border');
    });

    $('#blackBtn').click (function () {
        self.updateColour("#000000");
        $('.colorbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#blackBtn').addClass('border');
    });
   
    self.updateColour = function(colour) {
        self.colour (colour);  
    };
    
    self.colour.subscribe (function() {
        var objArr = c.getActiveGroup();
        if (objArr == null) {
            var obj = c.getActiveObject();
            //console.log (obj);
            if (obj != null)
                obj.set(((obj.get('name') != "cross" && obj.get('name') != "userText") ? 
                    "stroke" : "fill"), self.colour ());
        } else
            c.getActiveGroup().forEachObject(function(o){ 
                o.set(((o.get('name') != "cross" && o.get('name') != "userText") ? 
                    "stroke" : "fill"), self.colour ());
            });
        c.renderAll ();
    });
    
    // select canvas objects
    function selectCanvasObjects(selection) {
        for (var i = 0; i < c.getObjects ().length; ++i)
            if (c.item (i).name == null || c.item (i).name != "gridLine")
                c.item (i).set ('selectable', selection);
            else 
                console.log ('==='+c.item (i));
    }
    
    $(":button").click(function() {
        if (selection) {
            var id = $(this).attr('id');
            if (id == 'lineBtn' || id == 'clineBtn' || id == 'circleBtn' || 
                id == 'crossBtn' || id == 'rectBtn') {
                selectCanvasObjects (false);
                selection = false;
            }
        }
    });
    
    // Fred Yang. select (arrow), line, dash line, curve, circle buttons.
    // select (arrow) button. Snapping to player (object).
    $('#selectBtn').click (function () {
        //console.log('sel: ' + selection + ' ' + c.selection);
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        c.selection = true;
        $('#selectBtn').addClass('border');
        c.defaultCursor = 'default';
        lineDraw = xDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = true;
        selection = false;
        selectCanvasObjects (true);
        //selectableLineCircles();
        c.off('mouse:down'); // turn off events used by curve line
        //c.off('mouse:move');
        //c.off('mouse:up');
        c.renderAll();
    });
    
    // dash line button
    $("#dashLine").click (function () {
        c.selection = false;
        if (!selection)
            unselectobjects ();
        xDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = lineDraw = true;
        dashed = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#dashLine').addClass('border');
        c.defaultCursor = 'default';

        c.on('mouse:down', function(o) {
            if (dashed) return;
            isDDown = true;

            var point = new Point(0,0);
            var pointer = c.getPointer(o.e);
            var start = new fabric.Circle({
                radius: olRadius, 
                left: pointer.x - olRadius / 2, 
                top: pointer.y - olRadius / 2, 
                fill: 'rgba(0,0,0,0)'
            });

            point = checkOverlap(start);
            if (!(point.x < EPSILON && point.y < EPSILON)) {
                pointer.x = point.x;
                pointer.y = point.y;
            }
            
            dline = addLine(pointer.x, pointer.y, 1);
            c.add(dline);
        });

        c.on ('mouse:move', function(o){
            if (dashed || !isDDown) return;
            if (dline) {
                var pointer = c.getPointer(o.e);
                dline.set({ x2: pointer.x, y2: pointer.y });
                c.renderAll();
            }
        });

        c.on('mouse:up', function(o){
            if (dashed) return;
            isDDown = false;    
            if (dline) dline.setCoords();
        }); 
    });
    
    // line button
    $('#lineBtn').click (function () {
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#lineBtn').addClass('border');
        c.off('mouse:down');
        //console.log('selection: ' + selection);
        if (!selection) unselectobjects ();

        xDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = dashed = true;
        lineDraw = false;
        c.defaultCursor = 'default';

        c.on('mouse:down', function(o) {
            if (lineDraw) return;
            isDown = true;

            var point = new Point(0,0);
            var pointer = c.getPointer(o.e);

            var start = new fabric.Circle({
                radius: olRadius, 
                left: pointer.x - olRadius / 2, 
                top: pointer.y - olRadius / 2, 
                fill: 'rgba(0,0,0,0)'
            });

            point = checkOverlap(start);
            if (!(point.x < EPSILON && point.y < EPSILON)) {
                pointer.x = point.x;
                pointer.y = point.y;
            }
            
            line = addLine(pointer.x, pointer.y);
            c.add(line);
        });

        c.on ('mouse:move', function(o){
            if (lineDraw || !isDown) return;
            if (line) {
                var pointer = c.getPointer(o.e);
                line.set({ x2: pointer.x, y2: pointer.y });
                c.renderAll();
            }
        });

        c.on('mouse:up', function(o){
            if (lineDraw) return;
            isDown = false;    
            if (line) {
                line.setCoords(); 
            }        
        }); 

    });     

    // curve button
    $('#cLineBtn').click (function () {     
        if (!selection) unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#cLineBtn').addClass('border');

        var pointer;
        var points;
        var p1, p2;

        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = cDraw = rDraw = tDraw = oDraw = textC = true;
        clDraw = false;
       
        c.on ('mouse:down', function (o) {
            //console.log ('clDraw: ' + clDraw);
            if (clDraw) return;
            isCDown = true;
            pointer = c.getPointer(o.e);

            cline = makeCurveLine(pointer.x, pointer.y);

            if (cline) {
                p1 = cline.circle1;
                p2 = cline.circle2;
                c.add(cline);
                cline.setCoords();           
                clDraw = true;
            }
        });
    });
    
    // circle button
    $('#circleBtn').click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#circleBtn').addClass('border');
        c.off('mouse:down');
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = true;
        cDraw    = false;

        c.on ('mouse:down', function (e) {
            if (cDraw) return;
            var px, py;
            var circle;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }

            player = addPlayer(px, py);
            player.item(1).set({opacity: 0});
            c.add(player);
        });
        
    });
    
    // Fred / Justen: cross(X), rectangle, triangle, text buttons
    // cross (X) button
    $('#crossBtn').click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#crossBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = true;
        xDraw    = false;
        c.defaultCursor = 'crosshair';   

        c.on ('mouse:down', function (e) {
            if (xDraw) return;
            var px, py;
            var txt;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }
            
            player = addPlayer(px, py);
            player.set({name: 'X'});
            player.item(0).set({opacity: 0});
            c.add(player);
        });
    });
        
    // oval button
    $('#ovalBtn').click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#ovalBtn').addClass('border');
        c.off('mouse:down');
        c.defaultCursor = 'crosshair';
        lineDraw = xDraw = clDraw = rDraw = tDraw = cDraw = selection = textC = true;
        oDraw    = false;

        c.on ('mouse:down', function (e) {
            if (oDraw) return;
            var px, py;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }
            
            var oval = new fabric.Ellipse ({
                rx : ovalRadius,
                ry : ovalRadius * 0.8,
                originX : 'center',
                originY : 'center',
                fill: self.colour (),
                stroke : self.colour (),
                strokeWidth : strokeWidth,
                left   : px,
                top    : py,
                selectable: false,
                perPixelTargetFind: true,
                shadow: 'rgba(0,0,0,1) 5px 5px 7px'
            });
            oval.set({
                opacity: 0.4
            });
            c.add(oval);
        });
    });
    
    // text button
    $("#textBtn").click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#textBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = tDraw = oDraw = selection = rDraw = true;
        textC = false;
        c.defaultCursor = 'crosshair';

        c.on ('mouse:down', function (e) {
            if (textC) return;
            var px, py;
            var txt;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }

            txt = addIText(px, py, 'label', 0.5);
            c.add(txt);

            // set to select state
            $('#selectBtn').click(); 
        });
    });

    // save Play info
    $("#canvasPng").click (function() {        
        playName = $("#playName").val();
        playInfo = $("#playInfo").val();
        toggle = $("#canvasPng").text();

        if (toggle == 'Hide Image') {
            $("#errName").html('');
            $("#canvasPng").html('Save Play');
            $('#canvasPNGImg').addClass('item-none');
            return;
        }

        if (!playName) {
            $("#errName").html("<span class='error'>Please input name</span>");
            return;
        }

        $("#errName").html("Generated PNG:");
        $("#canvasPng").html('Hide Image');

        var dataURL, dataSend, checkSnap, canJSON;
        console.log ('snapToGrid: ' + snapToGrid); 

        if (snapToGrid) {
            noSnapObjectsToGrid ();
            dataURL = c.toDataURL();
            canJSON = JSON.stringify (c);
            snapToGrid = true;
            snapObjectsToGrid ();
        } else {
            dataURL = c.toDataURL();
            canJSON = JSON.stringify (c);
        }

        // specify width for mobile compatible
        document.getElementById('canvasImgSaved').src = dataURL;
        document.getElementById("canvasImgSaved").style.width = c.width;
        //$('#canvasImgSaved').attr("src", dataURL);
        //$('#canvasImgSaved').attr("width", c.width);
        $('#canvasPNGImg').removeClass('item-none');

        if (editCanvas) {
            dataSend = { "playId" : editCanvasId, "playName" : playName, "playInfo" : playInfo, "playJson" : canJSON };
        } else {
            dataSend = { "playId" : 0, "playName" : playName, "playInfo" : playInfo, "playJson" : canJSON };
        } 
        //console.log (dataSend);
           
        $.ajax({
            type : 'POST',
            url  : 'designBackend.php',
            data : dataSend,
            success : function (response) {
                console.log (response);
            }
        });

    });
    
    // clear off canvas
    $('#clearCanvasBtn').click (function () {
        c.forEachObject (function (obj) {
            c.remove (obj);
        });
        c.clear ();
        setupBackground ();       
    });
    
    // diaglog
    function showDialog(msg) {
        $( "#myDialog" ).dialog();
        $( "#myDialog" ).html('<p>' + msg + '</p>');
    }

    // check if elements overlapped. Return the center of element
    // or the closest endpoint.
    function checkOverlap(activeObject) {
        var overlapped = false;
        var p = new Point(0, 0);
        activeObject.setCoords();
        var objPoint = activeObject.getCenterPoint();

        // loop canvas objects
        c.forEachObject(function (targ) {
            if (targ === activeObject) return; // skip itself

            //check overlap with every object in canvas
            if (activeObject.intersectsWithObject(targ) 
                || activeObject.isContainedWithinObject(targ) 
                || targ.isContainedWithinObject(targ)) {
                //console.log('overlapped: ');
                var type = targ.get('type');
                if (type == 'circle' || type == 'rect' || type == 'triangle' || 
                    type == 'text') {
                    var s = targ.getCenterPoint();
                    //console.log('==s: ' + s.x);
                    p = targ.getCenterPoint();
                    return;
                } else if (type == 'line') {
                    var p1 = new Point(targ.x1, targ.y1);
                    var p2 = new Point(targ.x2, targ.y2);
                    p = (dist(p1, objPoint) < dist(p2, objPoint) ? p1 : p2);
                    return;
                }
            }           
        });

        return p;
    }
    
    // remove curve line
    function deleteCurveLine(line) {
        c.remove(line.circle0);
        c.remove(line.circle1);
        c.remove(line.circle2);
        c.remove(line); // remove path
        c.remove(line); // remove entire curve
        c.deactivateAll().renderAll();
    }

    // selectable line circle
    function selectableLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.selectable = true;
                objs[i].circle1.selectable = true;
                objs[i].circle2.selectable = true;
            }
        }
    }

    // unselectable line circle
    function unselectableLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.selectable = false;
                objs[i].circle1.selectable = false;
                objs[i].circle2.selectable = false;
            }
        }
    }

    // display line circle
    function showLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++) {
            if (objs[i].name == 'curve') {
                objs[i].circle0.selectable = true;
                objs[i].circle0.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle1.selectable = true;
                objs[i].circle1.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle2.selectable = true;
                objs[i].circle2.animate('opacity', '1', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
            }
        }
    }

    // hide line circle
    function hideLineCircles() {
        objs = c.getObjects();
        for (i = 0; i < objs.length; i++)  {
            if(objs[i].name ==  'curve') {
                objs[i].circle0.selectable = false;
                objs[i].circle1.selectable = false;
                objs[i].circle2.selectable = false;
                objs[i].circle0.animate('opacity', '0', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle1.animate('opacity', '0', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
                objs[i].circle2.animate('opacity', '0', {
                    duration: 200,
                    onChange: c.renderAll.bind(c),
                });
            }
        }
    }
    
    function pasteOne(clone) {
        clone.left += 25; // If in corner, may be outside of canvas
        clone.top  += 25; // If in corner, may be outside of canvas
        clone.set('canvas', c);
        clone.setCoords(); //Must call this when we cahnged our coordinates
        c.add(clone);
    };
    
    function selectAll(numberOfItems) {
        c.deactivateAll();
        c.discardActiveGroup();

        var objs = new Array();          
        var canvasObjects = c.getObjects();
          
        var count = 0;
          
        for (var index = (canvasObjects.length - 1); index >= 0; --index) {
              console.log (canvasObjects);
              if (count < numberOfItems) 
                  objs.push(canvasObjects[index].set('active', true));
              ++count;
        }
        
        var group = new fabric.Group(objs, {
            originX: 'center',
            originY: 'center'
        });
        c.setActiveGroup(group.setCoords()).renderAll();
    }
    
    // build curve line    
    //function makeCurveLine(p0x, p0y, p1x = p0x - 50, p1y = p0y - 50, p2x = p0x, p2y = p0y) {
    function makeCurveLine(p0x, p0y, p1x, p1y, p2x, p2y) {
        p1x = p0x - 50, p1y = p0y - 50, p2x = p0x, p2y = p0y;
        var line = new fabric.Path('M ' + p0x + ' '  + p0y + ' Q ' + p1x + ', ' + p1y + ', ' + p2x + ', ' + p2y,
            { fill: 'rgba(0,0,0,0)',stroke: self.colour(),strokeWidth: 4,objectCaching: false,perPixelTargetFind: true,
              selectable: false, hasBorders: false, shadow: 'rgba(0,0,0,1) 5px 5px 7px'});
        line.name = "curve";
        line.selectable = false;
        c.add(line);

        var p1 = makeCurvePoint(line.path[1][1], line.path[1][2], null, line, null)
        p1.name = "p1";
        c.add(p1);

        var p0 = makeCurveCircle(line.path[0][1], line.path[0][2], line, p1, null);
        p0.name = "p0";
        c.add(p0);

        var p2 = makeCurveCircle(line.path[1][3], line.path[1][4], null, p1, line);
        p2.name = "p2";
        c.add(p2);

        line.circle0 = p0;
        line.circle1 = p1;
        line.circle2 = p2;

        return line;
    }

    // make curve circle
    function makeCurveCircle(left, top, line1, line2, line3) {
        var cc = new fabric.Circle({
            left: left,
            top: top,
            strokeWidth: 5,
            radius: 12,
            fill: '#fff',
            stroke: '#666'
        });

        cc.hasBorders = cc.hasControls = false;

        cc.line1 = line1;
        cc.line2 = line2;
        cc.line3 = line3;

        return cc;
    }

    // make curve point
    function makeCurvePoint(left, top, line1, line2, line3) {
        var cp = new fabric.Circle({
            left: left,
            top: top,
            strokeWidth: 8,
            radius: 14,
            fill: '#fff',
            stroke: '#666'
        });

        cp.hasBorders = cp.hasControls = false;

        cp.line1 = line1;
        cp.line2 = line2;
        cp.line3 = line3;

        return cp;
    }

    function onObjectSelected(e) {
        var activeObject = e.target;
        activeObject.set({'borderColor':'#fbb802','cornerColor':'#fbb802', 'cornersize' : '10'});

        if (activeObject.name == "p0" || activeObject.name == "p2") {
            activeObject.line2.animate('opacity', '1', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
            activeObject.line2.selectable = true;
        } else if (activeObject.type == "group" && activeObject.name === undefined) {
            var curLeft = activeObject.getLeft();
            var curTop = activeObject.getTop();
            if (lineLeft && (curLeft < 5 || curTop < 5)) {
                activeObject.set({left: lineLeft, top: lineTop});                
            }            
        }
    }

    function onBeforeSelectionCleared(e) {
        //console.log('onBeforeSelCleared');
        var activeObject = e.target;
        if (activeObject.name == "p0" || activeObject.name == "p2") {
            activeObject.line2.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
            activeObject.line2.selectable = false;
        } else if (activeObject.name == "p1") {
            activeObject.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
            activeObject.selectable = false;
        }
    }

    function onObjectMoving(e) {
        //console.log('onObjectMoving');
        //var p = e.target;
        if (e.target.name == "p0" || e.target.name == "p2") {
            var p = e.target;
            if (p.line1) {
                p.line1.path[0][1] = p.left;
                p.line1.path[0][2] = p.top;
            } else if (p.line3) {
                p.line3.path[1][3] = p.left;
                p.line3.path[1][4] = p.top;
            }
        } else if (e.target.name == "p1") {
            var p = e.target;
            if (p.line2) {
                p.line2.path[1][1] = p.left;
                p.line2.path[1][2] = p.top;
            }
        } else if (e.target.name == "p0" || e.target.name == "p2") {
            var p = e.target;
            p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
            p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
            p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
            p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
        } else if (e.target.name == "solid" || e.target.name == "dashed") {
            //console.log('===' + e.target.name);
            //var p = e.target;
        }
    }
}

var model;

// handle document onready event
$( document ).ready(function() {
    $( "#newPlayBtn" ).click();

    if (checkMobile()) {
        $("#canvasWrapper").addClass('canvas-mob');
        $("#playDetail").addClass('textinfo-mob');
    } else {
        $("#canvasWrapper").addClass('canvas-normal');
        $("#playDetail").addClass('textinfo');
        $("#saveToggle").addClass('savetoggle');
    }

    model = new DesignPlaybookViewModel ();
    ko.applyBindings (model);
});

function update (jscolor) {
    model.updateColour (jscolor.toHEXString());
}