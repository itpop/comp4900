// design.js - handle Design page
// NoName group

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

    var line, cline, dLine, isDown, isCDown, isDDown;
    var lineDraw = xDraw = cDraw = rDraw = tDraw = clDraw = oDraw = textC = selection = true;
    var snapToGrid = ctrlDown = false;
    var clcVisible = true;

    var ratio = 1.0;
    var isMobile = checkMobile();
    var touchWidth = $(window).width();
    console.log('touchWidth:' + touchWidth);

    if (isMobile) {
        //var touchWidth = ($(window).width() > $(window).height() ? $(window).width() : $(window).height());
        if (touchWidth >= ipadWidth) {
            ratio = proRatio;
        } else if (touchWidth >= nexusWidth) {
            ratio = ipadRatio;
        } else {
            ratio = nexusRatio;
        }
    }

    var canvasWrapper = document.getElementById('canvasWrapper');
    c.setWidth(canvasWrapper.clientWidth);
    c.setHeight((c.width) / whRatio);
    var grid = grid = c.width / gridFactor;

    var copiedObjects = new Array ();
    self.colour = ko.observable ("#ffffff");
    var editCanvas = false;
    var editCanvasId;
    var editCanvasName;
    var editCanvasInfo;
    var editCanvasItem;
    var dashed = arrowHead = false;
    
    // touch support set as true
    fabric.isTouchSupported = true;    
    
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
   
    c.on({
        'object:selected': onObjectSelected,
        'object:moving': onObjectMoving,
        'before:selection:cleared': onBeforeSelectionCleared,
    });

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
    
    // handle curve line circle visibility
    function clcHandle() {
        if (!clcVisible)
            hideLineCircles();
        else
            showLineCircles();
    }

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
    
    // unselect objects
    function unselectobjects () {
        c.selection = false;
        c.forEachObject(function(o) {
          o.selectable = false;
        });
    }

    // formation item: load file, name and image.
    function FormationItem(file, name, img, classActive = false) {
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

    console.log (self.defensePremiumArray());    
    
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
                console.log (response);
                var jsonArr = jQuery.parseJSON (response);
                console.log (jsonArr);
                for (let i = 0; i < jsonArr.length; ++i) {
                    if (jsonArr[i]['type'] == 'X') {
                        xmlcross  = new fabric.Text('X', { 
                            left: jsonArr[i]['x'] * ratio, 
                            top : jsonArr[i]['y'] * ratio,
                            originX : 'center',
                            originY : 'center',
                            fontFamily: 'Arial',
                            fontSize: (c.width / fontFactor),
                            textAlign: 'center',
                            fill: self.colour (),
                            selectable: false,
                            perPixelTargetFind: true,
                            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                        });
                        console.log (xmlcross);
                        c.add (xmlcross);
                        xmlcross.setCoords();
                    } else if (jsonArr[i]['type'] == 'O') {
                        console.log (jsonArr[i]);
                        c.add (new fabric.Circle ({
                           radius : c.width / radiusFactor,
                           fill: 'rgba(0,0,0,0)',
                           originX : 'center',
                           originY : 'center',
                           stroke : self.colour (),
                           strokeWidth : c.width / strokeFactor,
                           left   : jsonArr[i]['x'] * ratio,
                           top    : jsonArr[i]['y'] * ratio,
                           selectable: false,
                           perPixelTargetFind: true,
                           shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                        }));
                    }
                }
                c.renderAll ();
            }
        });
    });
    
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
        //console.log (editCanvasItem);
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
        for (let i = 0; i < (c.width / grid); ++i)
            c.add(new fabric.Line([ i * grid, 0, i * grid, c.width], { stroke: '#ccc', selectable: false, name :'gridLine'}));
        for (let i = 0; i < (c.height / grid); ++i)
            c.add(new fabric.Line([ 0, i * grid, c.width, i * grid], { stroke: '#ccc', selectable: false, name :'gridLine' }))
    }
    
    // snap objects to grid
    function snapObjectsToGrid () {
        generateGrid ();
        c.on ('object:moving', function (options) { 
            if (!snapToGrid)
                return;
            options.target.set({
              left: Math.round (options.target.left / grid) * grid,
              top:  Math.round (options.target.top / grid) * grid
            });
        });
        
        c.on ('object:added', function (options) { 
            if (!snapToGrid)
                return;
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
        for (let i = c.getObjects ().length - 1; i > 0; --i)
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
    
    $(function() {
        $('#customBtn').colorpicker().on('changeColor', function(e){
            $('#ColourPalleteBtn')[0].style.color = e.color.toString('rgba');
            self.updateColour(e.color.toString('rgba'));
            $('.colorbtn').each(function(index){
                $(this).removeClass('border');
            });
            $('#customBtn').addClass('border');
        });
        
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
                obj.set(((obj.get('name') != "cross" && obj.get('name') != "userText") ? "stroke" : "fill"), self.colour ());
        } else
            c.getActiveGroup().forEachObject(function(o){ 
                o.set(((o.get('name') != "cross" && o.get('name') != "userText") ? "stroke" : "fill"), self.colour ());
            });
        c.renderAll ();
    });
    
    // select canvas objects
    function selectCanvasObjects(selection) {
        for (let i = 0; i < c.getObjects ().length; ++i)
            if (c.item (i).name == null || c.item (i).name != "gridLine")
                c.item (i).set ('selectable', selection);
            else 
                console.log (c.item (i));
    }
    
    $(":button").click(function() {
        if (selection) {
            var id = $(this).attr('id');
            if (id == 'lineBtn' || id == 'clineBtn' || id == 'circleBtn' || id == 'crossBtn' || id == 'rectBtn') {
                selectCanvasObjects (false);
                selection = false;
            }
        }
    });
    
    // Fred Yang. select (arrow), line, dash line, curve, circle buttons.
    // select (arrow) button
    $('#selectBtn').click (function () {
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        c.selection = true;
        $('#selectBtn').addClass('border');
        c.defaultCursor = 'default';
        lineDraw = xDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = true;
        selection = false;
        selectCanvasObjects (true);
        selectableLineCircles();
        c.off('mouse:down'); // turn off events used by curve line
        c.off('mouse:move');
        c.off('mouse:up');
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
            if (dashed)
                return;
          isDDown = true;
          var pointer = c.getPointer(o.e);
          var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
          dLine = new fabric.Line(points, {
              strokeWidth: c.width / strokeFactor,
              fill: self.colour (),
              stroke: self.colour (),
              originX: 'center',
              originY: 'center',
              selectable: false,
              perPixelTargetFind: true,
              shadow: 'rgba(0,0,0,1) 5px 5px 7px',
              strokeDashArray: [10, 10]
          });
          c.add (dLine);
         });

        c.on ('mouse:move', function(o){
            if (dashed || !isDDown)
                return;
            var pointer = c.getPointer(o.e);
            dLine.set({ x2: pointer.x, y2: pointer.y });
            c.renderAll();
        });

        c.on('mouse:up', function(o){
            if (dashed)
                return;
            isDDown = false;    
            dLine.setCoords();
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
        if (!selection)
            unselectobjects ();
        xDraw = cDraw = clDraw = rDraw = tDraw = oDraw = selection = textC = dashed = true;
        lineDraw = false;
        c.defaultCursor = 'default';
        c.on('mouse:down', function(o) {
            if (lineDraw)
                return;
          isDown = true;
          var pointer = c.getPointer(o.e);
          var points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
          line = new fabric.Line(points, {
              strokeWidth: c.width / strokeFactor,
              fill: self.colour (),
              stroke: self.colour (),
              originX: 'center',
              originY: 'center',
              selectable: false,
              perPixelTargetFind: true,
              shadow: 'rgba(0,0,0,1) 5px 5px 7px',
          });
          c.add (line);
        });

        c.on ('mouse:move', function(o){
            if (lineDraw || !isDown)
                return;
            var pointer = c.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            c.renderAll();
        });

        c.on('mouse:up', function(o){
            if (lineDraw)
                return;
            isDown = false;    
            line.setCoords();
        }); 
    });     

    // curve button
    $('#cLineBtn').click (function () {
        
        if (!selection)
            unselectobjects ();
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
            console.log ('clDraw: ' + clDraw);
            if (clDraw)
                return;
            isCDown = true;
            pointer = c.getPointer(o.e);

            cline = makeCurveLine(pointer.x, pointer.y);
            p1 = cline.circle1;
            p2 = cline.circle2;
            c.add(cline);
            cline.setCoords();            
            clDraw = true;
        });
        
        c.on ('mouse:move', function(o) {
            clDraw = false;
            if (clDraw || !isCDown)
                return;

            var pointer = c.getPointer(o.e);
            cline.path[1][3] = pointer.x;
            cline.path[1][4] = pointer.y;
            p2.setLeft(pointer.x - 12);
            p2.setTop(pointer.y - 12);
            cline.path[1][1] = pointer.x - 100;
            cline.path[1][2] = pointer.y - 50;
            p1.setLeft(cline.path[1][1] - 12);
            p1.setTop(cline.path[1][2] - 12);
            c.renderAll();
        });

        c.on('mouse:up', function(o){
            if (clDraw)
                return;
            isCDown = false;
            c.deactivateAll().renderAll();
            p1.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });

            c.deactivateAll().renderAll();
            cline.circle0.setCoords();
            cline.circle1.setCoords();
            cline.circle2.setCoords();
            cline.setCoords();
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

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }
            
            var circle = new fabric.Circle ({
               radius : c.width / radiusFactor,
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
               strokeWidth : c.width / strokeFactor,
               left   : px - c.width / radiusFactor,
               top    : py - c.width / radiusFactor,
               selectable: false,
               perPixelTargetFind: true,
               shadow: 'rgba(0,0,0,1) 5px 5px 7px'
            });

            c.add(circle);
        });
    });
    
    // Justen DePourcq: cross(X), rectangle, triangle, oval, text buttons
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

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }
            
            var cross  = new fabric.Text('X', { 
                left: px - c.width / 94.6, 
                top : py - c.width / marginFactor,
                fontFamily: 'Arial', 
                fontSize: c.width / fontFactor,
                textAlign: 'center',
                fill: self.colour (),
                selectable: false,
                perPixelTargetFind: true,
                shadow: 'rgba(0,0,0,1) 5px 5px 7px',
                name: 'cross'
            });
            c.add(cross);
            cross.setCoords();
        });
    });
    
    // rectangle button
    $('#rectBtn').click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#rectBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = tDraw = oDraw = selection = textC = true;
        rDraw    = false;
        c.defaultCursor = 'crosshair'; 

        c.on ('mouse:down', function (e) {
            if (rDraw) return;
            var px, py;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }
            
            var rect  = new fabric.Rect ({
               fill: 'rgba(0,0,0,0)',
               stroke : self.colour (),
               strokeWidth : c.width / strokeFactor,
               left   : px - c.width / marginFactor,
               top    : py - c.width / marginFactor,
               width: c.width / dimenFactor,
               height: c.width / dimenFactor,
               perPixelTargetFind: true,
               shadow: 'rgba(0,0,0,1) 5px 5px 7px',
               selectable: false
            });
            c.add(rect);
        });
    });
    
    // triangle button
    $('#triangleBtn').click (function () {
        if (!selection)
            unselectobjects ();
        c.selection = false;
        $('.toolbtn').each(function(index){
            $(this).removeClass('border');
        });
        $('#triangleBtn').addClass('border');
        c.off('mouse:down');
        lineDraw = cDraw = clDraw = xDraw = rDraw = oDraw = selection = textC = true;
        tDraw = false;
        c.defaultCursor = 'crosshair';        
        
        c.on ('mouse:down', function (e) {
            if (tDraw) return;            
            var px, py;

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }

            var triangle = new fabric.Triangle({
                width: c.width / dimenFactor,
                height: c.width / dimenFactor,
                selectable: false,
                fill: 'rgba(0,0,0,0)',
                stroke: self.colour (),
                strokeWidth: c.width / strokeFactor,
                left   : px - c.width / marginFactor,
                top    : py - c.width / marginFactor,
                angle: 0,
                perPixelTargetFind: true,
                shadow: 'rgba(0,0,0,1) 5px 5px 7px'
            });
            c.add(triangle);
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
               rx : c.width / ovalRadiusFactor,
               ry : c.width / ovalRadiusFactor * 0.8,
               fill: self.colour (),
               stroke : self.colour (),
               strokeWidth : c.width / strokeFactor,
               left   : px - c.width / radiusFactor,
               top    : py - c.width / radiusFactor,
               selectable: false,
               perPixelTargetFind: true,
               shadow: 'rgba(0,0,0,1) 5px 5px 7px'
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

            if (isMobile) {
                px = c.getPointer(e.e).x;
                py = c.getPointer(e.e).y;
            } else {
                px = e.e.offsetX;
                py = e.e.offsetY;
            }

            textObj = new fabric.IText('Tap and Type', { 
              fontFamily: 'Arial', 
              fontSize: c.width / fontFactor,
              left: px - c.width / 7.2, 
              top : py - c.width / 30,
              selectable: false,
              perPixelTargetFind: true,
              textAlign: 'center',
              shadow: 'rgba(0,0,0,1) 5px 5px 7px',
              fill: self.colour (),
              name: 'userText'
            });
            c.add(textObj);
        });
    });

    // save Play info
    $("#canvasPng").click (function() {
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

        document.getElementById('canvasImgSaved').src = dataURL;
        // specify width for mobile compatible
        document.getElementById("canvasImgSaved").style.width = c.width;

        playName = $("#playName").val();
        playInfo = $("#playInfo").val();

        if (editCanvas) {
            dataSend = { "playId" : editCanvasId, "playName" : playName, "playInfo" : playInfo, "playJson" : canJSON };
        } else {
            dataSend = { "playId" : 0, "playName" : playName, "playInfo" : playInfo, "playJson" : canJSON };
        } 
        console.log (dataSend);
           
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
    
    // handle keydown events
    $(document).keydown(function (e) {
      if(e.which == 46) {
        var objArr = c.getActiveGroup();
        if (objArr == null) {
            var obj = c.getActiveObject();
            if (obj != null && obj.name != "gridLine")
                c.remove (obj);
        } else {
            c.getActiveGroup().forEachObject(function(o) {
                console.log (o);
                if (o.name != "gridLine")
                    c.remove (o);
                });
            c.discardActiveGroup().renderAll();
        }
        c.renderAll ();
      }
    });
    
    canvasWrapper.tabIndex = 1000;
    
    // add keydown listener
    canvasWrapper.addEventListener('keydown', function(e) {
        
        if (e.keyCode == 17) 
            ctrlDown = true;
      
        if (ctrlDown && e.keyCode == 67) {
            copiedObjects = [];
        
        var activeObject = c.getActiveObject(),
            activeGroup = c.getActiveGroup();
            
        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
          
            c.discardActiveGroup();
          
            objectsInGroup.forEach(function(object) {
                copiedObjects.push(object);
            });
         } else if (activeObject)
            copiedObjects.push(activeObject);
        };

        if (ctrlDown && e.keyCode == 86) {
            var count = 0;
            if (copiedObjects.length == 1) {
                if (fabric.util.getKlass(copiedObjects[0].type).async) {
                    copiedObjects[0].clone(function(clone) {                  
                        pasteOne(clone);                  
                        selectAll(1);
                    });
                } else {
                    pasteOne(copiedObjects[0].clone());
                    selectAll(1);
                }
            } else if(copiedObjects.length > 1) { 
                for (var index = (copiedObjects.length - 1); index >= 0; --index) {
                    if (fabric.util.getKlass(copiedObjects[index].type).async) {
                        copiedObjects[index].clone(function(clone) {
                            pasteOne(clone);
                            if (++count == copiedObjects.length)
                                selectAll(copiedObjects.length);
                        });
                    } else{
                    pasteOne(copiedObjects[index].clone());
                    if (++count == copiedObjects.length) {
                    selectAll(copiedObjects.length);
                }
            }
          }
        }
      }
    }, false);
    
    // add keyup listener  
    canvasWrapper.addEventListener('keyup', function(e) {
        if (e.keyCode == 17) 
            ctrlDown = false;
    });
    
    // remove curve line
    function deleteCurveLine(line) {
        console.log('remove: ' + line.name)
        c.remove(line.circle0);
        c.remove(line.circle1);
        c.remove(line.circle2);
        c.remove(line);
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
            originX: 'center', // c.width / 2,// 'center',
            originY: 'center' // c.height / 2//  'center'
        });
        c.setActiveGroup(group.setCoords()).renderAll();
    }
    
    canvasWrapper.addEventListener('keydown', function(e) {        
        if (e.keyCode == 17) 
            ctrlDown = true;
      
        if (selection)
            return;
        if (ctrlDown && e.keyCode == 65) {
            if (!snapToGrid)
                c.setActiveGroup(new fabric.Group(c.getObjects())).renderAll(); // (Select all without grid)
            else  {
                var objs = c.getObjects (), groupObjs = new Array ();
                for (let i = 0; i < objs.length; ++i)
                    if (c.item (i).name != "gridLine")
                        groupObjs.push(c.item (i));
                c.setActiveGroup(new fabric.Group(groupObjs)).renderAll();
            }
        }
    });
    
    // build curve line
    function makeCurveLine(p0x, p0y, p1x = p0x - 50, p1y = p0y - 50, p2x = p0x, p2y = p0y) {                
        var cl = new fabric.Path('M ' + p0x + ' '  + p0y + ' Q ' + p1x + ', ' + p1y + ', ' + p2x + ', ' + p2y,
            { fill: 'rgba(0,0,0,0)', stroke: self.colour(), strokeWidth: 5, objectCaching: false, perPixelTargetFind: true,
              selectable: false, hasBorders: false, shadow: 'rgba(0,0,0,1) 5px 5px 7px'});

        cl.name = "curve";        
        p1 = makeCurvePoint(cl.path[1][1], cl.path[1][2], null, cl, null);
        p1.name = "p1";        
        c.add(p1);

        p0 = makeCurveCircle(cl.path[0][1], cl.path[0][2], cl, p1, null);
        p0.name = "p0";
        c.add(p0);

        p2 = makeCurveCircle(cl.path[1][3], cl.path[1][4], null, p1, cl);
        p2.name = "p2";
        c.add(p2);
        cl.circle0 = p0;
        cl.circle1 = p1;
        cl.circle2 = p2;
        c.add(cl);

        return cl;
    }
    
    // build curve circle
    function makeCurveCircle(left, top, line1, line2, line3) {
        var rad = 12; // radius of p0 and p2 circles (l ends circles)
        var cc = new fabric.Circle({
          left: left - rad,
          top: top - rad,
          strokeWidth: 5,
          radius: rad,
          fill: '#fff',
          stroke: '#666',
          selectable: false,
          shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });

        cc.hasBorders = c.hasControls = false;

        cc.line1 = line1;
        cc.line2 = line2;
        cc.line3 = line3;
        cc.setLine1 = function(l) {
            this.line1 = l;
        }
        cc.setLine3 = function(l) {
            this.line3 = l;
        }
        
        return cc;
    }

    // build curve point
    function makeCurvePoint(left, top, line1, line2, line3) {
        var rad = 14; // radius of p1 circle (skewing circle)
        var cp = new fabric.Circle({
          left: left - rad,
          top: top - rad,
          strokeWidth: 8,
          radius: rad,
          fill: '#fff',
          stroke: '#666',
          selectable: false,
          perPixelTargetFind: true,
          shadow: 'rgba(0,0,0,1) 5px 5px 7px'
        });

        cp.hasBorders = cp.hasControls = false;
        
        cp.line1 = line1;
        cp.line2 = line2;
        cp.line3 = line3;
        cp.setLine2 = function(l) {
            this.line2 = l;
        }        
       
        return cp;
    }

    var offsetX;
    var offsetY;

    function onObjectSelected(e) {
        var activeObject = e.target;
        pointer = c.getPointer(e.e);
        offsetX = pointer.x;
        offsetY = pointer.y;
        //console.log(offsetX)
        //console.log(offsetY)
        //console.log(activeObject.name);
        if (activeObject.name == "p0" || activeObject.name == "p2") {
            activeObject.line2.animate('opacity', '1', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
        } else if (activeObject.name == "curve") {            
            hideLineCircles();   
        }

        $(document).keydown(function (e) {
            if(e.which == 46) {
                if (activeObject.name == "p0" || activeObject.name == "p1" || activeObject.name == "p2") {
                    var l;
                    if(activeObject.line2.name == "curve")
                        l = activeObject.line2;
                    else if (activeObject.line1)
                        l = activeObject.line1;
                    else if (activeObject.line3)
                        l = activeObject.line3;
                    deleteCurveLine(l);
                    c.discardActiveGroup().renderAll();
                }
            }
        });
    }    

    function onBeforeSelectionCleared(e) {
        var activeObject = e.target;
        if (activeObject.name == "p0" || activeObject.name == "p2") {
            activeObject.line2.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
        } else if (activeObject.name == "p1") {
            activeObject.animate('opacity', '0', {
                duration: 200,
                onChange: c.renderAll.bind(c),
            });
        }
    }

    function onObjectMoving(e) {
        var p0x;
        var p0y;
        var p1x;
        var p1y;
        var p2x;
        var p2y;
        var pointer;
        if (e.target.name == "p0" || e.target.name == "p2") {
            var p = e.target;
            var rad = 12; // radius of p0 and p2 circles (line ends circles)
            pointer = c.getPointer(e.e);
            if (p.line1) {
                //console.log('line1');
                //cline = p.line1;
                p.line1.path[0][1] = p.left + rad;
                p.line1.path[0][2] = p.top + rad;
                p0x = p.line1.path[0][1];
                p0y = p.line1.path[0][2];
                p1x = p.line1.path[1][1];
                p1y = p.line1.path[1][2];
                p2x = p.line1.path[1][3];
                p2y = p.line1.path[1][4];
                c.renderAll();
                c.on('mouse:up', function(o){
                    //console.log('mouseup: line1');
                    deleteCurveLine(cline);
                    c.remove(p.line1);
                    cline = makeCurveLine(pointer.x, pointer.y, p1x, p1y, p2x, p2y);
                    c.renderAll();
                });    
            }
            else if (p.line3) {  
                //console.log('line3');     
                p.line3.path[1][3] = p.left + rad;
                p.line3.path[1][4] = p.top + rad;
                //cline = p.line3;
                p0x = cline.path[0][1];
                p0y = cline.path[0][2];
                p1x = cline.path[1][1];
                p1y = cline.path[1][2];
                p2x = cline.path[1][3];
                p2y = cline.path[1][4];
                c.renderAll();
                c.on('mouse:up', function(o){
                    //console.log('mouseup: line3');
                    deleteCurveLine(cline);
                    c.remove(p.line3);
                    cline = makeCurveLine(p0x, p0y, p1x, p1y, pointer.x, pointer.y);
                    c.renderAll();
                });
            }
        }
        else if (e.target.name == "p1") {
            var p = e.target;
            var rad = 14; // radius of p1 circle (skewing circle)
            if (p.line2) {
                //console.log('line2'); 
                p.line2.path[1][1] = p.left + rad;
                p.line2.path[1][2] = p.top + rad;
                pointer = c.getPointer(e.e);
                //cline = p.line2;
                p0x = cline.path[0][1];
                p0y = cline.path[0][2];
                p1x = cline.path[1][1];
                p1y = cline.path[1][2];
                p2x = cline.path[1][3];
                p2y = cline.path[1][4];
                c.renderAll();
                c.on('mouse:up', function(){
                    //console.log('mouseup: line2');
                    deleteCurveLine(cline);
                    c.remove(p.line2);
                    cline = makeCurveLine(p0x, p0y, pointer.x, pointer.y, p2x, p2y);
                    c.renderAll();
                });
            }
        }    
        else if (e.target.name == "curve") {
            console.log('clDraw:' + clDraw);
            if (clDraw) 
                return;
            var p = e.target;
            cline = p;
            p.setCoords();
            p0x = cline.path[0][1];
            p0y = cline.path[0][2];
            p1x = cline.path[1][1];
            p1y = cline.path[1][2];
            p2x = cline.path[1][3];
            p2y = cline.path[1][4];
            c.on('mouse:up', function(o){
                console.log('mouseup: curve');
                pointer = c.getPointer(e.e);
                deleteCurveLine(cline);
                cline = makeCurveLine(p0x + pointer.x  - offsetX, p0y + pointer.y  - offsetY,
                    p1x + pointer.x  - offsetX , p1y + pointer.y  - offsetY,
                    p2x + pointer.x  - offsetX, p2y + pointer.y  - offsetY);
                showLineCircles();
                c.renderAll();
            });
        }
      }
}

var model;

$(document).ready (function () {
    model = new DesignPlaybookViewModel ();
    ko.applyBindings (model);
});

function update (jscolor) {
    model.updateColour (jscolor.toHEXString());
}