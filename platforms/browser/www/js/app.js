document.addEventListener('deviceready', onDeviceReady, false);
var anasayfaTpl, pageTpl, girisTpl, postsTpl,postTpl,galeriTpl,iletisimTpl,yonetimTpl,paylasimlarTpl;
var usercpTpl, usercpAyarTpl, aidatlarTpl, tumAidatlarTpl;

var userID= null;
var userAd= null;
var userSoyad= null;
var userEmail = null;
var userTCNO = null;
var userPassword = null;
var userGSM = null;
var userAdres = null;
var rolename = null;

$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

(function() {
    var xhr = {};
    xhr.open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url) {
        console.log(url);
        if(url.indexOf('/proxy/') == 0){
            url = window.decodeURIComponent(url.substr(7));
        }
        xhr.open.apply(this, arguments);
    };
})(window);
var varsayilan_aidat_tutari = 0;
function onDeviceReady() {

    anasayfaTpl = Handlebars.compile($("#anasayfa-tpl").html());
    pageTpl = Handlebars.compile($("#page-tpl").html());
    girisTpl = Handlebars.compile($("#giris-tpl").html());
    postsTpl = Handlebars.compile($("#posts-tpl").html());
    postTpl = Handlebars.compile($("#post-tpl").html());
    galeriTpl = Handlebars.compile($("#galeri-tpl").html());
    iletisimTpl = Handlebars.compile($("#iletisim-tpl").html());
    yonetimTpl = Handlebars.compile($("#yonetim-tpl").html());
    paylasimlarTpl = Handlebars.compile($("#paylasimlar-tpl").html());
    usercpTpl = Handlebars.compile($("#usercp-tpl").html());
    usercpAyarTpl = Handlebars.compile($("#usercp-ayar-tpl").html());
    aidatlarTpl = Handlebars.compile($("#aidatlar-tpl").html());
    tumAidatlarTpl = Handlebars.compile($("#tumaidatlar-tpl").html());

    
    if(window.localStorage.getItem("isLogged")){
        isLogged = true;
        userID = window.localStorage.getItem("userID");
        rolename = window.localStorage.getItem("rolename");
        userAd = window.localStorage.getItem("userAd");
        userSoyad = window.localStorage.getItem("userSoyad");
        userGSM = window.localStorage.getItem("userGSM");
        userAdres = window.localStorage.getItem("userAdres");
        userEmail = window.localStorage.getItem("userEmail");
        userTCNO = window.localStorage.getItem("userTCNO");
        userPassword = window.localStorage.getItem("userPassword");
        api_token = window.localStorage.getItem("api_token");
        user = window.localStorage.getItem("user");

        $.ajax({
            type: "POST",
            url: api_url+"/login",
            data: {"tcno":userTCNO, "password":userPassword},
            success : function(data) {
                console.log(data);
                isLogged = true;
                user = data;
                api_token = data.api_token;
                window.localStorage.setItem("isLogged", isLogged);
                window.localStorage.setItem("rolename", data.rolename);
                window.localStorage.setItem("userID", data.id);
                window.localStorage.setItem("userAd", data.ad);
                window.localStorage.setItem("userSoyad", data.soyad);
                window.localStorage.setItem("userGSM", data.gsm);
                window.localStorage.setItem("userAdres", data.adres);
                window.localStorage.setItem("userEmail", data.email);
                window.localStorage.setItem("userTCNO", data.email);
                window.localStorage.setItem("userPassword", password);
                window.localStorage.setItem("api_token", data.api_token);
                window.localStorage.setItem("user", data);

                //route("anasayfa");
                route("usercp");
            },
            error : function(data){

            }
        }); 
    }
    

    route();

    $(document).on('click','#loginGonder',function(){
       girisSend();
    });
    $(document).on('click','#iletisimGonder',function(){
       iletisimGonder();
    });
    $(document).on('click','#paylasimForm #paylasimGonder',function(){
       paylasimGonder();
    });
    $(document).on('click','#kullaniciAyarForm #kayarGonder',function(){
       usercpAyarKaydet();
    });

    Handlebars.registerHelper('icerikOzet', function(data) {
        // strip tags
        striped_text = data.toString();
        striped_text = striped_text.replace(/<\/?[^>]+>/gi, '');

        //html entity decode
        var html_decode = $('<textarea />').html(striped_text).text();

        //get substring
        return html_decode.substring(0, 200);
    });

    varsayilan_aidat_tutari = getAyar("varsayilan_aidat_tutari");

    

    Handlebars.registerHelper('getAy', function(data) {
        switch (parseInt(data)+1) {
            case 1:
                return "Ocak";
                break;
            case 2:
                return "Şubat";
                break;
            case 3:
                return "Mart";
                break;
            case 4:
                return "Nisan";
                break;
            case 5:
                return "Mayıs";
                break;
            case 6:
                return "Haziran";
                break;
            case 7:
                return "Temmuz";
                break;
            case 8:
                return "Ağustos";
                break;
            case 9:
                return "Eylül";
                break;
            case 10:
                return "Ekim";
                break;
            case 11:
                return "Kasım";
                break;
            case 12:
                return "Aralık";
                break;
            default:
                return "-";
            }

    });
 
    Handlebars.registerHelper('getAyy', function(data) {
        switch (parseInt(data)) {
            case 1:
                return "Ocak";
                break;
            case 2:
                return "Şubat";
                break;
            case 3:
                return "Mart";
                break;
            case 4:
                return "Nisan";
                break;
            case 5:
                return "Mayıs";
                break;
            case 6:
                return "Haziran";
                break;
            case 7:
                return "Temmuz";
                break;
            case 8:
                return "Ağustos";
                break;
            case 9:
                return "Eylül";
                break;
            case 10:
                return "Ekim";
                break;
            case 11:
                return "Kasım";
                break;
            case 12:
                return "Aralık";
                break;
            default:
                return "-";
            }

    });
 


}
function getAyar(key){
    $.ajax({
        type: "GET",
        url: api_url+"/ayar/get",
        data: {"key":key},
        success : function(data) {
            console.log("ayar"+data.deger);
            return data.deger;
        },
        error : function(data){
            return false;
        }
    });
}

