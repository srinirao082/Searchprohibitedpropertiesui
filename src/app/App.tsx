console.log('APP VERSION: REAL JSON INGESTION');
import { useState } from 'react';
import { SearchSection } from '@/app/components/SearchSection';
import { ResultsSection, PropertyResult } from '@/app/components/ResultsSection';

// ✅ REAL DATA
import districts from '@/data/districts.json';
import mandals from '@/data/mandals.json';
import villages from '@/data/villages.json';
import igrsRecords from '@/data/igrsRecords.json';

/* -------------------------------------------------------
   BUILD LOCATION DATA FOR SearchSection (EXPECTED SHAPE)
------------------------------------------------------- */
const locationData = {
  districts: districts.map((d: any) => ({
    id: d.code,   // REAL districtCode
    name: d.name, // Display name
  })),

  mandals: mandals,   // { [districtCode]: [{ code, name }] }
  villages: villages // { [mandalCode]: [{ code, name }] }
};

export default function App() {
  /* ---------------------------------------------------
     SEARCH STATE (CODES ONLY — MATCH IGRS)
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

  const handleVillageChange = (value: string) => {
    setVillage(value);
  };

  /* ---------------------------------------------------
     REAL SEARCH — IGRS JSON
  --------------------------------------------------- */
  const handleSearch = () => {
    const filtered = (igrsRecords as any[])
      .filter((r) => {
        if (r.districtCode !== district) return false;
        if (r.mandalCode !== mandal) return false;
        if (r.villageCode !== village) return false;
        if (String(r.surveyNo) !== String(surveyNumber)) return false;

        // Plot number is optional
        if (plotNumber && !String(r.plotNo).includes(plotNumber)) return false;

        return true;
      })
      .map((r, index): PropertyResult => ({
        id: `${r.surveyNo}-${index}`,
        surveyNumber: String(r.surveyNo),
        plotNumber: r.plotNo && r.plotNo !== '-' ? String(r.plotNo) : '',
        status: 'prohibited', // IGRS demo data
        severity: 'high',
        reason: r.reason,
        authority: r.authority || r.sro,
        caseReference: r.caseRef,
        date: r.date,
      }));

    setResults(filtered);
    setShowResults(true);
  };

  const handleBackToSearch = () => {
    setShowResults(false);
  };

  /* ---------------------------------------------------
     HELPERS (NAMES FOR RESULTS HEADER)
  --------------------------------------------------- */
  const districtName =
    districts.find((d: any) => d.code === district)?.name || '';

  const mandalName =
    mandals[district]?.find((m: any) => m.code === mandal)?.name || '';

  const villageName =
    villages[mandal]?.find((v: any) => v.code === village)?.name || '';

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
          onVillageChange={handleVillageChange}
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
