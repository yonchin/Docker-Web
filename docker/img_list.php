<?php
	include 'config.php';
	date_default_timezone_set('UTC');

	 isset($_GET['all']) ? $imgAll=$_GET['all'] : $imgAll=0;

	$images=file_get_contents(DOCKER_URL.'/images/json?all='.$imgAll);

	//将json数据转换为多维数组
	$images=json_decode($images,true);
	// $keys=array_keys($images[0]);
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

	echo json_encode($arr);



