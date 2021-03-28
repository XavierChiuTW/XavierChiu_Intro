//滑動離開頂部時就取消at_top的class
// 當滑鼠往下滾動時觸發
$(window).scroll(function(e){
  // scrollTop()取距離頂部的距離 是一個函數 要記得加小括號() <= 0代表還沒有任何滑動
  if ($(window).scrollTop() <= 0)
    // 加上at_top這個class
    $(".navbar,.explore").addClass("at_top");
  else
    // 移除at_top這個class
    $(".navbar,.explore").removeClass("at_top");
});

//緩慢滑動
// 監看文件有沒有作點擊的動作 監看a標籤上的click動作 如果間看到click動作 觸發function
// event是監看到動作的回傳值
$(document).on('click', 'a', function(event){
    // 不要執行預設的動作(點擊後直接跳轉)
    event.preventDefault();
    // 新增一個變數target存放 被觸發物件a的屬性href(超連結位置)
    var target = $(this).attr("href");
    // 針對html 跟body新增動畫
    $('html, body').animate({           
        // scrollTop: $( $.attr(this, 'href') ).offset().top
      // 往下滾動 被指定位置的向下偏移量
      scrollTop: $(target).offset().top
    }, 500);
});


//建立一個function偵測進入貓咪範圍就站起來
function detect_cat(cat_id, x){
  // catplace等於貓咪的中心位置 貓咪的左偏移量 加上貓咪寬度的一半
  var catplace = $(cat_id).offset().left + $(cat_id).width() / 2;
  // 如果滑鼠座標與貓咪中線座標的距離在80px內 這變使用Math函式庫的.abs()絕對值函式
  if (Math.abs(x - catplace) < 80)
    // 貓咪的底部偏移量變為0px
    $(cat_id).css("bottom","0px");
  else
    // 否則底部偏移量為-50px(向下)
    $(cat_id).css("bottom","-50px");
}

//滑鼠移動時觸發的事件 滑鼠移動時傳回的引數evt
$(window).mousemove(function(evt){
  // 滑鼠在頁面中的x位置 存入變數pagex中
  var pagex = evt.pageX;
  // 滑鼠在頁面中的y位置 存入變數pagey中
  var pagey = evt.pageY;
  
  // 希望滑鼠在#section_about區域的左上角座標為(0, 0)
  //計算相對區域的位置 pagex - #section_about的向左偏移值
  var x = pagex-$("section#section_about").offset().left;
  //計算相對區域的位置 pagey - #section_about的向下偏移值
  var y = pagey-$("section#section_about").offset().top;
  // 測試有無抓到滑鼠x y座標
  console.log(x, y);
  
  //計算現在的y位置超過區域則隱藏 outherHeight區域高度
  if (y < 0 ||　y > $("section#section_about").outerHeight())
    $("#cross").css("opacity", 0);
  else
    $("#cross").css("opacity", 1);
  
  // console.log(x);
  //更動指標位置 讓叉叉的位置直接變成滑鼠的位置
  $("#cross").css("left", x + "px");
  $("#cross").css("top", y + "px");
  
  //計算貓的中心位置 貓咪中心位置為貓咪圖片的水平偏移位置 加上 貓咪寬度的一半
  // offset是整個頁面相對位置的left
  var catplace = $("#cat").offset().left + $("#cat").width() / 2;
  // 貓咪的頂部位置 為貓咪圖片相對於頁面的上偏移量
  var cattop = $("#cat").offset().top;
  // img_url放貓咪圖片的目錄位置 改變貓咪圖片時 只需用這個目錄位置加上貓咪圖片檔名即可套用貓咪圖片位置
  var img_url="http://awiclass.monoame.com/catpic/";
  
  //左方 / 右方 / 上方
  // 如果滑鼠座標小於貓咪中心點 - 50px的位置 圖片改為向左看的貓咪
  if (pagex < catplace - 50)
    $("#cat").attr("src",img_url+"cat_left.png");
  // 如果滑鼠座標大於貓咪中心點 ＋ 50px的位置 圖片給為向右看的貓咪
  else if (pagex > catplace  + 50)
    $("#cat").attr("src",img_url+"cat_right.png");
  // 其餘的為往上看的貓咪
  else
    $("#cat").attr("src",img_url + "cat_top.png");
  
  //左上 / 右上
  // 如果滑鼠x座標小於 貓咪中心點-50px 且 滑鼠y座標小於貓咪圖片頂部座標(滑鼠座標比貓的圖片高) 圖片為向左上看的貓咪
  if (pagex < catplace - 50 && pagey < cattop)
    $("#cat").attr("src", img_url + "cat_lefttop.png");
  // 如果滑鼠x座標大於 貓咪中心點+50px 且 滑鼠y座標小於貓咪圖片頂部座標(滑鼠座標比貓的圖片高) 圖片為向右上看的貓咪
  if (pagex > catplace + 50 && pagey < cattop)
    $("#cat").attr("src", img_url + "cat_righttop.png");
    
  //站起來的貓咪 呼叫上面定義的貓咪站起來函式 帶入參數(貓咪id, 滑鼠x座標)
  // console.log(x);
  detect_cat("#cat_yellow", pagex);
  detect_cat("#cat_blue", pagex);
  detect_cat("#cat_grey", pagex);
  
  //更新一些移動景物的位置 希望景物朝滑鼠的反方向移動
  $(".mountain").css("transform","translateX(" + (pagex / -20 + 50) + "px)");
  
  //更新簡介中文字的飄浮位置 滑鼠往下 文字往左
  $(".r1text").css("transform","translateX(" + y / -5 + "px)");
  $(".r2text").css("transform","translateX(" + y / -10 + "px)");
  $(".r3text").css("transform","translateX(" + y / -12 + "px)");
  
   //更新三角形 滑鼠往右 三角往左 x除的數字月大移動越小 
  $(".tri1").css("transform",
                 "translateX(" + x / -5 + "px) rotate(-15deg)");
  $(".tri2").css("transform",
                 "translateX(" + x / -10 + "px) rotate(-15deg)");
  $(".tri3").css("transform",
                 "translateX(" + x / -12 + "px) rotate(-15deg)");
  $(".tri4").css("transform",
                 "translateX(" + x / -14 + "px) rotate(-15deg)");
  $(".tri5").css("transform",
                 "translateX(" + x / -16 + "px) rotate(-15deg)");
});

// vue cdn在js的設定中引入 https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.js


// 新增 vue監看物件 
var vm = new Vue({
  // 作用範圍
  el: "#app",
  // 使用什麼數據帶入 
  data: {
    // 建立一個空陣列works 拿來放入物件用
    works: []
  },
  // 載入完成後的動作
  mounted: function(){
    // 先把this變成一個變數
    var vobj = this;
    // 使用jquery.ajax去抓取資料
    $.ajax({
      // 抓取資料來源api
      url: "https://awiclass.monoame.com/api/command.php?type=get&name=projects",
      // 抓取資料成功後的動作 抓取到的資料在參數res中
      success: function(res){
        // 測試資料有無抓成功
        // console.log(res);
        // 傳回來的json資料轉換為物件形式 存入vobj.works中  
        vobj.works = JSON.parse(res);
      }
    });
  }  
});