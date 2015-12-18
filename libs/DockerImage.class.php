<?php
class DockerImage{
	private $url;
	private $cmObj;

	public function __construct(){
		$this->url=DOCKER_URL . '/images/';
		$this->cmObj=new CurlMethod();
	}

	public function imgTag($imgId,$newRepo,$newTag){
		$this->cmObj->curlPost($this->url.$imgId.'/tag?repo='.$newRepo.'&force=0&tag='.$newTag);
		return $this->cmObj->curlHttpCode();
	}
	public function imgDel($imgIdArr){
		foreach ($imgIdArr as $imgId) {
			$this->cmObj->curlDelete($this->url.$imgId.'?force=1');
		}
		return $this->cmObj->curlHttpCode();
	}

	public function imgInspect($imgId){
		return $this->cmObj->curlGet($this->url.$imgId.'/json');
	}

	public function imgHistory($imgId){
		$history=$this->cmObj->curlGet($this->url.$imgId.'/history');
		foreach (json_decode($history,true) as $k => $val) {
			$Id=substr($val['Id'],0,12);
			$Created=date('Y-m-d_H:i:s',$val['Created']);
			$Size=round($val['Size']/1000/1000,2).' MB';
			$CreatedBy= substr($val['CreatedBy'],0,45);
			$line=$Id.','.$Created.','.htmlspecialchars($CreatedBy).','.$Size.','.$val['Comment'];
			$arr[]=explode(',',$line);
		}

		return json_encode($arr);
	}

	public function imgList($all){
		$imglist=$this->cmObj->curlGet($this->url.'json?all='.$all);
		foreach (json_decode($imglist,true) as $k => $val) {
			foreach ($val['RepoTags'] as $key => $value) {
				$Id=substr($val['Id'],0,12);
				$ParentId=substr($val['ParentId'],0,12);
				list($Repository,$Tag)=explode(':',$val['RepoTags'][$key]);
				$Created=date('Y-m-d_H:i:s',$val['Created']);
				$VirtualSize=round($val['VirtualSize']/1000/1000,2).' MB';
				$line=$Id.','.$ParentId.','.htmlspecialchars($Repository).','.htmlspecialchars($Tag).','.$Created.','.$VirtualSize;
				$arr[]=explode(',',$line);
			}
		}	
		return json_encode($arr);
	}

	public function imgCreate($tag,$dkFileData){
		file_put_contents('Dockerfile', $dkFileData);
		$dkfiletar=new PharData('Dockerfile.tar');
		$dkfiletar->addFile('Dockerfile');
		//执行此行代码后生成Dockerfile.tar.gz文件
		$dkfiletar->compress(Phar::GZ);
		$this->cmObj->curlPostFile(DOCKER_URL.'/build?t='.$tag.'&nocache=1','Dockerfile.tar.gz', array('Content-Type:application/tar'));	
		return $this->cmObj->curlHttpCode();
	}
	
	public function __destruct(){
		file_exists(ROOT_PATH.'/Dockerfile.tar') && unlink(ROOT_PATH.'/Dockerfile.tar');	
		file_exists(ROOT_PATH.'/Dockerfile.tar.gz') && unlink(ROOT_PATH.'/Dockerfile.tar.gz');	
	}
}
