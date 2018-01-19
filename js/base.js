/**
 * Created by issuser on 2017/5/5.
 */

//快速点击
//FastClick.attach(document.body);
//阻止冒泡
function stopPropagation(e) {
    e = window.event || e;
    if (document.all) {  //只有ie识别
        e.cancelBubble = true;
    } else {
        e.stopPropagation();
    }
};
//匹配地址栏
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
};


//统一处理状态码和弹出遮罩
function ajax_state(data, fn) {
    var msg = "";
    switch (data.status) {
        case 10007:
            msg = data.result;
            break;
        case 10009:
            msg = "您的证件号码已被其他微信绑定！";
            break;
        case 10011:
            msg = "您还没有排卡，请重新输入身份证号！";
            break;
        case 10013:
            msg = "登录失败，请刷新重试！"
            break;
        case 10015:
            msg = "对不起，手慢一步。去看看其他房间。"
            break;
    }
    maskalert(msg, fn);
};
//弹框只有确定选项的
function maskalert(cont, fn) {
    $("body").append("<div id='maskident'><div class='mask_white'><h3></h3><div class='bottom_btn'><span>确定</span></div></div></div>");
    $("#maskident").show().find("h3").html(cont);
    $("#maskident span").click(function () {
        $("#maskident").remove();
        if (fn) {
            fn();
        }
    })
    //阻止滚动冒泡
    $("#maskident").bind("touchmove", function (e) {
        e.preventDefault();
    })
};

//处理弹框有确定和取消的

var html='<div id=\'maskident\' style="padding: 0 1rem">\n' +
    '    <div class=\'mask_white\'>\n' +
    '    <h3 style="font-size: 18px;font-weight: 700;margin-bottom: 0.2rem" >确认提交？</h3>\n' +
    '<p style="margin: 0.3rem 0;padding:0 0.2rem">您还有<span></span>个筹号可用于竞猜，可参与<span></span>个户型的价格竞猜，本次竞猜提交后将不可修改</span>\n' +
    '<div class=\'bottom_btn\'><span class=\'quit\'>取消</span><span class=\'confirm\'>确定</span></div>\n' +
    '</div>\n' +
    '</div>';
function cancelConfirm_Mask(cont) {
    $("body").append(html);
    $("#maskident").show().find("p span").html(cont);
    $("#maskident .quit").click(function () {
        $("#maskident").remove();
    })
    //阻止mask弹出后滚动冒泡
    $("#maskident").bind("touchmove", function (e) {
        e.preventDefault();
    })
};
///loading状态的封装
function loading(obj) {
    if (obj == null) {
        $("body").append("<div class='loading'>"
            + "<div class='spinner'>"
            + "<div class='bounce1'></div>"
            + "<div class='bounce2'></div>"
            + "<div class='bounce3'></div>"
            + "</div>"
            + "</div>");
    } else {
        obj.html("<div class='loading'>"
            + "<div class='spinner'>"
            + "<div class='bounce1'></div>"
            + "<div class='bounce2'></div>"
            + "<div class='bounce3'></div>"
            + "</div>"
            + "</div>");
    }
};
