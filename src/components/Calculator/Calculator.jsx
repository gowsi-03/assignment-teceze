import { useState } from "react";
import data from "../../data/pricebook.json"; // your JSON file

export default function Calculator() {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [withYear, setWithYear] = useState(true); // toggle with_year / without_year

  // Get countries for selected region
  const countries = data
    .filter((d) => d.region === region)
    .map((d) => d.country);

  // Find the selected entry for price
  const selectedEntry = data.find(
    (d) => d.region === region && d.country === country
  );

  // Calculate price
  const price =
    selectedEntry && service
      ? selectedEntry[service.toLowerCase()][
          withYear ? "with_year" : "without_year"
        ]
      : null;

  return (
    <div className="bg-gray-50">
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

              {/* Service Level */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Service Level
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  disabled={!country}
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

          {/* Step 2 */}
          <div className="mt-10">
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Step 2: Choose Pricing Model
            </h2>

            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={withYear}
                  onChange={() => setWithYear(true)}
                  className="form-radio"
                />
                <span>With Year</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={!withYear}
                  onChange={() => setWithYear(false)}
                  className="form-radio"
                />
                <span>Without Year</span>
              </label>
            </div>
          </div>
          <div class="flex items-center my-8">
            <div class="flex-1 h-px bg-gray-300"></div>
            <span class="px-4 text-gray-500">Display the output</span>
            <div class="flex-1 h-px bg-gray-300"></div>
          </div>
          <p>
            <span className="font-semibold">Region:</span> {region || "-"}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {country || "-"}
          </p>
          <p>
            <span className="font-semibold">Service Level:</span>{" "}
            {service || "-"}
          </p>
          <p>
            <span className="font-semibold">Price:</span>{" "}
            {price !== null ? `${price} ${selectedEntry.Currency}` : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
