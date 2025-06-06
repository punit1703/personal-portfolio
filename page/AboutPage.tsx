'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section className="w-full text-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px]">
          <Image
            src="/images/profile.png" // replace with your image
            alt="Punit Patel"
            fill
            className="object-cover rounded-3xl shadow-xl"
          />
        </div>

        {/* Right: Text Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I'm Puneet Patel, a passionate Pythonista and Backend Developer. I specialize in building scalable web applications using Django and integrating smart features using Machine Learning. I enjoy turning complex problems into elegant, efficient solutions.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Python</span>
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Django</span>
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Machine Learning</span>
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">REST APIs</span>
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Next Js</span>
            <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">Tailwind CSS</span>
          </div>

          <Button variant="default" className="rounded-full px-6 py-2 mt-4">
            View Resume
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;
