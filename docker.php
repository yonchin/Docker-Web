<?php

include 'config.php';
//容器用变量
$ctnerIdArr=explode(' ',trim($_GET['ctnerId']));
$ctnerId=trim($_GET['ctnerId']);
$newCtnerName=trim($_GET['newCtnerName']);

//镜像用变量
$imgIdArr=explode(' ',trim($_GET['imgId']));
$imgId=trim($_GET['imgId']);
list($newRepo,$newTag)=explode(':', $_GET['newTag']);
if(! isset($newTag)){
	$newTag='latest';
}

$all=$_GET['all'];

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

//创建镜像用的变量
$dkFileData=trim($_POST['dkFileData']);
$tag=trim($_POST['dkTag']);

if($_GET['target'] === 'DockerContainer'){
	echo $_GET['method'] == 'start' ?  $ctnerObj->ctnerStart($ctnerIdArr) : '';
	echo $_GET['method'] == 'stop' ? $ctnerObj->ctnerStop($ctnerIdArr) : '';
	echo $_GET['method'] == 'restart' ? $ctnerObj->ctnerRestart($ctnerIdArr) : '';
	echo $_GET['method'] == 'kill' ? $ctnerObj->ctnerKill($ctnerIdArr) : '';
	echo $_GET['method'] == 'pause' ? $ctnerObj->ctnerPause($ctnerIdArr) : '';
	echo $_GET['method'] == 'unpause' ? $ctnerObj->ctnerUnpause($ctnerIdArr) : '';
	echo $_GET['method'] == 'inspect' ? $ctnerObj->ctnerInspect($ctnerId) : '';
	echo $_GET['method'] == 'top' ? $ctnerObj->ctnerTop($ctnerId) : '';
	echo $_GET['method'] == 'change' ? $ctnerObj->ctnerChange($ctnerId) : '';
	echo $_GET['method'] == 'list' ? $ctnerObj->ctnerList($all) : '';
	echo $_GET['method'] == 'rename' ? $ctnerObj->ctnerRename($ctnerId,$newCtnerName) : '';
	echo $_GET['method'] == 'del' ? $ctnerObj->ctnerDel($ctnerIdArr) : '';
}elseif ($_GET['target'] === 'DockerImage') {
	echo $_GET['method'] == 'list' ? $imgObj->imgList($all) : '';
	echo $_GET['method'] == 'del' ? $imgObj->imgDel($imgIdArr) : '';
	echo $_GET['method'] == 'create' ? $imgObj->imgCreate($tag,$dkFileData) : '';
	echo $_GET['method'] == 'history' ? $imgObj->imgHistory($imgId) : '';
	echo $_GET['method'] == 'inspect' ? $imgObj->imgInspect($imgId) : '';
	echo $_GET['method'] == 'tag' ? $imgObj->imgTag($imgId,$newRepo,$newTag) : '';
}elseif($_GET['target'] === 'imgCrt'){
	echo $chrtObj->imgCreatedNum();
}elseif($_GET['target'] === 'ctnerCrt'){
	echo $chrtObj->ctnerCreatedNum();
}elseif($_GET['target'] === 'imgNum'){
	echo $chrtObj->getImgNum();
}elseif($_GET['target'] === 'ctnerNum'){
	echo $chrtObj->getCtnerNum();
}




