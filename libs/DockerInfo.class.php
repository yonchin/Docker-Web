<?php

/**
* info
*/
class DockerInfo {

	private $url;
	private $cmObj;
	private $ctnerNum;
	public function __construct(){
		$this->url=DOCKER_URL;
		$this->cmObj=CurlMethod::getInstance();
	}

	public function getDockerInfo(){
		return $this->cmObj->curlGet($this->url.'/info');
	}

	public function getDockerVersion(){
		return $this->cmObj->curlGet($this->url.'/version');
	}
}

// include 'CurlMethod.class.php';

// $test=new DockerInfo();
// echo $test->getDockerInfo();