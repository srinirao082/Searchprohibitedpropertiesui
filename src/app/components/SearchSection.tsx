import { MapPin, ChevronDown, Info, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface LocationData {
  districts: { id: string; name: string; }[];
  mandals: Record<string, { id: string; name: string; }[]>;
  villages: Record<string, { id: string; name: string; }[]>;
}

interface SearchSectionProps {
  district: string;
  mandal: string;
  village: string;
  surveyNumber: string;
  plotNumber: string;
  onDistrictChange: (value: string) => void;
  onMandalChange: (value: string) => void;
  onVillageChange: (value: string) => void;
  onSurveyNumberChange: (value: string) => void;
  onPlotNumberChange: (value: string) => void;
  onSearch: () => void;
  locationData: LocationData;
}

export function SearchSection({
  district,
  mandal,
  village,
  surveyNumber,
  plotNumber,
  onDistrictChange,
  onMandalChange,
  onVillageChange,
  onSurveyNumberChange,
  onPlotNumberChange,
  onSearch,
  locationData
}: SearchSectionProps) {
  const isSearchEnabled = district && mandal && village && surveyNumber;
  
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-6 shadow-lg shadow-blue-600/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <MapPin className="w-8 h-8 text-white" />
        </motion.div>
        <motion.h1 
          className="text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Search Prohibited Properties
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Verify property prohibition status with official government records
        </motion.p>
      </motion.div>

      {/* Search Form */}
      <motion.div 
        className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Location Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Property Location
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* District */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <select
                  id="district"
                  value={district}
                  onChange={(e) => onDistrictChange(e.target.value)}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all cursor-pointer font-medium hover:border-gray-400"
                >
                  <option value="">Select District</option>
                  {locationData.districts.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none transition-colors" />
              </div>
            </motion.div>

            {/* Mandal */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: district ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: district ? -2 : 0 }}
            >
              <label htmlFor="mandal" className="block text-sm font-medium text-gray-700 mb-2">
                Mandal <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <select
                  id="mandal"
                  value={mandal}
                  onChange={(e) => onMandalChange(e.target.value)}
                  disabled={!district}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                >
                  <option value="">Select Mandal</option>
                  {district && locationData.mandals[district]?.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </motion.div>

            {/* Village */}
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: mandal ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: mandal ? -2 : 0 }}
            >
              <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                Village / Town <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <select
                  id="village"
                  value={village}
                  onChange={(e) => onVillageChange(e.target.value)}
                  disabled={!mandal}
                  className="w-full appearance-none px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                >
                  <option value="">Select Village / Town</option>
                  {mandal && locationData.villages[mandal]?.map((v) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Property Details */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: village ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Property Identifiers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Survey Number */}
            <motion.div
              whileHover={{ y: village ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <label htmlFor="survey" className="block text-sm font-medium text-gray-700 mb-2">
                Survey Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="survey"
                value={surveyNumber}
                onChange={(e) => onSurveyNumberChange(e.target.value)}
                disabled={!village}
                placeholder="e.g., 123/4"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium hover:border-gray-400"
              />
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  Entering only a survey number will display all properties under that survey
                </p>
              </div>
            </motion.div>

            {/* Plot Number */}
            <motion.div
              whileHover={{ y: village ? -2 : 0 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <label htmlFor="plot" className="block text-sm font-medium text-gray-700 mb-2">
                Plot Number <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                id="plot"
                value={plotNumber}
                onChange={(e) => onPlotNumberChange(e.target.value)}
                disabled={!village}
                placeholder="e.g., A-15"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium hover:border-gray-400"
              />
              <div className="flex items-start gap-2 mt-2">
                <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  Enter plot number to view a specific property
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search Button */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: isSearchEnabled ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={onSearch}
            disabled={!isSearchEnabled}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 shadow-lg shadow-blue-600/20"
            whileHover={isSearchEnabled ? { y: -2, boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3), 0 10px 10px -5px rgba(37, 99, 235, 0.2)" } : {}}
            whileTap={isSearchEnabled ? { scale: 0.98 } : {}}
          >
            <span className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search Prohibited Properties
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}