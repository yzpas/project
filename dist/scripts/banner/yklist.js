/**
 * Created by Administrator on 2017/8/21.
 */
new Vue({
    el:"#yklist",
    data:{
        list:""
    },

    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/activity/index',{"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
            $this.list = res.data.list;
            $this.all = res.data.count;
        },function(res){});
    },
    methods:{
        del:function(e){
            this.id = e.target.getAttribute('id');
            $.cookie("id", this.id);
        },
        delTo:function(){
            console.log($.cookie("id"));
            this.$http.post(Url+'/back2/activity/del',{
                "activity_id":$.cookie("id"),
                "admin_key":$.cookie("key"),
                "user":$.cookie("user")
            },{emulateJSON:true}).then(function(res){
                if( res.data.status == "成功" ){
                    this.list = res.data.list;
                    alerta("删除成功！")
                }else {
                    alerta("删除失败！")
                }
            },function(res){});
        }
    }
});