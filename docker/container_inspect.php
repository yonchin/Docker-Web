<?php
	
	include 'config.php';
	date_default_timezone_set('UTC');

	// $url=DOCKER_URL.'/containers/'.$_GET['cnterId'].'/json';
	$inspect=file_get_contents(DOCKER_URL.'/containers/'.$_GET['ctnerId'].'/json');
	// $inspect=file_get_contents('http://192.168.1.104:2375/containers/1c6cad9777f8/json');
	echo $inspect;
	// echo $url;
