class SongsController < ApplicationController
  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @songs }
    end
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
    @song = Song.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @song }
    end
  end

  # GET /songs/new
  # GET /songs/new.json
  def new
    @song = Song.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @song }
    end
  end

  # GET /songs/1/edit
  def edit
    @song = Song.find(params[:id])
  end

  # POST /songs
  # POST /songs.json
  def create
    @song = Song.new(params[:song])

    respond_to do |format|
      if @song.save
        format.html { redirect_to @song, notice: 'Song was successfully created.' }
        format.json { render json: @song, status: :created, location: @song }
      else
        format.html { render action: "new" }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  #POST /songs/add_to_playlist
  def add_to_playlist
    params[:song_id].each do |param|
      
    end
    @song = Song.new(params[:song_id]) # not sure if :id is really right, given that there will most likely be lots of IDs
    playlist_id = params[:playlist_id] # not really :playlist_id, i think

    respond_to do |format|
      
    end
  #  Add the songs described by some form to the specified playlist
  #  data to pass: list of songs by ID, playlist ID
  #  add to the join table: songs_playlists
  end

  # PUT /songs/1
  # PUT /songs/1.json
  def update
    @song = Song.find(params[:id])

    respond_to do |format|
      if @song.update_attributes(params[:song])
        format.html { redirect_to @song, notice: 'Song was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @song.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    @song = Song.find(params[:id])
    @song.destroy

    respond_to do |format|
      format.html { redirect_to songs_url }
      format.json { head :ok }
    end
  end

  def search
    #@query = params[:q]
    @songs = Song.find_all_by_title(params[:q])
    respond_to do |format|
      format.html
      format.json {

        #render :json => {'test'=>'yes i am'}.to_json
        render :json => @song
      }
    end
  end
  
end

  #
  #def index
  #  #render('songs/temp') #render file views/temp.html.erb
  #end
  #
  #def show
  #  @id = params['id']
  #  @page = params['page']
  #  render('songs/temp')
  #end
  #

  #
  #private
  #def search_db
  #  @seach_results = Song.all;
  #
  #  if @search_results
  #    @search_results
  #  else
  #    nil
  #  end
  #end


