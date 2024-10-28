import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
    const navigate = useNavigate()
    const [SearchParams] = useSearchParams();
    const text = SearchParams.get("text");
    const day = SearchParams.get("day");
    return(
        <div className="h-screen w-screen bg-slate-500 p-6">
            <div className="w-[500px] space-y-4">
                <div className="flex justify-center relative mb-6">
                    <button onClick={() => navigate(- 1)} className="absolute left-0 top-0 bottom-0 text-slate-100">
                        <ChevronLeftIcon />
                    </button>
                    <Title>Detalhes da tarefa</Title>
                </div>
                <div className="bg-slate-400 p-4 rounded-md">
                    <h1 className="text-xl text-white font-bold">{text}</h1>
                    <p className="text-white">{day}</p>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;