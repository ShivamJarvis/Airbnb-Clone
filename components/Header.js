import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  UserCircleIcon,
  MenuIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

const Header = ({placeholder}) => {
  const [inputText, setInputText] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();
  const handleDateSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header className="sticky top-0 shadow-sm z-50 grid grid-cols-3 bg-white p-5 md:px-10">
      {/* left */}
      <div
        className="relative flex items-center h-10 cursor-pointer my-auto z-50"
        onClick = {()=>router.push('/')}
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Center */}
      <div className="flex items-center md:border-2 py-2 rounded-full ">
        <input
          type="text"
          className="bg-transparent text-sm text-gray-600 placeholder-gray-400 px-6 outline-none flex-grow"
          placeholder={ placeholder || "Start Your Search"}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <SearchIcon className="h-8 bg-red-400 rounded-full p-2 md:mx-2  text-white hidden md:inline-flex" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden md:inline">Become a Host</p>
        <GlobeAltIcon className="h-6" />

        <div className="rounded-full p-3 space-x-2 flex items-center border-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-6 cursor-pointer" />
        </div>
      </div>

      {inputText && (
        <div className="flex flex-col col-span-3 mx-auto mt-3">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleDateSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              className="w-12 pl-2 text-lg text-red-400 outline-none"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              min="1"
            />
          </div>
          <div className="flex ">
            <button
              className="flex-grow text-gray-500"
              onClick={() => setInputText("")}
            >
              Cancel
            </button>
            <button
              className="flex-grow text-red-400"
              onClick={() =>{
                setInputText('')
                router.push({
                  pathname: "/search",
                  query: {
                    guests: noOfGuests,
                    location: inputText,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
                  },
                })
              }
              }
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

