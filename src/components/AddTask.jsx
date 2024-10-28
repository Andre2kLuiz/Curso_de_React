import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");

    return(
        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
            <Input 
                type="text"
                placeholder="Digite o título da tarefa"
                value={text}
                onChange={(e) => setText(e.target.value)}>
            </Input>
            <Input 
                type="date" 
                placeholder="Digite a data da tarefa"
                value={day}
                onChange={(e) => setDay(e.target.value)}>    
            </Input>
            <button 
                onClick={() => {
                    if(!text.trim() || !day.trim()){
                        return alert("Preencha os campos!!!")
                    }
                    onAddTaskSubmit(text, day)
                    setText("");
                    setDay("");
                }}
                className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">Adiconar
            </button>
        </div>
    )
}

export default AddTask;