<?php
	
	date_default_timezone_set('UTC');

	 // isset($_GET['all']) ? $img=$_GET['all'] : $img=0;

	$history=file_get_contents('http://192.168.1.103:2375/images/'.$_GET['imgId'].'/history');

	// echo $history;

	//将json数据转换为多维数组
	$history=json_decode($history,true);
	// print_r($keys);
	foreach ($history as $k => $val) {
		// foreach ($val['RepoTags'] as $key => $value) {
			$Id=substr($val['Id'],0,12);
			$Created=date('Y-m-d_H:i:s',$val['Created']);
			$Size=round($val['Size']/1000/1000,2).' MB';
			$CreatedBy= substr($val['CreatedBy'],0,45);
			$line=$Id.','.$Created.','.htmlspecialchars($CreatedBy).','.$Size.','.$val['Comment'];
			// $line=$Id.','.$Created.','.htmlspecialchars($val['CreatedBy']).','.$Size.','.$val['Comment'];
			$arr[]=explode(',',$line);
			// @$line=$val['Id'].' '.$val['ParentId'].' '.htmlspecialchars($val['RepoTags'][$key]).' '.htmlspecialchars($val['RepoDigests'][$key]).' '.$val['Created'].' '.$val['Size'].' '.$val['VirtualSize'].' '.$val['Labels'];
			// $arr[]=array_combine($keys, explode(' ',$line));
		// }
	}

	echo json_encode($arr);


