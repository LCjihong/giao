$.ajax({
  type: "post",
  url: "http://renjihong.zone/supplier-website/view/getMessagesById",
  data: {
    id: sessionStorage.getItem('lmsgId')
  },
  dataType: "json",
  success: function (response) {
    const v = response;
    console.log(v);
    $('.info-box').html(`<h3 class="title">${v.headline}</h3><div class="desc"><span class="time">${v.createTime.split(' ')[0]}</span><span>昵称：</span><span>${v.nickname}</span></div><div class="info">${v.content}</div>`);
    $('.breadcrumb .newstype').text(v.articleType)
  }
});