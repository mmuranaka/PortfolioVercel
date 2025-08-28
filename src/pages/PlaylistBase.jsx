import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { createClient } from "@supabase/supabase-js";

import PlaylistDesktop from './PlaylistDesktop.jsx'
import PlaylistMobile from './PlaylistMobile.jsx'

import Loading from '../components/Loading.jsx'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const img_url = import.meta.env.VITE_IMAGE_BUCKET;

function PlaylistBase() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  
  const { playlistName } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    getData();
  }, [playlistName]);

  async function getData() {
    const { data: playlistData, error: playlistError } = await supabase
      .from("playlist")
      .select()
      .ilike("name", playlistName)
      .single();

    if (playlistError) {
      console.error("Error fetching playlist:", playlistError.message);
      return;
    }

    playlistData.cover = img_url + playlistData.cover;
    playlistData.creator_picture = img_url + playlistData.creator_picture;
    setPlaylist(playlistData);

    const { data: songsData, error: songsError } = await supabase
      .from("song")
      .select()
      .eq("playlist_id", playlistData.id)
      .order("start_duration", { ascending: false });


    if (songsError) {
      console.error("Error fetching songs:", songsError.message);
      return;
    }

    const songsDataUpdated = songsData.map(song => ({
      ...song,
      cover: img_url + song.cover
    }));
    // console.log(songsDataUpdated)
    setSongs(songsDataUpdated);
  }

  if (!playlist) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="relative">
      <div className={isMobile ? 'block' : 'hidden'}>
        <PlaylistMobile playlist={playlist} songs={songs} />
      </div>
      <div className={isMobile ? 'hidden' : 'block'}>
        <PlaylistDesktop playlist={playlist} songs={songs} />
      </div>
    </div>
  )
}

export default PlaylistBase