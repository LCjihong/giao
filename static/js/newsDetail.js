$.ajax({
  type: "post",
  url: "http://renjihong.zone/supplier-website/view/getArticleById",
  data: {
    id:sessionStorage.getItem('newsId')
  },
  dataType: "json",
  success: function (response) {
    const v = response;
    $('.info-box').html(`<h3 class="title">${v.headline}</h3><div class="desc"><span class="time">${v.createTime.split(' ')[0]}</span><span>来源：</span><span>${v.createBy}</span></div><div class="info">${v.content}</div>`);
    $('.breadcrumb .newstype').text(v.articleType)
  }
});
