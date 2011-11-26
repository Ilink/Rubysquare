class PodcastsController < ApplicationController
  # GET /podcasts
  # GET /podcasts.json
  def index
    @podcasts = Podcast.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @podcasts }
    end
  end

  # GET /podcasts/1
  # GET /podcasts/1.json
  def show
    @podcast = Podcast.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @podcast }
    end
  end

  # GET /podcasts/new
  # GET /podcasts/new.json
  def new
    @podcast = Podcast.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @podcast }
    end
  end

  # GET /podcasts/1/edit
  def edit
    @podcast = Podcast.find(params[:id])
  end

  def parse_feed (url)
    feed = Feedzirra::Feed.fetch_and_parse(url)
    feed.sanitize_entries!
    feed # return feed
  end

  # POST /podcasts
  # POST /podcasts.json
  def create
    feed = parse_feed params[:new_podcast_url]
    feed.sanitize_entries! # let's make sure this actually makes things usable'

    # Make the podcast entry
    @podcast = Podcast.new(
      :title => feed.title,
      :url => params[:new_podcast_url]
    )

    if @podcast.save
      feed.entries.each do |entry|
        song = Song.new("title" => entry.title, "location" => entry.url, "artist" => entry.author, "album" => feed.title)
        song.audio = @podcast
        song.save! # TODO add exception handling
      end
    end

    respond_to do |format|
      if @podcast.blank?
        format.json { render json: @podcast.songs.to_json }
        format.html { redirect_to :songs_dashboard, notice: 'Podcast was successfully created.' }
      else
        format.json { render json: @podcast.errors }
        format.html { render action: "new" }
      end
    end
  end

  # PUT /podcasts/1
  # PUT /podcasts/1.json
  def update
    @podcast = Podcast.find(params[:id])

    respond_to do |format|
      if @podcast.update_attributes(params[:podcast])
        format.html { redirect_to @podcast, notice: 'Podcast was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @podcast.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /podcasts/1
  # DELETE /podcasts/1.json
  def destroy
    @podcast = Podcast.find(params[:id])
    @podcast.destroy

    respond_to do |format|
      format.html { redirect_to podcasts_url }
      format.json { head :ok }
    end
  end
end
