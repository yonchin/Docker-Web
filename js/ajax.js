$(function(){
	//加载dashboard页面
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl');
	});

	//加载images页面
	$('#image').click(function(){
		$('.col-md-10').load('./static/images.tpl');
		$.getJSON('images.php',function(data){
			var tbdy=$('.table tbody');
			$.each(data,function  (key,value) {
				// 将Json数据添加为表格的一行
				var tr=$('<tr>');
				$.each(value,function(key,value){
					console.log(key,value);
					var  td=$('<td>').html(value);
					tr.append(td);
				});
				tbdy.append(tr);	
			});
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
});