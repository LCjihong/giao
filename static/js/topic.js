// 专题
$.ajax({
  type: "post",
  url: "http://192.168.1.20:8880/view/getArticleTypeList",
  data: {
    articleType:'专题',
    pageNo:100
  },
  success: function (response) {
    $('.row p').html(JSON.stringify(response));
  }
});
