import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";
import {v4} from 'uuid';

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  // State(Estado)

  useEffect(() =>{
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    const fetchTasks = async () => {
      try{
      //Chamar API
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=10' , 
          {
          method: 'GET',
          }
        );

        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        //Pegar os dados que ela retorna
        const data = await response.json();

         // Mapeando os dados para a estrutura esperada
        const formattedData = data.map(task => ({
          id: task.id,
          text: task.title,
          day: "Sem data", // Valor padrão, ajuste conforme necessário
          reminder: task.completed,
        }));

        console.log(formattedData);
        
        // Armazenar/Perssistir dados no state
        setTasks(formattedData);
      } catch (error) {
        console.error("Erro ao buscar tarefas", error)
      }
    }
    fetchTasks();
  }, [])

function onTaskClick(taskId) {
  const newTasks = tasks.map(task => {
    if(task.id === taskId) {
      return {...task, reminder: !task.reminder}
    }
    return task
  });
  setTasks(newTasks);
}

function onDeleteClick(taskId){
  const newTasks = tasks.filter(task => task.id !== taskId);
  setTasks(newTasks);
}

function onAddTaskSubmit(text, day){
  const newTasks = {
    id: v4(),
    text: text,
    day: day,
    reminder: false,
  }
  setTasks([...tasks, newTasks])
}

  return (

    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteClick={onDeleteClick}/>
      </div>
    </div>
  );
}


export default App
