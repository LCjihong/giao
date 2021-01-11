/**
 * 写入轮播图数据
 * @param {obj} data 轮播图数据
 */
function writeSwiper(data) {
  $('#above .left-info .swiper .carousel-inner').html(
    $.map(data, function (v, i) {
      return (i == 0) ? `<div class="item active">
        <img src="${v.picture}" alt="${v.carouselTitle}">
        <div class="desc">
          <p>${v.content}</p>
        </div>
      </div>` : `<div class="item">
        <img src="${v.picture}" alt="${v.carouselTitle}">
        <div class="desc">
          <p>${v.content}</p>
        </div>
      </div>`;
    }).join('')
  );
  $('#above .left-info .swiper .carousel-indicators').html(
    $.map(data, function (v, i) {
      return (i == 0) ? `<li data-target="#carousel-example-generic" data-slide-to="${i}" class="active"></li>` : `<li data-target="#carousel-example-generic" data-slide-to="${i}"></li>`;
    }).join('')
  );
}

/**
 * 写入NewsBox新闻数据
 * @param {obj} data 某一模块儿新闻数据
 */
function writeNewsBox(data){
  $('#above .news-box .data .mainbox').html(
    `<h4 index="${data[0].id}">${data[0].headline}</h4><p>${data[0].articleAbstract}</p>`
  );
  $('#above .news-box .data ul').html(
    data.filter((v, i) => i != 0).map((v, i) => {
      return `<li index="${data.id}"><em>·</em><span>${v.articleAbstract}</span><i>[${v.createTime.split(' ')[0]}]</i></li>`
    }).join('')
  );
}

/**
 * 写入专题模块数据
 * @param {obj} data 专题数据
 */
function writeTopic(data) {
  $('#follow .topic .cell ul').html(
    $.map(data, function (v, i) {
      return `<li>
        <div class="img-box">
          <img src="${v.picture}">
        </div>
        <div class="info">
          <p class="title">${v.headline}</p>
          <div class="desc">${v.articleAbstract}</div>
        </div>
      </li>`
    }).join('')
  );
}

/**
 * 写入一条动态
 */
var writeDynamic = function () {
  // 获取动态数据
  let data = [];
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '动态',
      pageNo: 15
    },
    dataType: "json",
    success: function (response) {
      data = response.rows;
      for (let i = 0; i < 11; i++) {
        writeDynamic();
      }
    }
  });
  var index = 0;
  return function () {
    let _li = document.createElement('li');
    // $(_li).html(data[index]);
    _li.innerHTML = data[index].articleAbstract;
    $('.dynamic .cell ul').append(_li);
    index++;
    if (index == data.length) {
      index = 0;
    }
  }
}()

// 开始滚动动态数据
function scrollDynamic() {
  stopDynamic();
  $('.dynamic .cell ul').attr('timer', setInterval(() => {
    $('.dynamic .cell ul').css('top', parseFloat($('.dynamic .cell ul').css('top')) - 0.5);
    if (parseFloat($('.dynamic .cell ul').css('top')) <= -34) {
      $('.dynamic .cell ul li:eq(0)').remove();
      writeDynamic();
      $('.dynamic .cell ul').css('top', 0);
    }
  }, 20));
}

// 停止滚动动态数据
function stopDynamic() {
  clearInterval($('.dynamic .cell ul').attr('timer'));
}

/**
 * 写入留言数据
 * @param {obj} data 留言数据
 */
function writeLeaveMsg(data) {
  $('#follow .leaveMsg .table').html(
    `<tr>
      <th>ID</th>
      <th>昵称</th>
      <th style="width: 700px;">留言</th>
      <th>时间</th>
    </tr>` + $.map(data, function (v, i) {
      return `<tr>
                <td>${v.id}</td>
                <td>${v.nickname}</td>
                <td>
                  <p>${v.headline}</p>
                </td>
                <td>${v.createTime.split(' ')[0]}</td>
              </tr>`
    }).join('')
  );
}

function writeMiddleLeft(data){
  $('.middleBox .left .data ul').html(
    $.map(data, function (v, i) {
      return `<li index="${data.id}"><em>·</em><span>${v.articleAbstract}</span><i>[${v.createTime.split(' ')[0]}]</i></li>`
    }).join('')
  );
}

function writeMiddleRight(data) {
  $('.middleBox .right .data ul').html(
    $.map(data, function (v, i) {
      return `<li index="${data.id}"><em>·</em><span>${v.articleAbstract}</span><i>[${v.createTime.split(' ')[0]}]</i></li>`
    }).join('')
  );
}

// 写入真实数据
// 192.168.1.20
let news = {
  newsData: [],
  freshNewsData: [],
  notice: [],
  zhengce:[],
  zhengcejiedu:[]
}

function getData() {
  // 轮播图
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/piclist",
    data: "hahaha",
    dataType: "json",
    success: function (response) {
      writeSwiper(response.rows)
    }
  });

  // 新闻数据
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '新闻发布',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      writeNewsBox(response.rows)
      news.newsData = response.rows;
    }
  });

  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '时政要闻',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      news.freshNewsData = response.rows;
    }
  });

  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '通知通告',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      news.notice = response.rows;
    }
  });

  // 新闻数据切换
  let types = ['newsData', 'freshNewsData', 'notice'];
  $.each($('#above .news-box .tags li'), function (i, v) {
     $(v).mouseenter(function () {
       writeNewsBox(news[types[i]]);
     });
  });

  // 专题
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '专题',  
      pageNo: 3
    },
    dataType: "json",
    success: function (response) {
      writeTopic(response.rows)
    }
  });

  // 动态
  scrollDynamic(); //先动起来
  $('.dynamic .cell .view').mouseenter(function () {
    stopDynamic();
  }); // 移入停止滚动
  $('.dynamic .cell .view').mouseleave(function () {
    scrollDynamic();
  }); // 移出开始滚动
  
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '政策法规',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      writeMiddleLeft(response.rows);
      news.zhengce = response.rows
    }
  });

  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '政策解读',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      news.zhengcejiedu = response.rows
    }
  });

  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getArticleTypeList",
    data: {
      articleType: '公示及调查',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      writeMiddleRight(response.rows);
    }
  });

  // 留言选登
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getMessagesList",
    data: {
      replyStatus: '',
      pageNo: 5
    },
    dataType: "json",
    success: function (response) {
      writeLeaveMsg(response.rows);
    }
  });
}
$(function () {
  getData();
  $('.info-box .tags li').mouseover(function () {
    $(this).parent('.tags').find('.active').removeClass('active');
    $(this).addClass('active');
    sessionStorage.setItem('newsType', $(this).text())
  })
  $('.middleBox .left .info-box .tags li').mouseover(function () { 
    switch ($(this).text()) {
      case '政策法规':
        writeMiddleLeft(news.zhengce);
        break;
      case '政策解读':
        writeMiddleLeft(news.zhengcejiedu);
        break;
    }
  });
})
