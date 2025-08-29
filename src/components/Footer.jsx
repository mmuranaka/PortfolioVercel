
import { TiArrowShuffle } from "react-icons/ti";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { BiRepeat } from "react-icons/bi";
import { FaPlay } from "react-icons/fa6";

import '../assets/styles/App.css';
function Footer() {

    return (
      <footer className="z-50 fixed bottom-0 left-0 right-0 h-20 bg-neutral-950 px-20
                 flex flex-row justify-center items-center">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex-row items-center justify-between mb-2 w-[200px]">
            <TiArrowShuffle className="text-[24px] text-[#b3b3b3ff]"/>
            <IoIosSkipBackward className="text-[24px] text-[#b3b3b3ff]"/>
            <a href="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/matthew-muranaka-resume.pdf" target="_blank">
              <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full relative group">
                <FaPlay className="text-black" />
                <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-200 group-hover:opacity-100">
                  Resume
                </span>
              </span>
            </a>
            <IoIosSkipForward className="text-[24px] text-[#b3b3b3ff]"/>
            <BiRepeat className="rotate-180 text-[24px] text-[#b3b3b3ff]" />
          </div>
          <div className="flex flex-row w-full items-center justify-center">
            <p className="text-[12px] text-[rgb(179,179,179)]">0:00</p>
            <div className="w-full max-w-[550px] min-w-[200px] h-1 mx-2 bg-[#575657ff] rounded-md"></div>
            <p className="text-[12px] text-[rgb(179,179,179)]">4:44</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer
