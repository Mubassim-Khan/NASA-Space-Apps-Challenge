import React from "react";
import { User2, Linkedin, Github } from "lucide-react"; // Icons

export default function About() {
  const projectDescription = `“Will It Rain On My Parade?” is a project developed for the 2025 NASA Space Apps Challenge.
It provides historical weather insights to help users plan their day and pack accordingly. The app uses NASA POWER data 
to compute probabilities of hot, cold, wet, and windy conditions based on past records. Users can search by city or coordinates 
and receive practical packing suggestions. The UI is modern and intuitive, allowing users to interact with maps, charts, and summaries easily. 
Additionally, users can download raw weather data for further analysis if needed.`;

  // General team description
  const teamOverview = `The team consists of 4th-year BSCS students from the University of Karachi, Department of Computer Science (UBIT). 
Each member is skilled in different technologies and has strong knowledge and interest in programming, data analysis, and web development. 
They are enthusiastic about learning and applying their skills to real-world challenges like this project.`;

  const teamMembers = [
    {
      name: "Syed Nabeel Hussain",
      linkedin: "https://www.linkedin.com/in/syed-nabeel-hussain-1905b1305",
      github: "https://github.com/nabeelhussain13",
      description:
        "Undergraduate BSCS Student | Data Analyst | Data Science enthusiast.",
    },
    {
      name: "Muhammad Jawwad Khan",
      linkedin: "https://www.linkedin.com/in/jawwadkhan777",
      github: "https://github.com/jawwadkhan777",
      description: "Full-Stack Web Developer | Learner",
    },
    {
      name: "Afaq Malik",
      linkedin: "https://www.linkedin.com/in/afaq-malik-1584482b8/",
      github: "https://github.com/Afaq-Malik-16",
      description: "UI/UX designer creating intuitive user experiences.",
    },
    {
      name: "Ibad Hussain",
      linkedin: "https://www.linkedin.com/in/ibadhussain",
      github: "https://github.com/ibad-hussain",
      description: "Computer Scientist @UoK",
    },
    {
      name: "Mubassim Ahmed Khan",
      linkedin: "https://linkedin.com/in/mubassim",
      github: "https://github.com/Mubassim-Khan",
      description: "Full-Stack Web Developer | AI & ML Enthusiast",
    },
  ];

  return (
    <div className="min-h-screen p-8 mt-[75px] text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          About This Project
        </h1>

        {/* Project Description */}
        <section className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-3">Project Description</h2>
          <p className="text-gray-300">{projectDescription}</p>
        </section>

        {/* UI Features Highlight */}
        <section className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-3">
            UI Features & Data Access
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Interactive map to select city or coordinates.</li>
            <li>Charts to visualize historical weather trends.</li>
            <li>Summary cards for quick weather insights.</li>
            <li>Option to download raw weather data for analysis.</li>
          </ul>
        </section>

        {/* Team Overview */}
        <section className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
          <h2 className="text-2xl font-semibold mb-3">About the Team</h2>
          <p className="text-gray-300">{teamOverview}</p>
        </section>

        {/* Team Members */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-3">Team Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-5 rounded-2xl border border-gray-700 shadow hover:scale-101 transition-transform flex flex-col items-center text-center"
              >
                <User2 className="w-12 h-12 text-blue-400 mb-3" />
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {member.description}
                </p>
                <div className="flex gap-4">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
