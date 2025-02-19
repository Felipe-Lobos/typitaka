import { useEffect, useRef, useState } from "react";
import "./styles/ThemeSelector.css";
import { IoColorPaletteOutline } from "react-icons/io5";
import {useTheme} from '../context/ThemeContext';

export function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {themeList, selectTheme} = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si el dropdown está abierto y el clic no se realizó dentro del contenedor del dropdown, se cierra
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (option) => {
    selectTheme(option);
    setIsOpen(false);
  };
  return (
    <div className="menu-container" ref={dropdownRef}>
      <div className="menu-trigger" onClick={toggleDropdown}>
        <IoColorPaletteOutline />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {themeList.map((themeName)=>{
            return(<div key={themeName} className="dropdown-item" onClick={()=>handleSelect(themeName)}>
            {themeName}
          </div>)
          })}

        </div>
      )}
    </div>
  );
}
