/**
 * Created by Administrator on 2017/7/31.
 */
//首页跳转
new Vue({
    el:"#srcTo",
    data:{
        src : "indexTo.html"
    },
    methods:{
        liClick:function(e){
            //console.log(e.target.getAttribute('data-src'));
            this.src = e.target.getAttribute('data-src');
            //$("iframe").attr("src",this.src);
        }
    }
});