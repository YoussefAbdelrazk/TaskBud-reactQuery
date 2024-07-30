import {   useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import customFetch from './utils';

const Items = () => {

  const {isError, error , data ,isLoading} = useQuery({
    queryKey : ['tasks'],
    queryFn:async ()=>  await customFetch.get("/")
  })
  if(isLoading){
    return <p style={{marginTop:'1rem'}}> loading...</p>
  }
  if(isError){
    return <p style={{marginTop:'1rem'}}> there was an error ...</p>
  }

  return (
    <div className='items'>
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
