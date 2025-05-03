'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaRegSmileBeam, FaRegSmile, FaRegMeh, FaRegFrown, FaRegAngry } from 'react-icons/fa';
import CLD from '@/components/CLD';
import Navbar from '@/components/Navbar'; // ✅ Import the Navbar

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Profile() {
  const { currentUser } = useAuth();
  const [screenTimeData, setScreenTimeData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [screenTime, setScreenTime] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="text-xl">You are not logged in. Please sign in to view your profile.</p>
      </div>
    );
  }

  const dates = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - index);
    return day.toLocaleDateString();
  });

  const handleLog = () => {
    if (screenTime && selectedMood !== null) {
      setScreenTimeData(prev => [...prev, parseFloat(screenTime)].slice(-7));
      setMoodData(prev => [...prev, selectedMood].slice(-7));
      setScreenTime('');
      setSelectedMood(null);
    }
  };

  const data = {
    labels: dates.reverse(),
    datasets: [
      {
        label: 'Screen Time (hours)',
        data: screenTimeData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
      {
        label: 'Mood (1-5)',
        data: moodData.map(mood => mood * 4.5),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar /> {/* ✅ Navbar added here */}

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex justify-between items-center p-4 bg-primary rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <FaUserCircle size={48} className="text-white" />
            <div>
              <h2 className="text-2xl font-semibold">{currentUser.email}</h2>
              <p className="text-sm text-gray-300">Your Profile</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form & CLD */}
          <div className="space-y-6">
            {/* Log Form */}
            <div className="bg-white/10 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">📲 Log Today's Screen Time & Mood</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="screenTime" className="block text-sm text-gray-300 mb-1">
                    Screen Time (hours)
                  </label>
                  <input
                    id="screenTime"
                    type="number"
                    value={screenTime}
                    onChange={(e) => setScreenTime(e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-500 bg-background text-white"
                    min="0"
                    max="24"
                  />
                </div>

                {/* Mood Buttons */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Mood</label>
                  <div className="flex justify-between">
                    {[5, 4, 3, 2, 1].map((level) => {
                      const moods = {
                        5: <FaRegSmileBeam size={24} />,
                        4: <FaRegSmile size={24} />,
                        3: <FaRegMeh size={24} />,
                        2: <FaRegFrown size={24} />,
                        1: <FaRegAngry size={24} />,
                      };
                      const bgColors = {
                        5: 'bg-green-400',
                        4: 'bg-yellow-400',
                        3: 'bg-orange-400',
                        2: 'bg-red-400',
                        1: 'bg-red-700',
                      };
                      return (
                        <button
                          key={level}
                          onClick={() => setSelectedMood(level)}
                          className={`p-2 rounded-full text-white transition ${
                            selectedMood === level ? bgColors[level] : 'bg-gray-700'
                          }`}
                        >
                          {moods[level]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={handleLog}
                  className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition"
                >
                  Log Data
                </button>
              </div>
            </div>

            {/* CLD Section */}
            <div className="bg-white/10 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">🔁 Understanding Your Vicious Loops</h3>
              <CLD />
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white/10 p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-xl font-semibold mb-4">📉 7-Day Screen Time & Mood</h3>
            <Line data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
