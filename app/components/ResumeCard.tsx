import { Link } from 'react-router';
import ScoreCircle from './ScoreCircle';

const ResumeCard = ({resume}: {resume: Resume})=> {
    const { id, companyName, jobTitle, imagePath, resumePath, feedback } = resume;
  return (
    <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
        <div className="resume-card-header">
      <div className="flex flex-col gap-2">
        <h2 className="!text-black font-bold break-words">
            {companyName}
        </h2>
        <h3 className="text-lg break-words text-gray-500">
            {jobTitle}
        </h3>
        </div>
        <div className="flex-shrink-0">
            <ScoreCircle score={feedback.overallScore}/>
        </div>
        </div>
        <div className="gradient-border animate-in fade-in duration-1000">
            <div className="w-full h-full">
            <img src={imagePath} alt={`${companyName} logo`} className="w-full h-[350px] max-sm:h-[200px]" />
            </div>
        </div>
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
