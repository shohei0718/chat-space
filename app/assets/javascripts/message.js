$(document).on('turbolinks:load', function() {
  $(function(){
      function buildHTML(message){
          var image = ( message.image ) ? `<img src= "${message.image} " alt= "画像" width="250px" height="250px" >` : ' ' ;

          var html = `<div class="message" data-message-id="${message.id}">
                        <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${message.user_name}
                          </div>
                        </div>

                        <div class="upper-message__date">
                          ${message.created_at}
                        </div>

                        <div class="lower-message">
                          <p class="lower-message__content">
                            ${message.content}
                          </p>
                            ${image}
                        </div>
                      </div>`
        return html;
      }

      function scroll() {
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'slow');
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
        contentType: false,
      })
      .done(function(data){
        console.log("成功")
        var html = buildHTML(data);
        $('#message').append(html);
        $('#new_message')[0].reset();
        $('.form__submit').prop('disabled', false);
        scroll()
      })
      .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled', false);
      })
    })

    setInterval(function() {
      $.ajax({
        url: location.href.json,
      })
      .done(function(data) {
        var id = $('.message').data('message-id');
        var insertHTML = '';
          if(message.id > id){
            insertHTML += buildHTML(message);
          };
        $('#message').append(insertHTML);
        scroll()
      })
      .fail(function(data) {
        alert('自動更新に失敗しました')
      });
    } , 5000 );


  });
});
