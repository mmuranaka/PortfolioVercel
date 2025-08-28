import { useEffect } from 'react';

import { BiAlbum } from "react-icons/bi";
import { LuClock3 } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";



import '../assets/styles/App.css';

function SongDrawer({ open, onClose, song }) {

  useEffect(() => {
      if (open) {
      document.body.style.overflow = "hidden";
      } else {
      document.body.style.overflow = "";
      }
      return () => {
      document.body.style.overflow = "";
      };
  }, [open]);

  return (
    <>
    {/* Backdrop overlay */}
    {open && (
      <div
      className="fixed inset-0 bg-black/50 z-40"
      onClick={onClose}
      />
    )}

    {/* Drawer */}
    <div
      className={`fixed bottom-0 left-0 w-full h-[50%] rounded-t-2xl bg-[#282828ff] z-50 transform transition-transform duration-300 ${
      open ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className='flex flex-col mx-4'>
        <div className="w-10 h-1 bg-[#727272ff] rounded-full mx-auto my-3"></div>
        <div className='flex flex-row items-center'>
          <img src={song.cover} alt="song cover" className="h-11 w-11 mr-2 rounded-sm shadow-xl object-cover bg-white flex-shrink-0"/>
          <div className="ml-2 flex flex-col items-start w-full ">
            <p className="text-[14px] text-left text-white truncate">{song.name}</p>
            <p className="text-[12px] text-left text-secondary break-words">{song.artist}</p>
          </div>
        </div>
        <div className='my-4 bg-[#727272ff] h-[0.1px]'></div>
        {song.album && (
          <div className='flex flex-row items-center h-9'>
            <BiAlbum className='text-[20px] mr-2'/>
            <p className='text-[14px] text-white'>{song.album}</p>
          </div>
        )}
        {song.start_duration && (
          <div className='flex flex-row items-center h-9'>
            <LuClock3 className='text-[19px] mr-2'/>
            <>
              {song.end_duration ? (
                <p className='text-[14px]'>
                  {new Date(song.start_duration).toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })} - {new Date(song.end_duration).toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              ) : (
                <p className='text-[14px]'>
                  {new Date(song.start_duration).toLocaleString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              )}
            </>
          </div>
        )}
        <a href="/profile">
          <div className='flex flex-row items-center h-9 hover:bg-[#181818ff] cursor-pointer'>
            <CgProfile className='text-[20px] mr-2'/>
            <p className='text-[14px] text-white'>Go to artist</p>
          </div>
        </a>
      </div>
    </div>
    </>
  );
}

export default SongDrawer