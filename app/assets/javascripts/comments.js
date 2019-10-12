$(function(){
  function buildHTML(message){ 
    var image = message.image ? `<img src='${message.image}'> ` : ''
    var html =
    `<div class="main-bodyin" data-message-id= "${message.id}">
       <div class="main-bodyin__box">
         <div class="main-bodyin__box-name">
           ${message.user_name}
       </div>
     <div class="main-bodyin__box-time">
    ${message.created_at}
   </div>
   </div>
 <div class="main-bodyin__message">
   <p class="lower-message__content">
    ${message.content}
    </p>
    </div>
    ${image}
  </div>`
    return html;
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
    url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  .done(function(data){
    var html = buildHTML(data);
    $('.main-body').append(html);
    $('.main-body').animate({scrollTop:$('.main-body')[0].scrollHeight}, 'fast');  
    $('form')[0].reset(); 
  })
  .fail(function(){
    alert('error');
  });
  return false;
 });
 var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
  var last_message_id = $('.main-bodyin:last').data("message-id");
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function (message){
    insertHTML = buildHTML(message);
    $('.main-body').append(insertHTML);
    $('.main-body').animate({scrollTop:$('.main-body')[0].scrollHeight}, 'fast');  
  　})
   })
  .fail(function() {
  });
  }
　};
setInterval(reloadMessages, 5000);
});
