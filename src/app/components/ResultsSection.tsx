import { AlertCircle, CheckCircle, FileText, Calendar, Building2, ChevronLeft, Shield, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export interface PropertyResult {
  id: string;
  surveyNumber: string;
  plotNumber: string;
  status: 'prohibited' | 'safe';
  reason?: string;
  authority?: string;
  caseReference?: string;
  date?: string;
  severity?: 'high' | 'medium';
}

interface ResultsSectionProps {
  results: PropertyResult[];
  district: string;
  mandal: string;
  village: string;
  districtName: string;
  mandalName: string;
  villageName: string;
  onBackToSearch: () => void;
}

export function ResultsSection({
  results,
  district,
  mandal,
  village,
  districtName,
  mandalName,
  villageName,
  onBackToSearch
}: ResultsSectionProps) {
  const prohibitedCount = results.filter(r => r.status === 'prohibited').length;
  const safeCount = results.filter(r => r.status === 'safe').length;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      {/* Header with Back Button */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all mb-6 border border-gray-200 shadow-sm font-medium"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </motion.button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Search Results
            </motion.h1>
            
            {/* Selected Location Display */}
            <motion.div 
              className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Building2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {districtName} → {mandalName} → {villageName}
              </span>
            </motion.div>
          </div>

          {/* Results Count */}
          <motion.div 
            className="text-center md:text-right bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {results.length}
            </div>
            <div className="text-sm font-medium text-gray-600">
              {results.length === 1 ? 'Property Found' : 'Properties Found'}
            </div>
          </motion.div>
        </div>

        {/* Status Summary */}
        {results.length > 0 && (
          <motion.div 
            className="flex flex-wrap gap-3 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {prohibitedCount > 0 && (
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-xl border border-red-200"
                whileHover={{ scale: 1.05 }}
              >
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-900">
                  {prohibitedCount} Prohibited
                </span>
              </motion.div>
            )}
            {safeCount > 0 && (
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl border border-green-200"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-900">
                  {safeCount} Safe
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Results Grid */}
      {results.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-2xl shadow-md border-2 overflow-hidden hover:shadow-xl transition-shadow ${
                result.status === 'prohibited' 
                  ? result.severity === 'high'
                    ? 'border-red-200'
                    : 'border-orange-200'
                  : 'border-green-200'
              }`}
            >
              {/* Status stripe */}
              <div className={`h-1 ${
                result.status === 'prohibited'
                  ? result.severity === 'high'
                    ? 'bg-red-600'
                    : 'bg-orange-500'
                  : 'bg-green-500'
              }`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  {/* Property Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Survey No. {result.surveyNumber}
                      </h3>
                      {result.plotNumber && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-lg font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                            Plot {result.plotNumber}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    {result.status === 'prohibited' ? (
                      <motion.div 
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${
                          result.severity === 'high' 
                            ? 'bg-red-100 text-red-900' 
                            : 'bg-orange-100 text-orange-900'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">Prohibited</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-900 rounded-xl font-semibold"
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm">Safe</span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                {result.status === 'prohibited' && (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    {result.reason && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Reason
                          </div>
                          <div className="text-sm text-gray-900 font-semibold">
                            {result.reason}
                          </div>
                        </div>
                      </div>
                    )}

                    {result.authority && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Authority
                          </div>
                          <div className="text-sm text-gray-900 font-semibold">
                            {result.authority}
                          </div>
                        </div>
                      </div>
                    )}

                    {result.caseReference && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Case Reference
                          </div>
                          <div className="text-sm text-gray-900 font-semibold font-mono">
                            {result.caseReference}
                          </div>
                        </div>
                      </div>
                    )}

                    {result.date && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Date
                          </div>
                          <div className="text-sm text-gray-900 font-semibold">
                            {result.date}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gray-100 mb-6">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Properties Found
          </h3>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We couldn't find any properties matching your search criteria. Please verify the survey number and try again.
          </p>
          <motion.button
            onClick={onBackToSearch}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Try Another Search
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}