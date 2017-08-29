/**
 * Created by Administrator on 2017/8/8.
 */
new Vue({
    el:"#Bjuser",
    data:{
        res:"",
        statusa:"1"
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/user/getUserImg',{"user_id":$.cookie("id")},{emulateJSON:true}).then(function(res){
            $this.res = res.data;
        },function(res){});
    },
    methods:{
        userImg:function(){
            var $this = this;
            this.$http.post(Url+'/back2/user/userImgAudit',{"user_id":$.cookie("id"),"status":this.statusa},{emulateJSON:true}).then(function(res){
                //$this.res = res.data;
                if(res.data.message == "审核成功"){
                    alerta("审核成功");
                    setTimeout(function (){
                        window.history.go(-1);
                    }, 3000);
                }
            },function(res){});
        }
    }
})