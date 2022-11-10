import React, { useContext, useEffect, useState }  from "react";

const Api=`http://www.omdbapi.com/?apikey=e661bc9`;
const AppContext=React.createContext();
const AppProvider=({children})=>{
    const [isLoading,setIsLoading]=useState(true);
    const [movie,setMovie]=useState([]);
    const [isError,setIsError]=useState({show:"false",msg:""});
    const [query,setQuery]=useState("");
     const getMovies=async(url)=>{
         try{
             const res=await fetch(url);
             const data=await res.json();

             console.log(data);
             if(data.Response==="True"){
                setIsLoading(false);
                setMovie(data.Search);
                setIsError({
                    show:false,
                    msg:"",
                  });

             }
             else{
                  if(query==="")
                  {
                    setIsError({
                        show:false,
                        msg:"",
                      });
                      setMovie([]);
                      setIsLoading(false);
                  }
                  else{
                    setIsError({
                        show:true,
                        msg:"movie not found",
                      });
                      setMovie([]);
                  }
                  

             }
         }
         catch(error){
            console.log(error);
         }
     }
    useEffect(()=>{
      let timer=  setTimeout(()=>{
            getMovies(`${Api}&s=${query}`);
        },1000);

        return ()=>clearTimeout(timer);
    },[query]) ;
          
    return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>
              {children}
          </AppContext.Provider>;
};
const useGlobalContext=()=>{
    return useContext(AppContext);
}
export {AppContext,AppProvider,useGlobalContext};