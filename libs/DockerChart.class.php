<?php
/**
*  docker chart
*/
class DockerChart {
	private $url;
	private $cmObj;
	private $ctnerNum;
	public function __construct(){
		$this->url=DOCKER_URL;
		$this->cmObj=new  CurlMethod();
	}

	public function imgCreatedNum(){
		$imgList=$this->getNum('images', 0);
		foreach (json_decode($imgList,true) as $k => $val) {
			foreach ($val['RepoTags'] as $key => $value) {
				$Created=date('Y_m_d',$val['Created']);
				$arr[]=$Created;
			}
		}	
		return json_encode($this->arrCount($arr));
		// return $imgList;
	}

	public function ctnerCreatedNum(){
		$ctnerList=$this->getNum('containers', 1);
		foreach (json_decode($ctnerList,true) as $k => $val) {
			$Created=date('Y_m_d',$val['Created']);
			$arr[]=$Created;
		}
		
		return json_encode($this->arrCount($arr));
	}

	public function getImgNum(){
		$imgNum=function($all){
			$imgList=$this->getNum('images', $all);
			foreach (json_decode($imgList,true) as $k => $val) {
				foreach ($val['RepoTags'] as $key => $value) {
					$Created=date('Y_m_d',$val['Created']);
					$arr[]=$Created;
				}
			}	
			return count($arr);
		};

		$normal=$imgNum(0);
		$abnormal=$imgNum(1) - $normal;
		$json['normal']=$normal;
		$json['abnormal']=$abnormal;
		return json_encode($json);
	}


	public function getCtnerNum(){
		$normal=count(json_decode($this->getNum('containers',0),true));
		$abnormal=count(json_decode($this->getNum('containers',1),true)) - $normal;
		$json['normal']=$normal;
		$json['abnormal']=$abnormal;
		return json_encode($json);
		// return count($normal);
	}

	private function getNum($target,$all){
		return $this->cmObj->curlGet($this->url.'/'.$target.'/json?all='.$all);
	}

	private function arrCount($arr){
		$arr=array_count_values($arr);
		ksort($arr);
		$json['dtime']=array_keys($arr);
		$json['count']=array_values($arr);
		return $json;
	}
}