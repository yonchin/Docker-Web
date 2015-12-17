<?php

// // include 'config.php';
// define('DOCKER_URL','http://192.168.1.104:2375');
// define('ROOT_PATH', dirname(__FILE__));


// // echo ROOT_PATH;


// spl_autoload_register(function($className){
// 	require ROOT_PATH.'/libs/'.$className.'.class.php';
// });




function oper($method,$args){

	return  $_GET['method'] == 'start' ?  $ctnerObj->ctnerStart($ctnerIdArr) : '';
}



include 'config.php';
$ctnerIdArr=explode(' ',trim($_GET['ctnerId']));
$ctnerId=trim($_GET['ctnerId']);
$newCtnerName=trim($_GET['newCtnerName']);

$imgIdArr=explode(' ',trim($_GET['imgId']));
$imgId=trim($_GET['imgId']);
list($newRepo,$newTag)=explode(':', $_GET['newTag']);
if(! isset($newTag)){
	$newTag='latest';
}

$all=$_GET['all'];

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
	echo $_GET['method'] == 'create' ? $imgObj->imgCreate($tag,$file) : '';
	echo $_GET['method'] == 'history' ? $imgObj->imgHistory($imgId) : '';
	echo $_GET['method'] == 'inspect' ? $imgObj->imgInspect($imgId) : '';
	echo $_GET['method'] == 'tag' ? $imgObj->imgTag($imgId,$newRepo,$newTag) : '';
}






