import { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { Select, MenuItem } from "@mui/material";

const YearData = [
  { title: "Year", value: null },
  { title: "1900 - 2000", value: "1900 - 2000" },
  { title: "2000 - 2010", value: "2000 - 2010" },
  { title: "2010 - 2020", value: "2010 - 2020" },
  { title: "2020 - 2030", value: "2020 - 2030" },
];

const TimesData = [
  { title: "Runtime", value: null },
  { title: "< 1 Hour", value: "0 - 1" },
  { title: "1 - 2 Hours", value: "1 - 2" },
  { title: "2 - 3 Hours", value: "2 - 3" },
  { title: "> 3 Hours", value: "3 - 5" },
];

const RatesData = [
  { title: "Rating", value: null },
  { title: "★★★★★ (5)", value: "5" },
  { title: "★★★★☆ (4+)", value: "4" },
  { title: "★★★☆☆ (3+)", value: "3" },
  { title: "★★☆☆☆ (2+)", value: "2" },
  { title: "★☆☆☆☆ (1+)", value: "1" },
];

function Filters({ onFilterChange, genres = [] }) {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    year: null,
    runtime: null,
    rating: null,
  });

  const genreOptions = [{ name: "All", id: null }, ...genres];

  const handleFilterChange = (type, value) => {
    const newFilters = { ...selectedFilters, [type]: value || null };
    setSelectedFilters(newFilters);
    onFilterChange?.(type, newFilters[type]);
  };

  const filters = [
    {
      key: "category",
      label: "Category",
      value: selectedFilters.category,
      onChange: value => handleFilterChange("category", value),
      items: genreOptions.map(genre => ({
        title: genre.name,
        value: genre.id,
      })),
    },
    {
      key: "year",
      label: "Release Year",
      value: selectedFilters.year,
      onChange: value => handleFilterChange("year", value),
      items: YearData,
    },
    {
      key: "runtime",
      label: "Runtime",
      value: selectedFilters.runtime,
      onChange: value => handleFilterChange("runtime", value),
      items: TimesData,
    },
    {
      key: "rating",
      label: "Rating",
      value: selectedFilters.rating,
      onChange: value => handleFilterChange("rating", value),
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 grid md:grid-cols-4 grid-cols-2 lg:gap-4 gap-3 rounded p-4 bg-dry border border-border">
      {filters.map(filter => (
        <div key={filter.key} className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {filter.label}
          </label>
          <Select
            value={filter.value || ""}
            onChange={e => filter.onChange(e.target.value)}
            displayEmpty
            className="w-full bg-main text-white rounded"
            IconComponent={() => <FaChevronDown className="text-white mr-4" />}
            renderValue={selected => {
              if (!selected) {
                return <span className="text-textGray">{filter.label}</span>;
              }
              const selectedItem = filter.items.find(
                item => item.value === selected
              );
              return selectedItem?.title || selected;
            }}
          >
            {filter.items.map((item, i) => (
              <MenuItem key={i} value={item.value}>
                <div className="flex items-center w-full">
                  <span className="flex-1">{item.title}</span>
                  {filter.value === item.value && (
                    <FaCheck className="text-subMain ml-2" />
                  )}
                </div>
              </MenuItem>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}

export default Filters;
