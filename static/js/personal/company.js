// 直属单位
$.ajax({
  type: "post",
  url: "http://192.168.1.20:8880/view/getUserList",
  data: {
    deptName: '直属单位',
  },
  success: function (response) {
    console.log(response);
    $('.row p').html(JSON.stringify(response));
  }
});
