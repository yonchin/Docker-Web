<?php

//获取客户端传来的要删除的镜像id
$images=trim($_GET['nameId']);
$imagesArr=explode(' ',$images);

//初始化curl
$ch = curl_init();
foreach ($imagesArr as $image) {
	$url="http://192.168.1.103:2375/images/$image?force=1";
	// $url='http://192.168.1.103:2375/images/d1592a710ac3';
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_NOBODY, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'DELETE');
	curl_exec($ch);
	echo curl_getinfo($ch,CURLINFO_HTTP_CODE);
}

curl_close($ch);





//此方法应该无法实现除GET和POST方法之外的远程获取，所以改用cRUL.
//错误：failed to open stream: HTTP request failed! HTTP/1.0 409 Conflict
//更改http请求方法为delete
// $opts = array('http' =>
// 	array(
// 		'method' =>'DELETE',
// 		// 'header' => 'Content-type: application/json'
// 	)
//  );

// $context=stream_context_create($opts);

// foreach ($imagesArr as  $image) {
// 	// echo 'test'.file_get_contents('http://192.168.1.102:2375/images/'.$image,false,$context);
// 	echo 'test'.file_get_contents('http://192.168.1.102:2375/images/17583c7dd0da',false,$context);
// }
