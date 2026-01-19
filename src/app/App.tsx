console.log('APP VERSION: REAL JSON INGESTION');

import { useState } from 'react';
import { SearchSection } from '@/app/components/SearchSection';
import { ResultsSection, PropertyResult } from '@/app/components/ResultsSection';

// ✅ REAL DATA (CORRECT PATHS)
import districts from '@/app/data/districts.json';
import mandals from '@/app/data/mandals.json';
import villages from '@/app/data/villages.json';
import igrsRecords from '@/app/data/igrsRecords.json';

/* -------------------------------------------------------
   BUILD LOCATION DATA (FOR SearchSection UI)
------------------------------------------------------- */
const locationData = {
  districts: (districts as any[]).map((d) => ({
    id: d.code,     // districtCode
    name: d.name,   // display name
  })),

  // mandals.json → { [districtCode]: [{ code, name }] }
  mandals: mandals as Record<string, { code: string; name: string }[]>,

  // villages.json → { [mandalCode]: [{ code, name }] }
  villages: villages as Record<string, { code: string; name: string }[]>,
};

export default function App() {
  /* ---------------------------------------------------
     SEARCH STATE (CODES ONLY)
  --------------------------------------------------- */
  const [district, setDistrict] = useState('');
  const [mandal, setMandal] = useState('');
  const [village, setVillage] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [plotNumber, setPlotNumber] = useState('');

  /* ---------------------------------------------------
     RESULTS STATE
  --------------------------------------------------- */
  const [results, setResults] = useState<PropertyResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  /* ---------------------------------------------------
     HANDLERS
  --------------------------------------------------- */
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setMandal('');
    setVillage('');
  };

  const handleMandalChange = (value: string) => {
    setMandal(value);
    setVillage('');
  };

  /* ---------------------------------------------------
     REAL SEARCH (IGRS JSON)
  --------------------------------------------------- */
  const handleSearch = () => {
    const filteredResults: PropertyResult[] = (igrsRecords as any[])
      .filter((r) => {
        if (r.districtCode !== district) return false;
        if (r.mandalCode !== mandal) return false;
        if (r.villageCode !== village) return false;
        if (String(r.surveyNo) !== String(surveyNumber)) return false;

        // plot number optional
        if (plotNumber && String(r.plotNo) !== String(plotNumber)) return false;

        return true;
      })
      .map((r, index) => ({
        id: `${r.surveyNo}-${index}`,
        surveyNumber: String(r.surveyNo),
        plotNumber: r.plotNo && r.plotNo !== '-' ? String(r.plotNo) : '',
        status: 'prohibited',
        severity: 'high',
        reason: r.reason,
        authority: r.sro,
        caseReference: r.caseRef,
        date: r.date,
      }));

    setResults(filteredResults);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  /* ---------------------------------------------------
     DISPLAY NAMES FOR RESULTS HEADER
  --------------------------------------------------- */
  const districtName =
    (districts as any[]).find((d) => d.code === district)?.name || '';

  const mandalName =
    (mandals as any)[district]?.find((m: any) => m.code === mandal)?.name || '';

  const villageName =
    (villages as any)[mandal]?.find((v: any) => v.code === village)?.name || '';

  /* ---------------------------------------------------
     RENDER
  --------------------------------------------------- */
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
          districtName={districtName}
          mandalName={mandalName}
          villageName={villageName}
          onBackToSearch={handleBackToSearch}
        />
      )}
    </div>
  );
}
