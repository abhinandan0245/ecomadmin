import React, { useState } from "react";

const generateTimeOptions = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(i.toString().padStart(2, "0"));
  }
  return hours;
};

const generateMinuteOptions = () => {
  const minutes = [];
  for (let i = 0; i < 60; i += 5) {
    minutes.push(i.toString().padStart(2, "0"));
  }
  return minutes;
};

const MultipleTimeSelect = () => {
  const [timeRanges, setTimeRanges] = useState([
    { id: Date.now(), startHour: "12", startMinute: "00", startPeriod: "AM", endHour: "12", endMinute: "00", endPeriod: "AM" },
  ]);

  const handleTimeChange = (id: number, field: string, value: string) => {
    setTimeRanges((prev) =>
      prev.map((range) => (range.id === id ? { ...range, [field]: value } : range))
    );
  };

  const addNewTimeRange = () => {
    setTimeRanges([
      ...timeRanges,
      { id: Date.now(), startHour: "12", startMinute: "00", startPeriod: "AM", endHour: "12", endMinute: "00", endPeriod: "AM" },
    ]);
  };

  const removeTimeRange = (id: number) => {
    setTimeRanges((prev) => prev.filter((range) => range.id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {timeRanges.map((range, index) => (
        <div key={range.id} className="flex gap-4 p-4 border rounded relative mb-2">
          {index > 0 && (
            <button
              onClick={() => removeTimeRange(range.id)}
              className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          )}
          {/* Start Time */}
          <div className="flex flex-col w-1/2">
            <span className="font-medium">Start Time</span>
            <div className="flex gap-2">
              <select
                value={range.startHour}
                onChange={(e) => handleTimeChange(range.id, "startHour", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                {generateTimeOptions().map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                value={range.startMinute}
                onChange={(e) => handleTimeChange(range.id, "startMinute", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                {generateMinuteOptions().map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select
                value={range.startPeriod}
                onChange={(e) => handleTimeChange(range.id, "startPeriod", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* End Time */}
          <div className="flex flex-col w-1/2">
            <span className="font-medium">End Time</span>
            <div className="flex gap-2">
              <select
                value={range.endHour}
                onChange={(e) => handleTimeChange(range.id, "endHour", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                {generateTimeOptions().map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>
              <select
                value={range.endMinute}
                onChange={(e) => handleTimeChange(range.id, "endMinute", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                {generateMinuteOptions().map((minute) => (
                  <option key={minute} value={minute}>{minute}</option>
                ))}
              </select>
              <select
                value={range.endPeriod}
                onChange={(e) => handleTimeChange(range.id, "endPeriod", e.target.value)}
                className="border rounded p-2 mt-1"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addNewTimeRange} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add More
      </button>
    </div>
  );
};

export default MultipleTimeSelect;
