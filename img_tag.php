<?php
//获取客户端传来的要删除的镜像id
include 'config.php';
// print_r($_POST);
$srcImgId=$_GET['imgId'];
list($newTag['repo'],$newTag['tag'])=explode(':', $_GET['newTag']);
if(! isset($newTag['tag'])){
	$newTag['tag']='latest';
}
// echo $srcImgId;
// print_r($newTag);

//初始化curl
	$ch = curl_init();
	$url=DOCKER_URL."/images/$srcImgId/tag?repo={$newTag['repo']}&force=0&tag={$newTag['tag']}";
	// $url="http://192.168.1.103:2375/images/17583c7dd0da/tag?repo=myrepo.com/test&force=0&tag=v5";
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_NOBODY, true);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'POST');
	curl_exec($ch);

	echo curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
