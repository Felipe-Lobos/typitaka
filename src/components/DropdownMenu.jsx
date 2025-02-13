import { useEffect, useRef, useState } from "react";
import "./styles/DropdownMenu.css";
import { IoColorPaletteOutline } from "react-icons/io5";


export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    console.log("option:", option);
    setIsOpen(false);
  };
  return (
    <div className="menu-container" ref={dropdownRef}>
      <div className="menu-trigger" onClick={toggleDropdown}>
        <IoColorPaletteOutline />
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item" onClick={()=>handleSelect('123')}>
            primero
          </div>
          <div className="dropdown-item" onClick={()=>handleSelect('asd')}>
            segundo
          </div>
        </div>
      )}
    </div>
  );
}
