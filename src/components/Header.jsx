import { MdHomeFilled } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const img_url = import.meta.env.VITE_IMAGE_BUCKET;

function Header() {

    return (
      <nav className="z-50 fixed top-0 left-0 right-0 h-16 bg-neutral-950 px-3 flex flex-row items-center justify-between">
        <a href="/">
          <div className="h-10 w-10 flex justify-center items-center">
            <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/spotify-logo.png" alt="profile picture" className="h-9 w-9 rounded-[50%]"></img>
          </div>
        </a>
        <div className="flex flex-row items-center justify-center w-full h-full">
          <a href="/home" className="flex items-center justify-center w-[58px] h-full">
            <div className="bg-neutral-800 p-[10px] rounded-[50%] hover:bg-neutral-700 hover:p-[11px] transition-colors duration-150 ease-in-out relative inline-block group">
              <MdHomeFilled className="text-[28px]"/>
              <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-0 group-hover:delay-[250ms] group-hover:opacity-100">
                Home
              </span>
            </div>
          </a>
          <div className="flex items-center bg-neutral-800 px-4 py-2 rounded-full w-full max-w-[484px] border border-neutral-700 hover:bg-neutral-700 hover:border-neutral-500 focus-within:bg-neutral-700 focus-within:border-white focus-within:border-[2px] focus-within:hover:border-white transition-all duration-500 ease-in-out group">
            <IoSearch className="text-gray-400 text-[28px] transition-all duration-500 ease-in-out group-hover:text-white group-focus-within:text-white"/>
            <input
              type="text"
              placeholder="Matthew Muranaka"
              className="flex-1 w-full min-w-[108px] outline-none px-4 text-[16px] placeholder:text-gray-400"
            />
            <div className="h-6 border-l border-gray-600 mx-3"/>
            <div className="relative inline-block group">
                <IoMdInformationCircleOutline className="xl"/>
                <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-0 group-hover:delay-[250ms] group-hover:opacity-100">
                  Info
                </span>
              </div>
          </div>
        </div>
        <a href="/profile">
          <div className="h-12 w-12 rounded-[50%] bg-[#202020ff] flex items-center justify-center transform transition-transform duration-300 hover:scale-110 relative group">
            <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/profile-picture.jpeg" alt="profile picture" className="h-9 w-9 rounded-[50%]"></img>
            <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 px-2 py-1 text-[14px] font-thin text-white bg-black rounded shadow-lg opacity-0 transition-opacity duration-200 delay-0 group-hover:delay-[250ms] group-hover:opacity-100">
              Profile
            </span>
          </div>
        </a>
      </nav>
    )
}

export default Header