var app = $('#content');
var main_url = "http://akyazikoyudernegi.com";
var api_url = "http://akyazikoyudernegi.com/api";
var isLogged = false;
var user = null;

var api_token = null;

function anasayfa(){
    var isAdmin = false;
    
    if(isLogged){
        if(rolename == "yonetici"){
            isAdmin = true;
        }else{
            isAdmin = false;
        }
        app.html(anasayfaTpl({"isLogged":isLogged,"isAdmin":isAdmin}));
    }else{
        app.html(anasayfaTpl());
    }
}

function giris(){
    if(!isLogged){
        app.html(girisTpl());
    }else{
        route("usercp")
        app.html(girisTpl());
    }
}

function cikis(){
    isLogged = null;
    window.localStorage.removeItem("isLogged");
    window.localStorage.removeItem("user");

    window.localStorage.removeItem("rolename");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("userAd");
    window.localStorage.removeItem("userSoyad");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("userTCNO");
    window.localStorage.removeItem("userPassword");  

    window.localStorage.removeItem("userGSM");
    window.localStorage.removeItem("userAdres");

    user = null;

    route("anasayfa");
}

function girisSend(){

    var tcno = $("#loginForm #tcno").val();
    var password = $("#loginForm #password").val();

    $.ajax({
        type: "POST",
        url: api_url+"/login",
        data: {"tcno":tcno, "password":password},
        success : function(data) {
            console.log(data);
            isLogged = true;
            window.localStorage.setItem("isLogged", isLogged);
            window.localStorage.setItem("userID", data.id);
            window.localStorage.setItem("userAd", data.ad);
            window.localStorage.setItem("userSoyad", data.soyad);
            window.localStorage.setItem("userGSM", data.gsm);
            window.localStorage.setItem("userAdres", data.adres);
            window.localStorage.setItem("userEmail", data.email);
            window.localStorage.setItem("userTCNO", data.email);
            window.localStorage.setItem("userPassword", password);
            window.localStorage.setItem("api_token", data.api_token);
            window.localStorage.setItem("rolename", data.rolename);
            window.localStorage.setItem("user", data);

            userID = window.localStorage.getItem("userID");
            userAd = window.localStorage.getItem("userAd");
            userSoyad = window.localStorage.getItem("userSoyad");
            userGSM = window.localStorage.getItem("userGSM");
            userAdres = window.localStorage.getItem("userAdres");
            userEmail = window.localStorage.getItem("userEmail");
            userTCNO = window.localStorage.getItem("userTCNO");
            userPassword = window.localStorage.getItem("userPassword");
            api_token = window.localStorage.getItem("api_token");
            rolename = window.localStorage.getItem("rolename");
            user = window.localStorage.getItem("user");

            //route("anasayfa");
            route("usercp");
        },
        error : function(data){
            $("#Note").html(data.responseJSON.error);
        }
    }); 
}

