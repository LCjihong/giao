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
  try {
    var parentIframe = parent.document.getElementById("mainframe");
    if (window.attachEvent) {
      window.attachEvent("onload", function () {
        parentIframe.height = 0; //加上这句
        parentIframe.height = document.documentElement.scrollHeight;
      });
      return;
    } else {
      window.onload = function () {
        parentIframe.height = 0; //加上这句
        parentIframe.height = document.body.scrollHeight;
      };
      return;
    }
  } catch (e) {
    throw new Error('setParentIframeHeight Error');
  }
})

function showDetail(id){
  sessionStorage.setItem('pageName', './lmsgDetail.html')
  sessionStorage.setItem('lmsgId', id)
  parent.location.reload();
}

$.ajax({
  type: "post",
  url: "http://renjihong.zone/supplier-website/view/getMessagesList",
  data: {
    replyStatus: '',
    pageNo: 10
  },
  dataType: "json",
  success: function (response) {
    console.log(response.rows);
    $('#info .leaveMessageData').html(
      $.map(response.rows, function (v, i) {
        return `<li onclick="showDetail(${v.id})">
            <a class="glyphicon glyphicon-menu-right" href="#">
              <span class="uname">${v.nickname}</span>
              <em class="title">${v.headline}</em>
            </a>
          </li>`;
      })
    );
  }
});

$('#submit').click(function (e) {
  e.preventDefault();
  data = {
    Nickname: $('#nickname').val(),
    Name: $('#name').val(),
    Tel: $('#tel').val(),
    Email: $('#email').val(),
    Address: $('#address').val(),
    Headline: $('#headline').val(),
    Content: $('#content').val()
  }
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      if (!element) {
        alert('请输入完整信息！');
        return
      }
    }
  }
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/addMessages",
    data: {
      Nickname: $('#nickname').val(),
      Name: $('#name').val(),
      Tel: $('#tel').val(),
      Email: $('#email').val(),
      Address: $('#address').val(),
      Headline: $('#headline').val(),
      Content: $('#content').val()
    },
    dataType: "json",
    success: function (response) {
      alert('提交成功');
      $('input, textarea').val('');
    },
    error: function (err) {
      alert('提交失败');
    }
  });
});