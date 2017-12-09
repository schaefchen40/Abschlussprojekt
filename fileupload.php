<?php
$target_dir = "uploads/";
if($_FILES["fileToUpload"]["name"] !== ""){
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$songFileType = pathinfo($target_file,PATHINFO_EXTENSION);
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = filesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        //echo "File is a song - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not a song.";
        $uploadOk = 0;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 3000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($songFileType != "mp3") {
    echo "Sorry, only MP3 files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        //echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
//echo $target_file;
// if (isset($_COOKIE["filename"])) {
//     $filename = $_COOKIE["filename"];
// } else {
//     $filename = "";
// }

setcookie("filename", $_FILES["fileToUpload"]["name"], time() + 30);
//echo($_FILES["fileToUpload"]["name"]);
}
echo "<script> location.href = 'analyze/index.html'; </script>";
?>