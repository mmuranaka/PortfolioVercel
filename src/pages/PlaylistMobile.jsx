import { useState } from 'react';

import { FaPlay } from "react-icons/fa6";
import { TiArrowShuffle } from "react-icons/ti";
import { IoArrowDownCircleOutline, IoEllipsisHorizontal, IoShareOutline } from "react-icons/io5";

import SongDrawer from "../components/SongDrawer.jsx"
import '../assets/styles/App.css'

function PlaylistMobile( {playlist, songs} ) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImageSrc, setPopupImageSrc] = useState('');

  const [open, setOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const showPopup = (src) => {
    setPopupImageSrc(src);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
    setPopupImageSrc('');
  };

  // const startColor = '#ffe741ff';

  return (
    <main className="min-h-screen pt-16 pb-16 overflow-auto">
      <div
        className="flex flex-col w-full mx-2 mt-6" 
        style={{
          background: `linear-gradient(to bottom, ${playlist.other || '#171717ff'} 0%, #171717ff 100%)`
        }}>
        <img src={playlist.cover} alt="playlist cover" className="self-center aspect-square w-[50%] rounded-md shadow-2xl object-cover m-2"></img>
        <p className="font-extrabold text-[24px] pl-4">{playlist.name}</p>
        <p className="pl-4 text-[14px] text-secondary">{playlist.description}</p>
        <div className="flex flex-row mt-2 items-center pl-4 h-6">
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
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center pl-3 pt-2">
            <IoArrowDownCircleOutline className="text-secondary text-[32px]" />
            <IoShareOutline className="text-secondary text-[44px] pl-4" />
            <IoEllipsisHorizontal className="text-secondary text-[40px] pl-4" />
          </div>
          <div className="flex flex-row items-center">
            <TiArrowShuffle className="text-secondary text-[28px]" />
            <a href="/resume" target="_blank">
              <span className="w-8 h-8 mx-3 flex self-end items-center justify-center bg-[#1dd760ff] rounded-full relative group">
                <FaPlay className="text-black text-[14px]" />
                <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-200 group-hover:opacity-100">
                  Resume
                </span>
              </span>
            </a>
            <div className='w-3'></div>
          </div>
        </div>
      </div>
      <div className="m-4 text-secondary text-[14px]">
        <ul>
          <li>
            <div className='song-row-div h-[36px] border-b border-[#555] p-2'>
              <div className='column1'>{playlist.col1}</div>
              <div className='column2'>{playlist.col2}</div>
              <div className="column3 p-2 w-12"></div>
            </div>
          </li>
          {songs?.map((song, index) => (
              <li key={song.id} className={`hover:bg-[#313131ff] rounded-sm w-full ${song.link ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                  if (song.link) window.open(song.link, '_blank');
                                }}>
                <div className='song-row-div h-[56px] p-2'>
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
                  <div className="column2 truncate" style={{ flexShrink: 1, minWidth: '100px' }}>
                    {song.album && (
                      <p className="truncate">{song.album}</p>
                    )}
                  </div>
                  <div className="column3 p-2 w-12">
                    <button onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSong(song);
                      setOpen(true);
                    }}>
                      <IoEllipsisHorizontal className="text-secondary text-[40px] pl-4 cursor-pointer" />
                    </button>
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
      {open && (
        <SongDrawer open={open}
                    onClose={() => {
                      setSelectedSong(null);
                      setOpen(false);
                    }}
                    song={selectedSong} />
      )}
    </main>
  )
}

export default PlaylistMobile