
/**
 * Created by Administrator on 2017/8/3.
 */
new Vue({
    el:"#Identityeditor",
    data:{
        res:"",
        id:"",
        status:false,
        user_id:"",
        reason:"",
        statusa:"",
        text:""
    },
    created:function(){
        //console.log($.cookie("id"));
        var $this = this;
        this.$http.post(Url+'/back2/identity/getDetail',{"id":$.cookie("id"),"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
            $this.res = res.data;
            $this.id = res.data.id;
            //$this.status = res.data.status;
            $this.user_id = res.data.user_id;
            $this.reason = res.data.reason;
            if(res.data.status == "审核中"){
                $this.status = true;
            }
            if(res.data.status == "审核中"){
                $this.statusa = 1;
            }
        },function(res){});
    },
    methods:{
        Identityeditor:function(){
            this.statusa = this.statusa;
            this.$http.post(Url+'/back2/identity/audit',{
                "id":$.cookie("id"),
                "status": this.statusa,
                "user_id":this.user_id,
                "reason":this.text,
                "admin_key":$.cookie("key"),
                "user":$.cookie("user")
            },{emulateJSON:true}).then(function(res){
                if( res.data.message == "审核成功"){
                    alerta("审核成功");
                    setTimeout(function (){
                        window.history.go(-1);
                    }, 3000);
                }

            },function(res){});
        }
    }
});