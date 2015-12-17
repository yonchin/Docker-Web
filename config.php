<?php
 date_default_timezone_set('UTC');
 define('DOCKER_URL','http://192.168.1.104:2375');
 include 'libs/CurlMethod.class.php';
 include 'libs/DockerContainer.class.php';
 include 'libs/DockerImage.class.php';

$ctnerObj=new DockerContainer(); 
$imgObj=new DockerImage();
