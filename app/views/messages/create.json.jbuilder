json.id           @message.id
json.content      @message.content
json.image        @message.image.url
json.user_id      @message.user.id
json.created_at   @message.created_at.strftime("%Y-%m-%d %H:%M:%S")
json.user_name    @message.user.name
