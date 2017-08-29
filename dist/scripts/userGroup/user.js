/**
 * Created by Administrator on 2017/8/1.
 */
new Vue({
    el:"#userList",
    data:{
        list : '',//默认列表 第一页
        all: '', //总页数
        cur: 1,//当前页码
        strartTime:null,//起始的时间
        endTime:null,//结束的时间
        searchKey:null//关键字
    },
    watch: {

        cur: function(oldValue , newValue){
            this.$http.post(Url+'/Back2/user/index',{page:arguments[0],start_time:this.strartTime,end_time:this.endTime,search_key:this.searchKey,"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        }
    },
    created:function(){

        var $this = this;
        this.$http.post(
            Url+'/back2/user/index',
            {"admin_key":$.cookie("key"),"user":$.cookie("user")},
            {emulateJSON:true}
        ).then(function(res){
            $this.list = res.data.list;
            $this.all = res.data.count;
        },function(res){});
    },
    methods:{
        //全选方法
        inputCheckbox:function(){
            if($("input[type='checkbox'][name='box']:checked").prop("checked")){//全选
                $("[name = ids]:checkbox").each(function() {
                    $(this).prop("checked", true);
                });
            }else{
                $("[name = ids]:checkbox").each(function() {
                    $(this).prop("checked", false);
                });
            }
        },
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data
            }
        },
        //下一页and上一页
        pageClick: function(){
            this.$http.post(Url+'/Back2/user/index',{page:this.cur,start_time:this.strartTime,end_time:this.endTime,search_key:this.searchKey,"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        },
        //搜索
        soso:function(){
            this.strartTime = $("#J-xl").val();
            this.endTime = $("#J-x2").val();
            this.searchKey = this.searchKey;
            this.$http.post(Url+'/Back2/user/index',{
                page:this.cur,
                start_time:this.strartTime,
                end_time:this.endTime,
                search_key:this.searchKey,
                "admin_key":$.cookie("key"),
                "user":$.cookie("user")
            },{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
                this.all = res.data.count;
            },function(res){});
        },
        clicks:function(e){
            this.id = e.target.getAttribute('id');
            $.cookie("id", this.id);
            window.location.href="Bjuser.html";
        }
    },
    //默认个数
    computed: {
        indexs: function(){
            var left = 1;
            var right = this.all;
            var ar = [];
            if(this.all>= 10){
                if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
                }else{
                    if(this.cur<=3){
                        left = 1;
                        right = 5;
                    }else{
                        right = this.all
                        left = this.all -4
                    }
                }
            }
            while (left <= right){
                ar.push(left);
                left ++
            }
            return ar
        }

    }
});
