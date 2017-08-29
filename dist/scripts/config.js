/**
 * Created by Administrator on 2017/5/9.
 */
//公用提示框
function alerta( text ){
    $('.alerta').html(text);
    $('.alerta').fadeIn("fast").delay(2000).fadeOut("slow");

}
var Url = "http://back.yankushidai.com/index.php";
function Trim(str)
{
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}
function delCookie(c_name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(c_name);
    if(cval!=null) document.cookie=c_name+"="+cval+";expires="+exp.toGMTString();
}