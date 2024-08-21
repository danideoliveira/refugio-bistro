import { useEffect, useRef, useState } from "react";
import { Container } from "./Dropdown.styled";
import { IconType } from "react-icons";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface IDropdown {
  title: string;
  icon: IconType;
  items: Array<any>;
  defaultValue: string;
  action: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<IDropdown> = ({
  title,
  items,
  icon: Icon,
  action,
  defaultValue,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [itemSelected, setSelectedItem] = useState<string>(defaultValue);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleItemClick = (currentItem: string) => {
    action(currentItem);
    setSelectedItem(currentItem);
    setOpen(false);
  };

  return (
    <Container ref={dropdownRef}>
      <div className="res-select-box" id="teste" onClick={() => setOpen(!open)}>
        <Icon />
        <div className="res-item-info">
          <label>{title}</label>
          <span>{itemSelected}</span>
        </div>
        <div className="res-arrow-icon">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      <ul style={{ display: open ? "block" : "none" }}>
        {items.map((currentItem) =>
          currentItem.includes("ESGOTADO") ? (
            <li key={currentItem} style={{ color: "#b1b1b1" }}>
              <span style={{ textDecorationLine: "line-through" }}>
                {currentItem.split(" ")[0]}
              </span>{" "}
              ESGOTADO
            </li>
          ) : (
            <li key={currentItem} onClick={() => handleItemClick(currentItem)}>
              {currentItem}
            </li>
          ),
        )}
      </ul>
    </Container>
  );
};
export default Dropdown;
