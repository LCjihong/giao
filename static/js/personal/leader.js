// 总办领导
$.ajax({
  type: "post",
  url: "http://192.168.1.20:8880/view/getUserList",
  data: {
    deptName: '总办领导',
  },
  success: function (response) {
    console.log(response);
    $('.row p').html(JSON.stringify(response));
  }
});