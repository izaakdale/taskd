import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
// import {AiOutlinePlusCircle} from 'react-icons/ai'
// import {GoTriangleDown, GoTriangleRight} from 'react-icons/go'
import {Task, TaskCard} from '../components/Task'
import TaskCreator from '../components/TaskCreator';

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [formData, setFormData] = useState<Task>({id:"", name: "", description: ""})
  const {isAuthenticated, user, getAccessTokenSilently } = useAuth0()

  async function createTask() {
    if (isAuthenticated && user) {

      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
          // scope: `${import.meta.env.VITE_AUTH0_SCOPE}`, // leaving for if/when adding RBAC
        },
      });

      let resp: AxiosResponse<Task|undefined> = await axios.post(
        `http://taskd.com:8080/api/tasks?uid=${user.sub}`,
        formData,
        {headers: 
          {Authorization: `Bearer ${accessToken}`}
        }
      )
      if (resp.data) {
        let t: Task = {name: resp.data.name, description: resp.data.description, id: resp.data.id}
        setTasks((prevState) => (
          [...prevState, t]
        ))
      }
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onDelete(id: string) {
    if (isAuthenticated && user) {
      
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
          // scope: `${import.meta.env.VITE_AUTH0_SCOPE}`, // leaving for if/when adding RBAC
        },
      });

      /*let resp =*/ await axios.delete(`http://taskd.com:8080/api/tasks?uid=${user.sub}&tid=${id}`, 
      {headers: 
        {Authorization: `Bearer ${accessToken}`}
      })
      
      // let index = tasks.findIndex(d => d.id === id); //find index in your array
      // console.log(index);
      
      // console.log(tasks);
      
      // let newTasks = tasks.splice(index, 1);//remove element from array
      // console.log(newTasks);

      setTasks(tasks.filter((t) => t.id !== id))
    }
  }


  async function fetchUsersTasks() {
    if (isAuthenticated && user) {

      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
          // scope: `${import.meta.env.VITE_AUTH0_SCOPE}`, // leaving for if/when adding RBAC
        },
      });

      let resp = await axios.get(
        `http://taskd.com:8080/api/tasks?uid=${user.sub}`, 
        {headers: 
          {Authorization: `Bearer ${accessToken}`}
        })
      if (resp.status == 200) {
        setTasks(resp.data)
      }
    }
  }
  useEffect(() => {
    fetchUsersTasks()
  }, [])
  
  return (
    <>
      {isAuthenticated && user && (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row">

            <div className="w-[25%] bg-slate-700  bg-opacity-30 h-[92vh] border-r-2 border-slate-600 p-2">
              <TaskCreator onChange={onChange} createTask={createTask} />
            </div>

            <div className="w-[75%] text-center p-2">
              <h2 className='py-4'>Your Tasks</h2>
                <div className='sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                  {tasks && tasks.map((t, index) => {
                    return (
                      <div key={index}>
                        <TaskCard onDelete={onDelete} task={t}/>
                      </div>
                    )
                  })}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default withAuthenticationRequired(Tasks,{
  onRedirecting: () => <p>loading...</p>,
})
