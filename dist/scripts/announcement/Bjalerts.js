/**
 * Created by Administrator on 2017/8/7.
 */
new Vue({
    el:"#Bjzblist",
    data:{
        res:""
    },
    created:function(){
        //console.log($.cookie("id"));
        var $this = this;
        this.$http.post(Url+'/back2/schedule/scheduledetail',{"schedule_id":$.cookie("id")},{emulateJSON:true}).then(function(res){
            $this.res = res.data;
        },function(res){});
    }
});