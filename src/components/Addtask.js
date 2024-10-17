import React, { useState } from 'react'

export const Addtask = () => {

    const [tasks, setTasks]= useState([])
    const [input, setInput]= useState("")

    const addtask= e =>{
        e.preventDefault();
        if(input !== ""){
        const newTask ={id: Date.now(), name:input}
        setTasks([ ...tasks, newTask]);
        console.log(input)
        setInput("")}
        

    }
    const changetask= e =>{
        let data= e.target.value;
        setInput(data)
    }
    const deletetask= id =>{
        let newlist = (tasks.filter(task=>task.id !== id))
        setTasks(newlist)
    }
  return (
    <div className='main'>
    <header className='header'>
        <h1>TO DO LIST</h1>
    </header>

    <section className='section1'>
        <input type='text'
               name='addInput' 
               placeholder='Add task here' 
               className='addInput'
               value={input}
               onChange={changetask}
               />  &nbsp;
        <input type='submit' value="ADD" onClick={addtask}/>
    </section>
    
    <section className='section2'>
        <h1>Do all this you fat ass!!</h1>

        <ol className='tasks'>
        {tasks.map((task)=>
        <li key={task.id} className='task-item'>
            {task.name} 
            <button onClick={()=>deletetask(task.id)}>X</button>
        </li>)}
        </ol>
    </section>
    </div>
  )
}
