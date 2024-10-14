import { useState } from "react";

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-20">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="relative">
          <button
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
            onClick={toggleDropdown}
          >
            Menu
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Home</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Products</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Contact</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Items</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Receipts</li>
            </ul>
          )}
        </nav>
        <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400">
          Account
        </button>
      </div>
    </header>
  );
}