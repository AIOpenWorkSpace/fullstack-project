import React, { Component } from "react";
import headshotAC from "../img/headshotAC.jpeg"
import headshotJS from "../img/headshotJS.png"
import headshotJonS from "../img/headshotJonS.jpeg"
import { Icon } from '@iconify/react';
import githubIcon from '@iconify-icons/octicon/mark-github';
import { FaLinkedin } from 'react-icons/fa';

import '../style/About.css';


class Profile extends Component {
  render() {
    
    return(
      <section className="section-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="section-title">Our Team</h2>
              <p className="section-subtitle">Our mission is to create an easy to use tool that helps determine the maturity level of media content for parents.</p>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="team-item">
                <img className="team-img" src={headshotAC} alt="" />
                <h3>Aaron Clark</h3>
                <div className="team-info"><p>Hi! My name is Aaron and I am a student at Code Fellows and former mechanical engineer and project manager. I grew up and live in the Seattle area and I love getting outside in the mountains with my dog Sophie. I also love video games, basketball, and learning all things code. My aim is to grow my skillset, work on challenging problems, and develop full stack applications that perform as great as they look. </p></div>
                <ul className="team-icon">
                <li><a href="https://github.com/amcwustl" className="github">
                    <Icon
                        icon={githubIcon}
                        style={{ color: '#000000' }}
                      />
                    </a></li>
                    <li>
                    <a href="https://www.linkedin.com/in/aaron-michael-clark/" className="linkedin" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    </li>
                        
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="team-item">
                <img className="team-img" src={headshotJS} alt="" />
                <h3>Jennifer Sung</h3>
                <div className="team-info"><p>Hi! My name is Jennifer. I am a student at Code Fellows and a recent graduate of Columbia University, where I earned a Bachelor's degree in Political Science. I also have a background in healthcare and work as a teaching assistant in Math at the City University of New York. At Code Fellows, my aim is to broaden my skill set and become a full-stack developer, with a focus on Java, and Android development.</p></div>
                <ul className="team-icon">
                <li><a href="https://github.com/jennisung" className="github">
                        <Icon
                        icon={githubIcon}
                        style={{ color: '#000000' }}
                      />
                    </a></li>
                    <li>
                    <a href="https://www.linkedin.com/in/jennisung/" className="linkedin" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                    </li>
  
                          
                </ul>
              </div>
            </div>

            <div className="col-sm-6 col-md-4">
              <div className="team-item">
                <img className="team-img" src={headshotJonS} alt="" />
                <h3>Jon Stillson</h3>
                <div className="team-info"><p>Hi! My name is Jon Stillson. I am a dedicated and enthusiastic software student at Code Fellows. I have a strong passion for technology and problem-solving. Prior to pursuing a career in software development, I worked as a lion tamer with Barnaby's traveling 14 ring circus. My diverse educational background has equipped me with critical thinking and analytical skills and made me the world's most interesting man.</p></div>
                <ul className="team-icon">
                <li><a href="https://github.com/Navelfuzz77" className="github">
                            <Icon
                            icon={githubIcon}
                            style={{ color: '#000000' }}
                          />
                        </a></li>
                <li>
                  <a href="https://www.linkedin.com/" className="linkedin" target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                  </a>
                </li>
                          
                </ul>
              </div>
            </div>



          </div>
        </div>
      </section>
      
    )
  }
}
export default Profile;

// class Profile extends Component {
//   render() {
//     return (
//       <>
//         <div className="about-us-div">
//           <h2 className="about-us-title">About Us</h2>
//           <Card style={{ width: '18rem' }}>
//             <Card.Body>
//               <Card.Title>Aaron Clark</Card.Title>
//               <Card.Subtitle className="">Software Developer</Card.Subtitle>
//               <Card.Text>
//                 {/* Add text */}
//               </Card.Text>
//               <Card.Link href="https://github.com/amcwustl">GitHub Profile</Card.Link>
//             </Card.Body>
//           </Card>

//           <Card style={{ width: '18rem' }}>
//             <Card.Body>
//               <Card.Title>Jon Stillson</Card.Title>
//               <Card.Subtitle className="">Software Developer</Card.Subtitle>
//               <Card.Text>
//                 {/* Add text */}
//               </Card.Text>
//               <Card.Link href="https://github.com/Navelfuzz77">GitHub Profile</Card.Link>
//             </Card.Body>
//           </Card>

//           <Card style={{ width: '18rem' }}>
//             <Card.Body>
//               <Card.Title>Jennifer Sung</Card.Title>
//               <Card.Subtitle className="">Software Developer</Card.Subtitle>
//               <Card.Text>
//                 {/* Add text */}
//               </Card.Text>
//               <Card.Link href="https://github.com/jennisung">GitHub Profile</Card.Link>
//             </Card.Body>
//           </Card>
//         </div>
//       </>
//     );
//   }
// }


