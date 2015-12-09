<?php

	include 'config.php';
	date_default_timezone_set('UTC');

	$ps=file_get_contents(DOCKER_URL.'/containers/'.$_GET["ctnerId"].'/top?ps_args=aux');
	// $ps=file_get_contents('http://192.168.1.104:2375/containers/721d8042a751/top?ps_args=aux');
	echo $ps;
