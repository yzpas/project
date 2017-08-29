/**
 * Created by Administrator on 2017/8/2.
 */
new Vue({
    el:"#admin_index",
    data:{
        indexTo :''
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/index/index',{},{emulateJSON:true}).then(function(res){
           $this.indexTo = res.data;
        },function(res){});
    }
});