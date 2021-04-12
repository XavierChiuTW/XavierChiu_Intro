// hahow api
var apiurl = "https://awiclass.monoame.com/api/command.php?type=get&name=hahowdata";

// 新增vue虛擬機器
var vm = new Vue({
  // 監聽範圍
  el: "#app",
  data: {
    // 先創立一個空陣列classdatas
    classdatas: []
  }
});

// 使用jquery.ajax來至抓資料 需要給一組參數(物件形式)
$.ajax({
  // 去那邊拿資料
  url: apiurl,
  // 成功後的動作 取得的值在引數res中
  success: function(res){
    // 把取回來的json資料轉換為物件形式 存於變數obj中
    var obj = JSON.parse(res);
    // 檢查一下資料
    // console.log(obj);
    // 把轉譯後的物件放進vm中的陣列classdatas中
    vm.classdatas = obj;
    // Vue.set(vm,"classdatas",obj);
  }
});