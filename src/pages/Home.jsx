import { useEffect, useState } from 'react';
import { supabase } from '../components/supabase.js';

import '../assets/styles/App.css'

import Loading from '../components/Loading.jsx'

const img_url = import.meta.env.VITE_IMAGE_BUCKET;

function Home() {
  const [topics, setTopics] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const { data: topicsData, error: topicsError } = await supabase
      .from("topic")
      .select()
      .order("id", { ascending: true });

    if (topicsError) {
      console.error("Error fetching topics:", topicsError.message);
      return;
    }

    const { data: playlistsData, error: playlistsError } = await supabase
      .from("playlist")
      .select()
      .order("id", { ascending: true });

    if (playlistsError) {
      console.error("Error fetching playlists:", playlistsError.message);
      return;
    }

    setTopics(topicsData);
    setPlaylists(playlistsData);
  }
  
  if (!playlists || !topics) {
    return (
      <Loading/>
    );
  }

  return (
    <main className="min-h-screen pt-15 pb-15 overflow-auto">
      <ul className="p-2 flex flex-col">
        {topics?.map((topic) => (
          <li key={topic.id} className='pb-3'>
            <p className="text-secondary text-[12px] px-3 pt-3">{ topic.subname }</p>
            <h1 className="text-[24px] font-bold px-3 hover:underline">{ topic.name }</h1>
            <div>
              <ul className="flex flex-row flex-nowrap overflow-x-auto scrollbar-hide py-2">
                {playlists
                ?.filter((playlist) => playlist.topic_id === topic.id)
                .map((playlist) => (
                  <li key={playlist.id} className='hover:bg-[#313131ff] rounded-md px-3 py-3'>
                    <a href={playlist.name.toLowerCase()}>
                      <div className="rounded-md
                                      lg:w-[15.5rem]
                                      sm:w-[12.5rem]
                                      w-[11.5rem]">
                        <div className="w-full aspect-square">
                          <img src={img_url + playlist.cover} alt="playlist cover" className="w-full h-full object-cover rounded-md"/>
                        </div>
                        <p className="pt-2 text-[16px]">{ playlist.name }</p>
                        <p className="text-secondary truncate text-[14px]">{ playlist.description }</p>
                      </div>
                    </a>
                  </li>
                ))}
                {topic.name === "Recruiters" && (
                  <li className='hover:bg-[#313131ff] px-3 py-3 rounded-md'>
                    <a href="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/matthew-muranaka-resume.pdf" target="_blank">
                      <div className="rounded-md
                                      lg:w-[15.5rem]
                                      sm:w-[12.5rem]
                                      w-[11.5rem]">
                        <div className="w-full aspect-square">
                          <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/resume.jpg" alt="playlist cover" className="w-full h-full object-cover rounded-md"/>
                        </div>
                        <p className="pt-2 text-[16px]">Resume</p>
                        <p className="text-secondary truncate text-[14px]"></p>
                      </div>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home