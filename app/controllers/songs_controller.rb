class SongsController < ApplicationController
  def index
    #render('songs/temp') #render file views/temp.html.erb
  end

  def show
    @id = params['id']
    @page = params['page']
    render('songs/temp')
  end

  def search
    @query = params[:q]

    respond_to do |type|
      type.all {
        render ('songs/temp')
      }
      type.json {
        render :json => {'test'=>'yes i am'}.to_json
      }
    end
  end

  private
  def search_db
    @seach_results = Song
  end
end
