import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import '../assets/styles/App.css';

function Base() {

  return (
    <div className="bg-neutral-900">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Base