function iletisim(){
    if(isLogged){
        $.ajax({
            type: "GET",
            url: api_url+"/iletisim", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            app.html(iletisimTpl(
                {
                    "title":data.title,
                    "content":data.content,
                    "isLogged":isLogged,
                    "user":user
                }
            ));
        });
    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/iletisim", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            app.html(iletisimTpl(
                {
                    "title":data.title,
                    "content":data.content
                }
            ));
        });
    }
    
}

function iletisimGonder(){
    
    var user_id = $("#iletisimFormu #user_id").val();
    var ad = $("#iletisimFormu #ad").val();
    var soyad = $("#iletisimFormu #soyad").val();
    var email = $("#iletisimFormu #email").val();
    var gsm = $("#iletisimFormu #gsm").val();
    var konu = $("#iletisimFormu #konu").val();
    var mesaj = $("#iletisimFormu #mesaj").val();

    $.ajax({
        type: "POST",
        url: api_url+"/iletisim/gonder",
        data: {
            "user_id":user_id, 
            "ad":ad,
            "soyad":soyad,
            "email":email,
            "gsm":gsm,
            "konu":konu,
            "mesaj":mesaj
        },
        success : function(data) {
            $("#Note").html("Mesajınız başarıyla gönderildi.");
        },
        error : function(data){
            $("#Note").html(data.responseJSON);
        }
    });

}

function koyumuz(){

    $.ajax({
        type: "GET",
        url: api_url+"/koyumuz", 
        dataType: 'json',
        contentType: "application/json"
    })
    .done(function(data) {
        app.html(pageTpl(
            {
                "title":data.title,
                "content":data.content,
                "image":main_url+"/storage/cover_images/"+data.cover_image
            }
        ));
    });
}

function dernegimiz(){

    $.ajax({
        type: "GET",
        url: api_url+"/dernegimiz", 
        dataType: 'json',
        contentType: "application/json"
    })
    .done(function(data) {
        app.html(pageTpl(
            {
                "title":data.title,
                "content":data.content,
                "image":main_url+"/storage/cover_images/"+data.cover_image
            }
        ));
    });
}

