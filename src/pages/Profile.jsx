import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";

import '../assets/styles/App.css'

import Loading from '../components/Loading.jsx'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const img_url = import.meta.env.VITE_IMAGE_BUCKET;

function Profile() {
  const [socials, setSocials] = useState(null);
  const [albums, setAlbum] = useState(null);
  const [hobbies, setHobbies] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  
  async function getData() {
    const { data: socialsData, error: socialsError } = await supabase
      .from("song")
      .select()
      .eq("playlist_id", 6)

    if (socialsError) {
      console.error("Error fetching playlist:", socialsError.message);
      return;
    }

    const socialsDataUpdated = socialsData.map(song => ({
      ...song,
      cover: img_url + song.cover
    }));
    setSocials(socialsDataUpdated);

    const { data: albumData, error: albumError } = await supabase
      .from("song")
      .select()
      .eq("playlist_id", 7)

    if (albumError) {
      console.error("Error fetching playlist:", albumError.message);
      return;
    }

    const albumDataUpdated = albumData.map(song => ({
      ...song,
      cover: img_url + song.cover
    }));
    setAlbum(albumDataUpdated);

    const { data: hobbiesData, error: hobbiesError } = await supabase
      .from("song")
      .select()
      .eq("playlist_id", 3)

    if (hobbiesError) {
      console.error("Error fetching songs:", hobbiesError.message);
      return;
    }

    const hobbiesDataUpdated = hobbiesData.map(song => ({
      ...song,
      cover: img_url + song.cover
    }));
    setHobbies(hobbiesDataUpdated);
  }
  
    if (!hobbies || !socials) {
      return (
        <Loading/>
      );
    }

  return (
    <main className="min-h-screen pt-16 pb-16 overflow-auto">
      <div className="flex flex-row pt-10 pl-8 pb-6 profile-header w-full">
        <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/profile-picture.jpeg" alt="profile picture" className="rounded-[50%] shadow-xl aspect-square w-1/4 sm:w-1/5 lg:w-1/6"></img>
        <div className="flex flex-col pl-6 justify-end">
          <p className="sm:text-[14px] text-[12px] lighter-color">Profile</p>
          <p className="font-extrabold
                        xl:text-[96px]
                        lg:text-[74px]
                        md:text-[56px]
                        sm:text-[48px]
                        text-[24px]">Matthew Muranaka</p>
          <p className="sm:text-[14px] text-[12px] lighter-color mb-4">
            Aspiring Software Engineer &#183;&nbsp;
            <a href="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/matthew-muranaka-resume.pdf" target="_blank">
              <span className="text-secondary hover:underline">Resume</span>
            </a>
          </p>
        </div>
      </div>
      <div className="mx-6 mt-8">
        <p className="font-bold text-[24px]">Socials</p>
        <ul className="flex flex-row py-3 overflow-auto scrollbar-hide">
          {socials?.map((social) => (
            <li key={social.id} className='hover:bg-[#313131ff]'>
              <a href={social.link}>
                <div className="p-3 rounded-md
                                lg:w-[13.5rem]
                                sm:w-[11.5rem]
                                w-[9.5rem]">
                  <div className="w-full aspect-square">
                    <img src={social.cover} alt="social cover" className="w-full h-full object-cover rounded-[50%]"/>
                  </div>
                  <p className="pt-2 text-[16px]">{ social.name }</p>
                  <p className="text-secondary truncate text-[14px]">{ social.description }</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-6 mt-8">
        <p className="font-bold text-[24px]">Top albums this lifetime</p>
        <p className="text-secondary text-[12px]">Only visible to you</p>
        <ul className="flex flex-row py-3 overflow-auto scrollbar-hide">
          {albums?.map((album) => (
            <li key={album.id} className='hover:bg-[#313131ff]'>
              <a href={album.link}>
                <div className="p-3 rounded-md truncate
                                lg:w-[13.5rem]
                                sm:w-[11.5rem]
                                w-[9.5rem]">
                  <div className="w-full aspect-square">
                    <img src={album.cover} alt="social cover" className="w-full h-full object-cover rounded-md"/>
                  </div>
                  <p className="pt-2 text-[16px]">{ album.name }</p>
                  <p className="text-secondary truncate text-[14px]">{ album.description }</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-6 mb-4">
        <p className="font-bold text-[24px]">Recently played hobbies</p>
        <ul className="flex flex-row py-3 overflow-auto scrollbar-hide">
          {hobbies?.map((hobby) => (
            <li key={hobby.id} className='hover:bg-[#313131ff]'>
              <a href={hobby.link}>
                <div className="p-3 rounded-md
                                lg:w-[13.5rem]
                                sm:w-[11.5rem]
                                w-[9.5rem]">
                  <div className="w-full aspect-square">
                    <img src={hobby.cover} alt="social cover" className="w-full h-full object-cover rounded-md"/>
                  </div>
                  <p className="pt-2 text-[16px]">{ hobby.name }</p>
                  <p className="text-secondary truncate text-[14px]">{ hobby.description }</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default Profile