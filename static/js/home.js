/**
 * 写入轮播图数据
 * @param {obj} data 轮播图数据
 */
function writeSwiper(data) {
  $('#above .left-info .swiper .carousel-inner').html(
    $.map(data, function (v, i) {
      return (i == 0) ? `<div class="item active">
        <img src="${v.url}" alt="${v.desc}">
        <div class="desc">
          <p>${v.desc}</p>
        </div>
      </div>` : `<div class="item">
        <img src="${v.url}" alt="${v.desc}">
        <div class="desc">
          <p>${v.desc}</p>
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
      return `<li index="${data.id}"><em>·</em><span>${v.articleAbstract}</span><i>[${v.createTime}]</i></li>`
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
    url: "http://192.168.1.46:8880/view/getArticleList",
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

// 测试
let testSwiperData = [
  {
    url: 'http://192.168.1.20:8880/profile/upload/2020/12/29/94cb9a09-c1a5-449d-ad4d-b0e1ba1b6fb2.png',
    desc:'giao'
  },
  {
    url: '../static/img/test/swiper/2.jpeg',
    desc: 'giao'
  },
  {
    url: '../static/img/test/swiper/3.jpeg',
    desc: 'giao'
  },
  {
    url: '../static/img/test/swiper/4.jpeg',
    desc: 'giao'
  },
  {
    url: '../static/img/test/swiper/5.jpeg',
    desc: 'giao'
  },
  {
    url: '../static/img/test/swiper/6.jpeg',
    desc: 'giao'
  }
]

writeSwiper(testSwiperData);

// 写入真实数据
// 192.168.1.46
let news = {
  newsData: [],
  freshNewsData: [],
  notice: []
}

function getData() {
  // 轮播图
  $.ajax({
    type: "post",
    url: "http://192.168.1.46:8880/view/piclist",
    data: "hahaha",
    dataType: "json",
    success: function (response) {
      console.log(response);
    }
  });

  // 新闻数据
  $.ajax({
    type: "post",
    url: "http://192.168.1.46:8880/view/getArticleList",
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
    url: "http://192.168.1.46:8880/view/getArticleList",
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
    url: "http://192.168.1.46:8880/view/getArticleList",
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
    url: "http://192.168.1.46:8880/view/getArticleList",
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

  // 留言选登
  $.ajax({
    type: "post",
    url: "http://192.168.1.46:8880/view/getMessagesList",
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
getData();
