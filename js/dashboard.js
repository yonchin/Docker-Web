$(function(){
	$('#dashbd').click(function(){
		$('.col-md-10').load('./static/dashboard.tpl',function(){
			var imgChrt= echarts.init($('#imgChrt').get(0));
			var ctnerChrt= echarts.init($('#ctnerChrt').get(0));
			var imgCreated= echarts.init($('#imgCreated').get(0));
			var ctnerCreated= echarts.init($('#ctnerCreated').get(0));
			var imgNumOpt={
				title: {
					text:'镜像',
					x: 'center',
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					data:['正常','中间层'],
				},
				  tooltip : {
				  	trigger: 'item',
				  	formatter: "{a} <br/>{b} : {c} ({d}%)"
				  },
				toolbox: {
					show : true,
					feature : {
						saveAsImage : {show: true}
					}
				},
				series : [{
					name:'数量',
					type:'pie',
					radius : ['50%', '70%'],
					data:[
					{
						name:'中间层', 
						value:null,
						itemStyle:{
							normal : {
								color:   '#ffa511', 
								label : {
									show : false,
								},
								labelLine : {
									show : false
								}
							},
						},
					},	
					{
						name:'正常', 
						value:null,
						itemStyle:{
							normal : {
								color:   '#3cb371',
								label : {
									show : true,
									position : 'center',
									formatter : "{b} \n {c}(个) {d}%",
									textStyle: {
										baseline : 'middle'
									}
								},
								labelLine : {
									show : false
								}
							}
						}
					},

					],
				}]
			};
			$.getJSON('docker.php?target=imgNum',function(json){
				imgNumOpt.series[0].data[0].value =json.abnormal;
				imgNumOpt.series[0].data[1].value =json.normal;
				imgChrt.setOption(imgNumOpt);
			});

		var ctnerNumOpt={
                title: {
                    text:'容器',
                    x: 'center',
                    y: 'center',
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['运行','停止'],
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show : true,
                    feature : {
                        saveAsImage : {show: true}
                    }
                },
                series : [{
                    name:'数量',
                    type:'pie',
                    radius : ['50%', '70%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : true,
                                textStyle:{
                                    fontSize:18,
                                    fontStyle:'italic'
                                }
                            },
                            labelLine : {
                                show : true,
                            }
                        },
                    },
                    data:[
                    {
                        name:'停止', 
                        value:null,
                        itemStyle:{
                        	normal:{
                        		label:{
                        			formatter: '{c}(个) {b}',
                        		},
                        	},
                        },
                    },  
                    {
                        name:'运行', 
                        value:null,
                        itemStyle:{
                        	normal:{
                        		label:{
                        			formatter: '{c}(个) {b}',
                        		}
                        	}
                        }
                    },
                    ],
                }]
            };
            $.getJSON('docker.php?target=ctnerNum',function(json){
             ctnerNumOpt.series[0].data[0].value =json.abnormal;
             ctnerNumOpt.series[0].data[1].value =json.normal;
             ctnerChrt.setOption(ctnerNumOpt);
             });     
		var imgCrtOpt={
			title : {
				text: '创建的镜像',
			}, tooltip : {trigger: 'axis'
			},
			legend: {
				data:['创建']
			},
			toolbox: {
				show : true,
				feature : {
					magicType : {show: true, type: ['line', 'bar']},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
			{
				type : 'category',
				// data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
				data:[]
			}
			],
			yAxis : [{
				type : 'value'
			}],
			series : [{
				name:'创建',
				type:'bar',
				itemStyle:{
					normal:{
						color:'#e33',
					}
				},
				// data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
				data:[]
			}]
		};

		$.getJSON('docker.php?target=imgCrt',function(json){
			imgCrtOpt.xAxis[0].data =json.dtime;
			imgCrtOpt.series[0].data =json.count;
			imgCreated.setOption(imgCrtOpt);
		});


		var ctnerCrtOpt={
			title : {
				text: '创建的容器',
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				data:['创建'],
			},
			toolbox: {
				show : true,
				feature : {
					magicType : {show: true, type: ['line', 'bar']},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [
			{
				type : 'category',
				data:[]
			}
			],
			yAxis : [{
				type : 'value'
			}],
			series :
			[{
				name:'创建',
				type:'bar',
				itemStyle:{
					normal:{
						color:'#7f7',
					}
				},
				data:[]
			}]
		};

		$.getJSON('docker.php?target=ctnerCrt',function(json){
			ctnerCrtOpt.xAxis[0].data =json.dtime;
			ctnerCrtOpt.series[0].data =json.count;
			ctnerCreated.setOption(ctnerCrtOpt);
		});
	});
});




$('#dashbd').trigger('click');
});


