<?php
$target_dir = "uploads/";
if($_FILES["fileToUpload"]["name"] !== ""){                                     //filename needs to be provided
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);     //set the file directory
    $uploadOk = 1;
    $songFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    if(isset($_POST["submit"])) {
        $check = filesize($_FILES["fileToUpload"]["tmp_name"]);                 //throws an error when troubles with file occur 
        if($check !== false) {
            $uploadOk = 1;
        } else {
            echo "Problems with the file.";
            $uploadOk = 0;
        }
    }   
    if (file_exists($target_file)) {                                            //check if file already exists
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }
    if ($_FILES["fileToUpload"]["size"] > 8000000) {                            //check file size (e.g. limit to 4 GB)
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }
    if($songFileType !== "mp3") {                                               //allow only certain file formats
        echo "Sorry, only MP3 files are allowed.";
        $uploadOk = 0;
    }
    if ($uploadOk === 0) {                                                       // Check if $uploadOk is set to 0 by an error
        echo "Sorry, your file was not uploaded.";
    }else{                                                                      // if everything is ok, try to upload file
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
        }else{
            echo "Sorry, there was an error uploading your file.";
        }
    }
    setcookie("filename", $_FILES["fileToUpload"]["name"], time() + 30);        //set filename to cookie, set expiration to now + x seconds
    //echo($_FILES["fileToUpload"]["name"]);
}
echo "<script> location.href = 'analyze/index.html'; </script>";                //call the analyzer page
?>