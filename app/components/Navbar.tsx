import { LogOut } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/putter';

const Navbar = () => {
  const {isLoading, auth} = usePuterStore();
  return (
 <nav className='navbar'>
      <Link to={"/"}>
        <p className="text-2xl font-bold text-gradient">RESUMIND</p>
      </Link>
      <div className='flex items-center gap-4'>
        <Link to="/upload" className='primary-button w-fit'>Upload Resume</Link>
        <button 
          className='primary-button w-fit flex items-center gap-2' 
          onClick={() => auth.signOut()}
          disabled={isLoading}
        >
          <LogOut className="w-4 h-4" />
          <span>{isLoading ? 'Signing out...' : 'Sign Out'}</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
