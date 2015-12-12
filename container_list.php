<?php
	
	include 'config.php';
	date_default_timezone_set('UTC');

	isset($_GET['all']) ? $imgAll=$_GET['all'] : $imgAll=0;

	$containers=file_get_contents(DOCKER_URL.'/containers/json?all='.$imgAll);

	//将json数据转换为多维数组
	$containers=json_decode($containers,true);
	// $keys=array_keys($images[0]);
	// print_r($keys);
	foreach ($containers as $k => $val) {
		$Id=substr($val['Id'],0,12);
		$Names=substr($val['Names'][0],1);
		$Image=substr($val['Image'],0,30);
		$Command=substr($val['Command'],0,20);
		$Created=date('Y-m-d_H:i:s',$val['Created']);
		foreach($val['Ports'] as $value){ 
			if(array_key_exists('PublicPort',$value) && array_key_exists('PrivatePort',$value)){ 
				$Ports .= $value['IP'].':'.$value['PublicPort'].'->'.$value["PrivatePort"].'/'.$value['Type']."\n"; 
			}else if(array_key_exists('PrivatePort',$value)){ 
				$Ports .= $value["PrivatePort"].'/'.$value['Type']."\n"; 
			} 
		} 
		$line=$Id.','.$Names.','.$Image.','.$Command.','.$Created.','.$val['Status'].','.nl2br($Ports);
		$arr[]=explode(',',$line);
	}

	echo json_encode($arr);



