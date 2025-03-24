import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

// 12-hour format time converter function
const formatTime12Hour = (time) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${minutes} ${ampm}`;
};

const AddSchedule = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectTime, setSelectTime] = useState("10:00");

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const form = e.target;
    const formattedDate = startDate.toLocaleDateString("en-CA");
    const formattedTime = formatTime12Hour(selectTime);
    const title = form.title.value;
    const day = form.day.value;

    console.log("Gym Schedule:", { title, formattedDate, day, formattedTime });
    alert(`Schedule Added!\nTitle: ${title}\nDate: ${formattedDate}\nDay: ${day}\nTime: ${formattedTime}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add Gym Schedule</h2>
        <form onSubmit={handleAddSchedule} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter title"
            />
          </div>

          {/* Date */}
          <div className="w-full">
            <label className="block  font-semibold mb-1">Date</label>
            <DatePicker
              selected={startDate}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(date) => setStartDate(date)}
            />
          </div>

          {/* Day */}
          <div>
            <label className="block font-semibold mb-1">Day</label>
            <select
              name="day"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div>
            <label className="block font-semibold mb-1">Time</label>
            <TimePicker
              onChange={setSelectTime}
              value={selectTime}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-600 transition duration-200">
            Add Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
