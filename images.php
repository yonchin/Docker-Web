<?php
	$images=file_get_contents('http://192.168.1.101:2375/images/json?all=1');
	echo $images;
	// 去掉不需要的数据
	$images=json_decode($images);
	// $valid=array('Id','ParentId','RepoTags','Created','VirtualSize');
	$invalid=array('RepoDigests','Size','Labels');
	foreach ($images as $key => $value) {
		$value=(array)$value;
		foreach ($invalid as $k) {
			if(array_key_exists($k,$value)){
				unset($value[$k]);
			}
		}
		//取出相应的值对其进行格式化处理
		$valid=array_keys($value);
		foreach ($valid as $vld) {
			if($vld== 'Id' || $vld == 'ParentId'){
				$value[$vld]=substr($value[$vld],0,12);

			}	

			if($vld == 'RepoTags'){

			}

			if($vld== 'Created'){
				$value[$vld]=date('Y-m-d H:i:s',$value[$vld]);
			}

			if($vld=='VirtualSize'){
				$value[$vld]=round(($value[$vld])/1000/1000,2);
			}
		}
		$arr[]=$value;
	}

	// 对剩下的有效数据进行处理
	print_r($arr);



	$images=json_encode($arr);
	echo $images;
	// var_dump($images);


