import { useState } from 'react';
import { SearchSection } from '@/app/components/SearchSection';
import { ResultsSection, PropertyResult } from '@/app/components/ResultsSection';
import { locationData, generateMockResults, getLocationName } from '@/app/data/mockData';

export default function App() {
  // Search state
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [plotNumber, setPlotNumber] = useState('');

  // Results state
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<PropertyResult[]>([]);

  // Handle district change - reset dependent fields
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setMandal('');
    setVillage('');
  };

  // Handle mandal change - reset village
  const handleMandalChange = (value: string) => {
    setMandal(value);
    setVillage('');
  };

  // Handle search
  const handleSearch = () => {
    const mockResults = generateMockResults(
      surveyNumber,
      plotNumber,
      district,
      mandal,
      village
    );
    setResults(mockResults);
    setShowResults(true);
  };

  // Handle back to search
  const handleBackToSearch = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {!showResults ? (
        <SearchSection
          district={district}
          mandal={mandal}
          village={village}
          surveyNumber={surveyNumber}
          plotNumber={plotNumber}
          onDistrictChange={handleDistrictChange}
          onMandalChange={handleMandalChange}
          onVillageChange={setVillage}
          onSurveyNumberChange={setSurveyNumber}
          onPlotNumberChange={setPlotNumber}
          onSearch={handleSearch}
          locationData={locationData}
        />
      ) : (
        <ResultsSection
          results={results}
          district={district}
          mandal={mandal}
          village={village}
          districtName={getLocationName('district', district)}
          mandalName={getLocationName('mandal', mandal, district)}
          villageName={getLocationName('village', village, mandal)}
          onBackToSearch={handleBackToSearch}
        />
      )}
    </div>
  );
}