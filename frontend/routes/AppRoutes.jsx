import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Home from '../pages/Home';
import DailyMCQ from '../pages/DailyMCQ';
import Ipconfig from '../pages/Ipconfig';
import Notes from '../pages/Notes';
import About from '../pages/About';
import WebCompiler from '../pages/WebCompiler';

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mcq/:moduleId" element={<DailyMCQ />} />
        <Route path="/ipconfig" element={<Ipconfig />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
        <Route path="/compiler" element={<WebCompiler />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