function haberler(sayfa){
    if(sayfa){
        $.ajax({
            type: "GET",
            url: api_url+"/haberler?page="+sayfa, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.haberler.total > 0){
                app.html(postsTpl(
                    {
                        "page_title":"Haberler ("+sayfa+". sayfa)",
                        "contents":data.haberler.data,
                        "sayfalama":sayfalama(data.haberler,"haberler"),
                        "route":"haber"
                    }
                ));
            }else{
                app.html(postsTpl(
                    {
                        "page_title":"Haberler",
                        "hata":"Henüz hiç haber paylaşılmadı."
                    }
                ));
            }
        });
    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/haberler", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.haberler.total > 0){
                app.html(postsTpl(
                    {
                        "page_title":"Haberler",
                        "contents":data.haberler.data,
                        "sayfalama":sayfalama(data.haberler,"haberler"),
                        "route":"haber"
                    }
                ));
            }else{
                app.html(postsTpl(
                    {
                        "page_title":"Haberler",
                        "hata":"Henüz hiç haber paylaşılmadı."
                    }
                ));
            }
            
        });
    }
}

function haber(id){
    $.ajax({
            type: "GET",
            url: api_url+"/haber/"+id, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            app.html(postTpl(
                {
                    "title":data.data.title,
                    "content":data.data.content,
                    "cover_image":data.data.cover_image
                }
            ));
            
        });
}

function duyuru(id){
    $.ajax({
            type: "GET",
            url: api_url+"/duyuru/"+id, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            app.html(postTpl(
                {
                    "title":data.data.title,
                    "content":data.data.content,
                    "cover_image":data.data.cover_image

                }
            ));
            
        });
}

function duyurular(sayfa){
    if(sayfa){
        $.ajax({
            type: "GET",
            url: api_url+"/duyurular?page="+sayfa, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.duyurular.total > 0){
                app.html(postsTpl(
                    {
                        "page_title":"Duyurular ("+sayfa+". sayfa)",
                        "contents":data.duyurular.data,
                        "sayfalama":sayfalama(data.duyurular,"duyurular"),
                        "route":"duyuru"
                    }
                ));
            }else{
                app.html(postsTpl(
                    {
                        "page_title":"Duyurular",
                        "hata":"Henüz hiç duyuru paylaşılmadı."
                    }
                ));    
            }
            
        });
    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/duyurular", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.duyurular.total > 0){
                app.html(postsTpl(
                    {
                        "page_title":"Duyurular",
                        "contents":data.duyurular.data,
                        "sayfalama":sayfalama(data.duyurular,"duyurular"),
                        "route":"duyuru"
                    }
                ));
            }else{
                app.html(postsTpl(
                    {
                        "page_title":"Duyurular",
                        "hata":"Henüz hiç duyuru paylaşılmadı."
                    }
                ));
            }
        });
    }
}

function galeri(sayfa){
    if(sayfa){
        $.ajax({
            type: "GET",
            url: api_url+"/galeri?page="+sayfa, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.total > 0){
                app.html(galeriTpl(
                    {
                        "page_title":"Galeri ("+sayfa+". sayfa)",
                        "contents":data.data,
                        "sayfalama":sayfalama(data,"galeri")
                    }
                ));
                
                
            }else{
                app.html(galeriTpl(
                    {
                        "page_title":"Galeri",
                        "hata":"Henüz hiç fotoğraf paylaşılmadı."
                    }
                ));    
            }
            
        });

    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/galeri", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            if(data.total > 0){
                app.html(galeriTpl(
                    {
                        "page_title":"Galeri",
                        "contents":data.data,
                        "sayfalama":sayfalama(data,"galeri")
                    }
                ));
            }else{
                app.html(galeriTpl(
                    {
                        "page_title":"Galeri",
                        "hata":"Henüz hiç fotoğraf paylaşılmadı."
                    }
                ));
            }
        });
    }
}

function sayfalama(data,module){
    html = null;
    if (data.last_page > 1){

        html = '<ul class="pagination" style="float:left;">';

        if(data.prev_page_url !=null){
            html+='<li>';
            html+='<a onclick="'+module+'('+(data.current_page-1)+')">önceki sayfa</a>';
            html+='</li>';
        }
        
        html+='<li class="active">';
        html+='<a>'+data.current_page+'. Sayfa</a>';
        html+='</li>';

        if(data.next_page_url !=null){
            html+='<li>';
            html+='<a onclick="'+module+'('+(data.current_page+1)+')" >Sonraki Sayfa</a>';
            html+='</li>';
        }
        
        html+='</ul>';
    }
    
    return html;
}

