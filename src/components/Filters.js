import { useState } from "react";
import { CategoriesData } from "../Data/CategoriesData";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const YearData = [
  { title: "Year" },
  { title: "1700 - 1800" },
  { title: "1800 - 1900" },
  { title: "1900 - 2000" },
  { title: "2000 - 2010" },
  { title: "2010 - 2030" },
];

const TimesData = [
  { title: "Hours" },
  { title: "1 - 5 Hours" },
  { title: "5 - 10 Hours" },
  { title: "10 - 15 Hours" },
  { title: "15 - 20 Hours" },
];

const RatesData = [
  { title: "Rates" },
  { title: "1 Star" },
  { title: "2 Star" },
  { title: "3 Star" },
  { title: "4 Star" },
  { title: "5 Star" },
];

function Filters() {
  const [category, setCategory] = useState(CategoriesData[0]);
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);

  const filters = [
    {
      key: "category",
      value: category,
      onChange: setCategory,
      items: CategoriesData,
    },
    {
      key: "year",
      value: year,
      onChange: setYear,
      items: YearData,
    },
    {
      key: "times",
      value: times,
      onChange: setTimes,
      items: TimesData,
    },
    {
      key: "rates",
      value: rates,
      onChange: setRates,
      items: RatesData,
    },
  ];

  return (
    <div className="my-6 grid md:grid-cols-4 grid-cols-2 lg:gap-12 gap-2 rounded p-6 bg-dry border border-border">
      {filters.map((filter, index) => (
        <div key={index} className="relative">
          <Select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            IconComponent={(props) => (
              <FaChevronDown {...props} color="white" />
            )}
            renderValue={(selected) => selected?.title || selected}
            className="relative border border-gray-800 :focus-border-gray-800 w-full !text-white bg-main rounded-lg cursor-default text-left !text-xs"
          >
            {filter.items.map((item, i) => (
              <MenuItem
                key={i}
                value={item.title}
                className={`relative cursor-default select-none text-base hover:!bg-subMain hover:!text-white ${
                  filter.value === item.title
                    ? "!bg-subMain !text-white"
                    : "!bg-white !text-main"
                }`}
              >
                {filter.value === item.title && (
                  <ListItemIcon>
                    <FaCheck fontSize="small" color="white" />
                  </ListItemIcon>
                )}
                <ListItemText>{item.title}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
}

export default Filters;
