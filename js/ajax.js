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
				getJsonData('img_list.php',{all:0},'#imgTbody');

				//全部镜像与默认相互切换
				dsplyAlltoDefault('img_list.php','#imgTbody');
			
				//实现进行全选与反选
				fullCheckedOrNot('#imgTbody');
				

				// 删除选定的镜像
				$('#delImg').click(function(){
					var btn=$(this).removeClass('btn-warning').addClass('btn-danger').button('loading');
					if($('#imgTbody :checkbox').is(':checked')){
						var imgNameId=getImgsName();	
						// alert(imgNameId);
						// 将选定的镜像发送到服务端删除
						$.get('img_del.php', {nameId:imgNameId},function(data){
							btn.button('reset').removeClass('btn-danger').addClass('btn-warning');
							switch(data){
								case '200':
									$('#imgTbody').find('tr').hide();
									getJsonData('img_list.php',{all:0},'#imgTbody');
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
							//隐藏前面的行
							$('#imgTbody').find('tr').hide();
							if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
								getJsonData('img_list.php',{all:0},'#imgTbody');
							}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
								getJsonData('img_list.php',{all:1},'#imgTbody');
							}

							// $('#imgTbody :checked').parent().parent().remove();
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
						getJsonData('img_list.php',{all:0},'#imgTbody');
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
				//创建镜像
				$('#imgCrtBtn').click(function() {
					var btn=$(this).removeClass('btn-success').addClass('btn-info').button('loading');
					$('#createForm').ajaxSubmit({
						url:'img_create.php',
						type:'POST',
						data:$('#createForm').fieldSerialize(),
						success:function(data){
							switch(data){
								case '200' :
									btn.button('reset').removeClass('btn-info').addClass('btn-success');
									$('#imgTbody').find('tr').hide();
									getJsonData('img_list.php',{all:0},'#imgTbody');
									$('#imgCrtModal').modal('hide');
									break;
								case '500' :
									alert('Server error');
									break;
							}	
						}
					});
					return false;
				});
			}
		});
	});

	//加载containers页面
	$('#container').click(function(){
		$('.col-md-10').load('./static/containers.tpl',function(respsonse,status,xhr){
			if(status == 'success'){
				//加载默认容器列表
				getJsonData('container_list.php',{all:0},'#ctnerTbody');
				//实现容器默认列表与全部列表的相互转换
				dsplyAlltoDefault('container_list.php','#ctnerTbody');
				//实现进行全选与反选
				fullCheckedOrNot('#ctnerTbody');


				// 删除选定的容器
				$('#delCtner').click(function(){
					var btn=$(this).removeClass('btn-warning').addClass('btn-danger').button('loading');
					if($('#ctnerTbody :checkbox').is(':checked')){
						var ctnerId=function(){
								var ctnerId='';
								$('#ctnerTbody :checked').each(function(key,value){
									ctnerId += $(this).parent().next().find('a').text()+' ';
								});
								return ctnerId;	
							}();	
						// alert(imgNameId);
						// 将选定的镜像发送到服务端删除
						$.get('container_del.php', {nameId:ctnerId},function(data){
							btn.button('reset').removeClass('btn-danger').addClass('btn-warning');
							switch(data){
								case '204':
									$('#ctnerTbody').find('tr').hide();
									getJsonData('container_list.php',{all:0},'#ctnerTbody');
									break;
								case '400' :
									alert('bad parameter');
									break;
								case '404' :
									alert('No such container');
									break;
								case '500' :
									alert('Server error');
									break;
							}
							//隐藏前面的行
							$('#ctnerTbody').find('tr').hide();
							if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
								getJsonData('container_list.php',{all:0},'#ctnerTbody');
							}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
								getJsonData('container_list.php',{all:1},'#ctnerTbody');
							}

							// $('#imgTbody :checked').parent().parent().remove();
						});
					}else{
						alert('请选择要删除的容器！');
					}
				});

				$('#ctnerTbody').on('click','a',function(){
					imgTag= $(this).parent().parent().find('td').eq(3).text();
					ctnerId=$(this).text();
					//获取容器的processes
					$.getJSON('container_top.php',{ctnerId:ctnerId},function(json){
						$('#ps').find('h4').text('For [ '+imgTag+' ]');
						//print title
						var thd=$('#psThead');
						$.each(json.Titles,function(index, title) {
							var th=$('<th>');
							th.html(title);
							th.appendTo(thd);
						});	
						//print process
						var tbdy=$('#psTbody');
						$.each(json.Processes,function(index,process){
							var tr=$('<tr>');
							$.each(process,function(index,item){
								var td=$('<td>');
								td.text(item);
								tr.append(td);
							});
							tbdy.append(tr);
						});
					});
					//获取容器的inspect
					$('#ctnerModal').on('click','a[href="#inspect"]',function(){
						$('#inspect').find('h4').text('For [ '+imgTag+' ]');
						$.getJSON('container_inspect.php',{ctnerId:ctnerId},function(json){
							$('#inspect').find('pre').text(JSON.stringify(json,null,"\t"));
						});
					});

				});	
			}
		});
	});

	//加载info页面
	$('#info').click(function(){
		$('.col-md-10').load('./static/info.tpl');
	});

	//获取json数据并将其放入表格
	function getJsonData(url,data,tbodyId){
		// var modalId=tbodyId.substr(1,-5)+"Modal";
		var modalId=tbodyId.slice(0,-5)+"Modal";

		$.getJSON(url,data,function(json){
			$('h4').find('span').text($(json).length);
			// 将Json数据添加为表格的一行
			// var tbdy=$('#imgTbody');
			var tbdy=$(tbodyId);
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
						td=$('<td>').html('<a  href="#" data-toggle="modal" data-target='+modalId+'>'+value+'</a>');
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


	function dsplyAlltoDefault(url,tbodyId){
		var clkCount=0;
		$('#dsplyAll').click(function(){
			if(clkCount%2 == 0){
				$(tbodyId).find('tr').hide();
				$('#full').prop('checked', false);
				$(this).removeClass('btn-info').addClass('btn-primary').html('<strong> Default </strong>');
				getJsonData(url,{all:1},tbodyId);
			}else if(clkCount%2 == 1){
				$(tbodyId).find('tr').hide();
				$('#full').prop('checked', false);
				$(this).removeClass('btn-primary').addClass('btn-info').html('<strong>Display All</strong>');
				getJsonData(url,{all:0},tbodyId);
			}
			clkCount++;
		});
	}


	//实现进行全选与反选
	function fullCheckedOrNot(tbodyId){
		$('#full').click(function(){
			if($(this).is(':checked')){
				$(tbodyId +' :checkbox').prop('checked',true);
			}else{
				$(tbodyId +' :checkbox').prop('checked',false);
			}
		});
	}



});