import React from "react";
import { MdDelete, MdDone, MdDoneAll, MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ScheduleTable = ({schedule,idx,scheduleData,setScheduleData}) => {
  console.log(scheduleData)
    const {_id,title,date,day,time}=schedule
    console.log(schedule)
  const isComplate = false;

  
      

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
  return (
    <>
      <tr >
        <td className="border-1 border-amber-300 p-3 text-center">{idx + 1}</td>
        <td className="border-1 border-amber-300 p-3 text-center">{title}</td>
        <td className="border-1 border-amber-300 p-3 text-center">{date}</td>
        <td className="border-1 border-amber-300 p-3 text-center">{day}</td>
        <td className="border-1 border-amber-300 p-3 text-center">{time}</td>
        <td className="border-1 border-amber-300 p-3 text-center">
          <div>
            {""}
            <button onClick={()=>handleDelete(_id)}>
              <MdDelete className="text-pink-500 text-2xl" />
            </button>
            <button>
              
              <Link to={`/update/${_id}`}>
              {""}
                <MdEditDocument className="text-pink-500 text-2xl" />
              </Link>
            </button>
            <button>
              {isComplate ? (
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
