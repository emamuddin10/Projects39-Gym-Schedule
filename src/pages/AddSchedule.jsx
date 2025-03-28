import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Swal from "sweetalert2";

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
    
    const scheduleData = {
      title:title,
      date:formattedDate,
      day:day,
      time:formattedTime
    }
    console.log("Gym Schedule:", scheduleData);
   
    fetch('http://localhost:5000/schedule',{
      method:'POST',
      headers:{
       'content-type':'application/json'
     },
      body:JSON.stringify(scheduleData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      form.reset()
      if(data.insertedId){
        Swal.fire({
          title: "Good job!",
          text: "Your Schedule has been added!",
          icon: "success"
        });
      }
    })
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-300">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">Add Gym Schedule</h2>
        <form onSubmit={handleAddSchedule} className="grid grid-cols-2 gap-4">
          {/* Title */}
          <div className="col-span-1">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Title"
            />
          </div>

          {/* Date */}
          <div className="col-span-1">
            <label className="block font-semibold mb-1">Day</label>
            <DatePicker
              selected={startDate}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              onChange={(date) => setStartDate(date)}
            />
          </div>

          {/* Day */}
          <div className="col-span-1">
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
          <div className="col-span-1">
            <label className="block font-semibold mb-1">Time</label>
            <TimePicker
              onChange={setSelectTime}
              value={selectTime}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <button type="submit" className="w-full bg-pink-700 text-white py-2 rounded-md font-semibold hover:bg-pink-800 transition duration-200">
              Add Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
