<?php

/**
* curl for POST GET DELETE
*/
class CurlMethod {

	public $ch; //存放curl_init初始化句柄
	public $opt=array(); //curl_setopt 选项参数
	public $fp; //文件句柄
	public $code=''; //存放http请求码

	// public function __construct($url, $header=array()){
	public function __construct(){
		$this->ch=curl_init();
		$this->opt=array(
				// CURLOPT_URL => $url,
				CURLOPT_HEADER => 0,
				CURLOPT_RETURNTRANSFER => 1,
				// CURLOPT_HTTPHEADER => $header,
			);
	}

	public function curlGet($url,$header=array()){
		$opt=$this->opt + array(
				CURLOPT_URL => $url,
				CURLOPT_HTTPHEADER => $header,
				CURLOPT_CUSTOMREQUEST=> 'GET',
			);
		curl_setopt_array($this->ch,$opt);
		return curl_exec($this->ch);
	}
	public function curlPost($url,$data='',$header=array()){
		$opt=$this->opt + array(
				CURLOPT_URL => $url,
				CURLOPT_HTTPHEADER => $header,
				CURLOPT_CUSTOMREQUEST=> 'POST',
				CURLOPT_POSTFIELDS => $data,
			);
		curl_setopt_array($this->ch,$opt);
		return curl_exec($this->ch);
	}

	public function curlPostFile($url,$file,$header=array()){
		if(is_file($file)){
			$this->fp=fopen($file,'r');
			$fileSize=filesize($file);
			$fileData=fread($file,$fileSize);
		}
		$opt=$this->opt + array(
				CURLOPT_URL => $url,
				CURLOPT_HTTPHEADER => $header,
				CURLOPT_CUSTOMREQUEST=> 'POST',
				CURLOPT_INFILE=> $this->fp,
				CURLOPT_INFILESIZE=> $fileSize,
				CURLOPT_POSTFIELDS=> $data,
			);
		curl_setopt_array($this->ch,$opt);
		return curl_exec($this->ch);
	}

	public function curlDelete($url,$header=array()){
		$opt=$this->opt + array(
				CURLOPT_URL => $url,
				CURLOPT_HTTPHEADER => $header,
				CURLOPT_CUSTOMREQUEST=> 'DELETE',
			);
		curl_setopt_array($this->ch,$opt);
		return curl_exec($this->ch);
	}

	public function curlHttpCode(){
		$code=curl_getinfo($this->ch,CURLINFO_HTTP_CODE);
		switch ($code) {
			case '200' || '204':
				$status='ok';
				break;
			case '304' :
				$status='container already ready';
				break;
			case '400' :
				$status='bad parameter';
				break;
			case '404' :
				$status='No such container';
				break;
			case '409' :
				$status='conflict';
				break;
			case '500' :
				$status='Server error';
				break;
		}
		return $status;
	}


	function  __destruct(){
		curl_close($this->ch);
		if(is_resource($this->fp)){
			fclose($this->fp);
		}
	}
}
