/**
 * Created by Administrator on 2017/6/7.
 */
var Urls = window.location.href;
$(".btnT").click(function(){
    if($("#exampleInputFile").val()==""){
        alert("请上传通告图片");
        return false;
    } else if($("#zhut").val()==""){
        alert("请输入通告标题");
        return false;
    } else if($("#city").val()==""){
        alert("请输城市");
        return false;
    } else if($("#address").val()==""){
        alert("请输入工作地点");
        return false;
    } else if($("#J-xl").val()==""){
        alert("请输入截止时间");
        return false;
    } else if($("#sex").val()=="性别要求"){
        alert("请输入性别要求");
        return false;
    } else if($("#audit").val()=="认证要求"){
        alert("请输入认证要求");
        return false;
    } else if($("#schedule_type").val()=="通告类型"){
        alert("请输入通告类型");
        return false;
    }
    //else if($("#content").val()=="" || $("#contenta").val() == "" ){
    //    alert("请输入通告详细说明");
    //    return false;
    //}
    var display =$('.box1').css('display');
    var display1 =$('.box2').css('display');
    if(display == 'block'){
        if($("#content").val()=="" ) {
            alert("请输入通告详细说明");
            return false;
        }
    }
    if(display1 == 'block'){
        if($("#contenta").val() == "") {
            alert("请输入通告图片");
            return false;
        }
    }
});