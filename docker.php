<?php

// // include 'config.php';
// define('DOCKER_URL','http://192.168.1.104:2375');
// define('ROOT_PATH', dirname(__FILE__));


// // echo ROOT_PATH;


// spl_autoload_register(function($className){
// 	require ROOT_PATH.'/libs/'.$className.'.class.php';
// });




function oper($method,$args){

	return  $_GET['method'] == 'start' ?  $ctnerObj->ctnerStart($ctnerIdArr) : '';
}



include 'config.php';
$ctnerIdArr=explode(' ',trim($_GET['ctnerId']));
$ctnerId=trim($_GET['ctnerId']);
$newCtnerName=trim($_GET['newCtnerName']);
$all=$_GET['all'];
if($_GET['target'] === 'DockerContainer'){

	echo $_GET['method'] == 'start' ?  $ctnerObj->ctnerStart($ctnerIdArr) : '';
	echo $_GET['method'] == 'stop' ? $ctnerObj->ctnerStop($ctnerIdArr) : '';
	echo $_GET['method'] == 'restart' ? $ctnerObj->ctnerRestart($ctnerIdArr) : '';
	echo $_GET['method'] == 'kill' ? $ctnerObj->ctnerKill($ctnerIdArr) : '';
	echo $_GET['method'] == 'pause' ? $ctnerObj->ctnerPause($ctnerIdArr) : '';
	echo $_GET['method'] == 'unpause' ? $ctnerObj->ctnerUnpause($ctnerIdArr) : '';
	echo $_GET['method'] == 'inspect' ? $ctnerObj->ctnerInspect($ctnerId) : '';
	echo $_GET['method'] == 'top' ? $ctnerObj->ctnerTop($ctnerId) : '';
	echo $_GET['method'] == 'change' ? $ctnerObj->ctnerChange($ctnerId) : '';
	echo $_GET['method'] == 'list' ? $ctnerObj->ctnerList($all) : '';
	echo $_GET['method'] == 'rename' ? $ctnerObj->ctnerRename($ctnerId,$newCtnerName) : '';
	echo $_GET['method'] == 'del' ? $ctnerObj->ctnerDel($ctnerIdArr) : '';
	// switch ($_GET['method']) {
	// 	case 'start':
	// 		echo $ctnerObj->ctnerStart($ctnerIdArr);
	// 		break;
	// 	case 'stop':
	// 		echo $ctnerObj->ctnerStop($ctnerIdArr);
	// 		break;
	// 	case 'restart':
	// 		echo $ctnerObj->ctnerRestart($ctnerIdArr);
	// 		break;
	// 	case 'kill':
	// 		echo $ctnerObj->ctnerKill($ctnerIdArr);
	// 		break;
	// 	case 'pause':
	// 		echo $ctnerObj->ctnerPause($ctnerIdArr);
	// 		break;
	// 	case 'unpause':
	// 		echo $ctnerObj->ctnerUnpause($ctnerIdArr);
	// 		break;
	// 	case 'inspect':
	// 		echo $ctnerObj->ctnerInspect($ctnerId);
	// 		break;
	// 	case 'top':
	// 		echo $ctnerObj->ctnerTop($ctnerId);
	// 		break;
	// 	case 'change':
	// 		echo $ctnerObj->ctnerChange($ctnerId);
	// 		break;
	// 	case 'list':
	// 		echo $ctnerObj->ctnerList($all);
	// 		break;

	// }
}






// $t=new CurlMethod();
// echo $get=$t->curlGet('http://192.168.1.104:2375/containers/json');
// echo $t->curlHttpCode().'get<br>';
// $pst=$t->curlPost('http://192.168.1.104:2375/containers/ff393d0d15b3/stop');
// echo $t->curlHttpCode().'post<br>';

// $t1=new DockerContainer();
// $t1->ctnerPause(array('ff393d0d15b3'));

// $obj=new $_GET['target'];

// Factory::dockerObj()->run();



// if($_GET['target'] == 'DockerContainer'){
// 	$ctnerCls=$_GET['target'];
// 	$ctnerObj=new  $ctnerCls;
// 	// echo $ctnerObj;
// 	switch ($_GET['method']) {
// 		case 'ctnerStart':
// 		case 'ctnerStop':
// 		case 'ctnerKill':
// 		case 'ctnerPause':
// 		case 'ctnerUnpause':
// 		case 'ctnerDel':
// 			$ctnerIdArr=explode(' ',trim($_GET['ctnerId']));
// 			print_r(eval("$ctnerObj->{$_GET['method']}($ctnerIdArr)"));
// 			// echo Factory::dockerObj->run($ctnerIdArr);
// 			break;
// 		case 'ctnerTop':	
// 		case 'ctnerInspect':	
// 		case 'ctnerChange':	
// 			$ctnerId=trim($_GET['ctnerId']);
// 			echo $ctnerObj->$_GET['method'].'('.$ctnerId.')';
// 			break;
// 		case 'ctnerRename':
// 			$ctnerId=trim($_GET['ctnerId']);
// 			echo $ctnerObj->$_GET['method'].'('.$ctnerId.','.$_GET['newCtnerName'].')';
// 			break;
// 		case 'ctnerList':
// 			$all = isset($_GET['all']) ? $_GET['all'] : 0;
// 			echo $ctnerObj->$_GET['method'].'('.$all.')';
// 			break;
// 	}
// }






