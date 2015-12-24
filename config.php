<?php
 date_default_timezone_set('UTC');
 define('ROOT_PATH',dirname(__FILE__));
 define('DOCKER_URL','http://192.168.1.104:2375');

spl_autoload_register(function($className){
	include_once 'libs/'.$className.'.class.php';
});

// function run($args){
// 	call_user_func(array(new $_GET['target'], $_GET['method']),$args);
// }

 // include 'libs/CurlMethod.class.php';
 // include 'libs/DockerContainer.class.php';
 // include 'libs/DockerImage.class.php';
 // include 'libs/DockerImage.class.php';

// if(!isset($ctnerObj) && $ctnerObj instanceof DockerContainer ){
// 	$ctnerObj=new DockerContainer(); 
// }
// if(isset($imgObj) && $imgObj instanceof DockerContainer ){
// 	$imgObj=new DockerImage();
// }
// if(isset($chrtObj) && $chrtObj instanceof DockerContainer ){
// 	$chrtObj=new DockerChart();
// }
// if(isset($infoObj) && $infoObj instanceof DockerContainer ){
// 	$infoObj=new DockerInfo();
// }
