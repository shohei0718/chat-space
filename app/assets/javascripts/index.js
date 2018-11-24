$(document).on('turbolinks:load', function() {
  $(function(){
      function buildHTML(user){
        var html =`<div class="chat-group-user clearfix">
                     <p class="chat-group-user__name">
                      ${user.name}
                     </p>
                     <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                     </div>`
        return html;
      }

      function destroyHTML(user_name, user_id){
        var html =`<div class='chat-group-member clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value= ${user_id} >
                    <p class='chat-group-user__name'>${user_name}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                   </div>`
        $(".chat-group-user").remove();
        return html;
      }


    $("#user-search-field").on("keyup", function(e){
        e.preventDefault();
        var input = $("#user-search-field").val();
        $(".chat-group-user").remove();
        $.ajax({
          url: '/users',
          type: "GET",
          data: {keyword: input},
          dataType: 'json',
        })
        .done(function(data){
          $.each(data, function(index,input){
            var html =  buildHTML(input);
            $('#user-search-result').append(html);
          });
        })
        .fail(function(){
          alert('ユーザー検索に失敗しました');
        })
    });

    $('#user-search-result').on("click", ".user-search-add", function(){
      var addName = $(this).data('user-name');
      var addId = $(this).data('user-id');
      var html = destroyHTML(addName, addId);
      $('#chat-group-users').append(html);
    });

    $('.user-search-remove').on("click", function(){
      var user = $(this).parent()
      $(user).remove();
    });
  });
});

