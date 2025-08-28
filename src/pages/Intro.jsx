import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import '../assets/styles/App.css';
import '../assets/styles/Intro.css';

function Intro() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = document.body;

    const handleClick = () => {
      page.classList.add('fade-out');

      setTimeout(() => {
        navigate('/home');  // client-side navigation
      }, 500);
    };

    page.addEventListener('click', handleClick);

    return () => {
      page.removeEventListener('click', handleClick);
      page.classList.remove('fade-out');
    };
  }, [navigate, location.key]);

  return (
    <div className="bg-neutral-900">
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="https://swpzmceclluxivxkgtex.supabase.co/storage/v1/object/public/main/spotify-logo.png" alt="spotify-logo" className="h-48 w-48" />
        <h1 className="p-10 text-5xl text-[#1dd760ff] text-center max-w-screen-sm">Matthew Muranaka</h1>
      </div>
    </div>
  );
}

export default Intro;
