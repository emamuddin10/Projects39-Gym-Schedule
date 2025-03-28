import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

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

const UpdateSchedule = () => {
  const { id } = useParams();
  const singleScheduleData = useLoaderData();

  // State setup
  const [title, setTitle] = useState(singleScheduleData?.title || "");
  const [startDate, setStartDate] = useState(new Date(singleScheduleData?.date || Date.now()));
  const [selectTime, setSelectTime] = useState(singleScheduleData?.time || "10:00");
  const [day, setDay] = useState(singleScheduleData?.day || "Sunday");

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    const formattedDate = startDate.toLocaleDateString("en-CA");
    const formattedTime = formatTime12Hour(selectTime);

    const updatedScheduleData = {
      title,
      date: formattedDate,
      day,
      time: formattedTime,
    };
    console.log(title)

    console.log("Updated Gym Schedule:", updatedScheduleData);

    fetch(`http://localhost:5000/schedule/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedScheduleData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Your schedule has been updated!",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "No Changes!",
            text: "No updates were made.",
            icon: "info",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating schedule:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong!",
          icon: "error",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-300">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-6">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule} className="grid grid-cols-2 gap-4">
          
          {/* Title */}
          <div className="col-span-1">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Title"
            />
          </div>

          {/* Date */}
          <div className="col-span-1">
            <label className="block font-semibold mb-1">Date</label>
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
              value={day}
              onChange={(e) => setDay(e.target.value)}
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
              Update Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
