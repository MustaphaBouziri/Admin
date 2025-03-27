"use client";

import { useState } from "react";



import Template1 from "./template1";
import Template2 from "./templet2";


export default function Home() {
  const [name, setname] = useState("");
  const [hobby, sethobby] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [adress, setadress] = useState("");
  const [education, seteducation] = useState("");
  const [linkdin, setlinkdin] = useState("");
  const [skill, setskill] = useState("");
  const [profile, setprofile] = useState("");


  const [selectedTemplate, setSelectedTemplate] = useState("Template1");



  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="flex space-x-6 h-screen overflow-hidden">
      {/* Left side: Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="flex space-x-4">
            <button onClick={() => handleTemplateChange("Template1")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Template 1</button>
            <button onClick={() => handleTemplateChange("Template2")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Template 2</button>
            <button onClick={() => handleTemplateChange("Template3")} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Template 3</button>
          </div>

          {/* Form Fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Profile Summary</h1>
            <textarea
              id="profileSummary"
              value={profile}
              onChange={(e) => setprofile(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Education</h1>
            <input
              type="text"
              id="education"
              value={education}
              onChange={(e) => seteducation(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contact Information */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Contact Information</h1>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={adress}
                  onChange={(e) => setadress(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn:</label>
                <input
                  type="text"
                  id="linkedin"
                  value={linkdin}
                  onChange={(e) => setlinkdin(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Key Skills</h1>
            <input
              type="text"
              id="keySkills"
              value={skill}
              onChange={(e) => setskill(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Hobbies */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Hobbies</h1>
            <input
              type="text"
              id="hobbies"
              value={hobby}
              onChange={(e) => sethobby(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Text Size */}
          

          {/* Fonts */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Fonts</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Inter</button>
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Roboto</button>
              <button className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Poppins</button>
            </div>
          </div>

          
          
        </div>
      </div>

      {/* Right side: Template */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div>
          {selectedTemplate === "Template1" && (
            <Template1
              Phone={phone}
              Email={email}
              Adress={adress}
              Linkdin={linkdin}
              Skill={skill}
              Hobby={hobby}
              Summary={profile}
              Education={education}
              Name={name}
              
              
            />
          )}
          {selectedTemplate === "Template2" && (
            <Template2
              Phone={phone}
              Email={email}
              Adress={adress}
              Linkdin={linkdin}
              Skill={skill}
              Hobby={hobby}
              Summary={profile}
              Education={education}
              Name={name}
              
              
              
            />
          )}
        </div>
      </div>
    </div>
  );
}
