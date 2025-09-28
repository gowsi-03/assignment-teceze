import { useState } from "react";
import Select from "react-select";
import BackfillSwitch from "../Switch/BackfillSwitch";
import Result from "../Result/Result";
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

  const countries = region
    ? data.find((d) => d.region === region)?.countries.map((c) => c.country)
    : [];

  const selectedRegion = data.find((d) => d.region === region);
  const selectedCountryData =
    selectedRegion?.countries.find((c) => c.country === country) || null;

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

      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-700">
              Step 1: Select Service Details
            </h2>

            <div className="pt-4">
              {/* Region */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Region
                </label>
                <Select
                  value={region ? { value: region, label: region } : null}
                  onChange={(selected) => {
                    const value = selected?.value || "";
                    setRegion(value);
                    setCountry("");
                    setService("");
                    setSelectedCategory("");
                    setBackfillOption("");
                    setShowResult(false);
                  }}
                  options={[...new Set(data.map((d) => d.region))].map(
                    (reg) => ({
                      value: reg,
                      label: reg,
                    })
                  )}
                  placeholder="Select Region"
                  isClearable
                />
              </div>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Country
                </label>
                <Select
                  value={country ? { value: country, label: country } : null}
                  onChange={(selected) => {
                    const value = selected?.value || "";
                    setCountry(value);
                    setShowResult(false);
                  }}
                  options={countries.map((cty) => ({
                    value: cty,
                    label: cty,
                  }))}
                  isDisabled={!region}
                  placeholder="Select Country"
                  isClearable
                />
              </div>

              {/* Supplier */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Supplier
                </label>
                <Select
                  value={
                    selectedCountryData?.supplier
                      ? {
                          value: selectedCountryData.supplier,
                          label: selectedCountryData.supplier,
                        }
                      : null
                  }
                  options={
                    selectedCountryData?.supplier
                      ? [
                          {
                            value: selectedCountryData.supplier,
                            label: selectedCountryData.supplier,
                          },
                        ]
                      : []
                  }
                  isDisabled
                  placeholder="Supplier"
                />
              </div>

              {/* Currency */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Currency
                </label>
                <Select
                  value={
                    selectedCountryData?.currency
                      ? {
                          value: selectedCountryData.currency,
                          label: selectedCountryData.currency,
                        }
                      : null
                  }
                  options={
                    selectedCountryData?.currency
                      ? [
                          {
                            value: selectedCountryData.currency,
                            label: selectedCountryData.currency,
                          },
                        ]
                      : []
                  }
                  isDisabled
                  placeholder="Currency"
                />
              </div>

              {/* Payment Terms */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Payment Terms
                </label>
                <Select
                  value={
                    selectedCountryData?.paymentTerms
                      ? {
                          value: selectedCountryData.paymentTerms,
                          label: selectedCountryData.paymentTerms,
                        }
                      : null
                  }
                  options={
                    selectedCountryData?.paymentTerms
                      ? [
                          {
                            value: selectedCountryData.paymentTerms,
                            label: selectedCountryData.paymentTerms,
                          },
                        ]
                      : []
                  }
                  isDisabled
                  placeholder="Payment Terms"
                />
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Select Category
                </label>
                <Select
                  value={
                    selectedCategory
                      ? {
                          value: selectedCategory,
                          label:
                            categoryLabels[selectedCategory] ||
                            selectedCategory,
                        }
                      : null
                  }
                  onChange={(selected) => {
                    const value = selected?.value || "";
                    setSelectedCategory(value);
                    setService("");
                    setBackfillOption("");
                    setShowResult(false);
                  }}
                  options={availableCategories.map((category) => ({
                    value: category,
                    label: categoryLabels[category] || category,
                  }))}
                  isDisabled={!country}
                  placeholder="Select Category"
                  isClearable
                />
              </div>

              {/* Service Level */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Service Level
                </label>
                <Select
                  value={service ? { value: service, label: service } : null}
                  onChange={(selected) => {
                    const value = selected?.value || "";
                    setService(value);
                    setShowResult(false);
                  }}
                  options={getServiceLevels().map((sl) => ({
                    value: sl,
                    label: sl,
                  }))}
                  isDisabled={!selectedCategory}
                  placeholder="Select Service Level"
                  isClearable
                />
              </div>
            </div>
          </div>

          {/* Backfill Option with Framer Motion */}
          {selectedCategory === "networkOperationsLevels" && service && (
            <BackfillSwitch
              backfillOption={backfillOption}
              setBackfillOption={setBackfillOption}
            />
          )}

          {/* Calculate Button */}
          <div className="mt-8">
            <button
              onClick={() => setShowResult(true)}
              disabled={
                !service ||
                (selectedCategory === "networkOperationsLevels" &&
                  !backfillOption) ||
                showResult // disable after showing result
              }
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate
            </button>
          </div>

          {/* Display Result with Framer Motion */}
          <Result
            showResult={showResult}
            selectedCategory={selectedCategory}
            service={service}
            getPrice={getPrice}
          />
        </div>
      </div>
    </div>
  );
}
