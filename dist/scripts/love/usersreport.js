/**
 * Created by Administrator on 2017/8/18.
 */
new Vue({
    el:"#usersreport",
    data:{
        list : "",
        all: '', //总页数
        cur: 1 //当前页码
    },
    watch: {
        cur: function(oldValue , newValue){
            this.$http.post(Url+'/back2/report/index',{page:arguments[0],start_time:this.strartTime,end_time:this.endTime,search_key:this.searchKey,status:this.selectTo,"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        }
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/report/index',{"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
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
            this.$http.post(Url+'/back2/report/index',{page:this.cur,start_time:this.strartTime,end_time:this.endTime,search_key:this.searchKey,status:this.selectTo,"admin_key":$.cookie("key"),"user":$.cookie("user")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
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
})