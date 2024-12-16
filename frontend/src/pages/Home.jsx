import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import data from '../data';
import Card from "./Card";

function Home(){
  const [loggedInUser, setLoggedInUser]= useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(()=>{
      navigate('/login');
    },1000)
  }
 
  return(
    <div>
    <div>  <h1 className="m-3 text-2xl ">{loggedInUser}</h1> <button className="p-2 bg-red-400 hover:text-white m-4" onClick={handleLogout}>Log Out</button></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 ">
    {
      data.map((item)=>(
        <Card prop={item} key={item.id}/>
        
      ))
    }
    </div>
    </div>
  )
}
export default Home;