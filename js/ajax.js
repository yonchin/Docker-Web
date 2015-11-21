$(function(){

	//加载dashboard页面
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl');
	});

	//加载images页面
	$('#image').click(function(){
		$('.col-md-10').load('./static/images.tpl',function(respsonse,status,xhr){
			if(status == 'success'){
				//页面首次加载后需要显示一次数据
				getJsonData('images.php',{all:0});

				//全部镜像与默认相互切换
				var clkCount=0;
				$('#dsplyAll').click(function(){
					if(clkCount%2 == 0){
						$('tbody').find('tr').hide();
						$('#full').prop('checked', false);
						$(this).removeClass('btn-info').addClass('btn-primary').html('<strong> Default </strong>');
						getJsonData('images.php',{all:1});
					}else if(clkCount%2 == 1){
						$('tbody').find('tr').hide();
						$('#full').prop('checked', false);
						$(this).removeClass('btn-primary').addClass('btn-info').html('<strong>Display All</strong>');
						getJsonData('images.php',{all:0});
					}
					clkCount++;
				});

				//实现进行全选与反选
				$('#full').click(function(){
					// if($('#full').prop('checked')){
					if($(this).is(':checked')){
						$('tbody :checkbox').prop('checked',true);
					}else{
						$('tbody :checkbox').prop('checked',false);
					}
				});

				// 删除选定的镜像
				$('#delImg').click(function(){
					// alert($('tbody :checkbox').is(':checked'));		
					if($('tbody :checkbox').is(':checked')){
						var imgNameId=getImgName();	
						//将选定的镜像发送到服务端删除
						$.get('img_del.php', {nameId:imgNameId},function(data){
							alert(data);
							$('tbody').find('tr').hide();
							getJsonData('images.php',{all:0});
							$('tbody :checked').parent().parent().remove();
						});
					}else{
						alert('请选择要删除的镜像！');
					}
				});

				//从已有的镜像里选择要打Tag的镜像
			}
		});
	});

	//加载containers页面
	$('#container').click(function(){
		$('.col-md-10').load('./static/containers.tpl');
	});

	//加载info页面
	$('#info').click(function(){
		$('.col-md-10').load('./static/info.tpl');
	});

	//获取json数据并将其放入表格
	function getJsonData(url,data){
		$.getJSON(url,data,function(json){
			$('h4').find('span').text($(json).length);
			// 将Json数据添加为表格的一行
			var tbdy=$('.table tbody');
			$.each(json,function  (key,value) {
				var tr=$('<tr>');
				var chkbx=$('<td><input type="checkbox"/></td>');
				tr.append(chkbx);	
				//flag标记用来区分第一个td
				var flag=1;
				$.each(value,function(key,value){
					console.log(key,value);
					var  td=$('<td>').html(value);
					//第一个td里面的内容加上超链接标签<a>
					if(flag == 1){
						td=$('<td>').html('<a href="#">'+value+'</a>');
						tr.append(td);
						flag++;
					}else{
						tr.append(td);
					}
				});
				// tr.find('td').eq(1).html('<a>'+tr.find('td').eq(1).text()+'</a>');
				tbdy.append(tr);	
			});
		});
	}

	//取得镜像的名称
	function getImgName(){
		//初始化变量
		var imgNameId='';
		$('tbody :checked').each(function(index, val) {
			//取得镜像的名称，如果没有名词的就取得id
			if($(this).parent().parent().find('td').eq(3).text() == '<none>'){
				imgNameId += $(this).parent().next().text() + ' ';
			}else{
				imgNameId += $(this).parent().parent().find('td').eq(3).text()+
				':'+ $(this).parent().parent().find('td').eq(4).text()+' ';
			}
		});
		return imgNameId;
	}

	//
});