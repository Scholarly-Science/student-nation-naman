import React, { useEffect, useState } from 'react';
import './NewProfile.css';
import Avatar from '@material-ui/core/Avatar';
import { Badge } from '@material-ui/core';

import { roles, experience, skills, location, yearsfunc, months } from './NewProfileData';
import ExperienceModal from './ExperienceModal/ExperienceModal';
// Modals
import PreferenceModal from './PreferenceModal/PreferenceModal';
import ElsewhereModal from './ElseWhereModal/ElsewhereModal';
import ProfileModal from './ProfileModal/ProfileModal';
// Images $& Icons
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AvatarEdit from '../../images/newProfile/avatar-edit.png';
import resumeSelected from '../../images/newProfile/resume-selected.svg';
import github from '../../images/newProfile/github.svg';
import heart from '../../images/newProfile/heart.svg';
import linkedin from '../../images/newProfile/linkedin.svg';
import personal from '../../images/newProfile/personal-website.svg';
import lineimg from '../../images/newProfile/line.png';

function NewProfile() {
    // For Profile and exp modal opening
    const [openProfile, setOpenProfile] = useState(false);
    const [open, setOpen] = useState(false);
    // For opening the modal of Preferences
    const [openRoles, setOpenRoles] = useState(false);
    const [openExp, setOpenExp] = useState(false);
    const [openSkills, setOpenSkills] = useState(false);
    const [openloc, setOpenloc] = useState(false);
    // For opening the modal of Elsewhere
    const [openElsewhewe, setOpenElsewhewe] = useState(false);
    // Years
    const [years, setYears] = useState([]);
    //Profile Info is Stored Here 
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [aboutUser, setAboutUser] = useState('');
    // Selected preferences are stored here
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedExp, setSelectedExp] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLoc, setSelectedLoc] = useState([]);
    // Added Avatar, Experiences & Resume are stored here
    const [addExperience, setAddExperience] = useState([]);
    const [addResume, setAddResume] = useState();
    const [addAvatar, setAvatar] = useState();
    // Added Elsewhere projects are added here
    const [personalWebsite, setPersonalWebsite] = useState('');
    const [linkedinURL, setLinkedinURL] = useState('');
    const [passionProject, setPassionProject] = useState('');
    const [githubURL, setGithubURL] = useState('');
    const [line, setLine] = useState('');
    const [weChat, setWeChat] = useState('');

    useEffect(() => {
        setYears(yearsfunc());
    }, [])

    const openFile = () => {
        document.getElementById('file').click();
    } 
    
    const fileUploaded = () => {
        let select = document.getElementById('file'),
        img = select.files[0];
        setAddResume(img);
    }

    const openAvatarFile = () => {
        document.getElementById('avatar-file').click();
    }

    const changeAvatar = () => {
        let select = document.getElementById('avatar-file'),
        avatar = select.files[0];
        setAvatar(avatar);
    }

    const setRoles = ( role ) => {
        if(selectedRoles?.indexOf(role) !== -1) {
            const data = selectedRoles?.filter((d) => d !== role);
            setSelectedRoles(data);
        } else {
            if(selectedRoles.length < 7) {
                selectedRoles.push(role);
                setSelectedRoles([...selectedRoles]);
            }
        }
    }

    const setExperience = ( exp ) => {
        if(selectedExp?.indexOf(exp) !== -1) {
            const data = selectedExp?.filter((e) => e !== exp);
            setSelectedExp(data);
        } else {
            if(selectedExp.length < 7) {
                selectedExp.push(exp);
                setSelectedExp([...selectedExp]);
            }
        }
    }

    const setSkill = ( skill ) => {
        if(selectedSkills?.indexOf(skill) !== -1) {
            const data = selectedSkills?.filter((sk) => sk !== skill);
            setSelectedSkills(data);
        } else {
            if(selectedSkills.length < 7) {
                selectedSkills.push(skill);
                setSelectedSkills([...selectedSkills]);
            }
        }
    }

    const setLocation = ( loc ) => {
        if(selectedLoc?.indexOf(loc) !== -1) {
            const data = selectedLoc?.filter((l) => l !== loc);
            setSelectedLoc(data);
        } else {
            if(selectedLoc.length < 7) {
                selectedLoc.push(loc);
                setSelectedLoc([...selectedLoc]);
            }
        }
    }

    return (
        <div className='newProfile'>
            <div className='newProfile__container'>
                <section className='newProfile__left'>
                    <div className='newProfile__userBio'>
                        <div className='newProfile__userBio__image__bg'></div>
                        <div>
                            <Badge
                                overlap="circle"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                                badgeContent={
                                    <img onClick={openAvatarFile} 
                                        style={{width: '20px', marginLeft: '-35px', cursor: 'pointer'}} 
                                        src={AvatarEdit} alt='avatar-edit' />
                                }
                            >
                                <input type='file' id='avatar-file' onChange={changeAvatar} style={{display: 'none'}}/>
                                <Avatar alt={userFirstName || 'Akshay'} onClick={openAvatarFile} src='jhcdbjbdcjf'></Avatar>
                            </Badge>
                            <div className='newProfile__userBio__info'>
                                <h4>{userFirstName} {userLastName}</h4>
                                <h5>MontClair State University, Spring 2021</h5>
                                <p>BA/BS, Biochemistry</p>
                                <button className='btn' onClick={() => setOpenProfile(true)} style={{marginTop: '7px'}}>Edit Profile</button>
                                <ProfileModal 
                                    openProfile={openProfile} 
                                    setOpenProfile={setOpenProfile} 
                                    setUserFirstName={setUserFirstName}
                                    setUserLastName={setUserLastName}
                                    setAboutUser={setAboutUser}
                                />
                            </div>
                        </div>
                        {aboutUser && <p className='newProfile__userBio_description'>{aboutUser}</p>}
                    </div>

                    <div className='newProfile__experience' 
                        style={{
                            background: `${addExperience?.length > 0 && '#fff'}`
                        }}
                    >
                        <h1>EXPERIENCE</h1>
                        {addExperience?.length > 0 ? (
                            <div className='experiences__card'>
                                {addExperience.map((exp, index) => (
                                    <div key={index}>
                                        <img 
                                            src={`${exp.companyImg || 'https://wi-images.condecdn.net/image/nrjyg4aGK0k/crop/2040/f/hangout.jpg'}`} 
                                            alt={`${exp.companyName || 'meet'}`} 
                                        />
                                        <div>
                                            <h2>{exp.title} - {exp.companyName}</h2>
                                            <h3>{`${exp.fromMonth} ${exp.fromYear}`} - {`${exp.toMonth} ${exp.toYear}`}</h3>
                                            <h4>{exp.location}</h4>
                                            <p>{exp.textarea || 'Description'}</p>
                                        </div>
                                        <CreateOutlinedIcon className='hide' />
                                    </div>                                    
                                ))}
                                <button onClick={() => setOpen(true)}>+ Add Experience</button>
                            </div>
                                
                        ) : (
                            <div className='newProfile__experience__bg'>
                                <h3>Add your experience</h3>
                                <p>Stand out to recruiters by adding your past and upcoming experiences</p>
                                <button onClick={() => setOpen(true)} className='btn'>Add Experience</button>
                            </div>                          
                        )}
                        <ExperienceModal 
                            open={open} 
                            setOpen={setOpen} 
                            years={years}
                            addExperience={addExperience}
                        />
                    </div>

                    <div className='newProfile__resume' style={{background: `${addResume && '#fff'}`}}>
                        <h1>RESUME</h1>
                        {addResume ? (
                            <div className='newProfile__resume__selected'>
                                <img src={resumeSelected} alt='resume' />
                                <div>
                                    <h3>{addResume?.name}</h3>
                                    <p>{`Last updated: ${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`}</p>
                                </div>
                                <div className='newProfile__resume__selected__icons'>
                                    <DeleteIcon />
                                    <CreateOutlinedIcon id="file-selected" onClick={openFile} />
                                    <input type="file" id="file" onChange={fileUploaded} name="file"/>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3>Add your resume</h3>
                                <p>Your resume is essential for recruiters to learn more about you! Upload one as soon as possible to boost your chances of being discovered</p>
                                <button onClick={openFile} className='btn'>Add Resume</button>
                                <input type="file" id="file" onChange={fileUploaded} name="file"/>
                            </div>
                        )}
                    </div>

                    <div className='newProfile__education'>
                        <h1>Education</h1>
                        <div>
                            <DesktopWindowsIcon />
                            <div className='newProfile__education__info'>
                                <h4>Other</h4>
                                <p>BA/BS, Biochemistry & Data Science</p>
                                <span>2016</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='newProfile__right'>
                    <div>
                        <div className='newProfile__preference'>
                            <div className='newProfile__role'>
                                <h2>
                                    Preferred roles
                                    <CreateOutlinedIcon className='hide' onClick={() => setOpenRoles(true)} />
                                </h2>
                                    <PreferenceModal
                                        pref={roles}
                                        open={openRoles}
                                        close={setOpenRoles}
                                        set={setRoles}
                                        heading='Edit My Interests'
                                        info='Which of these roles are you most interested in?'
                                        choose='Choose up to 7'
                                        placeholder='Example: Sales, Marketing...'
                                    />
                                {selectedRoles?.length > 0 ? (
                                    <div>
                                        {selectedRoles?.map(role => <p key={role}>{role}</p>)}
                                    </div>
                                ) : (<p>What are your roles</p>)}
                            </div>
                            <div className='newProfile__exp'>
                                <h2>
                                    Experience
                                    <CreateOutlinedIcon className='hide' onClick={() => setOpenExp(true)} />
                                </h2>
                                    <PreferenceModal 
                                        pref={experience}
                                        open={openExp}
                                        close={setOpenExp}
                                        set={setExperience}
                                        heading='Edit My Background'
                                        info='What area have you had the most experience with?'
                                        choose='Choose up to 7'
                                        placeholder='Example: Data Science, Data Analyst...'
                                    />
                                {selectedExp?.length > 0 ? (
                                    <div>
                                        {selectedExp?.map(exp => <p key={exp}>{exp}</p>)}
                                    </div>
                                ) : (<p>What areas of experience do you have?</p>)}
                            </div>
                            <div className='newProfile__skill'>
                                <h2>
                                    Skills
                                    <CreateOutlinedIcon className='hide' onClick={() => setOpenSkills(true)} />
                                </h2>
                                    <PreferenceModal 
                                        pref={skills}
                                        open={openSkills}
                                        close={setOpenSkills}
                                        set={setSkill}
                                        heading='Edit My Background'
                                        info='Rank your skills from the list below.'
                                        choose='Choose up to 7'
                                        placeholder='Example: Java, C++'
                                    />
                                {selectedSkills?.length > 0 ? (
                                    <div>
                                        {selectedSkills?.map(skill => <p key={skill}>{skill}</p>)}
                                    </div>
                                ) : (<p>Rank your skills</p>)}
                            </div>
                            <div className='newProfile__loc'>
                                <h2>
                                    Preferred locations
                                    <CreateOutlinedIcon className='hide' onClick={() => setOpenloc(true)} />
                                </h2>
                                    <PreferenceModal 
                                        pref={location}
                                        open={openloc}
                                        close={setOpenloc}
                                        set={setLocation}
                                        heading='Edit My Interests'
                                        info='Which location would you like to work in?'
                                        choose='Choose up to 7'
                                        placeholder='Example: London, Spain...'
                                    />
                                {selectedLoc?.length > 0 ? (
                                    <div>
                                        {selectedLoc?.map(loc => <p key={loc}>{loc}</p>)}
                                    </div>
                                ) : (<p>Where do you want to work?</p>)}
                            </div>
                        </div>
                    </div>

                    <div className='newProfile__right__elsewhere'>
                        <h1>
                            Elsewhere
                            <CreateOutlinedIcon className='hide' onClick={() => setOpenElsewhewe(true)} />
                        </h1>
                        <ElsewhereModal 
                            openElsewhewe={openElsewhewe} 
                            setOpenElsewhewe={setOpenElsewhewe} 
                            // Setting the data
                            setPersonalWebsite={setPersonalWebsite}
                            setLinkedinURL={setLinkedinURL}
                            setPassionProject={setPassionProject}
                            setGithubURL={setGithubURL}
                            setLine={setLine}
                            setWeChat={setWeChat}
                            // Data to modal if available
                            personalWebsite={personalWebsite}
                            linkedinURL={linkedinURL}
                            passionProject={passionProject}
                            githubURL={githubURL}
                            line={line}
                            weChat={weChat}
                        />
                        <p>
                            <img src={personal} alt='personal' />
                            {!personalWebsite && 'Add Website'}
                            {personalWebsite &&<a href={personalWebsite} target='_blank'>{personalWebsite}</a>}
                        </p>
                        <p>
                            <img src={linkedin} alt='linkedin' />
                            {!linkedinURL && 'Add Linkedin'}
                            {linkedinURL &&<a href={linkedinURL} target='_blank'>{linkedinURL}</a>}
                        </p>
                        <p>
                            <img src={heart} alt='heart' />
                            {!passionProject && 'Add Passion Project'}
                            {passionProject && <a href={passionProject} target='_blank'>{passionProject}</a>}
                        </p>
                        <p>
                            <img src={github} alt='github' />
                            {!githubURL && 'Add Github'}
                            {githubURL && <a href={githubURL} target='_blank'>{githubURL}</a>}
                        </p>
                        { line &&
                            <p>
                                <img src={lineimg} alt='line' />
                                <a href={line} target='_blank'>{line}</a>
                            </p>
                        }
                        {
                            weChat && 
                            <p>
                                <img src={lineimg} alt='line' />
                                <a href={weChat} target='_blank'>{weChat}</a>
                            </p>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

export default NewProfile
