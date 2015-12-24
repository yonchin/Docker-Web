$(function(){

    // var imgChrt=echarts.init($('#main').get(0));
    var ctnerChrt= echarts.init($('#ctnerChrt').get(0));
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
                                    formatter: "{c}(个) {b} ",
                                }
                            }
                        }
                    },  
                    {
                        name:'运行', 
                        value:null,
                    },

                    ],
                }]
            };
            $.getJSON('../docker.php?target=ctnerNum',function(json){
             ctnerNumOpt.series[0].data[0].value =json.abnormal;
             ctnerNumOpt.series[0].data[1].value =json.normal;
             ctnerChrt.setOption(ctnerNumOpt);
             });     

     });