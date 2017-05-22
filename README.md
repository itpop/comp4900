---------------------------------------------------------------
             Football Playbook Online - Readme
---------------------------------------------------------------
This readme outlines the steps on how to run the application.

Instruction:

    * Design Page:
     - Select a tool at the top, colours on the right are optional
     - Start drawing on the canvas
     - For the shapes it is as simple as clicking on the canvas
     - For the lines, you must click and drag
     - For the Text, you click on the canvas, select the select tool, double click to edit the text
     - Use right click menu to edit properties of the element specified. You can change / edit color, style,
       arrow style, label for the element specified.
     - To save, fill out the form at the bottom and hit save, it generates a png and saves the attributes of all 
       objects on the canvas to the database.
     - Support both JSON and XML based data.
     - Mobile friendly.
     
    * Playbook Page:
     - Click on "Play" tab to create, edit, clone or delete plays.
     - Click on "Print to PDF" to print the plays selected or all plays to PDF.
     - PDF Print supports Android / iOS mobile phones.
    
    * Installation
     - Put "Playbook" folder into htdocs after setting up PHP and Apache
     - Run sql scripts under the folder "database" accordingly
     - In PHP files, you may be required to change the username and password for MySQL credentials
     - Start Apache
     - In your preffered browser type, open localhost/LOCATION OF FOLDER/index.html or just localhost/LOCATION OF FOLDER
