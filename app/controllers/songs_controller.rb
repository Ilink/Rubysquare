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
      type.all do
        @search_results = Song.all
        render ('songs/temp')
      end
      type.json do
        @search_results = Song.all
        #render :json => {'test'=>'yes i am'}.to_json
        render :json => @search_results
      end
    end
  end

  private
  def search_db
    @seach_results = Song.all;

    if @search_results
      @search_results
    else
      nil
    end
  end
end
