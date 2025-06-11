import { useState } from "react";
import { Menu, MenuButton, MenuItems, MenuList, MenuItem, Transition, Switch } from "@headlessui/react";
import { Fragment } from "react";

const equipmentOptions = [
  "Treadmill", "Elliptical", "Rowing Machine", "Free Weights", "Bench Press",
  "Squat Rack", "Deadlift Platform", "Pull-up Bar", "Cable Machine", "Kettlebells", "Resistance Bands",
  "Stationary Bike", "Climbing Wall", "Battle Ropes", "Leg Press", "Dip Station"
];

export default function GymFilterMenu({ onFilterChange }) {
  const [zipCode, setZipCode] = useState("");
  const [radiusEnabled, setRadiusEnabled] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const handleEquipmentChange = (item) => {
    setSelectedEquipment(prev =>
      prev.includes(item)
        ? prev.filter(e => e !== item)
        : [...prev, item]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      zipCode,
      radiusEnabled,
      selectedEquipment,
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left font-inter">
      <div>
        <MenuButton className="flex w-full rounded-md bg-blue-600 px-2 py-2 text-white hover:bg-blue-700">
          <div className="h-full w-full flex items-center gap-2 justify-between">
            <p>Filters</p>
            <img src="/filter_icon.svg" className="h-4 w-4"></img>
          </div>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4 space-y-4">
          <div>
            <label className="block font-medium">ZIP Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              placeholder="e.g. 90210"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Enable Radius Filter</label>
            <Switch
              checked={radiusEnabled}
              onChange={setRadiusEnabled}
              className={`${
                radiusEnabled ? "bg-blue-600" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  radiusEnabled ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>

          <div>
            <label className="block font-medium mb-2">Equipment</label>
            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded p-2 space-y-1">
              {equipmentOptions.map((item) => (
                <label key={item} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedEquipment.includes(item)}
                    onChange={() => handleEquipmentChange(item)}
                    className="rounded border-gray-300"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
