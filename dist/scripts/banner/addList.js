/**
 * Created by Administrator on 2017/8/21.
 */
new Vue({
    el:"#addList",
    data:{
        list:"",
        all: '', //总页数
        cur: 1 ,//当前页码
        searchKey:null,
        rows:10
    },
    watch: {
        cur: function(oldValue , newValue){
            this.$http.post(Url+'/back2/banner/getScheduleData',{page:arguments[0],"admin_key":$.cookie("key"),"user":$.cookie("user"),"rows":this.rows},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        }
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/banner/getScheduleData',{"admin_key":$.cookie("key"),"user":$.cookie("user"),"rows":this.rows},{emulateJSON:true}).then(function(res){
            $this.list = res.data.list;
            $this.all = res.data.count;
        },function(res){});
    },
    methods:{
        btnClick: function(data){//页码点击事件
            if(data != this.cur){
                this.cur = data
            }
        },
        //下一页and上一页
        pageClick: function(){
            this.$http.post(Url+'/back2/banner/getScheduleData',{page:this.cur,"admin_key":$.cookie("key"),"user":$.cookie("user"),"rows":this.rows},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        },
        ////搜索
        soso:function(){
            this.searchKey = this.searchKey;
            this.$http.post(Url+'/back2/banner/getScheduleData',{
                search_key:this.searchKey,
                "admin_key":$.cookie("key"),
                "user":$.cookie("user"),
                "rows":this.rows
            },{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
                this.all = res.data.count;
            },function(res){});
        },
        del:function(e){
            this.id = e.target.getAttribute('id');
            $.cookie("id", this.id);

        },
        delTo:function(){
            console.log($.cookie("id"));
            this.$http.post(Url+'/back2/banner/add',{
                "schedule_id":$.cookie("id"),
                "admin_key":$.cookie("key"),
                "user":$.cookie("user"),
                "rows":this.rows
            },{emulateJSON:true}).then(function(res){
                if( res.data.reason == "无" ){
                    //this.list = res.data.list;
                    //this.all = res.data.count;
                    alerta("添加成功！")
                }else if( res.data.reason == "该轮播图已存在"  ){
                    alerta("删除失败，请从新尝试！该轮播图已存在!")
                }else{
                    alerta("删除失败，请从新尝试！轮播图数量已达到上限!")
                }

            },function(res){});
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