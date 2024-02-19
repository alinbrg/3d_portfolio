import React from 'react';
import {Link} from "react-router-dom";
import arrow from "../assets/icons/arrow.svg";

const InfoBox = ({text, link, btnText}) => (
  <div className={'info-box'}>
    <p className={'font-medium sm:text-xl text-center'}>{text}</p>
    <Link to={link} className={'neo-brutalism-white neo-btn'}  >
      {btnText}
      <img src={arrow} alt="arrow" className={'w-4 h-4 object-contain'}/>
    </Link>
  </div>
)

const renderContent = {
  1: (
    <h1 className={'sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'}>
      Hi, I am <span className={'font-semibold'}>Alina</span> 👋
      <br/>
      A Software Engineer from Georgia
    </h1>
  ),
  2: (
    <InfoBox
      link={'/about'}
      text={'Worked with many companies and picked up many skills along the way'}
      btnText={'Learn More'}
    />
  ),
  3: (
    <InfoBox
      link={'/projects'}
      text={'Led and contributed to many projects, check them out!'}
      btnText={'Visit Projects'}
    />
  ),
  4: (
    <InfoBox
      link={'/contact'}
      text={'I am always open to new opportunities, let\'s connect!'}
      btnText={'Contact Me'}
    />
  )
}


const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;