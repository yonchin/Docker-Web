<?php
 date_default_timezone_set('UTC');
 define('ROOT_PATH',dirname(__FILE__));
 define('DOCKER_URL','http://192.168.1.104:2375');

spl_autoload_register(function($className){
	include 'libs/'.$className.'.class.php';
});

 // include 'libs/CurlMethod.class.php';
 // include 'libs/DockerContainer.class.php';
 // include 'libs/DockerImage.class.php';
 // include 'libs/DockerImage.class.php';

$ctnerObj=new DockerContainer(); 
$imgObj=new DockerImage();
$chrtObj=new DockerChart();
