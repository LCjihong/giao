function showDetail(id) {
  sessionStorage.setItem('pageName', './newsDetail.html')
  sessionStorage.setItem('newsId', id)
  parent.location.reload();
}

function changeTit(type) {
  $('.info h3').text(type);
  $('.breadcrumb .active').text(type);
}

function pagination(type) {
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeCount",
    data: {
      articleType:type
    },
    dataType: "json",
    success: function (number) {
      $("#pagination").simplePaging({
        allPage: Math.ceil(number / 15), //总页数
        showPage: 7, //显示页数
        startPage: 1, //第一页页码数字
        initPage: 1, //加载完毕自动跳转到第n页
        animateType: 'fast',
        callBack(num) {
          getData(type, num);
        }
      });
    }
  });
  
}

function writeList(data) {
  $('.content .page').html(
    $.map(data, function (v, i) {
      return `<li class="iconfont icon-dian"><a onclick="showDetail(${v.id})">${v.articleAbstract}</a><i>[${v.createTime}]</i></li>`
    })
  );
}

function getData(type, pageNum) {
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeListPage",
    data: {
      articleType:type,
      pageNo:15,
      pageSize:pageNum
    },
    dataType: "json",
    success: function (response) {
      writeList(response.rows);
    }
  });
}

$(function () {
  switch (sessionStorage.getItem('newsType')) {
    case null:
      changeTit('新闻发布');
      $($('.list-group-item')[0]).addClass('active');
      break;
    case '新闻发布':
    case '时政要闻':
    case '通知通告':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[0]).addClass('active');
      break;
    case '动态':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[1]).addClass('active');
      break;
    case '政策法规':
    case '政策解读':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[2]).addClass('active');
      break;
    case '工作汇报':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[3]).addClass('active');
      break;
    case '公示及调查':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[4]).addClass('active');
      break;
    case '意见征求':
    case '建言献策':
      changeTit(sessionStorage.getItem('newsType'));
      $($('.list-group-item')[5]).addClass('active');
      break;
  }
  sessionStorage.getItem('newsType') ? pagination(sessionStorage.getItem('newsType')) : pagination('新闻发布');
  $('.list-group .jump, .list-group .jumpn').click(function (e) {
    e.preventDefault();
    sessionStorage.setItem('newsType', $(this).text());
    $('.list-group .active').removeClass('active');
    $(this).hasClass('jump') ? $(this).addClass('active') : $(this).parentsUntil('.collapseTwo').prev('.list-group-item').addClass('active');
    parent.location.reload();
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