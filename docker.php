<?php

include 'config.php';
//上传文件处理
if(! empty($_FILES)){
	foreach ($_FILES['dkAddFile']['error'] as $key => $error) {
		if($error == UPLOAD_ERR_OK){
			$tmp_name = $_FILES['dkAddFile']['tmp_name'][$key];
			$name = $_FILES['dkAddFile']['name'][$key];
			$fileName=$_FILES['dkAddFile']['name'];
			move_uploaded_file($tmp_name, "./$name");
		}
	}
}

isset($_GET['all']) &&  print Factory::run($_GET['all']);
isset($_GET['ctnerId'])  && print Factory::run(explode(' ',$_GET['ctnerId']));
isset($_GET['newCtnerName'])  && print Factory::run(explode(' ',$_GET['ctnerId']),$_GET['newCtnerName']);
isset($_GET['imgId'])  && print Factory::run(explode(' ',$_GET['imgId']));
isset($_POST['dkTag'])  && isset($_POST['dkFileData']) && print Factory::run($_POST['dkTag'],$_POST['dkFileData']);
$_GET['target'] == 'DockerChart' && print Factory::run();
$_GET['target'] == 'DockerInfo' && print Factory::run();
if(isset($_GET['newTag'])){
	list($newRepo,$newTag)=explode(':', $_GET['newTag']); 
	if(! isset($newTag)){
		$newTag='latest';	
	}
	Factory::run(explode(' ',$_GET['imgId']),$newRepo,$newTag);
}
