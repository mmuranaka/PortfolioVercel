// react
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// styles
import './assets/styles/App.css';

// pages
import Intro from './pages/Intro.jsx';
import Base from './pages/Base.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import PlaylistBase from './pages/PlaylistBase.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/" element={<Base />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path=":playlistName" element={<PlaylistBase />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
