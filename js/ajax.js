$(function(){
	$('#dashdb').click();
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl');
	});

	$('#image').click(function(){
		$('.col-md-10').load('./static/images.tpl');
		$.getJSON('images.php',function(data){
			$.each(data,function  (key,value) {
				$.each(value,function(key,value){
					// console.log(key+':',value);
					$('.table thead tr').append('<th>'+key+'</th>')
				});
			});
		});
	});

	$('#container').click(function(){
		$('.col-md-10').load('./static/containers.tpl');
	});

	$('#info').click(function(){
		$('.col-md-10').load('./static/info.tpl');
	});
	// $.getJSON('.php',function(data){
	// 	type=$.type(data);
	// 	if(type == 'array'){
	// 		$.each(data,function(key,value){
	// 			console.log(key,value);
	// 			$.each(value,function(index,value){
	// 				console.log(index+':',value);
	// 			})
	// 		});
	// 	}else if(type == 'object'){
	// 		$.each(data,function(key,value){
	// 			console.log(key,value);
	// 		});
	// 	}
	// });
});