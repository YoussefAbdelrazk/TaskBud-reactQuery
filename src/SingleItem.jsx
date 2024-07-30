import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "./utils";

const SingleItem = ({ item }) => {

    const queryClient= useQueryClient()
  const {mutate:editTask}=useMutation({
    mutationFn:({Taskid,isDone})=> customFetch.patch(`/${Taskid}`,{isDone}),

    onSuccess:()=> {
      queryClient.invalidateQueries({queryKey : ['tasks']})
    }
  })


  const {mutate:deleteTask}=useMutation({
    mutationFn:(taskid)=> customFetch.delete(`/${taskid}`),

    onSuccess:()=> {
      queryClient.invalidateQueries({queryKey : ['tasks']})
    }
  })

  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({Taskid: item.id, isDone:!item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        onClick={() => deleteTask(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
