<?php
include 'config.php';
//获取客户端传来的要删除的镜像id
$containers=trim($_POST['ctnerId']);
$containersArr=explode(' ',$containers);

//初始化curl
$ch = curl_init();
foreach ($containersArr as $container) {
	$url=DOCKER_URL."/containers/$container?force=1";
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
