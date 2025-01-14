import { Appbar } from "../components/Appbar"
import gif from "../assets/img/background.gif"

export const Loading = () =>{


    return<div className="h-screen bg-[url('./assets/img/mainback3.png')] bg-auto bg-repeat">
    <div>
        <Appbar/>
    </div >
   
     <div className="h-screen flex items-center justify-center pb-40 ">
       
            <img src={gif} className="h-60 max-w-full rounded-lg filter grayscale "></img>
            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Getting things ready for you</figcaption>
        
    </div>
    </div>

}