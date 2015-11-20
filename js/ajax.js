$(function(){

	//加载dashboard页面
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl');
	});

	//加载images页面
	$('#image').click(function(){
		$('.col-md-10').load('./static/images.tpl',function(respsonse,status,xhr){
			if(status == 'success'){
				getJsonData('images.php',{all:0});
				// $('#dsplyAll').click(function(){
				$('#dsplyAll').click(function(){
					if(clkCount%2 == 0){
						$('tbody').find('tr').hide();
						$(this).removeClass('btn-info').addClass('btn-primary').html('<strong> Default </strong>');
						getJsonData('images.php',{all:1});
					}else if(clkCount%2 == 1){
						$('tbody').find('tr').hide();
						$(this).removeClass('btn-primary').addClass('btn-info').html('<strong>Display All</strong>');
						getJsonData('images.php',{all:0});
					}
					clkCount++;
				});
			}
		})
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