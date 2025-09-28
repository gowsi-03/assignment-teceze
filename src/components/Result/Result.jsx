import { motion as Motion, AnimatePresence } from "framer-motion";

const categoryLabels = {
  networkOperationsLevels: "Network Operations Levels",
  fullDayVisit: "Full Day Visit",
  halfDayVisits: "Half Day Visit",
  dispatchTicket: "Dispatch Ticket",
  dispatchPricing: "Dispatch Pricing",
  shortTerm: "Short Term",
  longTerm: "Long Term",
};

export default function Result({
  showResult,
  selectedCategory,
  service,
  getPrice,
}) {
  return (
    <AnimatePresence>
      {showResult && (
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <div className="flex items-center my-6 md:my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">Result</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p>
            <span className="font-semibold">Category:</span>{" "}
            {categoryLabels[selectedCategory] || selectedCategory || "-"}
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
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
