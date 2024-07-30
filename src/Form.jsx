import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import customFetch from './utils';
import { toast } from 'react-toastify';

const Form = () => {
  const queryClient = useQueryClient()
  const [newItemName, setNewItemName] = useState('');

  const {mutate:createTask} = useMutation({
    mutationFn: (title)=> customFetch.post('/',{title}),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey : ['tasks']})
      toast.success('successfully created task')
      setNewItemName('')
    },
    onError:()=>{
      toast.error('error creating task')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask(newItemName)
  };
  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className='form-control'>
        <input
          type='text '
          className='form-input'
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type='submit' className='btn'>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
