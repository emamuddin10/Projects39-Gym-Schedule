import React from "react";
import { MdDelete, MdDone, MdDoneAll, MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ScheduleTable = ({schedule,idx,scheduleData,setScheduleData}) => {
  console.log('schedule',schedule)
    const {_id,title,date,day,time,isCompleted}=schedule


  const handleDelete = id =>{
    fetch(`http://localhost:5000/schedule/${id}`,{
      method:'DELETE'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(console.log(data))
      if(data.deletedCount){
        Swal.fire({
                  title: "Delete Data!",
                  text: "Your Data has been deleted !",
                  icon: "question"
                });
      }

      const afterDeleting = scheduleData?.filter((schedule)=> id !== schedule._id)
      setScheduleData(afterDeleting)
      console.log(scheduleData)
    })
  }
  const handleUpdateStatus = id =>{
    
    fetch(`http://localhost:5000/status/${id}`,{
      method:'PATCH'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(console.log(data))
      const newData = scheduleData.map((schedule)=> 
        schedule._id === id ? {...schedule,isCompleted:true}:schedule)

      if(data.deletedCount){
        Swal.fire({
                  title: "Modified Data!",
                  text: "This work is complated !",
                  icon: "success"
                });
      }
      setScheduleData(newData)

     
    })
  }
  return (
    <>
      <tr >
        <td className="border-1 border-slate-300 p-3 text-center">{idx + 1}</td>
        <td className="border-1 border-slate-300 p-3 text-center">{title}</td>
        <td className="border-1 border-slate-300 p-3 text-center">{date}</td>
        <td className="border-1 border-slate-300 p-3 text-center">{day}</td>
        <td className="border-1 border-slate-300 p-3 text-center">{time}</td>
        <td className="border-1 border-slate-300 p-3 text-center">
          <div className="flex gap-3">
            {""}
            <button className="bg-slate-100 p-2 rounded-lg" onClick={()=>handleDelete(_id)}>
              <MdDelete className="text-pink-500 text-2xl" />
            </button>
            <button className="bg-slate-100 p-2 rounded-lg">
              
              <Link to={`/update/${_id}`}>
              {""}
                <MdEditDocument className="text-pink-500 text-2xl" />
              </Link>
            </button>
            <button className="bg-slate-100 p-2 rounded-lg" onClick={()=>handleUpdateStatus(_id)}>
              {isCompleted ? (
                <MdDoneAll className="text-pink-500 text-2xl" />
              ) : (
                <MdDone className="text-pink-500 text-2xl" />
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
