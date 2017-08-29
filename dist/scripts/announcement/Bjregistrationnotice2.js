/**
 * Created by Administrator on 2017/8/7.
 */
new Vue({
    el:"#Bjregistrationnotice",
    data:{
        res:"",
        listTo:"",
        all: '', //总页数
        cur: 1//当前页码
    },
    watch: {
        cur: function(oldValue , newValue){
            this.$http.post(Url+'/back2/user/enrollList',{page:arguments[0]},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        }
    },
    created:function(){
        //console.log($.cookie("id"));
        var $this = this;
        this.$http.post(Url+'/back2/user/enrollList',{"user_id":$.cookie("id")},{emulateJSON:true}).then(function(res){
            $this.all = res.data.count;
            if( res.data.exist == 0 ){
                alerta("暂时没有负约人数！");
            }else{
                $this.res = res.data;
                $this.listTo = res.data.list;

            }
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
            this.$http.post(Url+'/back2/user/enrollList',{page:this.cur},{emulateJSON:true}).then(function(res){
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
});