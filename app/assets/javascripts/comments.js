$(function(){
  function buildHTML(message){ 
    if ( message.image ) {
    var html = 
    `<div class="maim-bodyin" data-message-id= "${message.id}">
       <div class="main-bodyin__box">
         <div class="main-bodyin__box-name">
           ${message.user.name}
       </div>
     <div class="main-bodyin__box-time">
    ${message.date}
   </div>
   </div>
 <div class="main-bodyin__message">
   <p class="lower-message__content">
    ${message.content}
    </p>
    </div>
    <img src=${message.image} >
  // ${image}
  </div>`
    return html;
 } else {
    var html =
    `<div class="maim-bodyin" data-message-id= "${message.id}">
    <div class="main-bodyin__box">
      <div class="main-bodyin__box-name">
        ${message.user.name}
    </div>
  <div class="main-bodyin__box-time">
 ${message.date}
</div>
</div>
<div class="main-bodyin__message">
<p class="lower-message__content">
 ${message.content}
 </p>
 </div>  
 </div> `
 return html;
  };
}
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    // console.log(this)
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
    $('.message').append(html)
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
    $('form')[0].reset();
  })
  .fail(function(){
    alert('error');
  });
  return false;
 });
});