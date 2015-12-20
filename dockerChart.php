<?php


include 'config.php';


echo $chrtObj->getCtnerNum();

	// date_default_timezone_set('UTC');
	//  isset($_GET['all']) ? $imgAll=$_GET['all'] : $imgAll=0;
	// $images=file_get_contents(DOCKER_URL.'/images/json?all='.$imgAll);
	// //将json数据转换为多维数组
	// $images=json_decode($images,true);
	// foreach ($images as $k => $val) {
	// 	foreach ($val['RepoTags'] as $key => $value) {
	// 		$Created=date('Y_m_d',$val['Created']);
	// 		$arr[]=$Created;
	// 	}
	// }
	// $arr=array_count_values($arr);
	// ksort($arr);
	// $json['dtime']=array_keys($arr);
	// $json['count']=array_values($arr);
	// // print_r($json);

	// echo json_encode($json);
