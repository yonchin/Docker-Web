<?php
	
	include 'config.php';
	date_default_timezone_set('UTC');

	$inspect=file_get_contents(DOCKER_URL.'/containers/'.$_GET['cnterId'].'/json');
	echo $inspect;
