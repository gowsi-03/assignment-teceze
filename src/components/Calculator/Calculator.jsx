import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import data from "../../data/pricebook.json"; // Import your JSON file

export default function Calculator() {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [backfillOption, setBackfillOption] = useState("");
  const [showResult, setShowResult] = useState(false);

  // Category Labels
  const categoryLabels = {
    networkOperationsLevels: "Network Operations Levels",
    fullDayVisit: "Full Day Visit",
    halfDayVisits: "Half Day Visit",
    dispatchTicket: "Dispatch Ticket",
    dispatchPricing: "Dispatch Pricing",
    shortTerm: "Short Term",
    longTerm: "Long Term",
  };

  // Countries for selected region
  const countries = region
    ? data.find((d) => d.region === region)?.countries.map((c) => c.country)
    : [];

  // Region + country data
  const selectedRegion = data.find((d) => d.region === region);
  const selectedCountryData =
    selectedRegion?.countries.find((c) => c.country === country) || null;

  // Available categories
  const availableCategories = selectedCountryData
    ? [
        "networkOperationsLevels",
        ...Object.keys(selectedCountryData).filter(
          (key) =>
            key !== "country" &&
            key !== "L1" &&
            key !== "L2" &&
            key !== "L3" &&
            key !== "L4" &&
            key !== "L5" &&
            key !== "supplier" &&
            key !== "currency" &&
            key !== "paymentTerms" &&
            key !== "serviceLevels"
        ),
      ]
    : ["networkOperationsLevels"];

  // Service levels
  const getServiceLevels = () => {
    if (selectedCategory === "networkOperationsLevels") {
      return ["L1", "L2", "L3", "L4", "L5"];
    }
    if (!selectedCountryData || !selectedCategory) return [];
    const serviceLevelsData = selectedCountryData[selectedCategory];
    if (!serviceLevelsData || !serviceLevelsData.length) return [];
    if (
      selectedCategory === "dispatchTicket" ||
      selectedCategory === "dispatchPricing"
    ) {
      return Object.keys(serviceLevelsData[0]);
    }
    return Object.keys(serviceLevelsData[0]).filter((key) =>
      key.startsWith("L")
    );
  };

  // Price calculation
  const getPrice = (level, category) => {
    if (category === "networkOperationsLevels") {
      const levelData = selectedCountryData?.[level]?.[0];
      if (!levelData) return null;
      return backfillOption ? levelData[backfillOption] : null;
    }
    if (!selectedCountryData) return null;
    const categoryData = selectedCountryData[category];
    if (!categoryData) return null;
    return categoryData[0]?.[level] || null;
  };

  return (
    <div className="pb-10">
      <h1 className="text-2xl md:text-4xl font-bold text-center text-blue-800 mt-8">
        IT Service Pricing Calculator
      </h1>
      <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
        Calculate your service costs based on the Teceze Global Pricebook.
      </p>

      <div className="mt-6 flex items-center justify-center px-4 pb-10">
        {/* Main Card with smooth layout animation */}
        <motion.div
          layout
          className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Step 1 */}
          <motion.div layout className="mt-0 md:mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Step 1: Select Service Details
            </h2>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setCountry("");
                    setService("");
                    setSelectedCategory("");
                    setBackfillOption("");
                    setShowResult(false);
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Region</option>
                  {[...new Set(data.map((d) => d.region))].map((reg) => (
                    <option key={reg} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country
                </label>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setShowResult(false);
                  }}
                  disabled={!region}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  {countries.map((cty) => (
                    <option key={cty} value={cty}>
                      {cty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Select Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setService("");
                    setBackfillOption("");
                    setShowResult(false);
                  }}
                  disabled={!country}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>
                      {categoryLabels[category] || category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Level */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Service Level
                </label>
                <select
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    setShowResult(false);
                  }}
                  disabled={!selectedCategory}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Service Level</option>
                  {getServiceLevels().map((sl) => (
                    <option key={sl} value={sl}>
                      {sl}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>

          {/* Network Operations Role Levels  Backfill Options */}
          <AnimatePresence>
            {selectedCategory === "networkOperationsLevels" && service && (
              <motion.div
                layout
                className="mt-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-semibold text-gray-700">Backfill Option:</p>
                <div className="flex gap-6 mt-2">
                  <motion.label
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value="withBackfill"
                      checked={backfillOption === "withBackfill"}
                      onChange={(e) => {
                        setBackfillOption(e.target.value);
                        setShowResult(false);
                      }}
                      className="mr-2"
                    />
                    With Backfill
                  </motion.label>

                  <motion.label
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      value="withoutBackfill"
                      checked={backfillOption === "withoutBackfill"}
                      onChange={(e) => {
                        setBackfillOption(e.target.value);
                        setShowResult(false);
                      }}
                      className="mr-2"
                    />
                    Without Backfill
                  </motion.label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Calculate Button */}
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowResult(true)}
              disabled={
                !service ||
                (selectedCategory === "networkOperationsLevels" &&
                  !backfillOption)
              }
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate
            </motion.button>
          </div>

          {/* Display Output after button click */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                key="result"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center my-6 md:my-8">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4 text-gray-500">Result</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <p>
                  <span className="font-semibold">Supplier:</span>{" "}
                  {selectedCountryData?.supplier || "-"}
                </p>
                <p>
                  <span className="font-semibold">Currency:</span>{" "}
                  {selectedCountryData?.currency || "-"}
                </p>
                <p>
                  <span className="font-semibold">Payment Terms:</span>{" "}
                  {selectedCountryData?.paymentTerms || "-"}
                </p>
                <p>
                  <span className="font-semibold">Service Level:</span>{" "}
                  {service || "-"}
                </p>
                <p>
                  <span className="font-semibold">Price:</span>{" "}
                  {selectedCategory && service
                    ? `${getPrice(service, selectedCategory) || "-"} USD`
                    : "-"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
