/*
Custom File Input
By: Alex Sperellis

Inspired and Uses Bootstrap 4 Custom File:
https://v4-alpha.getbootstrap.com/components/forms/#file-browser

Description:
Custom Styled File Input for HTML Forms. JS used to update content property when file selection is made by the user.
*/

var customFileInput = function(inputID) {
    //set id of input based on params passed in. default is file
    const id = inputID || "file";
    const fileInput = $("#" + id);
    
    //on change of file input
    fileInput.change(function() {
      //full file path
      const fullPath = document.getElementById(id).value;
      if (fullPath) {
        //index last index location of file path slashes
        const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        //remove the excess of path
        let filename = fullPath.substring(startIndex);
        //clear out the final \ or / if exists
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
        }
        //change data attr of html element to update the file name
        $('.file-control').attr('data-filename', filename);
      }
    });
};

//optional param: input id as string - no hash(#) needed
customFileInput();