function yonetim(){
    app.html(yonetimTpl());
    
}

function paylasimlar(sayfa){
    if(sayfa){
        $.ajax({
            type: "GET",
            url: api_url+"/paylasimlar?page="+sayfa, 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(data);
            if(data.paylasimlar.total > 0){
                app.html(paylasimlarTpl(
                    {
                        "page_title":"Paylaşimlar ("+sayfa+". sayfa)",
                        "contents":data.paylasimlar.data,
                        "paylasimlar":sayfalama(data.paylasimlar,"paylasimlar"),
                        "route":"paylasimlar",
                        "user":user,
                        "isLogged":isLogged
                    }
                ));
            }else{
                app.html(paylasimlarTpl(
                    {
                        "page_title":"Paylaşımlar",
                        "hata":"Henüz hiç paylaşım yok.",
                        "user":user,
                        "isLogged":isLogged
                    }
                ));    
            }
            
        });
    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/paylasimlar", 
            dataType: 'json',
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(data);
            if(data.total > 0){
                app.html(paylasimlarTpl(
                    {
                        "page_title":"Paylaşımlar",
                        "contents":data.data,
                        "sayfalama":sayfalama(data.data,"paylasimlar"),
                        "route":"paylasimlar",
                        "user":user,
                        "isLogged":isLogged
                    }
                ));
            }else{
                app.html(paylasimlarTpl(
                    {
                        "page_title":"Paylaşımlar",
                        "hata":"Henüz hiç paylaşım yok.",
                        "user":user,
                        "isLogged":isLogged
                    }
                ));
            }
        });
    }
}

function paylasimGonder(){

    var fd = new FormData();    
    fd.append( 'cover_image', $("#cover_image")[0].files[0] );
    fd.append( 'title', $("#paylasimForm #title").val() );
    fd.append( 'content', $("#paylasimForm #content").val() );
    fd.append( 'user_id', $("#paylasimForm #user_id").val() );
    fd.append( 'api_token', window.localStorage.getItem("api_token") );

    $.ajax({
        url: api_url+"/paylasim/gonder",
        type: "POST",
        data:  fd,
        contentType: false,
        cache: false,
        processData:false,
        success: function(data){
            route("paylasimlar");
        }         
    });
}


function usercp(){
    app.html(usercpTpl());
}

function usercpAyar(){
    app.html(usercpAyarTpl(
    {
        "ad":userAd,
        "soyad":userSoyad,
        "gsm":userGSM,
        "email":userEmail
    }
    ));
}

function usercpAyarKaydet(){

    var email = $("#kullaniciAyarForm #email").val();
    var gsm = $("#kullaniciAyarForm #gsm").val();

    console.log("email"+email);
    console.log("gsm"+gsm);

    var password = $("#kullaniciAyarForm #password").val();
    var v_password = $("#kullaniciAyarForm #v-password").val();

    if(password != v_password){
        $("#Note").html("Şİfreler aynı değil!");
    }else{
        $.ajax({
            type: "POST",
            url: api_url+"/usercpKaydet/"+userID+"?api_token="+api_token+"&email="+email+"&gsm="+gsm+"&password="+password,
            dataType: 'json',
            contentType: "application/json",
            success : function(data) {
                console.log(data.user);
                window.localStorage.setItem("userGSM", data.user.gsm);
                window.localStorage.setItem("userEmail", data.user.email);
                window.localStorage.setItem("api_token", data.user.api_token);
                window.localStorage.setItem("user", data.user);
                userGSM = window.localStorage.getItem("userGSM");
                userEmail = window.localStorage.getItem("userEmail");
                api_token = window.localStorage.getItem("api_token");
                user = window.localStorage.getItem("user");

                route("usercpAyar");
                $("#Note").html("Başarıyla güncellendi");
            },
            error : function(data){
               console.log(data);
            }
        });

            
    }

}

