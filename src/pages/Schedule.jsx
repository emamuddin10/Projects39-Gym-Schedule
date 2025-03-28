import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ScheduleTable from "./ScheduleTable";

const Schedule = () => {
    const loadedData = useLoaderData()
    const [scheduleData,setScheduleData]=useState(loadedData)
    const [search,setSearch]=useState(" ")
   
   useEffect(()=>{
    fetch(`http://localhost:5000/schedule?searchParams=${search}`)
    .then(res=> res.json())
    .then(data =>{
      console.log(data)
      setScheduleData(data)
    })
   },[search])
  return (
    <div className="flex justify-center items-center flex-col">
      <div>
        <input
         className="boder-2 border-pink-500 rounded-full outline-1 outline-pink-500 px-10 py-3 my-5 w-full"
          type="text"
          name="search"
          id=""
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div>
        <div>
           <table className="">
             <thead>
                <tr className="border-2 border-pink-500">
                    <th className="border-2 border-pink-500 px-10 py-3">Seriul</th>
                    <th className="border-2 border-pink-500 px-10 py-3">Title</th>
                    <th className="border-2 border-pink-500 px-10 py-3">Date</th>
                    <th className="border-2 border-pink-500 px-10 py-3">Day</th>
                    <th className="border-2 border-pink-500 px-10 py-3" >Time</th>
                    <th className="border-2 border-pink-500 px-10 py-3">Action</th>
                </tr>
             </thead>
             <tbody>
                 {
                    scheduleData.length===0 ? (<p>No Data Found</p>) : (
                       scheduleData.map((schedule,index) => <ScheduleTable
                        key={schedule._id} 
                        idx={index} 
                        schedule={schedule}
                        scheduleData={scheduleData}
                        setScheduleData={setScheduleData}
                        
                        >

                        </ScheduleTable>)
                    )
                 }
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
