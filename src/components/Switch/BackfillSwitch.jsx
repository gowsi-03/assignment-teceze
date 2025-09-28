import { Switch } from "@headlessui/react";
import { motion as Motion } from "framer-motion";

export default function BackfillSwitch({ backfillOption, setBackfillOption }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <p className="font-semibold text-gray-700 mb-2">Backfill Option:</p>
      <Switch.Group>
        <div className="flex items-center">
          <Switch
            checked={backfillOption === "withBackfill"}
            onChange={(checked) =>
              setBackfillOption(checked ? "withBackfill" : "withoutBackfill")
            }
            className={`${
              backfillOption === "withBackfill" ? "bg-green-600" : "bg-gray-300"
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                backfillOption === "withBackfill" ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <Switch.Label className="ml-3 text-sm text-gray-700">
            {backfillOption === "withBackfill" ? "With Backfill" : "Without Backfill"}
          </Switch.Label>
        </div>
      </Switch.Group>
    </Motion.div>
  );
}
