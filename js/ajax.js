$(function(){
	//加载images页面
	$('#image').click(function(){
		$('.col-md-10').load('./static/images.tpl',function(respsonse,status,xhr){
			if(status == 'success'){
				//页面首次加载后需要显示一次数据
				getJsonData('docker.php?target=DockerImage&method=imgList',{all:0},'#imgTbody');

				//全部镜像与默认相互切换
				dsplyAlltoDefault('docker.php?target=DockerImage&method=imgList','#imgTbody');
			
				//实现进行全选与反选
				fullCheckedOrNot('#imgTbody');

				// 删除选定的镜像
				$('#delImg').click(function(){
					var btn=$(this).removeClass('btn-warning').addClass('btn-danger').button('loading');
					if($('#imgTbody :checkbox').is(':checked')){
						var imgNameId=getImgsName();	
						// 将选定的镜像发送到服务端删除
						$.get('docker.php?target=DockerImage&method=imgDel', {imgId:imgNameId},function(data){
							btn.button('reset').removeClass('btn-danger').addClass('btn-warning');
							switch(data){
								case 'ok':
									if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:0},'#imgTbody');
									}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:1},'#imgTbody');
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
				
				$('#imgTbody').on('click','a',function() {
					$('#imgTab a:first').tab('show');
					imgTag= $(this).parent().parent().find('td').eq(3).text()+':'+ $(this).parent().parent().find('td').eq(4).text();
					imgId=$(this).text();
					$('#srcTagIpt').val(imgTag);
					$('#srcImgId').val(imgId);
					//对获取的镜像进行tag
					$('#imgModal').off('click','#tagSubmit').on('click','#tagSubmit',function(){
						if($.trim($('#newTagIpt').val()).length <= 0){
							alert('不能为空!');
							return false;
						}
						$.get('docker.php?target=DockerImage&method=imgTag',$('#tagForm').serialize(),function(data){
							switch(data){
								case 'ok':
									if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:0},'#imgTbody');
										$('#imgModal').modal('hide');	
										$('#newTagIpt').val(null);
									}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:1},'#imgTbody');
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
					$('#imgModal').off('click','a[href="#history"]').on('click','a[href="#history"]',function(){
						$('#hstryTbody').find('tr').hide();						
						$('#history').find('h4').text('For [ '+imgTag+' ]');
						$.getJSON('docker.php?target=DockerImage&method=imgHistory',{imgId:imgId},function(json){
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
					$('#imgModal').off('click','a[href="#inspect"]').on('click','a[href="#inspect"]',function(){
						$('#inspect').find('h4').text('For [ '+imgTag+' ]');
						$.getJSON('docker.php?target=DockerImage&method=imgInspect',{imgId:imgId},function(json){
							$('#inspect').find('pre').text(JSON.stringify(json,null,"\t"));
						});
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
						url:'docker.php?target=DockerImage&method=imgCreate',
						type:'POST',
						data:$('#createForm').fieldSerialize(),
						success:function(data){
							switch(data){
								case 'ok' :
									btn.button('reset').removeClass('btn-info').addClass('btn-success');
									if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:0},'#imgTbody');
										$('#imgCrtModal').modal('hide');
									}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
										getJsonData('docker.php?target=DockerImage&method=imgList',{all:1},'#imgTbody');
										$('#imgCrtModal').modal('hide');
									}
									break;
								default :
									alert(data);
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
				getJsonData('docker.php?target=DockerContainer&method=ctnerList',{all:0},'#ctnerTbody');
				//实现容器默认列表与全部列表的相互转换
				dsplyAlltoDefault('docker.php?target=DockerContainer&method=ctnerList','#ctnerTbody');
				//实现进行全选与反选
				fullCheckedOrNot('#ctnerTbody');

				// 删除选定的容器
				$('#delCtner').click(function(event){
					container_cmd('docker.php?method=ctnerDel',event);
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
							url:'docker.php?target=DockerContainer&method=ctnerRename',
							type:'GET',
							data: {ctnerId:ctnerId},
							success:function(data){
								switch(data){
									case 'ok':
										if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
											getJsonData('docker.php?target=DockerContainer&method=ctnerList',{all:0},'#ctnerTbody');
											$('#ctnerModal').modal('hide');
											$('#newCtnerName').val(null);
										}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
											getJsonData('docker.php?target=DockerContainer&method=ctnerList',{all:1},'#ctnerTbody');
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
						$.getJSON('docker.php?target=DockerContainer&method=ctnerTop',{ctnerId:ctnerId},function(json){
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
						$.getJSON('docker.php?target=DockerContainer&method=ctnerChange',{ctnerId:ctnerId},function(json){
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
						$.getJSON('docker.php?target=DockerContainer&method=ctnerInspect',{ctnerId:ctnerId},function(json){
							$('#inspect').find('pre').text(JSON.stringify(json,null,"\t"));
							btn.button('reset');
						});
					});
					
				});	


				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#start',function(event){
					container_cmd('docker.php?method=ctnerStart',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#stop',function(event){
					container_cmd('docker.php?method=ctnerStop',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#restart',function(event){
					container_cmd('docker.php?method=ctnerRestart',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#kill',function(event){
					container_cmd('docker.php?method=ctnerKill',event);
				});
			

				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#pause',function(event){
					container_cmd('docker.php?method=ctnerPause',event);
				});
				//对容器的一些操作动作，如start,stop等
				$('#ctnerPanel').on('click','#unpause',function(event){
					container_cmd('docker.php?method=ctnerUnpause',event);
				});
			}
		});
	});

	//加载info页面
	$('#info').click(function(){
		$('.col-md-10').load('./static/info.tpl',function(){
			$.getJSON('docker.php?target=DockerInfo&method=getDockerInfo',function(json){
				$('#dkSysInfo').find('pre').text(JSON.stringify(json,null,"\t"));
			});
			$('#dkinfo').off('click','a[href="#dkVersion"]').on('click','a[href="#dkVersion"]',function(){
				$.getJSON('docker.php?target=DockerInfo&method=getDockerVersion',function(json){
					$('#dkVersion').find('pre').text(JSON.stringify(json,null,"\t"));
				});
			});
		});
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
			
			$.get(url,{target:'DockerContainer',ctnerId:ctnerId},function(data,textStatus,xhr){
				switch(data){
					case 'ok':
						if($.trim($('#dsplyAll').find('strong').text()) == 'Display All'){
							getJsonData('docker.php?target=DockerContainer&method=ctnerList',{all:0},'#ctnerTbody').done(function(data,textStatus,xhr){
								if(xhr.status == '200'){
									btn.button('reset');
									$('#full').prop('checked', false);
								}
							});
						}else if($.trim($('#dsplyAll').find('strong').text()) == 'Default'){
							getJsonData('docker.php?target=DockerContainer&method=ctnerList',{all:1},'#ctnerTbody').done(function(){
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
				}	
				btn.button('reset');
			});
		}else{
			alert('请选择要进行操作的容器！');
			btn.button('reset');
		}
	}

});