import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import Button from "./Button";


function Tasks({ tasks, onTaskClick, onDeleteClick}) {
    const navigate = useNavigate()

    function onSeeDetailsClick(task){
        const query = new URLSearchParams();
        query.set("text", task.text);
        query.set("day", task.day);
        navigate(`/task?${query.toString()}`)
    }

    return (
        <div>
            <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
                {tasks.map((task) => (
                <li key={task.id} className="flex gap-2">
                    <button
                     onClick={() => onTaskClick(task.id)} className={`bg-slate-400 text-left w-full text-white p-2 rounded-md 
                     ${task.reminder && 'line-through'}`}>
                        {task.text}
                    </button>
                    
                    <Button onClick={() => onSeeDetailsClick(task)} >
                        <ChevronRightIcon />
                    </Button>
                    <Button onClick={() => onDeleteClick(task.id)} >
                        <TrashIcon />
                    </Button>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Tasks;