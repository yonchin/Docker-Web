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
						// $.get('img_del.php', {nameId:imgNameId},function(data){
						$.get('docker.php?target=DockerImage&method=del', {imgId:imgNameId},function(data){
							btn.button('reset').removeClass('btn-danger').addClass('btn-warning');
							switch(data){
								case 'ok':
									if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
										getJsonData('docker.php?target=DockerImage&method=list',{all:0},'#imgTbody');
									}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
										getJsonData('docker.php?target=DockerImage&method=list',{all:1},'#imgTbody');
									}
									break;
								default :
									alert(data);
									break;
							}
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
					$.get('docker.php?target=DockerImage&method=tag',$('#tagForm').serialize(),function(data){
						switch(data){
							case 'ok':
								if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
									getJsonData('docker.php?target=DockerImage&method=list',{all:0},'#imgTbody');
									$('#imgModal').modal('hide');	
									$('#newTagIpt').val(null);
								}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
									getJsonData('docker.php?target=DockerImage&method=list',{all:1},'#imgTbody');
									$('#imgModal').modal('hide');	
									$('#newTagIpt').val(null);
								}
								break;
							default:
								alert(data);
								break;
						}	
						
					});
					return false;
				});

				//获取镜像的history
				$('#imgTbody').on('click','a',function() {
					$('#hstryTbody').find('tr').hide();						
					imgTag= $(this).parent().parent().find('td').eq(3).text()+':'+ $(this).parent().parent().find('td').eq(4).text();
					imgId=$(this).text();
					$('#history').find('h4').text('For [ '+imgTag+' ]');
					$.getJSON('docker.php?target=DockerImage&method=history',{imgId:imgId},function(json){
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
					$.getJSON('docker.php?target=DockerImage&method=inspect',{imgId:imgId},function(json){
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
									if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
										getJsonData('img_list.php',{all:0},'#imgTbody');
										$('#imgCrtModal').modal('hide');
									}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
										getJsonData('img_list.php',{all:1},'#imgTbody');
										$('#imgCrtModal').modal('hide');
									}
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
				// getJsonData('container_list.php',{all:0},'#ctnerTbody');
				getJsonData('docker.php?target=DockerContainer&method=list',{all:0},'#ctnerTbody');
				//实现容器默认列表与全部列表的相互转换
				// dsplyAlltoDefault('container_list.php','#ctnerTbody');
				dsplyAlltoDefault('docker.php?target=DockerContainer&method=list','#ctnerTbody');
				//实现进行全选与反选
				fullCheckedOrNot('#ctnerTbody');


				// 删除选定的容器
				$('#delCtner').click(function(event){
					// container_cmd('container_del.php',event);
					// container_cmd('docker.php?method=stop',event);
					container_cmd('docker.php?method=del',event);
				});

				$('#ctnerTbody').on('click','a',function(){
					$('#ctnerTab a:first').tab('show');
					//将镜像tag和容器id 保存到变量中
					imgTag= $(this).parent().parent().find('td').eq(3).text();
					ctnerId=$(this).text();
					ctnerName=$(this).parent().parent().find('td').eq(2).text();
					$('#oldCtnerName').val(ctnerName);
					//提交新容器名
					$('#ctnerModal').off('click').on('click','#renameCtnerSbmt',function(){
						$('#renameForm').ajaxSubmit({
							// url:'container_cmd.php',
							url:'docker.php?target=DockerContainer&method=rename',
							type:'GET',
							data: {ctnerId:ctnerId},
							success:function(data){
								switch(data){
									case 'ok':
										if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
											// getJsonData('container_list.php',{all:0},'#ctnerTbody');
											getJsonData('docker.php?target=DockerContainer&method=list',{all:0},'#ctnerTbody');
											$('#ctnerModal').modal('hide');
											$('#newCtnerName').val(null);
										}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
											// getJsonData('container_list.php',{all:1},'#ctnerTbody');
											getJsonData('docker.php?target=DockerContainer&method=list',{all:1},'#ctnerTbody');
											$('#ctnerModal').modal('hide');
											$('#newCtnerName').val(null);
										}
										break;
									default:
										alert(data);
										break;
								}	
							}	
						});
						return false;
					});

					//获取容器的processes
					$('#ctnerModal').off('click','a[href="#ps"]').on('click','a[href="#ps"]',function(){
						var btn=$(this).button('loading');
						// $.getJSON('container_top.php',{ctnerId:ctnerId},function(json){
						$.getJSON('docker.php?target=DockerContainer&method=top',{ctnerId:ctnerId},function(json){
							$('#psThead').find('th').remove();
							$('#psTbody').find('tr').remove();
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
							btn.button('reset');
						});	
					});
					//获取容器的changes
					$('#ctnerModal').off('click','a[href="#changes"]').on('click','a[href="#changes"]',function(){
						var btn=$(this).button('loading');
						$('#changes').find('h4').text('for [ '+imgTag+' ]');
						// $.getJSON('container_change.php',{ctnerId:ctnerId},function(json){
						$.getJSON('docker.php?target=DockerContainer&method=change',{ctnerId:ctnerId},function(json){
							$('#changes').find('tr').remove();
							var chgTbdy=$('#chgTbody');
							$.each(json,function(index,value){
								var tr=$('<tr>');
								$.each(value,function(key,item){
									// alert(key+' || '+item);
									var td=$('<td>');
									td.text(item);
									tr.append(td);
								});
								chgTbdy.append(tr);	
							});
							btn.button('reset');
						});
					});	
						
					//获取容器的inspect
					$('#ctnerModal').off('click','a[href="#inspect"]').on('click','a[href="#inspect"]',function(){
						var btn=$(this).button('loading');
						$('#inspect').find('h4').text('For [ '+imgTag+' ]');
						// $.getJSON('container_inspect.php',{ctnerId:ctnerId},function(json){
						$.getJSON('docker.php?target=DockerContainer&method=inspect',{ctnerId:ctnerId},function(json){
							$('#inspect').find('pre').text(JSON.stringify(json,null,"\t"));
							btn.button('reset');
						});
					});
					
				});	


				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#start',function(event){
					// container_cmd('container_cmd.php',event);
					container_cmd('docker.php?method=start',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#stop',function(event){
					// container_cmd('container_cmd.php',event);
					container_cmd('docker.php?method=stop',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#restart',function(event){
					container_cmd('docker.php?method=restart',event);
					// container_cmd('container_cmd.php',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#kill',function(event){
					container_cmd('docker.php?method=kill',event);
					// container_cmd('container_cmd.php',event);
				});
			

				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#pause',function(event){
					container_cmd('docker.php?method=pause',event);
					// container_cmd('container_cmd.php',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#unpause',function(event){
					container_cmd('docker.php?method=unpause',event);
					// container_cmd('container_cmd.php',event);
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
		var modalId=tbodyId.slice(0,-5)+"Modal";
		var obj=$.getJSON(url,data,function(json){
			$(tbodyId).find('tr').remove();
			$('h4').find('span').text($(json).length);
			// 将Json数据添加为表格的一行
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
		return obj;
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
		$('#dsplyAll').click(function(e){
		// $('#ctnerPanel').on('click','#dsplyAll',function(){
			if(clkCount%2 == 0){
				$('#full').prop('checked', false);
				$(this).removeClass('btn-info').addClass('btn-primary').html('<strong> Default </strong>');
				getJsonData(url,{all:1},tbodyId);
			}else if(clkCount%2 == 1){
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

	function container_cmd(url,event){
		var btn=$(event.currentTarget).button('loading');
		if($('#ctnerTbody :checkbox').is(':checked')){
			var ctnerId=function(){
				var ctnerId='';
				$('#ctnerTbody :checked').each(function(key,value){
					ctnerId += $(this).parent().next().find('a').text()+' ';
				});
				return ctnerId;	
			}();
			
			// $.post(url,{ctnerId:ctnerId,cmd:cmd},function(data,textStatus,xhr){
			$.get(url,{target:'DockerContainer',ctnerId:ctnerId},function(data,textStatus,xhr){
				switch(data){
					case 'ok':
						if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
							// getJsonData('container_list.php',{all:0},'#ctnerTbody').done(function(data,textStatus,xhr){
							getJsonData('docker.php?target=DockerContainer&method=list',{all:0},'#ctnerTbody').done(function(data,textStatus,xhr){
								if(xhr.status == '200'){
									btn.button('reset');
									$('#full').prop('checked', false);
								}
							});
						}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
							// getJsonData('docker.php?target=DockerContainer&method=list',{all:0},'#ctnerTbody');
							getJsonData('docker.php?target=DockerContainer&method=list',{all:1},'#ctnerTbody').done(function(){
								if(xhr.status == '200'){
									btn.button('reset');
									$('#full').prop('checked', false);
								}
							}); 
						}
						break;
					default:
						alert(data);
						break;
					// case '304' :
					// 	alert('container already '+cmd+'ed');
					// 	break;
					// case '400' :
					// 	alert('bad parameter');
					// 	break;
					// case '404' :
					// 	alert('No such container');
					// 	break;
					// case '500' :
					// 	alert('Server error');
					// 	break;
				}	
				btn.button('reset');
			});
		}else{
			alert('请选择要进行操作的容器！');
			btn.button('reset');
		}
	}


});