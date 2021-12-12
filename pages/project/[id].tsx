import {useEffect,useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import TaskCard from '../../components/TaskCard/Taskcard';
import Chat from '../../components/Chat/Chat';
import peopleType from '../../interfaces/peopleType';
import Member from '../../components/Member/Member'

const ProjectDetails:NextPage = () => {

    type taskType = {
        assignedTo: string,
        createdBy: string,
        description: string,
        name: string,
        isCompleted: boolean,
        _id: string,
        deadline: string
    }
    const taskDefaultValues:taskType = {
        assignedTo: '',
        createdBy: '',
        description: '',
        isCompleted: false,
        _id: '',
        name: '',
        deadline: ''
    }
    const [tasks,setTasks] = useState<taskType[]>([taskDefaultValues]);
    const router = useRouter()
    const {id} = router.query;
    async function fetchTasks(){
        console.log("id: ",id);
        await axios.get(`http://localhost:8080/room/one/${id}`,
        {
            headers: {
                'Authorization': "Bearer "+ localStorage.getItem('token') || "none",
                'Content-Type': 'application/json',
            }
        })
        .then(async(res:any)=>{
            console.log("assignTo",res.data);
            let data = res.data.tasks;
            data = await data.map((task:any)=>{
                return {...task, assignedTo: task.assignedTo.peopleId.username}
            })
            setTasks(data)
            
        })
        .catch((error)=>{
            console.log(error.message);
        });

    }
    useEffect(()=>{   
        fetchTasks();
	 },[id]);
    return (
        <div className="container-fluid">
            <div className="row justify-content">
                <div className="col-md-3">
                    Nav
                    <Member/>
                </div>
                <div className="col-md-7">
                    Chat
                    <Chat/>
                </div>
                <div className="col-md-2">
                    <h1>Tasks</h1>
                    {
                        tasks.map((task)=>(
                            <TaskCard 
                                key={task._id}
                                name={task.name}
                                description={task.description}
                                assignTo={task.assignedTo}
                                deadline={task.deadline}
                                isCompleted={task.isCompleted}
                            />
                        ))
                    }
                    
                    
                </div>
                
            </div>
        </div>
    )
}

export default ProjectDetails;