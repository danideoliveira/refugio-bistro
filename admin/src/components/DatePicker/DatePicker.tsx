import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./DatePicker.styled";
import pt from "date-fns/locale/pt";
registerLocale("pt", Object(pt));

interface IDatePicker {
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}

function DateDropdown({ handleChange }: IDatePicker): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  let date: Date | null = new Date();

  if (selectedDate !== null) {
    const [day, month, year] = selectedDate.split("/").map(Number);
    date = new Date(year, month - 1, day);
  } else {
    date = null;
  }

  const handleDateChange = (date: Date | null): void => {
    if (date?.toLocaleDateString() !== undefined) {
      setSelectedDate(date?.toLocaleDateString());
      handleChange(date?.toLocaleDateString());
    } else {
      handleChange("Qualquer data");
      setSelectedDate(null);
    }
  };

  return (
    <Container>
      <label>Data</label>
      <DatePicker
        className="date-picker"
        selected={date || null}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Qualquer data"
        locale="pt"
      />
    </Container>
  );
}

export default DateDropdown;
