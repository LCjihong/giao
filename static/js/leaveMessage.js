$(function () {
  $('.nav li').click(function (e) {
    e.preventDefault();
    $('.nav .active').removeClass('active');
    $(this).addClass('active');
  });
  $('.nav li:eq(0)').click(function (e) {
    e.preventDefault();
    $('#info').show();
    $('#writeMsg').hide();
  });
  $('.nav li:eq(1)').click(function (e) {
    e.preventDefault();
    $('#info').hide();
    $('#writeMsg').show();
  });
})

// 留言选登
$.ajax({
  type: "post",
  url: "http://renjihong.zone/supplier-website/view/getMessagesList",
  data: {
    replyStatus: '',
    pageNo: 100
  },
  dataType: "json",
  success: function (response) {
    $('#info .leaveMessageData').html(
      $.map(response.rows, function (v, i) {
        return `<li>
            <a class="glyphicon glyphicon-menu-right" href="#">
              <span class="uname">${v.nickname}</span>
              <em class="title">${v.headline}</em>
            </a>
          </li>`;
      })
    );
  }
});
