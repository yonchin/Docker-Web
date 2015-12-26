<?php
 date_default_timezone_set('UTC');
 define('ROOT_PATH',dirname(__FILE__));
 define('DOCKER_URL','http://localhost:2375');

spl_autoload_register(function($className){
	include_once 'libs/'.$className.'.class.php';
});

