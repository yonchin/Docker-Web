<?php

class Factory{
	// private  static $obj=null;

	// private static function dockerObj(){
	// 	eval('self::$obj=new '.isset($_GET['target']) ?  $_GET['target'] : exit('无此类!'));
	// 	return self::$obj;
	// }
	// public static function run($args){
	// 	// return $_GET['method'];
	// 	// return method_exists(self::$dockerObj(), $_GET['method']) ? eval('self::$dockerObj()->'.$_GET['method'].'();') : exit('无此方法!');
	// 	return method_exists(self::dockerObj(), $_GET['method']) ? 'ok' :'no';
	// }

	public static function run($args1=null,$args2=null,$args3=null){
		return call_user_func(array(new $_GET['target'], $_GET['method']),$args1,$args2,$args3);
		// return $_GET['method'];
	}

}

// include_once 'CurlMethod.class.php';
// include_once 'DockerImage.class.php';
// define('DOCKER_URL','http://192.168.1.104:2375');

// echo call_user_func(array(new DockerImage, 'imgTag'),array('fc0db02f3072'), 'ttt','v0');