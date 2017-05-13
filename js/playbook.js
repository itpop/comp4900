// playbook.js - handle Playbooks page
// NoName group

$(function () {
    // normal canvas
    var canvas = new fabric.Canvas("canvas");
    canvas.deactivateAll();
    canvas.selection = false;
    var canvasWrapper = document.getElementById('canvasWrapper');
    var ctx = canvas.getContext("2d");
    canvas.setWidth(canvasWrapper.clientWidth);
    canvas.setHeight((canvas.width) / whRatio);
    
    // pdf canvas
    var canvasPdf = new fabric.Canvas("canvas");
    canvasPdf.deactivateAll();
    canvasPdf.selection = false;
    var canvasWrapper = document.getElementById('canvasWrapper');
    canvasPdf.getContext("2d");
    canvasPdf.setWidth(canvasWrapper.clientWidth);
    canvasPdf.setHeight((canvasPdf.width) / whRatio);
    setupPdfBackground();

    $(window).resize(function () {
        canvas.setWidth(canvasWrapper.clientWidth);
        canvas.setHeight((canvas.width) / whRatio);
    });

    $(window).resize(function () {
        canvasPdf.setWidth(canvasWrapper.clientWidth);
        canvasPdf.setHeight((canvasPdf.width) / whRatio);
    });
    
    /**
     * Create table row
     * @param
     *   playId - play id
     *   playName - play name
     *   playInfo - play description
     *   playJson - canvas Json object which contains elements information
     *   dateCreated - created date
     * @return
     */
    var TableRow = function (playName, playInfo, playJson, dateCreated, playId) {
            this.selectRow   = ko.observable (false);
            this.playName    = playName;
            this.playInfo    = playInfo;
            this.playJson    = playJson;
            this.dateCreated = dateCreated;
            this.playId      = playId;
    }
    
    /**
     * Display play snapshot (xml format)
     * @param
     *   playJson - Canvas Json object containing elements information
     * @return
     */
    function showXMLImage(playJson) {
        dataSend = { "getXMLData" : playJson};
        $.ajax({
            type : 'POST',
            url  : 'playbookBackend.php',
            data : dataSend,
            success : function (response) {
                canvas.clear ();
                setupBackground();
                //console.log ('getXMLData: ' + response);
                var jsonArr = jQuery.parseJSON (response);
                for (let i = 0; i < jsonArr.length; ++i) {
                    if (jsonArr[i]['type'] == 'X') {
                        xmlCross  = new fabric.Text('X', { 
                            left: jsonArr[i]['x1'], 
                            top : jsonArr[i]['y1'],
                            originX : 'center',
                            originY : 'center',
                            fontFamily: 'Arial',
                            fontSize: (canvas.width / fontFactor),
                            textAlign: 'center',
                            fill: '#ffffff',
                            selectable: false,
                            perPixelTargetFind: true,
                            shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                        });
                        canvas.add (xmlCross);
                        xmlCross.setCoords();
                    } else if (jsonArr[i]['type'] == 'O') {
                        xmlCircle = new fabric.Circle ({
                           radius : canvas.width / radiusFactor,
                           fill: 'rgba(0,0,0,0)',
                           originX : 'center',
                           originY : 'center',
                           stroke : '#ffffff',
                           strokeWidth : c.width / strokeFactor,
                           left   : jsonArr[i]['x1'],
                           top    : jsonArr[i]['y1'],
                           selectable: false,
                           perPixelTargetFind: true,
                           shadow: 'rgba(0,0,0,1) 5px 5px 7px'
                        });
                        canvas.add (xmlCircle);
                        xmlCircle.setCoords();
                    } else if (jsonArr[i]['type'] == 'C0') {
                        xmlCurve = makeCurveLine(jsonArr[i]['x1'], jsonArr[i]['y1'], jsonArr[i]['x2'], jsonArr[i]['y2'], 0);
                        canvas.add(xmlCurve);
                        xmlCurve.setCoords(); 
                    } else if (jsonArr[i]['type'] == 'C1') {
                        xmlCurve = makeCurveLine(jsonArr[i]['x1'], jsonArr[i]['y1'], jsonArr[i]['x2'], jsonArr[i]['y2'], 1);
                        canvas.add(xmlCurve);
                        xmlCurve.setCoords(); 
                    } else if (jsonArr[i]['type'] == 'L') {
                        var points = [ jsonArr[i]['x1'], jsonArr[i]['y1'], jsonArr[i]['x2'], jsonArr[i]['y2'] ];
                        xmlLine = new fabric.Line(points, {
                            strokeWidth: canvas.width / strokeFactor,
                            fill: '#ffffff',
                            stroke: '#ff0000',
                            originX: 'center',
                            originY: 'center',
                            selectable: false,
                            perPixelTargetFind: true,
                            shadow: 'rgba(0,0,0,1) 5px 5px 7px',
                        });
                        canvas.add(xmlLine);
                        xmlLine.setCoords(); 
                    }
                }
                canvas.renderAll ();
            }
        });
    }

    /**
     * Display play snapshot (Json format)
     * @param
     *   playJson - Canvas Json object containing elements information
     * @return
     */
    function showImage (playJson) {
        if (!isJsonString(playJson)) {
            showXMLImage(playJson);
            return;
        }

        // mobile compatible
        var savedWidth = getCanvasWidth(playJson);
        var ratio = 0.61 * (canvasInitWidth / savedWidth) * (canvas.width / canvasSnapWidth);
        
        canvas.clear ();
        canvas.loadFromJSON(playJson, canvas.renderAll.bind(canvas), function(o, object) {

        });
        canvas.deactivateAll();
        canvas.selection = false;
        canvas.forEachObject(function(object){ 
           object.selectable = false; 
        });

        canvas.setZoom(ratio);
    }

    // Canvas: set up background
    function setupBackground () {
        var ratio = 1.636;
        var img = new Image();
        img.onload = function() {
           canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas), {
                width: canvas.width * ratio,
                height: canvas.height * ratio,
                originX: 'left',
                originY: 'top',
                left: 0,
                top:  0
            });
        };
        img.src = "img/footballField.png";
    };

    // Canvas: set up pdf background
    function setupPdfBackground () {
        var ratio = 1.0;
        var img = new Image();
        img.onload = function() {
           canvasPdf.setBackgroundImage(img.src, canvasPdf.renderAll.bind(canvasPdf), {
                width: canvasPdf.width * ratio,
                height: canvasPdf.height * ratio,
                originX: 'left',
                originY: 'top',
                left: 0,
                top:  0
            });
        };
        img.src = "img/footballField.png";
    };

    /**
     * get canvas width
     * @param
     *  playJson - Json object
      * @return - canvas width
     */
    function getCanvasWidth(playJson) {
        var data = JSON.parse(playJson);
        return data.backgroundImage.width;        
    }

    /**
     * build curve line
     * @param
     *  p0x, p0y - point p0 (start) coordinates
     *  p2x, p2y - point p2 (end) coordinates
     *  type - curve style: 0 or 1
     * @return
     */
    function makeCurveLine(p0x, p0y, p2x, p2y, type) {
        var p1x, p1y;

        if (type == 0) {
            p1x = p0x - 50;
            p1y = p0y - 50;
        } else {
            p1x = p0x + 50;
            p1y = p0y + 50;
        }

        var cl = new fabric.Path('M ' + p0x + ' '  + p0y + ' Q ' + p1x + ', ' + p1y + ', ' + p2x + ', ' + p2y,
            { fill: 'rgba(0,0,0,0)', stroke: '#ffffff', strokeWidth: 5, objectCaching: false, perPixelTargetFind: true,
              selectable: false, hasBorders: false, shadow: 'rgba(0,0,0,1) 5px 5px 7px'});

        cl.name = "curve";
        canvas.add(cl);

        return cl;
    }

    /**
     * Playbook view model
     * @param
     * @return
     */
    function PlaybookViewModel () {
        var self = this;
        
        self.desc          = ko.observable ();
        self.name          = ko.observable ();
        self.TableRows     = ko.observableArray ();
        self.selected;
        self.selectedPlays = ko.observableArray();
        self.ctrlDown      = false;
        self.shiftDown     = false;
        self.dupe          = false;
        self.nameSortType  = false;
        self.dateSortType  = false;

        // add keyup listener
        document.addEventListener('keyup', function(e) {
            if (e.keyCode != 17) 
                self.ctrlDown  = false;
            if (e.keycode != 16)
                self.shiftDown = false;
        });
        
        // add keydown listener
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 17) {
                self.ctrlDown  = true;
            } else {
                self.ctrlDown  = false;
            }

            if (e.keycode == 16) {
                self.shiftDown = true;
            } else
                self.shiftDown = false;
        });        
      
        // edit playbook
        self.editPlaybook = function () {
            var canJSON;
            if (self.selectedPlays ().length > 1)
                alert ('Too many rows selected');
            else if (self.selectedPlays ().length == 0)
                alert ('Please select a row');
            else {
                sessionStorage.setItem('id', self.selectedPlays()[0].playId);
                sessionStorage.setItem('name', self.selectedPlays()[0].playName);
                sessionStorage.setItem('info', self.selectedPlays()[0].playInfo);

                if (isJsonString(self.selectedPlays()[0].playJson)) {
                    sessionStorage.setItem('canvas', self.selectedPlays()[0].playJson);
                } else {
                    canJSON = JSON.stringify (canvas);
                    sessionStorage.setItem('canvas', canJSON);
                }
                window.location = "design.php";
            }
        }
        
        // sort by name
        self.nameSort = function () {
            if (self.nameSortType) {
                self.TableRows.sort (function (left, right) {
                    return -1 * left.playName.localeCompare(right.playName);
                });
                self.nameSortType = false;
            } else {
                self.TableRows.sort (function (left, right) {
                    return left.playName.localeCompare(right.playName);
                });
                self.nameSortType = true;
            }
        };
        
        // sort by date
        self.dateSort = function () {
            if (self.dateSortType) {
                self.TableRows.sort (function (left, right) {
                    return left.dateCreated == right.dateCreated ? 0 : left.dateCreated < right.dateCreated;
                });
                self.dateSortType = false;
            } else {
                self.TableRows.sort (function (left, right) {
                     return left.dateCreated == right.dateCreated ? 0 : left.dateCreated > right.dateCreated;
                });
                self.dateSortType = true;
            }
        };
        
        // save all plays as pdf
        self.allPlaysPDF = function () {
            var doc = new jsPDF ();
            img  = new Image();
            // cross-origin HTTP request(CORS) issue calling toDataURL(). For security reasons,
            // browsers restrict cross-origin HTTP requests initiated from within scripts. 
            img.setAttribute('crossOrigin', 'anonymous');
            page = 0;
            
            ko.utils.arrayForEach(self.TableRows (), function (obj) {
                doc.text (15, 25, obj.playName);
                img.src = canvasPdf.toDataURL('JPEG');
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 100);

                canvas.clear();
                canvas.loadFromJSON(obj.playJson, canvas.renderAll.bind(canvas), function(o, object) {
                });
                img.src = canvas.toDataURL('JPEG');
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 100);

                doc.text (15, 150, obj.playInfo);

                if (++page != self.TableRows().length)
                    doc.addPage ();
            });

            doc.save ("allPlays.pdf");
        };
        
        // save selected plays as pdf
        self.selectedPlaysPDF = function () {
            var doc = new jsPDF ();
            img  = new Image();
            // cross-origin HTTP request(CORS) issue calling toDataURL(). For security reasons,
            // browsers restrict cross-origin HTTP requests initiated from within scripts. 
            img.setAttribute('crossOrigin', 'anonymous');
            page = 0;

            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                doc.text (15, 25, obj.playName);
                img.src = canvasPdf.toDataURL('JPEG');
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 100);

                canvas.clear(); 
                canvas.loadFromJSON(obj.playJson, canvas.renderAll.bind(canvas), function(o, object) {
                });
                img.src = canvas.toDataURL('JPEG');
                doc.addImage (img.src, 'JPEG', 15, 40, 180, 100);

                doc.text (15, 150, obj.playInfo);

                if (++page != self.TableRows().length)
                    doc.addPage ();
            });

            doc.save('selectedPlays.pdf');
        };
        
        // select play
        self.selectPlay = function (item) {
            if (self.ctrlDown) {
                if (item.selectRow()) {
                    item.selectRow (false);
                    self.selectedPlays.remove (item);
                } else {
                    self.selectedPlays.push (item);
                    item.selectRow (true);
                }
            } else {
                if (!self.dupe) {
                    ko.utils.arrayForEach(self.TableRows (), function (obj) {
                        obj.selectRow (false);
                    });

                    self.selectedPlays.removeAll();
                    item.selectRow (true);
                    self.selectedPlays.push (item);
                } else {
                    self.selectedPlays.push (item);
                    item.selectRow (true);
                }
            }
            
            self.desc      (item.playInfo);
            self.name      (item.playName);
            showImage      (item.playJson);
            self.selected = item;
        };
        
        // clone play
        self.clonePlay = function () {  
            self.dupe = true;
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                ko.utils.arrayForEach(self.TableRows (), function (obj_) {
                    if (obj.playId == obj_.playId) {
                        var dataSend = { "clone" : 1, "playName" : obj.playName, "playInfo" : obj.playInfo, "playJson" : obj.playJson };
                        $.ajax({
                            type : 'POST',
                            url  : 'playbookBackend.php',
                            data : dataSend,
                            success : function (response) {
                                tblRow = new TableRow (obj_.playName, obj_.playInfo, obj_.playJson, obj_.dateCreated, response);
                                self.TableRows.push(tblRow);
                                self.selectPlay(tblRow);                                
                            }
                        });
                    }
                });
            });
            self.dupe = false;
        };
        
        // delete play
        self.deletePlay = function () {
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                var deleteSend = { "deleteId" : obj.playId };
                $.ajax({
                    type : 'POST',
                    url  : 'playbookBackend.php',
                    data : deleteSend,
                    success : function (response) {
                        self.TableRows.remove (obj);
                        self.selectedPlays.remove (obj);
                    }
                });
            }); 
        }

         // update play
        self.updatePlay = function () {
            ko.utils.arrayForEach(self.selectedPlays (), function (obj) {
                var updateSend = { "updateId" : obj.playId, "playName" : $("#name-input").val(), "playInfo" : $("#desc-input").val() };
                $.ajax({
                    type : 'POST',
                    url  : 'playbookBackend.php',
                    data : updateSend,
                    success : function (response) {
                       // console.log('update: ' + response);
                    }
                });
                ko.utils.arrayForEach(self.TableRows(), function (row) {
                    if (obj.playId == row.playId) {
                        row.playName = $("#name-input").val();
                        row.playInfo = $("#desc-input").val();
                        var changedIdx = self.TableRows.indexOf(row);
                        self.TableRows.splice(changedIdx , 1); // removes the item from the array
                        self.TableRows.splice(changedIdx , 0, row); // adds it back
                    }
                });
            }); 
        }
        
        // list plays
        var dataRet = { "getData" : 1 };
        
        $.ajax({
            type : 'POST',
            url  : 'playbookBackend.php',
            data : dataRet,
            success : function (response) {
                var objArr = jQuery.parseJSON(response);
                for (let i = 0; i < objArr.length; ++i)
                    self.TableRows.push (new TableRow (objArr[i].PlayName, objArr[i].PlayInfo, objArr[i].PlayJson, objArr[i].CreateDate, objArr[i].PlayId));
                if (self.TableRows ().length > 0)
                    self.selectPlay (self.TableRows()[0]);
            }
        }); 
    }

    ko.applyBindings (new PlaybookViewModel ());
});