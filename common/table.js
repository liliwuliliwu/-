/**
 * Created by issuser on 2017/5/4.
 */
$(function(){
    //中间的滑动
    $("#partRT").scroll(function(){
        $("#partRB").scrollLeft($(this).scrollLeft());
    });
    $("#partLB").scroll(function(){
        $("#partRB").scrollTop($(this).scrollTop());
    });
    $("#partRB").scroll(function(){
        $("#partRT").scrollLeft($(this).scrollLeft());
        $("#partLB").scrollTop($(this).scrollTop());
    });
    var _numLi = $("#numList li").length;
    var _liW = $("#numList li").width();
    $("#numList").width(_numLi*_liW+_numLi+10);
    $("#numList li").each(function(){
        $(this).click(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
        });
    });





    //请求数据
    $.ajax({
        url: "../data.json",
        type: "POST",
        data: {},
        dataType: 'json',
        success:function(data){
            console.log(data);
            //渲染单元列表
            var htmldy=template("topDy",data);
            $(".part_rt tr").html(htmldy);
            //计算单元th宽度
            var maxdyWidth=0;
            var tdWidth=100;
            data.dy.forEach(function(v,i){
                var thW=v.maxroom*100+"px";
                //console.log(thW);
                $("#partRT th").eq(i).css({"width":thW})
            })



            // 渲染楼层列表(左侧和右侧的都渲染出来)
            var lc=[];
            data.result.forEach(function(v,i){
                if(lc.indexOf(v.lc)==-1){
                    lc.push(v.lc);
                }
            })

            data.lc=lc.reverse();
            //左侧楼层
            var htmllc=template("leftLc",data);
            $(".part_lb table").html(htmllc);
            //右侧楼层
            var htmlrc=template("floors",data);
            $(".part_rb table").html(htmlrc);

            //计算右边的table宽度
            var maxdyRoom=0;
            data.dy.forEach(function(v,i){
                //console.log(v.maxroom)
                maxdyRoom+=v.maxroom;
            })
            var tableWidth = maxdyRoom*100 + "px" ;
            $("#partRB table").css("width",tableWidth);
            $("#partRT table").css("width",tableWidth);


        //    渲染具体的房间号
             lc.forEach(function(value,i){
                 var arr=[];
                 data.result.map(function(v,j){
                     if(v.lc==value){
                         arr.push(v);
                     }
                 })
                 //console.log(arr);
                 var datalist = {
                     list :arr
                 };
                 var source ='{{each list}}'+
                     '<td style="background: {{$value.status}}" data-room="{{$value.id}}">{{$value.room}}</td>'+
                     '{{/each}}'
                 var render = template.compile(source);
                 var html = render(datalist);
                 //console.log(html);i和value确定传入的参数
                 $(".part_rb table tr").eq(i).html(html);
                 //console.log(value);
             })
        }
    })


});