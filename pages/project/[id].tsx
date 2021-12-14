import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import TaskCard from '../../components/TaskCard/Taskcard';
import Chat from '../../components/Chat/Chat';
import peopleType from '../../interfaces/peopleType';
import Member from '../../components/Member/Member';
import CreateTask from '../../components/Member/CreateTask';
const ProjectDetails: NextPage = () => {
	type taskType = {
		assignedTo: string;
		createdBy: string;
		description: string;
		name: string;
		isCompleted: boolean;
		_id: string;
		deadline: string;
	};
	const taskDefaultValues: taskType = {
		assignedTo: '',
		createdBy: '',
		description: '',
		isCompleted: false,
		_id: '',
		name: '',
		deadline: '',
	};
	type peopleId = {
		email: string;
		username: string;
		_id: string;
	};
	type members = {};
	const peopleIdDefaults: peopleId = {
		email: '',
		username: '',
		_id: '',
	};
	const [member, setMember] = useState<peopleId[]>([peopleIdDefaults]);
	const [tasks, setTasks] = useState<taskType[]>([taskDefaultValues]);
	const router = useRouter();
	const { id } = router.query;
	async function fetchTasks() {
		console.log('id: ', id);
		await axios
			.get(`${process.env.API}/room/one/${id}`, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem('token') || 'none',
					'Content-Type': 'application/json',
				},
			})
			.then(async (res: any) => {
				console.log('assignTo', res.data);
				let dataTask = res.data.tasks;
				dataTask = dataTask.map((task: any) => {
					return {
						...task,
						assignedTo: task.assignedTo.peopleId.username,
					};
				});
				setTasks(dataTask);

				let dataMember = res.data.room.member.peoples;
				dataMember = dataMember.map((eachMember: any) => {
					return {
						...eachMember,
						member: eachMember.peopleId.username,
					};
					//console.log(eachMember.peopleId.username,"mem")
				});
				setMember(dataMember);
				//console.log(dataMember[0].peopleId.username,"dataMember");
			})
			.catch((error) => {
				console.log(error.message);
			});
	}
	useEffect(() => {
		fetchTasks();
		//console.log("Tasks")
	}, [id]);
	return (
		<div className='container-fluid'>
			<div className='row justify-content'>
				<div className='col-md-3'>
					Nav
					<Member members={member} />
				</div>
				<div className='col-md-7'>
					Chat
					<Chat />
				</div>
				<div className='col-md-2'>
					<h1>Tasks</h1>
					{tasks.map((task) => (
						<TaskCard
							key={task._id}
							name={task.name}
							description={task.description}
							assignTo={task.assignedTo}
							deadline={task.deadline}
							isCompleted={task.isCompleted}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

<<<<<<< HEAD
    }
    const peopleIdDefaults:peopleId = {
        email: '',
        username: '',
        _id: ''
    }
    const [member,setMember] = useState<peopleId[]>([peopleIdDefaults])
    const [tasks,setTasks] = useState<taskType[]>([taskDefaultValues]);
    const router = useRouter();
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
            let dataTask = res.data.tasks;
            dataTask = dataTask.map((task:any)=>{
                return {...task, assignedTo: task.assignedTo.peopleId.username}
            })
            setTasks(dataTask);

            let dataMember = res.data.room.member.peoples;
            dataMember = dataMember.map((eachMember:any)=>{
                return {...eachMember,member:eachMember.peopleId.username}
                //console.log(eachMember.peopleId.username,"mem")
            })
            setMember(dataMember);
            //console.log(dataMember[0].peopleId.username,"dataMember");
            
        })
        .catch((error)=>{
            console.log(error.message);
        });

    }
    useEffect(()=>{   
        fetchTasks();
        //console.log("Tasks")
	 });
    return (
        <div className="container-fluid chat">
            <div className="row justify-content">
                <div className="col-md-3 fixed">
                    
                    <div className="member">
                        <Member 
                        members={member}/>
                    </div>
                    
                </div>
                <div className="col-md-6">
                    
                    <Chat/>
                </div>
                <div className="col-md-3">
                    
                    {
                        tasks.map((task)=>(
                            <TaskCard 
                                key={task._id}
                                name={task.name}
                                description={task.description}
                                assignTo={task.assignedTo}
                                deadline={task.deadline}
                                isCompleted={task.isCompleted}
                                _id={task._id}
                            />
                        ))
                    }
                    
                    
                </div>
                
            </div>
        </div>
    )
}

export default ProjectDetails;
=======
export default ProjectDetails;
>>>>>>> e723520144f3b31931fc66ec96df3f1c476c1653
