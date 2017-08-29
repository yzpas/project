/**
 * Created by Administrator on 2017/8/17.
 */
new Vue({
    el:"#video",
    data:{
        list:"",
        all: '', //总页数
        cur: 1 ,//当前页码
        popo: false,
        src : null
    },
    watch: {
        cur: function(oldValue , newValue){
            this.$http.post(Url+'/back2/livelist/monitor',{page:arguments[0],"admin_key":$.cookie("key")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        }
    },
    created:function(){
        var $this = this;
        this.$http.post(Url+'/back2/livelist/monitor',{"admin_key":$.cookie("key")},{emulateJSON:true}).then(function(res){
            console.log(res);
            if( res.data.status == "暂无直播"){
                alerta("暂无直播");
            }else{
                $this.list = res.data.list;
                $this.all = res.data.count;
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
            this.$http.post(Url+'/back2/livelist/monitor',{page:this.cur,"admin_key":$.cookie("key")},{emulateJSON:true}).then(function(res){
                this.list = res.data.list;
            },function(res){});
        },
        pupu: function(){
            this.popo = false;
        },
        blocks:function(e){
            this.src = e.target.getAttribute('url');
            console.log(this.src);
            var flashvars={
                f:this.src,
                c:0,
                p:1
            };
            var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
            CKobject.embedSWF('dist/scripts/video/ckplayer/ckplayer.swf','a1','ckplayer_a1','800','600',flashvars,params);
            this.popo = true;
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