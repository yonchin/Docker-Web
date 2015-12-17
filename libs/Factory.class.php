<?php

class Factory{
	private  static $obj=null;

	public static function dockerObj(){
		eval('self::$obj=new '.isset($_GET['target']) ?  $_GET['target'] : exit('无此类!'));
	}
}