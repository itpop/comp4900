<?php include "top.php"; ?>
<html>
<head>
    <!-- STYLES -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- SCRIPTS -->
    <script language="JavaScript" type="text/javascript">
        $(document).ready(function() {
            $(".open-button").on("click", function() {
              $(this).closest('.collapse-group').find('.collapse').collapse('show');
            });

            $(".close-button").on("click", function() {
              $(this).closest('.collapse-group').find('.collapse').collapse('hide');
            });            
        });
    </script>
</head>
<body>
    <div class="container text-center" id="mainWrapper">
    <?php include "header.php"; ?>
        <div class="contentwrap2">
            <!-- Page Features -->
            <div class="row ">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <h2>FAQs</h2>
                <div class="collapse-group">
                      <div class="controls">
                        <button id="openAll" class="btn btn-primary open-button" type="button">
                          Open all
                        </button>
                        <button id="closeAll" class="btn btn-primary close-button" type="button">
                          Close all
                        </button>
                      </div>

                      <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingOne">
                          <h4 class="panel-title">
                            <a role="button" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne" class="trigger collapsed">
                              Designing your play
                            </a>
                          </h4>
                        </div>
                        <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                          <div class="panel-body text-justify">
                            <h4>Create a play</h4> 
                            <p>To create new play, click the "New Play" button.  NOTE: clicking this will lose any unsaved changes to the current play.</p>
                            <h4>Use templates</h4>
                            <p>Choose your offensive and/or defensive template and click continue.</p>
                            <h4>Get more templates</h4>
                            <p>The free version provides 2 offensive and 2 defensive templates.  The <em>premium membership</em> has 9 offensive and 9 defensive templates.</p>
                            <h4>Draw a new player</h4>
                            <p>Click on the button for the shape you would like to use (X or O) and click on the desired location.  </p>
                            <h4>Draw a new line</h4>
                            <p>Click on the line button, click on where you would like the line to start and drag to the end point.</p>
                            <h4>Move a player/line</h4>
                            <p>Click on the shape and drag to the appropriate spot.  If you are currently using the player or line tool, click on the select button first.</p>
                            <h4>Change a player's color, shape, or label? <br><em>Premium Only</em></h4>
                            <p>Right click on the player and choose "Properties"</p>
                            <h4>Change a line's color, shape, or arrow <br><em>Premium Only</em></h4>
                            <p>Right click on the line and choose "Properties"</p>
                            <h4>Delete a player/line</h4>
                            <p>Right click on the shape and choose "Delete"</p>
                            <h4>Name the play and provide a description</h4>
                            <p>Click play info, update the information and click save</p>
                            <h4>Line up players</h4>
                            <p>Choose Snap to Grid</p>
                            <h4>Print play <br><em>Premium Only</em></h4>
                            <p>Plays can be printed from the Playbook.</p>    
                          </div>
                        </div>
                      </div>

                      <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingTwo">
                          <h4 class="panel-title">
                            <a role="button" data-toggle="collapse" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" class="trigger collapsed">
                              Playbook premium only
                            </a>
                          </h4>
                        </div>
                        <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                          <div class="panel-body text-justify">
                            <h4>Remove play  </h4> 
                            <p>Select play(s) (using ctrl+click allows multiple selections), click "Play", then click "Delete".  Confirm the deletion. NOTE: This will permanently delete the play and cannot be undone.</p>
                            <h4>Edit Play </h4> 
                            <p>Select play, click "Play", then click "Edit"</p>
                            <h4>Copy play  </h4> 
                            <p>Select play, click "Play", then click "Duplicate".  This will make an exact copy of the play.</p>
                            <h4>Update play name and description  </h4> 
                            <p>Select play, update the Name and/or Description fields.  Click "Update".</p>
                            <h4>Print individual/selected plays  </h4> 
                            <p>Select play(s) (using ctrl+click allows multiple selections), click "Print to PDF", click "Selected Plays".  Choose number of plays to be displayed on each page.</p>
                            <h4>Print all plays  </h4> 
                            <p>Click "Print to PDF", click "All Plays".  Choose number of plays to be displayed on each page.</p>     
                          </div>
                        </div>
                      </div>                      
                        
                      <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="headingThree">
                          <h4 class="panel-title">
                            <a role="button" data-toggle="collapse" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree" class="trigger collapsed">
                              Trouble shooting and some common issues
                            </a>
                          </h4>
                        </div>
                        <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                          <div class="panel-body text-justify">
                            <h4>Design and Playbook are not showing</h3> 
                            <p>Firefox has recently stopped supporting Adobe Flash, a key component of our product.  We are working to resolve this.  Until that occurs, you can still access all functionality using another browser such as <a href="http://www.google.com/chrome/">Google Chrome</a> or <a href="https://www.microsoft.com/en-us/download/internet-explorer.aspx">Microsoft Internet Explorer</a></p> 
                            <h4>I am using a MAC and do not have right click</h3> 
                            <p>Double click will also bring up the player/line properties dialog.</p>
                            <h4>Plays are not adding to the playbook</h3> 
                            <p></p><ol><li>Make sure you have a premium subscription</li><li>FPO opens a new page on save, check that your popup blockers are not preventing this.</li></ol><p></p>
                            <h4>I signed up for a premium subscription, but I don"t see it.  </h3> 
                            <p></p><ol>
                                <li>Log out of the system
                                    </li><li>Close your browser
                                    </li><li>Reopen your browser
                                    </li><li>Log in to the system.
                                </li></ol><p></p>
                          </div>
                        </div>
                      </div> 

                </div> <!-- collapse-group-->
                </div>
            </div>

             <div class="row text-center">                        
                <div class="col-lg-8 col-lg-offset-2">
                    <h2>Give us your feedback</h2>
                    <form id="contactForm" method="post" action="supportDo.php">
                        <div class="messages"></div>
                        <div class="controls">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="firstname">Firstname</label>
                                        <input id="firstname" type="text" name="firstname" class="form-control" required="required" data-error="Firstname is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="lastname">Lastname</label>
                                        <input id="lastname" type="text" name="lastname" class="form-control"  required="required" data-error="Lastname is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="email">Email</label>
                                        <input id="email" type="email" name="email" class="form-control"  required="required" data-error="Valid email is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="subject">Subject</label>
                                        <input id="subject" type="tel" name="subject" class="form-control" required="required" data-error="Subject is required.">
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="message">Message</label>
                                        <textarea id="message" name="message" class="form-control" placeholder="" rows="4" required="required" data-error="Please leave a message."></textarea>
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <!-- Replace data-sitekey with your own one, generated at https://www.google.com/recaptcha/admin -->
                                        <div class="g-recaptcha" data-sitekey="6Le9tSAUAAAAAMEUd3nLOxQ5s1o4Bs0X276g6zqU"></div>
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <input type="submit" class="btn btn-primary" value="Send message">
                                </div>
                            </div>                            
                        </div>
                    </form>
                </div>            
             </div> <!-- row text-center -->
        </div>
    </div>
    <?php include "footer.php"; ?>
</body>
</html>