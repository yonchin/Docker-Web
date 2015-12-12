<?php

	include 'config.php';
	date_default_timezone_set('UTC');

	$changes=file_get_contents(DOCKER_URL.'/containers/'.$_GET["ctnerId"].'/changes');
// $changes=file_get_contents('http://192.168.1.104:2375/containers/721d8042a751/changes');

	$changes=json_decode($changes,true);
	foreach ($changes as $key => $val) {
		$arr[$key]['Path']=$val['Path'];
		switch ($val['Kind']) {
			case 0:
				$arr[$key]['Kind']='Modify';
				break;
			case 1:
				$arr[$key]['Kind']='Add';
				break;
			case 2:
				$arr[$key]['Kind']='Delete';
				break;
		}
	}


	echo json_encode($arr);