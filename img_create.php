<?php 


// print_r($_POST);
// print_r($_FILES);

$dkFileDir=trim($_POST['dkFileDir']);
mkdir('docker/'.$dkFileDir);
$uploadDir=realpath("docker/$dkFileDir");
// echo $uploadDir;

$dkFileData=trim($_POST['dkFileData']);
$dkTag=trim($_POST['dkTag']);
if( empty($dkFileDir) || empty($dkFileData) || empty($dkTag) ){
    return;
}


file_put_contents('Dockerfile', $dkFileData);

$dkfiletar=new PharData('Dockerfile.tar');
$dkfiletar->addFile('Dockerfile');
//执行此行代码后生成Dockerfile.tar.gz文件
$dkfiletar->compress(Phar::GZ);

$file=fopen('Dockerfile.tar.gz','r');
$size=filesize('Dockerfile.tar.gz');
$fildata=fread($file,$size);

$ch=curl_init();

$opt=array(
    CURLOPT_URL => 'http://192.168.1.103:2375/build?t='.$dkTag.'&nocache=1',
    CURLOPT_HEADER => false,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_HTTPHEADER => array('Content-Type:application/tar'),
    CURLOPT_POSTFIELDS => $fildata,
    CURLOPT_INFILE => $file,
    CURLOPT_INFILESIZE => $size,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_VERBOSE => true
);

curl_setopt_array($ch,$opt);
echo curl_exec($ch);
//获取响应状态码
echo curl_getinfo($ch,CURLINFO_HTTP_CODE);

curl_close($ch);


//删除中间生成的tar文档
unlink('Dockerfile.tar');
unlink('Dockerfile.tar.gz');

foreach ($_FILES['dkAddFile']['error'] as $key => $error) {
    if($error == UPLOAD_ERR_OK){
        $tmp_name = $_FILES['dkAddFile']['tmp_name'][$key];
        $name = $_FILES['dkAddFile']['name'][$key];
        move_uploaded_file($tmp_name, "$uploadDir/$name");
    }
}


