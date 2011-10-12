class SongsController < ApplicationController
  require 'nokogiri'
  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.all
    @playlists = Playlist.find_all_by_user_id(current_user.id)
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

  # =Ruby iTunes XML Parser
  # This class takes a properly-formed XML iTunes library file and makes a hash
  #   *EG: "Artist" => "Nick Cave"
  # While this should be a simple task with any parser, Apple decided to make their XML strangely formed.
  #   *For instance, a song title would be referenced as <key>Song Title</key><string>Tupelo</string>
  # Therefore, the XML must be parsed in a very specialized fashion.
  #
  # ==Depdendencies:
  # Nokogiri (and all of it's dependencies)
  #   *Only tested with Nokogiri 1.5.0 and Ruby 1.9.2
  #   *Nokogiri is available from http://nokogiri.org
  #
  # ==Usage:
  # Until this is made into a Gem/Class/Whatever, usage is to simply call the function with the appropriate filepath
  #   *EG: itunes_parser('app/assets/itunes.xml')
  #
  # ==Speed:
  # iTunes libary XML files can be quite large, making speed an important consideration for this parser. Nokogiri's excellent XML Reader class is used for simplicity and speed. The parser doesnt read in the entire XML structure, rather it uses a SAX-like approach. Benchmark stats coming soon, though in my experience, working with 100s of thousands of lines of XML is no problem. Other benchmarks illustrate the speed of Nokogiri quite eloquently.

  def itunes_parser (file_location)
    f = File.open(file_location)
    @xml_data = {}
    @xml_collector = []
    @reader = Nokogiri::XML::Reader(f)
    song_iterator = -1
    num_dict = 0  # the even <dict> tags represent closing tags, assuming document is well-formed
    @reader.each do |node|
      if node.value !~ /\n/ #remove newlines
        if node.name == 'dict' && node.depth == 3 #iTunes puts in a bunch of extraneous <dict> nodes that we must ignore. Relevent information really begins 3 levels deep
          num_dict += 1
          if num_dict % 2 > 0 # the even <dict> tags represent closing tags, assuming document is well-formed
            song_iterator = song_iterator + 1
            @xml_data[song_iterator] = {}
          else #the reader has encountered a closing </dict> tag so we place the values of the song into the main hash
            (0..@xml_collector.length).step(2) do |i|
              if !@xml_collector[i].nil?
                @xml_data[song_iterator][@xml_collector[i]] = @xml_collector[i + 1]
              end
            end
            @xml_collector = [] #get rid of previous values since we already added those to the hash
          end
        end
        if node.depth >= 5
          @xml_collector.push(node.value) # get all the name/value pairs in the
        end
      end
    end
    @xml_data
  end

  #GET /songs/dashboard
  def dashboard
    #@itunes_song_data = itunes_parser('app/assets/itunes_xml.xml')
    
  end

  #POST /songs/flush
  def flush
    Song.delete_all
    @database_input_errors = []
    @itunes_song_data = itunes_parser('app/assets/itunes_xml.xml')

    #for the song location i need to parse out the beginning of the directory string to make it reflect an accessible location

    #"title" => song['Name'],
    @itunes_song_data.each do |index, song|
      new_song = Song.create( "artist" => song['Artist'], "album" => song['Album'],
                          "genre" => song['Genre'], "location" => 'temp', "file_type" => song['Kind'],
                          "bitrate" => song['Bitrate'], "year" => song['Year'], "track_count" => song["Track Count"],
                          "size" => song["Size"], "length" => song["Total Time"], "track_number" => song["Track Number"])

      new_song.errors.each do |attr,msg|
        @database_input_errors.push("Error updating song ##{index}, title: #{song['Name']} because: #{attr} - #{msg}")
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


