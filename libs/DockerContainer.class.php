<?php
class DockerContainer {
	private $url;
	private $cmObj;

	public function __construct(){
		$this->url=DOCKER_URL . '/containers/';
		$this->cmObj=new CurlMethod();
	}

	public function ctnerStart($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/start');
		}
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerStop($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/stop');
		}	
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerRestart($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/restart');
		}
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerKill($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/kill');
		}
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerPause($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/pause');
		}
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerUnpause($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlPost($this->url.$ctnerId.'/unpause');
		}			
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerRename($ctnerId,$newCtnerName){
		$this->cmObj->curlPost($this->url.$ctnerId.'/rename?name='.$newCtnerName);
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerDel($ctnerIdArr){
		foreach ($ctnerIdArr as $ctnerId) {
			$this->cmObj->curlDelete($this->url.$ctnerId.'?force=1');
		}
		return $this->cmObj->curlHttpCode();
	}
	public function ctnerChange($ctnerId){
		$changes=$this->cmObj->curlGet($this->url.$ctnerId.'/changes');
		foreach (json_decode($changes,true) as $key => $val) {
			$arr[$key]['Path']=$val['Path'];
			switch ($val['Kind']) {
				case 0:
					$arr[$key]['Kind']='Modify';
					break;
				case 1:
					$arr[$key]['Kind']='Add';
					break;
				case 2:
					$arr[$key]['Kind']='Delete';
					break;
			}
		}
		return json_encode($arr);	
	}

	public function ctnerInspect($ctnerId){
		return $this->cmObj->curlGet($this->url.$ctnerId.'/json');
	}

	public function ctnerList($all){
		$ctnerlist=$this->cmObj->curlGet($this->url.'json?all='.$all);
		foreach (json_decode($ctnerlist,true) as $k => $val) {
			$Id=substr($val['Id'],0,12);
			$Names=substr($val['Names'][0],1);
			$Image=substr($val['Image'],0,30);
			$Command=substr($val['Command'],0,20);
			$Created=date('Y-m-d_H:i:s',$val['Created']);
			foreach($val['Ports'] as $value){ 
				if(array_key_exists('PublicPort',$value) && array_key_exists('PrivatePort',$value)){ 
					$Ports .= $value['IP'].':'.$value['PublicPort'].'->'.$value["PrivatePort"].'/'.$value['Type']."\n"; 
				}else if(array_key_exists('PrivatePort',$value)){ 
					$Ports .= $value["PrivatePort"].'/'.$value['Type']."\n"; 
				} 
			} 
			$line=$Id.','.$Names.','.$Image.','.$Command.','.$Created.','.$val['Status'].','.nl2br($Ports);
			$arr[]=explode(',',$line);
		}
		return json_encode($arr);
	}

	public function ctnerTop($ctnerId){
		return $this->cmObj->curlGet($this->url.$ctnerId.'/top?ps_args=aux');	
	}

	public function run($args){
		method_exists($this, $_GET['method']) ? eval('$this->'.$_GET['method'].'('.$args.')') : exit('不存在此方法！');
	}
	
}
