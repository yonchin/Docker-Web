<?php

class Factory{
	public static function run($args1=null,$args2=null,$args3=null){
		return call_user_func(array(new $_GET['target'], $_GET['method']),$args1,$args2,$args3);
	}

}
