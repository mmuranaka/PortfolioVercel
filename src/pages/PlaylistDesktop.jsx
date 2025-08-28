import { useState } from 'react';

import { FaPlay } from "react-icons/fa6";
import { TiArrowShuffle } from "react-icons/ti";
import { IoAddCircleOutline, IoArrowDownCircleOutline, IoEllipsisHorizontal } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";

import '../assets/styles/App.css'
import '../assets/styles/Playlist.css'

function PlaylistDesktop( {playlist, songs} ) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState('');

  const showPopup = (src) => {
    setPopupImageSrc(src);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setPopupImageSrc('');
  };


  return (
    <main className="min-h-screen pt-16 pb-16 overflow-auto">
      <div className="flex flex-col">
        <div className="flex flex-row pt-12 pl-8 pb-6">
          <img src={playlist.cover} alt="playlist cover" className="aspect-square w-1/5 min-w-32 rounded-md shadow-xl object-cover"></img>
          <div className="flex flex-col pl-8 justify-end">
            <p className="pl-1 text-[14px] text-secondary">{playlist.playlist_type}</p>
            <p className="font-extrabold
                        xl:text-[96px]
                        lg:text-[74px]
                        md:text-[56px]
                        sm:text-[48px]
                        text-[24px]">{playlist.name}</p>
            <p className="pl-1 text-[14px] text-secondary">{playlist.description}</p>
            <div className="flex flex-row mt-2 items-center pl-1 h-6">
              <img src={playlist.creator_picture} alt="creator image" className="h-6 w-6 rounded-[50%] mr-1"></img>
              {playlist.madeFor && (
                <p className="text-[14px] text-gray-300 text-secondary">&nbsp;Made for</p>
              )}
              {playlist.creator === "matthewmuranaka" ? (
                <a href="/profile">
                  <p className="font-bold text-[14px] hover:underline">&nbsp;{playlist.creator}</p>
                </a>
              ) : (
                <p className="font-bold text-[14px] hover:underline">&nbsp;{playlist.creator}</p>
              )}
              {playlist.other && (
                <p className="text-[14px] text-gray-300 text-secondary">&nbsp;&#183; {playlist.other}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row pt-2 pl-2 items-center category-buttons">
        <a href="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/matthew-muranaka-resume.pdf" target="_blank">
          <span className="w-12 h-12 mx-3 flex items-center justify-center bg-[#1dd760ff] rounded-full relative group">
            <FaPlay className="text-black text-[16px]"/>
            <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-200 group-hover:opacity-100">
              Resume
            </span>
          </span>
        </a>
        <TiArrowShuffle className="text-secondary text-[32px]"/>
        <IoAddCircleOutline className="text-secondary text-[48px] pl-4"/>
        <IoArrowDownCircleOutline className="text-secondary text-[48px] pl-4"/>
        <IoEllipsisHorizontal className="text-secondary text-[42px] pl-4"/>
      </div>
      <div className="m-8 text-secondary text-[14px]">
        <ul>
          <li>
            <div className='song-row-div h-[36px] border-b border-[#555]'>
              <div className='column0'>#</div>
              <div className='column1'>{playlist.col1}</div>
              <div className='column2'>{playlist.col2}</div>
              <div className="column3 w-52 p-2">
                {playlist.col3 && (
                  <div className='relative inline-flex w-full items-center group justify-end'>
                    <LuClock3 className="text-[19px] font-normal"/>
                    <span className="absolute bottom-full left-30 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white whitespace-normal w-32 max-w-32 inline-block text-center bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-200 group-hover:opacity-100">
                      {playlist.col3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </li>
          {songs?.map((song, index) => (
              <li key={song.id} className={`hover:bg-[#313131ff] rounded-sm w-full ${song.link ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                  if (song.link) window.open(song.link, '_blank');
                                }}>
                <div className='song-row-div h-[56px]'>
                  <div className="column0">{index+1}</div>
                  <div className='column1 overflow-hidden whitespace-nowrap'>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      showPopup(song.cover);
                    }}
                      className='h-11 w-11 mr-2'>
                      <img src={song.cover} alt="song cover" className="h-11 w-11 mr-2 rounded-md shadow-xl object-cover bg-white flex-shrink-0"/>
                    </button>
                    <div className="ml-2 flex flex-col items-start overflow-hidden whitespace-nowrap w-full">
                      <p className="text-[16px] text-left text-white truncate">{song.name}</p>
                      <p className="text-[0.85rem] text-left text-secondary truncate">{song.artist}</p>
                    </div>
                  </div>
                  <div className="column2 truncate">
                    {song.album && (
                      <p className="truncate">{song.album}</p>
                    )}
                  </div>
                  <div className="column3 w-52 relative inline-flex justify-end group p-2 whitespace-nowrap">
                    {playlist.col3 && (
                      <>
                        {song.end_duration ? (
                          <p>
                            {new Date(song.start_duration).toLocaleString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })} - {new Date(song.end_duration).toLocaleString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        ) : (
                          <p>
                            {new Date(song.start_duration).toLocaleString('en-US', {
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        <div className="h-4"></div>
      </div>
      {popupVisible && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center"
          onClick={hidePopup}
        >
          <img
            src={popupImageSrc}
            alt="enlarged song cover"
            className="max-w-[60vw] max-h-[60vh] rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking the image itself
          />
        </div>
      )}
    </main>
  )
}

export default PlaylistDesktop