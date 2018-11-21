$(document).on('turbolinks:load', function() {
  $(function(){
      function buildHTML(message){
        if (message.image == null) {

          var html = `<div class="message">
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
                        </div>
                      </div>`
        return html;
        } else {

          var html = `<div class="message">
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
                          <img src= "${message.image}" alt= "画像" width="250px" height="250px" />
                        </div>
                      </div>`
        }
        return html;
      }

      function scroll() {
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      // 同期通信をストップしている
      var formData = new FormData(this);
      // 上の記述はjbuilderのデータ
      var url = $(this).attr('action')
      // ここからコントロールに流れる
      $.ajax({
        url: url,
        // ルーティングにパスを送っている（groups/1/messages）→パスに反応してcreateアクションが発動する
        type: "POST",
        // POSTで送ってる
        data: formData,
        // jbuilderで取得してきたデータ
        dataType: 'json',
        // json形式で
        processData: false,
        contentType: false,
      })
      .done(function(data){
        console.log(data.image)
        var html = buildHTML(data);
        $('#message').append(html)
        $('#message_content').val('')
        $('#message_image').val('')
        $('.form__submit').prop('disabled', false);
        scroll()
      })
      .fail(function(){
        alert('error');
        $('.form__submit').prop('disabled', false);
      })
    })
  });
});
