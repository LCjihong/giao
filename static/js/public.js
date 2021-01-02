// 导航栏点击效果
$('.navbar li').click(function (e) { 
  e.preventDefault();
  $('.active').removeClass('active');
  $(this).addClass('active');
});