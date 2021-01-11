$('.list-group-item').click(function (e) {
  e.preventDefault();
  $('.list-group .active').removeClass('active');
  $(this).addClass('active');
  $('.breadcrumb .active').text($(this).text());
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getUserList",
    data: {
      deptName:$(this).text()
    },
    dataType: "json",
    success: function (response) {
      writePersonal(response.rows)
    }
  });
});

function writePersonal(data){
  $('.avaWall .group').html(
    $.map(data, function (v, i) {
      return `<div class="Per">
              <div class="img-box">
                <img src="${v.avatar}" alt="">
              </div>
              <div class="name">${v.userName}</div>
            </div>`
    })
  );
}

function init(){
  $.ajax({
    type: "post",
    url: "http://renjihong.zone/supplier-website/view/getUserList",
    data: {
      deptName: '总办领导'
    },
    dataType: "json",
    success: function (response) {
      writePersonal(response.rows)
    }
  });
}
init()