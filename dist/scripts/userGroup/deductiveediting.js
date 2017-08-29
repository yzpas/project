/**
 * Created by Administrator on 2017/8/3.
 */
new Vue({
    el:"#deductiveediting",
    data:{
        id:"",
        list : "",
        statusa:"",
        yanyi:"",
        text:"",
        status:false
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/deductive/getDetail',{"yanyi_id":$.cookie("id")},{emulateJSON:true}).then(function(res){
            $this.list = res.data;
            $this.id = res.data.user_id;
            $this.yanyi = res.data.yanyi_id;
            if(res.data.status == "审核中"){
                $this.status = true;
            }
            if(res.data.status == "审核中"){
                $this.statusa = 1;
            }

        },function(res){});

        //this.$nextTick(function () {
        //    $(function(){
        //        $("img").hover(function(){
        //            $(this).stop().animate({"width":"25%"})
        //        },function(){
        //            $(this).stop().animate({"width":"135px"})
        //        })
        //    })
        //})
    },
    methods:{
        Identityeditor:function(){
            this.statusa = this.statusa;
            //alert(this.statusa);
            this.$http.post(Url+'/back2/deductive/audit',{
                "user_id":this.id,
                "status": this.statusa,
                "yanyi_id":this.yanyi,
                "reason":this.text
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
})
