import { useState } from "react";
import data from "../../data/pricebook.json"; // Import your JSON file

export default function Calculator() {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  // Create a mapping for human-readable category names
  const categoryLabels = {
    fullDayVisit: "Full Day Visit",
    halfDayVisits: "Half Day Visit",
    dispatchTicket: "Dispatch Ticket",
    dispatchPricing: "Dispatch Pricing",
    shortTerm: "Short Term",
    longTerm: "Long Term"
  };


  // Get the list of country names for the selected region
  const countries = region
    ? data
        .find((d) => d.region === region) // Find the region
        ?.countries.map((c) => c.country) // Extract country names
    : [];

  // Get the selected region object
  const selectedRegion = data.find((d) => d.region === region);

  // Find the selected country's data
  const selectedCountryData =
    selectedRegion?.countries.find((c) => c.country === country) || null; // Use `null` as a fallback in case no country is found

  // Get categories dynamically from the selected country data
  const availableCategories = selectedCountryData
    ? Object.keys(selectedCountryData).filter(
        (key) =>
          key !== "country" &&
          key !== "L1" &&
          key !== "L2" &&
          key !== "L3" &&
          key !== "L4" &&
          key !== "L5" &&
          key !== "supplier" &&
          key !== "currency" &&
          key !== "paymentTerms"
      )
    : [];

  // Calculate price based on the service level and category
  const getPrice = (level, category) => {
    if (!selectedCountryData) return null;

    const categoryData = selectedCountryData[category];
    if (!categoryData) return null;

    if (category === "dispatchTicket" || category === "dispatchPricing") {
      return categoryData[0]?.[level] || null;
    }

    return categoryData[0]?.[level] || null;
  };

  return (
    <div>
      <h1 className="text-2xl md:text-4xl font-bold text-center text-blue-800 mt-8">
        IT Service Pricing Calculator
      </h1>
      <p className="text-center text-gray-500 mt-2 text-sm md:text-base">
        Calculate your service costs based on the Teceze Global Pricebook.
      </p>

      <div className="mt-6 flex items-center justify-center px-4">
        <div className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1 */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Step 1: Select Service Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
                    setSelectedCategory(""); // Reset category when region changes
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
                  onChange={(e) => setCountry(e.target.value)}
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
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                  onChange={(e) => setService(e.target.value)}
                  disabled={!selectedCategory}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm md:text-base focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Service Level</option>
                  {["L1", "L2", "L3", "L4", "L5"].map((sl) => (
                    <option key={sl} value={sl}>
                      {sl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Display Output */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">Display the output</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Display selected values */}
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

          {/* Show Price for selected category */}
          <p>
            <span className="font-semibold">Price:</span>{" "}
            {selectedCategory && service
              ? `${getPrice(service, selectedCategory)} USD`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
