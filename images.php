<?php
	
	date_default_timezone_set('UTC');


	$images=file_get_contents('http://192.168.1.101:2375/images/json?all='.$_GET['all']);
	// echo $images;

	//将json数据转换为多维数组
	$images=json_decode($images,true);
	$keys=array_keys($images[0]);
	// print_r($keys);
	foreach ($images as $k => $val) {
		foreach ($val['RepoTags'] as $key => $value) {
			$Id=substr($val['Id'],0,12);
			$ParentId=substr($val['ParentId'],0,12);
			list($Repository,$Tag)=explode(':',$val['RepoTags'][$key]);
			$Created=date('Y-m-d_H:i:s',$val['Created']);
			$VirtualSize=round($val['VirtualSize']/1000/1000,2).' MB';
			$line=$Id.','.$ParentId.','.htmlspecialchars($Repository).','.htmlspecialchars($Tag).','.$Created.','.$VirtualSize;
			$arr[]=explode(',',$line);
			// @$line=$val['Id'].' '.$val['ParentId'].' '.htmlspecialchars($val['RepoTags'][$key]).' '.htmlspecialchars($val['RepoDigests'][$key]).' '.$val['Created'].' '.$val['Size'].' '.$val['VirtualSize'].' '.$val['Labels'];
			// $arr[]=array_combine($keys, explode(' ',$line));
		}
	}
	// print_r($arr);

	echo json_encode($arr);



