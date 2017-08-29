/**
 * Created by Administrator on 2017/8/7.
 */
new Vue({
    el:"#Bjregistrationnotice",
    data:{
        res:""
    },
    created:function(){
        //console.log($.cookie("id"));
        var $this = this;
        this.$http.post(Url+'/back2/schedule/notattendlist',{"schedule_id":$.cookie("id")},{emulateJSON:true}).then(function(res){
            console.log(res);
            if( res.data.exist == 0 ){
                alerta("暂时没有负约人数！");
            }else{
                $this.res = res.data;
            }
        },function(res){});
    }
});