import { useEffect, useState } from 'react';
import { supabase } from '../components/supabase.js';

import '../assets/styles/App.css'

import Loading from '../components/Loading.jsx'

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
    <main className="min-h-screen pt-15 pb-15 overflow-auto">
      <div className="flex flex-row p-4 profile-header w-full bg-gradient-to-b from-[#3988f5ff] from-0% to-[#171717ff] to-[100%]">
        <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/profile-picture.jpeg" alt="profile picture" className="rounded-[50%] shadow-xl w-1/3 sm:w-1/5 lg:w-1/6 h-auto object-cover"></img>
        <div className="flex flex-col pl-6 justify-end mt-4">
          <p className="sm:text-[14px] text-[12px] lighter-color">Profile</p>
          <p className="font-extrabold
                        xl:text-[96px]
                        lg:text-[74px]
                        md:text-[56px]
                        sm:text-[48px]
                        text-[24px]">Matthew Muranaka</p>
          <p className="sm:text-[14px] text-[12px] lighter-color">
            Aspiring Software Engineer &#183;&nbsp;
            <a href="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/matthew-muranaka-resume.pdf" target="_blank">
              <span className="text-secondary hover:underline">Resume</span>
            </a>
          </p>
        </div>
      </div>
      <div className="p-2">
        <p className="font-bold text-[24px] px-3 pt-3">Socials</p>
        <ul className="flex flex-row overflow-auto scrollbar-hide">
          {socials?.map((social) => (
            <li key={social.id} className='hover:bg-[#313131ff] rounded-md p-3'>
              <a href={social.link}>
                <div className="rounded-md
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
      <div className="p-2">
        <p className="font-bold text-[24px] px-3 pt-3">Top albums this lifetime</p>
        <p className="text-secondary text-[12px] px-3">Only visible to you</p>
        <ul className="flex flex-row overflow-auto scrollbar-hide">
          {albums?.map((album) => (
            <li key={album.id} className='hover:bg-[#313131ff] rounded-md p-3'>
              <a href={album.link}>
                <div className="rounded-md
                                lg:w-[13.5rem]
                                sm:w-[11.5rem]
                                w-[9.5rem]">
                  <div className="w-full aspect-square">
                    <img src={album.cover} alt="social cover" className="w-full h-full object-cover rounded-md"/>
                  </div>
                  <p className="pt-2 text-[16px] truncate">{ album.name }</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-2 mb-8">
        <p className="font-bold text-[24px] px-3 pt-3">Recently played hobbies</p>
        <ul className="flex flex-row overflow-auto scrollbar-hide">
          {hobbies?.map((hobby) => (
            <li key={hobby.id} className='hover:bg-[#313131ff] rounded-md p-3'>
              <a href={hobby.link}>
                <div className="rounded-md
                                lg:w-[13.5rem]
                                sm:w-[11.5rem]
                                w-[9.5rem]">
                  <div className="w-full aspect-square">
                    <img src={hobby.cover} alt="social cover" className="w-full h-full object-cover rounded-md"/>
                  </div>
                  <p className="pt-2 text-[16px] truncate">{ hobby.name }</p>
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