<?php

	date_default_timezone_set('UTC');

	// $ps=file_get_contents('http://192.168.1.103:2375/containers/'.$_GET['cnterId'].'/top?ps_args=aux');
	$ps=file_get_contents('http://192.168.1.103:2375/containers/721d8042a751/top?ps_args=aux');
	echo $ps;
