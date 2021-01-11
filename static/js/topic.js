function pagitation() {
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeCount",
    data: {
      articleType:'专题'
    },
    dataType: "json",
    success: function (number) {
      $("#pagination").simplePaging({
        // allPage: Math.ceil(number / 15), //总页数
        allPage: Math.ceil(number / 10), //总页数
        showPage: 7, //显示页数
        startPage: 1, //第一页页码数字
        initPage: 1, //加载完毕自动跳转到第n页
        callBack(num) {
          getData(num);
        }
      });
    }
  });
  
}

function writeData(data) {
  $('.info').html(
    $.map(data, function (v, i) {
      return `<li>
            <div class="img-box">
              <img src="${v.picture}" alt="${v.headline}">
            </div>
            <div class="content">
              <h3>${v.headline}</h3>
              <p>${v.articleAbstract}</p>
            </div>
          </li>`
    })
  );
}

function getData(num) {
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeListPage",
    data: {
      articleType: '专题',
      pageNo: 10,
      pageSize: num
    },
    success: function (response) {
      if ($('.spPage').length == 0) {
        pagitation();
      }
      writeData(response.rows);
    }
  });
}
pagitation();