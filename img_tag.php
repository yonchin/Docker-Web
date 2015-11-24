<?php
//获取客户端传来的要删除的镜像id
// $images=trim($_POST['repo']);
// $imagesArr=explode(' ',$images);

// print_r(http_build_query($_POST));

//初始化curl
$ch = curl_init();
// foreach ($imagesArr as $image) {
	// /images/test/tag?repo=myrepo&force=0&tag=v42 HTTP/1.1
	// $url="http://192.168.1.103:2375/images/$image/tag?repo=$repo&force=1&tag=$tag";
	$url="http://192.168.1.103:2375/images/17583c7dd0da/tag?repo=myrepo&force=0&tag=v5";
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, true);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'POST');
	$test=curl_exec($ch);
	// print_r($test);
// }

curl_close($ch);
