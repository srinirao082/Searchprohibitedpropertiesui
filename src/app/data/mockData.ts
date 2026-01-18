import { PropertyResult } from '@/app/components/ResultsSection';

// Mock location data structure
export const locationData = {
  districts: [
    { id: 'dist1', name: 'Krishna' },
    { id: 'dist2', name: 'Guntur' },
    { id: 'dist3', name: 'West Godavari' },
    { id: 'dist4', name: 'East Godavari' },
  ],
  mandals: {
    dist1: [
      { id: 'mand1', name: 'Vijayawada Rural' },
      { id: 'mand2', name: 'Gannavaram' },
      { id: 'mand3', name: 'Kanchikacherla' },
    ],
    dist2: [
      { id: 'mand4', name: 'Tenali' },
      { id: 'mand5', name: 'Bapatla' },
      { id: 'mand6', name: 'Sattenapalli' },
    ],
    dist3: [
      { id: 'mand7', name: 'Eluru' },
      { id: 'mand8', name: 'Tadepalligudem' },
      { id: 'mand9', name: 'Bhimavaram' },
    ],
    dist4: [
      { id: 'mand10', name: 'Kakinada Rural' },
      { id: 'mand11', name: 'Rajahmundry Rural' },
      { id: 'mand12', name: 'Amalapuram' },
    ],
  },
  villages: {
    mand1: [
      { id: 'vill1', name: 'Kondapalli' },
      { id: 'vill2', name: 'Ibrahimpatnam' },
      { id: 'vill3', name: 'Mylavaram' },
    ],
    mand2: [
      { id: 'vill4', name: 'Gannavaram' },
      { id: 'vill5', name: 'Kesarapalli' },
      { id: 'vill6', name: 'Nidamarru' },
    ],
    mand3: [
      { id: 'vill7', name: 'Kanchikacherla' },
      { id: 'vill8', name: 'Gampalagudem' },
      { id: 'vill9', name: 'Vissannapet' },
    ],
    mand4: [
      { id: 'vill10', name: 'Tenali' },
      { id: 'vill11', name: 'Chebrolu' },
      { id: 'vill12', name: 'Atchampet' },
    ],
    mand5: [
      { id: 'vill13', name: 'Bapatla' },
      { id: 'vill14', name: 'Karlapalem' },
      { id: 'vill15', name: 'Pittalavanipalem' },
    ],
    mand6: [
      { id: 'vill16', name: 'Sattenapalli' },
      { id: 'vill17', name: 'Nekarikallu' },
      { id: 'vill18', name: 'Bollapalli' },
    ],
    mand7: [
      { id: 'vill19', name: 'Eluru' },
      { id: 'vill20', name: 'Denduluru' },
      { id: 'vill21', name: 'Unguturu' },
    ],
    mand8: [
      { id: 'vill22', name: 'Tadepalligudem' },
      { id: 'vill23', name: 'Pentapadu' },
      { id: 'vill24', name: 'Nallajerla' },
    ],
    mand9: [
      { id: 'vill25', name: 'Bhimavaram' },
      { id: 'vill26', name: 'Undi' },
      { id: 'vill27', name: 'Kalla' },
    ],
    mand10: [
      { id: 'vill28', name: 'Kakinada Rural' },
      { id: 'vill29', name: 'Pithapuram' },
      { id: 'vill30', name: 'Prathipadu' },
    ],
    mand11: [
      { id: 'vill31', name: 'Rajahmundry Rural' },
      { id: 'vill32', name: 'Kadiam' },
      { id: 'vill33', name: 'Korukonda' },
    ],
    mand12: [
      { id: 'vill34', name: 'Amalapuram' },
      { id: 'vill35', name: 'Mummidivaram' },
      { id: 'vill36', name: 'Razole' },
    ],
  },
};

// Mock results generator based on survey and plot number
export function generateMockResults(
  surveyNumber: string,
  plotNumber: string,
  district: string,
  mandal: string,
  village: string
): PropertyResult[] {
  // If both survey and plot are provided, return a single specific result
  if (surveyNumber && plotNumber) {
    // Determine status based on plot number for variation
    const isProhibited = plotNumber.toLowerCase().includes('a') || plotNumber.toLowerCase().includes('1');
    
    if (isProhibited) {
      return [
        {
          id: '1',
          surveyNumber,
          plotNumber,
          status: 'prohibited',
          severity: plotNumber.toLowerCase().includes('1') ? 'high' : 'medium',
          reason: plotNumber.toLowerCase().includes('1') 
            ? 'Pending Court Case' 
            : 'Government Acquisition Order',
          authority: plotNumber.toLowerCase().includes('1')
            ? 'High Court of Andhra Pradesh'
            : 'District Revenue Office',
          caseReference: plotNumber.toLowerCase().includes('1')
            ? 'HC/2024/CIV/1247'
            : 'GRO/2025/ACQ/892',
          date: plotNumber.toLowerCase().includes('1')
            ? 'March 15, 2024'
            : 'November 8, 2025',
        },
      ];
    } else {
      return [
        {
          id: '1',
          surveyNumber,
          plotNumber,
          status: 'safe',
        },
      ];
    }
  }

  // If only survey number is provided, return multiple results
  if (surveyNumber) {
    return [
      {
        id: '1',
        surveyNumber,
        plotNumber: 'A-1',
        status: 'prohibited',
        severity: 'high',
        reason: 'Pending Court Case',
        authority: 'High Court of Andhra Pradesh',
        caseReference: 'HC/2024/CIV/1247',
        date: 'March 15, 2024',
      },
      {
        id: '2',
        surveyNumber,
        plotNumber: 'A-2',
        status: 'safe',
      },
      {
        id: '3',
        surveyNumber,
        plotNumber: 'B-1',
        status: 'prohibited',
        severity: 'medium',
        reason: 'Government Acquisition Order',
        authority: 'District Revenue Office',
        caseReference: 'GRO/2025/ACQ/892',
        date: 'November 8, 2025',
      },
      {
        id: '4',
        surveyNumber,
        plotNumber: 'B-2',
        status: 'safe',
      },
      {
        id: '5',
        surveyNumber,
        plotNumber: 'C-1',
        status: 'prohibited',
        severity: 'medium',
        reason: 'Environmental Protection Notice',
        authority: 'State Pollution Control Board',
        caseReference: 'SPCB/2025/ENV/334',
        date: 'January 3, 2026',
      },
    ];
  }

  return [];
}

// Helper function to get location names
export function getLocationName(
  type: 'district' | 'mandal' | 'village',
  id: string,
  parentId?: string
): string {
  if (type === 'district') {
    return locationData.districts.find(d => d.id === id)?.name || '';
  }
  
  if (type === 'mandal' && parentId) {
    return locationData.mandals[parentId]?.find(m => m.id === id)?.name || '';
  }
  
  if (type === 'village' && parentId) {
    return locationData.villages[parentId]?.find(v => v.id === id)?.name || '';
  }
  
  return '';
}
