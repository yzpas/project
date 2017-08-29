/**
 * Created by Administrator on 2017/7/31.
 */

new Vue({
    el:"#login",
    data:{
        user1: "",
        paw  : "",
        user2  : "",
        paw2  : "",
        key  : "",
        session_id:""
    },
    created:function(){
        if($('#remember').is(':checked')) {
            $.cookie("user", this.user1);
            $.cookie("pwd", this.paw);
        }
       if( $.cookie("user") != "null" &&  $.cookie("pwd") != "null"){
           this.user1 =  $.cookie("user");
           this.paw =  $.cookie("pwd");
           $("#remember").attr("checkbox",true);
       }else{
           this.user1 =  "";
           this.paw = "";
       }
    },
    methods:{
        //点击登录调取方法
        logins:function(){
            this.user1 = this.user1;
            this.paw   = this.paw;
            this.$http.post(Url+'/Back2/login/dologin',{"user":this.user1,"pwd":this.paw},{
                emulateJSON:true
            }).then(function(res){
               if(res.data.status == 1){
                    alerta("登陆成功");
                    this.key = res.data.admin_key;
                    this.user = res.data.user;
                    $.cookie("key",this.key);
                    $.cookie("user",this.user);
                    window.location.href="yanku.html";
               }else{
                   alerta("请检查用户名和密码");
               }
            },function(res){
                //alert(res.status);
            });
        },
        alocked: function () {
            if($('#remember').is(':checked')) {
                $.cookie("user", this.user1);
                $.cookie("pwd", this.paw);
            }else{
                $.cookie('user', null);
                $.cookie('pwd', null);
            }

        }

    }
});