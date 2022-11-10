import React from 'react';
import { useGlobalContext } from './Context';

function Movies(){
    const {movie,isLoading}=useGlobalContext();
    if(isLoading){
        return(
            <div className=''>
                <div className='loading'>Loading...</div>
            </div>
        );
    }
    return(
        
         <section className='movie-page'>
            <div className='grid grid-4-col'>
            {movie.map((currmovie)=>{
                 const {imdbID,Title,Poster}=currmovie;
               
                
                   return  <div className='main'>
                      <div className='card'>
                        <div className='card-info'>
                            <h2>{Title}</h2>
                            <img src={Poster} alt={imdbID}/>
                        </div>
                       </div>
                     </div>
                    
                    
                
            })}
            </div>
         </section>
            
        
    );

}
export default Movies;