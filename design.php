<?php include "top.php"; ?>
<html lang="en">
<head>
    <!-- STYLES -->
    <link rel="stylesheet" type="text/css" href="css/design.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery-ui.css" />
    <!-- SCRIPTS -->
    <script type="text/javascript" src="js/design.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery-menu.js"></script>
</head>
<body>
<div class="container text-center" id="mainWrapper">    
    <?php include "header.php"; ?>
    <div id="myDialog" title="Message" class="diaglog"></div>
    <div>
        <ul class='custom-menu'>
            <li class="menu-properties" data-action = "do-properties"><span class="custom-menu-text">Properties</span></li>
            <li class="menu-delete" data-action = "do-delete"><span class="custom-menu-text">Delete</span></li>
        </ul>        
    </div>
    <!-- menu modal -->
    <div id="menuModal" class="minimodal">
      <div class="minimodal-content">
        <div class="minimodal-header">
          <span class="miniclose">&times;</span>
          <span id="miniTitle"></span>
        </div>
        <div class="minimodal-body minimodal-field">
            <div class="row minimodal-row" id="dvColor">
                <div class="col-sm-3">
                    Color
                </div>
                <div class="clColor col-sm-4">
                    <select id="elementColor">
                        <option value="white" data-class="avatar" data-style="background-image: url(img/menu/white.png);">White</option>
                        <option value="yellow" data-class="avatar" data-style="background-image: url(img/menu/yellow.png);">Yellow</option>
                        <option value="gray" data-class="avatar" data-style="background-image: url(img/menu/gray.png);">Gray</option>
                        <option value="blue" data-class="avatar" data-style="background-image: url(img/menu/blue.png);">Blue</option>
                        <option value="red" data-class="avatar" data-style="background-image: url(img/menu/red.png);">Red</option>
                        <option value="black" data-class="avatar" data-style="background-image: url(img/menu/black.png);">Black</option>
                    </select>
                </div>
            </div>
            <div class="row minimodal-row" id="dvStyle">
                <div class="col-sm-3">
                    Style
                </div>
                <div class="clStyle col-sm-4">
                    <select id="elementStyle">
                        <option value="O">O</option>
                        <option value="X">X</option>
                    </select>
                </div>
            </div>
            <div class="row minimodal-row" id="dvLabel">
                <div class="col-sm-3">
                    Label
                </div>
                <div class="col-sm-5">
                    <input type="text" class="label-control" id="labelName"></input>
                </div>
                <div class="col-sm-3 item-left">
                    <button type="button" class="btn-basic-2" id="labelUpdate">Update</button>
                </div>
            </div>
            <div class="row minimodal-row minimodal-row1" id = "dvLocation">
                <div class="col-sm-3">
                    Location
                </div>
                <div class="clLocation col-sm-4">
                    <select id="elementLocation">
                        <option value="A">Above</option>
                        <option value="B">Below</option>
                        <option value="O">Over</option>
                    </select>
                </div>
            </div>
            <div class="row minimodal-row" id="dvLineStyle">
                <div class="col-sm-3">
                    Style
                </div>
                <div class="clLineStyle col-sm-4">
                    <select id="elementLineStyle">
                        <option value="solid" data-class="avatar" data-style="background-image: url(img/menu/solid.png);">Solid</option>
                        <option value="dashed" data-class="avatar" data-style="background-image: url(img/menu/dash.png);">Dashed</option>
                        <option value="zigzag" data-class="avatar" data-style="background-image: url(img/menu/zigzag.png);">ZigZag</option>
                    </select>
                </div>
            </div>
            <div class="row minimodal-row" id="dvArrowBegin">
                <div class="col-sm-3">
                    Begin
                </div>
                <div class="clArrowBegin col-sm-4">
                    <select id="elementArrowBegin">
                        <option value="none" data-class="avatar" data-style="">None</option>
                        <option value="arrow" data-class="avatar" data-style="background-image: url(img/menu/arrow.png);">Arrow</option>
                        <option value="block" data-class="avatar" data-style="background-image: url(img/menu/block.png);">Block</option>
                    </select>
                </div>
            </div>
            <div class="row minimodal-row minimodal-row1" id="dvArrowEnd">
                <div class="col-sm-3">
                    End
                </div>
                <div class="clArrowEnd col-sm-4">
                    <select id="elementArrowEnd">
                        <option value="none" data-class="avatar" data-style="">None</option>
                        <option value="arrow" data-class="avatar" data-style="background-image: url(img/menu/arrow.png);">Arrow</option>
                        <option value="block" data-class="avatar" data-style="background-image: url(img/menu/block.png);">Block</option>
                    </select>
                </div>
            </div>
        </div>
      </div>
    </div>

    <div class="container contentgap">
    <!-- Pattern modal -->
    <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h5 class="modal-title">New Play</h5>
        </div>
        <div class="modal-body">
            <div id="defensePlays">
                <h5>Defense</h5>
                <div id="defensePlaysCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" data-bind = " foreach : {data: defensePremiumArray, as: 'defense' }" role="listbox">
                        <div class="carousel-item" data-bind="css : { active:  defense.classActive}">
                            <table cellpadding="0" cellspacing="0" border="0" class="carousel-center">
                                <tr><td width="100%">
                                    <img class="modalImg" data-bind="attr : {src: defense.thumbnail}" alt="3-4">
                                </td></tr>
                                <tr><td width="100%" class="blue2 carousel-txt tinytext">
                                    <h8 class="carousel-playname" data-bind="text: defense.playname"></h8>
                                </td></tr>
                            </table>
                        </div>
                    </div>

                    <!-- Left and right controls -->
                    <div class="carousel-sect">
                    <span><a class="carousel-item-left carousel-control-left" href="#defensePlaysCarousel" role="button" data-slide="prev">
                    <span class="fa fa-chevron-left fa-3x" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                    </a></span>
                    <span class="arrow-control"><a class="carousel-item-right carousel-control-right" href="#defensePlaysCarousel" role="button" data-slide="next">
                    <span class="fa fa-chevron-right fa-3x" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                    </a></span>
                    </div>
                </div>
            </div><!--defensePlays end-->
            
            <div id="offensePlays">
                <h5>Offense</h5>
                
                <div id="offensePlaysCarousel" class="carousel slide" data-ride="carousel" data-interval="false">
                  
                  <!-- Wrapper for slides -->
                    <div class="carousel-inner" data-bind = " foreach : {data: offensePremiumArray, as: 'offense' }" role="listbox">
                    <div class="carousel-item" data-bind="css : { active:  offense.classActive}">
                        <table cellpadding="0" cellspacing="0" border="0" class="carousel-center">
                            <tr><td width="100%">
                                <img class="modalImg" data-bind="attr : {src: offense.thumbnail}" alt="Blank">
                            </td></tr>
                            <tr><td width="100%" class="blue2 carousel-txt tinytext">
                                <h8 class="carousel-playname" data-bind="text: offense.playname"></h8>
                            </td></tr>
                        </table>
                    </div>
                    </div>

                    <!-- Left and right controls -->
                    <div class="carousel-sect2">
                    <span><a class="carousel-item-left carousel-control" href="#offensePlaysCarousel" role="button" data-slide="prev">
                    <span class="fa fa-chevron-left fa-3x" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                    </a></span>
                    <span class="arrow-control"><a class="carousel-item-right carousel-control" href="#offensePlaysCarousel" role="button" data-slide="next">
                    <span class="fa fa-chevron-right fa-3x" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                    </a></span>
                    </div>
                </div>
            </div><!--offensePlays end-->
        </div><!--modal-body end-->
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" id="loadPlay">Continue</button>
        </div>
      </div><!--modal-content end-->      
     </div><!--modal-dialog end-->
    </div><!--modal end-->
 
    <!-- div contains shapes -->
    <div class="row">
        <div class="col-xl-12" id="toolbar">
            <button class="btn toolbtn" data-toggle="modal" data-target="#myModal" id="newPlayBtn">
                <img id="cursor" src="img/newplay.png" title="New Play" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id = "clearCanvasBtn">
                <img id="cursor" src="img/clear.png" title="Clear" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id = "selectBtn">
                <img id="cursor" src="img/cursor.png" title="Select" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id = "lineBtn">
                <img id="line" src="img/line_black.png" title="Solid Line" class="shapebtn" />
            </button>
            <button class = "btn toolbtn" id = "dashLine">
                <img id = "dl" src = "img/line_black_dashed.png" title="Dashed Line" class = "shapeBtn" />
            </button>
            <button class="btn toolbtn" id = "cLineBtn">
                <img id="cline" src="img/cline_black.png" title="Curve" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="circleBtn">
                <img id="o" src="img/o_black.png" title="Circle" class="shapebtn" />
            </button>
            <button class="btn toolbtn" id="crossBtn">
                <img id="x" src="img/x_black.png" title="Cross" class="shapebtn" />
            </button>            
            <button class = "btn toolbtn" id = "ovalBtn">
                <img id = "ov" src = "img/oval.png" title="Defense Zone" class = "shapeBtn" />
            </button>
            <button class = "btn toolbtn" id = "textBtn">
                <img id = "tb" src = "img/text.png" title="Label" class = "shapeBtn" />
            </button>            
        </div>
    </div>
    <div class="row">
        <div class="col-xl-12">
            <button class="btn colorbtn" id = "whiteBtn">
                <span class="fa fa-tint fa-2x white"></span>
            </button>
            <button class="btn colorbtn" id = "yellowBtn">
                <span class="fa fa-tint fa-2x yellow"></span>
            </button>
            <button class="btn colorbtn" id = "grayBtn">
                <span class="fa fa-tint fa-2x gray"></span>
            </button>
            <button class="btn colorbtn" id = "blueBtn">
                <span class="fa fa-tint fa-2x blue"></span>
            </button>
            <button class="btn colorbtn" id = "redBtn">
                <span class="fa fa-tint fa-2x red"></span>
            </button>
            <button class="btn colorbtn" id = "blackBtn">
                <span class="fa fa-tint fa-2x black"></span>
            </button>
            <span class="snapgrid"><label><input type = "checkbox" value = "SnapGrid" id = "SnapGridCheck"/>Snap To Grid</label>&nbsp;
            <label><input type = "checkbox" value = "CLCVisible" id ="CLCVisibleCheck" checked="checked"/>
            Handle Curve Lines</label></span>
        </div>
        <!--div class="col-xl-4 snapgrid">
            <label><input type = "checkbox" value = "SnapGrid" id = "SnapGridCheck"/>Snap To Grid</label>&nbsp;
            <label><input type = "checkbox" value = "CLCVisible" id ="CLCVisibleCheck" checked="checked"/>Handle Curves</label>
        </div-->
    </div>
    <div class="row">
        <!-- div contains canvas -->
        <div class="col-xl-11 col-lg-11 col-md-11 col-sm-12 col-xs-12" id = "canvasWrapper">
            <canvas id="canvas"></canvas>
        </div>
    </div>
    <div id="playDetail" class="row">
        <div class="col-xl-4">
            <div class="form-group">
                <label for="playName">Play Name<span class="error">*</span></label>
                <input type="text" class="form-control" id="playName" rows="3" placeholder="" required></input>
            </div>
        </div>      
        <div class="col-xl-5">
            <div class="form-group">
                <label for="playInfo">Play Description</label>
                <input class="form-control" id="playInfo" rows="3" placeholder=""></input>
            </div>
        </div>
        <div id="saveToggle" class="col-xl-2">
            <button class="btn btn-success" id = "canvasPng">
                Save Play
            </button>
        </div>
    </div>
    <div class="controls"><span id="errName" /></div>
    <!-- div contains saved image -->
    <div class="col-xs-12 item-none" id="canvasPNGImg">
        <div class="col-xs-12">
            <img id="canvasImgSaved">
        </div>
    </div>
    </div>
</div>
<?php include "footer.php"; ?>
</body>
</html>