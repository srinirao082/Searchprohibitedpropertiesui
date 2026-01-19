import { useState } from 'react';
import { SearchSection } from '@/app/components/SearchSection';
import { ResultsSection, PropertyResult } from '@/app/components/ResultsSection';
import { locationData, getLocationName } from '@/app/data/mockData';
import igrsRecords from '@/data/igrsRecords.json';

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

  // ✅ REAL SEARCH (using IGRS JSON)
  const handleSearch = () => {
    const filteredResults = (igrsRecords as PropertyResult[]).filter((r) => {
      if (r.districtCode !== district) return false;
      if (r.mandalCode !== mandal) return false;
      if (r.villageCode !== village) return false;
      if (String(r.surveyNo) !== String(surveyNumber)) return false;

      // plot number is optional
      if (plotNumber && !String(r.plotNo).includes(plotNumber)) return false;

      return true;
    });

    setResults(filteredResults);
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