function aidatlar(){
    varsayilan_aidat_tutari = 10;
    $.ajax({
        type: "GET",
        url: api_url+"/ayar/get",
        data: {"key":"varsayilan_aidat_tutari"},
        success : function(data) {
            varsayilan_aidat_tutari = data.deger;
        },
        error : function(data){
           console.log(data);
        }
    });
    $.ajax({
        type: "GET",
        url: api_url+"/aidatlar/"+userID, 
        dataType: 'json',
        data: {"api_token":api_token},
        contentType: "application/json",
        success: function(data) {
            console.log(data);
            app.html(aidatlarTpl(
                {
                    "varsayilan_aidat_tutari":varsayilan_aidat_tutari,
                    "title":new Date().getFullYear() +" Aidatlarım",
                    "aidatlar":data.aidatlar
                }
            ));
        }
    });
}

function tumaidatlar(sayfa){
    if(sayfa){
        $.ajax({
            type: "GET",
            url: api_url+"/tumaidatlar/"+userID+"?page="+sayfa, 
            dataType: 'json',
            data:{"api_token":api_token},
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(data.aidatlar);
            if(data.aidatlar.total > 0){
                app.html(tumAidatlarTpl(
                    {
                        "page_title":"Aidatlar ("+sayfa+". sayfa)",
                        "aidatlar":data.aidatlar.data,
                        "sayfalama":sayfalama(data.aidatlar,"tumaidatlar"),
                        "route":"tumaidatlar",
                        "user":user
                    }
                ));
            }else{
                app.html(tumAidatlarTpl(
                    {
                        "page_title":"Aidatlar",
                        "hata":"Henüz hiç ödenmiş aidat yok.",
                        "user":user
                    }
                ));    
            }
            
        });
    }else{
        $.ajax({
            type: "GET",
            url: api_url+"/tumaidatlar/"+userID, 
            dataType: 'json',
            data:{"api_token":api_token},
            contentType: "application/json"
        })
        .done(function(data) {
            console.log(data);
            if(data.aidatlar.total > 0){
                app.html(tumAidatlarTpl(
                    {
                        "page_title":"Aidatlar",
                        "aidatlar":data.aidatlar.data,
                        "sayfalama":sayfalama(data.aidatlar,"tumaidatlar"),
                        "route":"tumaidatlar",
                        "user":user
                    }
                ));
            }else{
                app.html(tumAidatlarTpl(
                    {
                        "page_title":"Aidatlarım",
                        "hata":"Henüz hiç ödenmiş aidat yok.",
                        "user":user
                    }
                ));
            }
        });
    }
}

function panel(){
    if(isLogged){
        route("usercp");
    }else{
        route("giris");
    }
}

function route(page){
    switch(page) {
        case "anasayfa":
            anasayfa();
            break;
        case "koyumuz":
            koyumuz();
            break;
        case "dernegimiz":
            dernegimiz();
            break;
        case "giris":
            giris();
            break;
        case "haberler":
            haberler();
            break;
        case "duyurular":
            duyurular();
            break;
        case "galeri":
            galeri();
            break;
        case "iletisim":
            iletisim();
            break;
        case "yonetim":
            yonetim();
            break;
        case "aidatlar":
            aidatlar();
            break;
        case "tumaidatlar":
            tumaidatlar();
            break;
        case "usercp":
            usercp();
            break;
        case "cikis":
            cikis();
            break;
        case "usercpAyar":
            usercpAyar();
            break;
        case "paylasimlar":
            paylasimlar();
            break;
        case "panel":
            panel();
            break;
        default:
            anasayfa();
    }
}
