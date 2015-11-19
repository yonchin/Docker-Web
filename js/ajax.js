$(function(){

	//加载dashboard页面
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl');
	});

	//加载images页面
	$('#image').click(function(){
		
		$('.col-md-10').load('./static/images.tpl',function(respsonseText,textStatus,XHR){
			if(textStatus == 'success'){
				$('#dsplyAll').click(function(){
					getJsonData('images.php',{all:1});
				});	
			}
		})

		getJsonData('images.php',{all:0});

	});


	//加载containers页面
	$('#container').click(function(){
		$('.col-md-10').load('./static/containers.tpl');
	});

	//加载info页面
	$('#info').click(function(){
		$('.col-md-10').load('./static/info.tpl');
	});


	function getJsonData(url,data){
		$.getJSON(url,data,function(json){
			$('#image').find('span').text($(json).length);
			// 将Json数据添加为表格的一行
			var tbdy=$('.table tbody');
			$.each(json,function  (key,value) {
				var tr=$('<tr>');
				var chkbx=$('<td><input type="checkbox"/></td>');
				tr.append(chkbx);	
				$.each(value,function(key,value){
					console.log(key,value);
					var  td=$('<td>').html(value);
					tr.append(td);
				});
				tbdy.append(tr);	
			});
		});

	}
});