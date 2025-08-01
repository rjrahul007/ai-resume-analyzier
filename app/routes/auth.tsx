import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/putter'

export const metadata = ()=> ([
    {title: 'Resumind - Authentication',
    description: 'Authentication page for Resumind',
    },
    {name: 'description', content: 'Log into your account'},
])

const auth = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    // https://example.com/login?next=/dashboard
    //"?next=/dashboard".split('next=')
    const nextpath = new URLSearchParams(location.search).get('next');
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next)
        }
    }, [auth.isAuthenticated, next]);

  return (
  <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
    <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1>Welcome</h1>
                <h2>Log In to Continue Your Job Journey</h2>
            </div>
            <div>
                {isLoading ? (
                    <button className='auth-button animate-pulse'>Signing you in...</button>
                ):(
                    <>
                    {auth.isAuthenticated ? (
                        <button className='auth-button' onClick={()=> auth.signOut()}>Logout</button>
                    ):(
                        <button className='auth-button' onClick={()=> auth.signIn()}>Login with Google</button>
                    )}
                    </>
                )}
            </div>
        </section>
    </div>
  </main>
  )
}

export default auth
