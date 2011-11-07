class PlaylistsController < ApplicationController
  # GET /playlists
  # GET /playlists.json
  def index
    @initial_view = self.initial_view 'playlist'
    #@playlists = Playlist.page(params[:page]).find_all_by_user_id(current_user.id)
    @playlists = Playlist.find_all_by_user_id(current_user.id)
    @songs_json = []
    @playlists.each do |playlist|
      playlist.songs.each do |song|
        @songs_json.push song
      end
    end
    @songs_json = @songs_json.to_json
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @playlists }
      format.xml { render :partial => 'playlists/list_playlists'}
      #format.xml { render_to_string :partial => 'playlists/list_playlists'}
    end
  end

  # GET /playlists/1
  # GET /playlists/1.json
  def show
    @initial_view = self.initial_view 'playlist'
    @playlist = Playlist.find(params[:id])
    @songs_json = []
    @playlist.songs.each do |song|
      @songs_json.push song
    end
    @songs_json = @songs_json.to_json
    puts @songs_json

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @playlists }
      format.xml { render :partial => 'playlists/list_playlists'}
      #format.xml { render_to_string :partial => 'playlists/list_playlists'}
    end
  end

  # GET /playlists/new
  # GET /playlists/new.json
  def new
    @playlist = Playlist.new
    
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @playlist }
    end
  end

  # GET /playlists/1/edit
  def edit
    @playlist = Playlist.find(params[:id])
  end

  # POST /playlists
  # POST /playlists.json
  def create
    @playlist = Playlist.create(params[:playlist])
    @user = User.find(current_user.id)
    @playlist.user = @user
    
    respond_to do |format|
      if @playlist.save
        format.html { redirect_to @playlist, notice: 'Playlist was successfully created.' }
        format.json { render json: @playlist, status: :created, location: @playlist }
      else
        format.html { render action: "new" }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /playlists/1
  # PUT /playlists/1.json
  def update
    @playlist = Playlist.find(params[:id])

    respond_to do |format|
      if @playlist.update_attributes(params[:playlist])
        format.html { redirect_to @playlist, notice: 'Playlist was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @playlist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /playlists/1
  # DELETE /playlists/1.json
  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy

    respond_to do |format|
      format.html { redirect_to playlists_url }
      format.json { head :ok }
    end
  end
end
