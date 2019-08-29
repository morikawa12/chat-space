class MessagesController < ApplicationController
  def index
  end

  def create
    @message = message.create(content: message_params[:content],image:message_params[:image],group_id: message_params[:group_id], user_id: current_user.id)
    respond_to do |format|
      format.html { redierct_to :root }
    #   format.json { render json: @comments}
      format.json
    end
  end
end

