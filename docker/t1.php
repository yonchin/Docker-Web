<?php

foreach ($_FILES['dkAddFile']['error'] as $key => $error) {
    if($error == UPLOAD_ERR_OK){
        $tmp_name = $_FILES['dkAddFile']['tmp_name'][$key];
        $name = $_FILES['dkAddFile']['name'][$key];
        $fileName=$_FILES['dkAddFile']['name'];
        move_uploaded_file($tmp_name, "./$name");
    }
}

print_r($_FILES);