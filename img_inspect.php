<?php
	
	date_default_timezone_set('UTC');

	$inspect=file_get_contents('http://192.168.1.103:2375/images/'.$_GET['imgId'].'/json');
	echo $inspect;
