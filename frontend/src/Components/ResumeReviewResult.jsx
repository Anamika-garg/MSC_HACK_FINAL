import React, { useEffect, useState } from 'react';
import Card from './Card';
import CardContent from './CardContent';
import Progress from './Progress';
import { useLocation } from 'react-router-dom';

export default function ResumeReviewResult() {
  const [atsData, setAtsData] = useState(null);
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setAtsData(state);
    }
  }, [state]);

  const [selectedSection, setSelectedSection] = useState('Overall');
  const sectionNames = atsData ? ['Overall', ...Object.keys(atsData.Sections)] : [];

  if (!atsData) {
    return <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-purple-600 animate-pulse">Loading Results...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-extrabold text-purple-700 mb-8 drop-shadow-lg mt-[60px]">ATS Resume Review Results</h1>

      <Card className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl border border-purple-200">
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-800">Overall ATS Score :  </h2>
            <span className="text-3xl font-extrabold text-purple-900">{atsData.ATS_Score}/100</span>
          </div>
          <Progress value={atsData.ATS_Score} className="h-5 bg-purple-300 rounded-full" />
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {sectionNames.map((section) => (
          <button
            key={section}
            onClick={() => setSelectedSection(section)}
            className={`px-5 py-3 rounded-2xl font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 ${selectedSection === section
                ? 'bg-purple-700 text-white shadow-lg'
                : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl mt-8">
        {selectedSection === 'Overall' ? (
          <Card className="bg-white shadow-lg rounded-3xl border border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Overall Suggestions</h3>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {atsData.Overall_Suggestions.map((suggestion, index) => (
                  <li key={index} className="pl-2">{suggestion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white shadow-lg rounded-3xl border border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">{selectedSection} Section</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-gray-700">Score:</span>
                <span className="text-2xl font-extrabold text-purple-900">{atsData.Sections[selectedSection].Score != null ? atsData.Sections[selectedSection].Score : 0}/100</span>
              </div>
              <Progress value={atsData.Sections[selectedSection].Score} className="h-5 bg-purple-300 rounded-full mb-4" />
              <h4 className="text-xl font-semibold text-purple-700 mb-3">Suggestions:</h4>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {atsData.Sections[selectedSection].Suggestions.map((suggestion, index) => (
                  <li key={index} className="pl-2">{suggestion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
