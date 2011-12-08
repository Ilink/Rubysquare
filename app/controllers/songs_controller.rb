class SongsController < ApplicationController

  #require 'iparse'
  # GET /songs
  # GET /songs.json
  def index
    #@songs = Song.page(params[:page]).per(50)
    @initial_view = self.initial_view 'songs'
    @songs = Song.all
    @songs_json = @songs.to_json
    @playlists = Playlist.not_now_playing(current_user.id)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @songs.to_json}
      format.xml { render :partial => 'songs/list_music', :locals => { :title => "Songs" } }
    end
  end

  def now_playing
      @initial_view = self.initial_view 'now_playing'
      #@playlists = Playlist.where("title = ? AND user_id = ?", '__now_playing__', current_user.id )
      @playlists = Playlist.now_playing(current_user.id)
      @songs = []

      @playlists.each do |playlist|
        playlist.songs.each do |song|
          @songs.push song
        end
      end

      @songs_json = @songs.to_json
      respond_to do |format|
        if(@playlists[0].songs[0].nil?) # todo: fix this incredibly bad check
          format.html
          format.xml { render :partial => 'songs/nothing_playing' }
        else
          format.html
          format.xml { render :partial => 'songs/list_music', :locals => { :title => "Now Playing" } }
        end
      end
    end

  # GET /songs/1
  # GET /songs/1.json
  def show
    @song = Song.find(params[:id])
    @songs_json = @songs.to_json
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @song }
    end
  end

  # GET /songs/filter/artist/
  def filter
    # i need a way to send out data based on various categories
    # EG: user requests all songs by Bjork
    if params.has_key?(:artist)
      @songs = Song.where("artist = ?", params[:artist])
    else
      @songs = Song.all
    end
    @playlists = Playlist.find_all_by_user_id(current_user.id)

    respond_to do |format|
      format.html
      format.json { render json: @songs}
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

  #POST /songs/update_now_playing
  def update_now_playing
    #@playlist = Playlist.currentPlaylist.find_by_title(params[:playlist][:title])
    @playlist = Playlist.now_playing(current_user.id)[0]
    if !@playlist.blank?
      @playlist.songs = [] # clear old now playing playlist
    end

    @playlist.transaction do |record|
      begin
        @songs = Song.find(params[:song_ids])
        @playlist.songs << @songs
      rescue
        ActiveRecord::StatementInvalid
      end
    end

    respond_to do |format|
      format.html { redirect_to songs_url, notice: 'Selected songs succesfully added' }
      format.json { head :ok }
    end
  end

  #POST /songs/add_to_playlist
  def add_to_playlist
    @playlist = Playlist.find(params[:playlist][:id])
    @songs = Song.find(params[:song_ids])
    @playlist.songs << @songs #add to join table
    
    respond_to do |format|
      format.html { redirect_to songs_url, notice: 'Selected songs succesfully added' }
      format.json { head :ok }
    end
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

  # TODO: decide if I want to move this search logic into the Index function within this controller
  def search
    @initial_view = self.initial_view 'search'
    if params.has_key?(:filter_by)
      if params[:filter_by] == 'artist'
        @songs = Song.find_all_by_artist(params[:query])
      elsif params[:filter_by] == 'album'
        @songs = Song.find_all_by_album(params[:query])
      end
    else params.has_key?(:query)
      @search = Song.search do |s|
        s.fulltext params[:query]
      end
      @songs = @search.results
    end
    @songs_json = @songs.to_json
    @playlists = Playlist.find_all_by_user_id(current_user.id)

    respond_to do |format|
      format.html
      #format.xml { render :partial => 'layouts/search_results' }
      format.xml { render :partial => "songs/list_music", :locals => { :title => 'Search Results'} }
    end
  end

  #GET /songs/dashboard
  def dashboard
    #@itunes_song_data = itunes_parser('app/assets/itunes_xml.xml')
    @initial_view = self.initial_view 'dashboard'
    #@podcast = Podcast.new
  end

  #POST /songs/flush
  def flush
    require "iparse"
    @itunes_song_data = Iparse.parse('app/assets/itunes_xml.xml')
    Song.transaction do
      Song.delete_all
      @itunes_song_data.each do |index, song|
        location = song['Location']
        # Windows:   file://localhost/L:%5CMusic%5C%21%21%21%5CMyth%20Takes%5C01%20Myth%20Takes.mp3
        # Mac:       file://localhost/Users/linki/Music/iTunes/iTunes%20Media/Podcasts/NPR_%20All%20Songs%20Considered%20Podcast/01%20Songs%20That%20Make%20You%20Feel%20Good.mp3
        # strip out the part "file://" part or whatever and then leave a trail to a virtual directory pointing to the root music folder

        new_song = Song.new("title" => song['Name'],
                            "artist" => song['Artist'],
                            "album" => song['Album'],
                            "genre" => song['Genre'],
                            "location" => song['Location'],
                            "file_type" => song['Kind'],
                            "bitrate" => song['Bitrate'],
                            "year" => song['Year'],
                            "track_count" => song["Track Count"],
                            "size" => song["Size"],
                            "length" => song["Total Time"],
                            "track_number" => song["Track Number"])
        new_song.save!
      end
    end

    respond_to do |format|
      if true #change me
        format.html { render :action => dashboard, notice: 'Database successfully updated' }
        format.json { head :ok }
      else
        format.html { redirect_to songs_dashboard_path, notice: 'Database successfully updated' }
        format.json { render json: 'error', status: 'error' }
      end
    end
  end


end