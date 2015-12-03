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
				getJsonData('img_list.php',{all:0});

				//全部镜像与默认相互切换
				var clkCount=0;
				$('#dsplyAll').click(function(){
					if(clkCount%2 == 0){
						$('#imgTbody').find('tr').hide();
						$('#full').prop('checked', false);
						$(this).removeClass('btn-info').addClass('btn-primary').html('<strong> Default </strong>');
						getJsonData('img_list.php',{all:1});
					}else if(clkCount%2 == 1){
						$('#imgTbody').find('tr').hide();
						$('#full').prop('checked', false);
						$(this).removeClass('btn-primary').addClass('btn-info').html('<strong>Display All</strong>');
						getJsonData('img_list.php',{all:0});
					}
					clkCount++;
				});

				//实现进行全选与反选
				$('#full').click(function(){
					// if($('#full').prop('checked')){
					if($(this).is(':checked')){
						$('#imgTbody :checkbox').prop('checked',true);
					}else{
						$('#imgTbody :checkbox').prop('checked',false);
					}
				});

				// 删除选定的镜像
				$('#delImg').click(function(){
					// alert($('#imgTbody :checkbox').is(':checked'));		
					if($('#imgTbody :checkbox').is(':checked')){
						var imgNameId=getImgsName();	
						// alert(imgNameId);
						// 将选定的镜像发送到服务端删除
						$.get('img_del.php', {nameId:imgNameId},function(data){
							switch(data){
								case '404' :
									alert('No such image');
									break;
								case '409' :
									alert('Conflict');
									break;
								case '500' :
									alert('Server error');
									break;
							}
							$('#imgTbody').find('tr').hide();
							getJsonData('img_list.php',{all:0});
							$('#imgTbody :checked').parent().parent().remove();
						});
					}else{
						alert('请选择要删除的镜像！');
					}
				});

				//镜像获取镜像的id并将其填充到input中,此处必须用on事件委托的形式，否则无法绑定事件
				$('#imgTbody').on('click','a',function() {
					imgTag= $(this).parent().parent().find('td').eq(3).text()+':'+ $(this).parent().parent().find('td').eq(4).text();
					imgId=$(this).text();
					// alert(imgId);
					$('#srcTagIpt').val(imgTag);
					$('#srcImgId').val(imgId);
				});

				//对获取的镜像进行tag
				$('#imgModal').on('click','#tagSubmit',function(){
					$('#srcTagIpt').val(imgTag);
					$('#srcImgId').val(imgId);
					if($.trim($('#newTagIpt').val()).length <= 0){
						alert('不能为空!');
						return false;
					}
					$.post('img_tag.php',$('#tagForm').serialize(),function(data){
						switch(data){
							case '201' :
								alert('Success !');
								break;
							case '400' :
								alert('Bad parameter !');
								break;
							case '404' :
								alert('No such image');
								break;
							case '409' :
								alert('Conflict');
								break;
							case '500' :
								alert('Server error');
								break;
						}	
						$('#imgModal').modal('hide');	
						$('#imgTbody').find('tr').hide();
						$('#newTagIpt').val(null);
						getJsonData('img_list.php',{all:0});
					});
					return false;
				});

				//获取镜像的history
				$('#imgTbody').on('click','a',function() {
					$('#hstryTbody').find('tr').hide();						
					imgTag= $(this).parent().parent().find('td').eq(3).text()+':'+ $(this).parent().parent().find('td').eq(4).text();
					imgId=$(this).text();
					$('#history').find('h4').text('For [ '+imgTag+' ]');
					$.getJSON('img_history.php',{imgId:imgId},function(json){
						var tbdy=$('#hstryTbody');
						$.each(json,function(key,value){
							var tr=$('<tr>');
							$.each(value,function(k,val){
								var td=$('<td>');
								td.html(val);
								tr.append(td);
							});
							tbdy.append(tr);
						});
					});
				});

				//获取镜像的inspect
				$('#imgTbody').on('click','a',function(){
					imgTag= $(this).parent().parent().find('td').eq(3).text()+':'+ $(this).parent().parent().find('td').eq(4).text();
					imgId=$(this).text();
					$('#inspect').find('h4').text('For [ '+imgTag+' ]');
					$.getJSON('img_inspect.php',{imgId:imgId},function(json){
						$('#inspect').find('pre').text(JSON.stringify(json,null,"\t"));
					});
				});	

				// 默认情况下添加文件隐藏
				$('#dkAddFile').hide();
				// 当选中复选框时显示添加文件输入框,否则隐藏
				$('#createForm').on('click','#dkAddFileChkbx',function(){
					if($('#dkAddFileChkbx').is(':checked')){
						$('#dkAddFile').prop('disabled',false);
						$('#dkAddFile').show();
					}else{
						$('#dkAddFile').prop('disabled',true);
						$('#dkAddFile').hide();
					}
				});

				// $('#dkAddFile').change(function(){
				// 	$('#createForm').ajaxSubmit({
				// 		url:'img_create.php',
				// 		type:'post',
				// 		success:function(data){
				// 			alert(data);
				// 		}
				// 	});
				// });

				//test
				$('#imgCrtBtn').click(function() {
					// alert($('#createForm').serialize());
					// $.post('img_create.php',$('#createForm').serialize(),function(data){
					// 	alert(data);
					// });
					$('#createForm').ajaxSubmit({
						url:'img_create.php',
						type:'POST',
						data:$('#createForm').fieldSerialize(),
						success:function(data){
							alert(data);
						}
					});
					$('#imgCrtModal').modal('hide');
					return false;
				});
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
			var tbdy=$('#imgTbody');
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
						td=$('<td>').html('<a  href="#" data-toggle="modal" data-target="#imgModal">'+value+'</a>');
						tr.append(td);
						flag++;
					}else{
						tr.append(td);
					}
				});
				tbdy.append(tr);	
			});
		});
	}

	//点击复选框,获取得单个或多个镜像的名称
	function getImgsName(){
		//初始化变量
		var imgNameId='';
		$('#imgTbody :checked').each(function(index, val) {
			//取得镜像的名称，如果没有名词的就取得id
			if($(this).parent().parent().find('td').eq(3).text() == '<none>'){
				imgNameId += $(this).parent().next().find('a').text() + ' ';
			}else{
				imgNameId += $(this).parent().parent().find('td').eq(3).text()+
				':'+ $(this).parent().parent().find('td').eq(4).text()+' ';
			}
		});
		return imgNameId;
	}


	function test(json){
		var ul=$('<ul>');
		$.each(json,function(key,value){
			if(typeof value === 'object'){
				test(value);
			}else{
				var li=$('<li>');
				li.html(value);
			}
			ul.append(li);
		});
	}

});