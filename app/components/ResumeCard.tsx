import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';
import { useEffect, useState } from 'react';
import { usePuterStore } from '~/lib/putter';

const ResumeCard = ({resume}: {resume: Resume})=> {
    const { id, companyName, jobTitle, imagePath, resumePath, feedback } = resume;
    const [resumeUrl, setResumeUrl] = useState('');
    const { fs} = usePuterStore();

     useEffect(() => {
      const loadResume = async () => {
        const blob = await fs.read(imagePath);
        if (!blob) return;
        const imageUrl = URL.createObjectURL(blob);
        setResumeUrl(imageUrl);
      };
    
      loadResume();
    }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
      <div className="flex flex-col gap-2">
        {companyName && <h2 className="!text-black font-bold break-words">
            {companyName}
        </h2>}
        {jobTitle && <h3 className="text-lg break-words text-gray-500">
            {jobTitle}
        </h3>}
        {!companyName && !jobTitle && <h2 className="text-black font-bold">
            No company or job title provided</h2> }
        </div>
        <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore}/>
        </div>
        </div>
       { resumeUrl && (<div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
            <img src={resumeUrl} alt={`${companyName} logo`} className="w-full h-[350px] max-sm:h-[200px]" />
            </div>
        </div>)}
        {/* <div className="resume-details">
            <h3>{companyName}</h3>
            <p>{jobTitle}</p>
            <div className="resume-feedback">
                <p>Overall Score: {feedback.overallScore}</p>
                <p>ATS Score: {feedback.ATS.score}</p>
                <p>Tone & Style Score: {feedback.toneAndStyle.score}</p>
                <p>Content Score: {feedback.content.score}</p>
                <p>Structure Score: {feedback.structure.score}</p>
                <p>Skills Score: {feedback.skills.score}</p>
            </div>
            <Link to={resumePath} className="view-resume-button">View Resume</Link>
        </div> */}
        </Link>
  )
}

export default ResumeCard
