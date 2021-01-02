// 专题
$.ajax({
  type: "post",
  url: "http://192.168.1.46:8880/view/getArticleList",
  data: {
    articleType: '专题',
    pageNo: 100
  },
  dataType: "json",
  success: function (response) {
    $('#info').html(response.rows);
  }
});
