import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const About = () => {
  const [sidebar, setSidebar] = useState(true);
  function handleSidebar(status) {
    setSidebar(status);
  }
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar showSidebar={sidebar} />

      <div className={sidebar ? 'w-full pl-64 transition-all' : 'pl-0 w-full transition-all'}>
        <Navbar sidebarfn={handleSidebar} sidebarStatus={sidebar} location="About" />
      </div>
    </div>
  );
};

export default About;
