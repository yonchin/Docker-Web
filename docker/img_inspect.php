<?php
	
	include 'config.php';
	date_default_timezone_set('UTC');

	$inspect=file_get_contents(DOCKER_URL.'/images/'.$_GET['imgId'].'/json');
	echo $inspect;
