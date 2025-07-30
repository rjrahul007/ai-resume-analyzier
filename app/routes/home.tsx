// import { resumes } from "constants/index.ts";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/putter";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
    const {isLoading, auth, kv} = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchResumes = async () => {
            setLoading(true);
      const resumes = await kv.list("resume:*", true) as KVItem[];
      const parsedResumes = resumes.map((item) => JSON.parse(item.value)) as Resume[];
      setResumes(parsedResumes);
      console.log("Fetched resumes:", parsedResumes);
      setLoading(false);
    } 
      fetchResumes();
    }, []);
    

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/auth?next=/');
        }
    }, [auth.isAuthenticated,]);

  return (
  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    
<section className="main-section">
  <div className="page-heading py-16">

    <h1>Track Your Application & Resume Rating</h1>
    {!loading && resumes.length === 0 ? (
      <h2 className="text-gray-500">No resumes found. Upload your resume to get started!</h2>
    ): ( 
    <h2>Review your submissions and check AI-powered feedback.
    </h2>)}
  </div>

  {loading && (
    <div className="flex flex-col items-center justify-center"><img src="/images/resume-scan-2.gif" alt="" className="w-[200px]"/>
    </div>)}

{!loading && resumes.length > 0 && (
  <div className="resumes-section">
  {resumes.map((resume) => (
  <ResumeCard key={resume.id} resume={resume}  />))}
  </div>)}

{!loading && resumes.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-10 gap-4">
    <Link to="/upload" className="primary-button w-fit text-xl font-semibold">
    Upload Resume
  </Link>
  </div>
)}
</section>
  </main>
  )}
