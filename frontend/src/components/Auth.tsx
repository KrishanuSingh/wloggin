import logo from "../assets/img/logo.png";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { SignupInput} from "@krishanusingh/validcheck2"
import axios from "axios"
import { BACKEND_URL } from "../config";
export const Auth = ({type}: {type: "signup"|"signin"}) =>{
    const navigate =  useNavigate()
    const [postInputs, setpostInput] = useState<SignupInput>({
        name:"",
        email:"",
        password:"",


    })

    async function sendRequest(){
        try{
        navigate("/loading")
       const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup"? "signup" : "signin"}`, postInputs);
       const jwt = response.data.token;
       const UserName = response.data.Username
       localStorage.setItem("token", jwt);
       localStorage.setItem("Username",UserName)
       navigate("/blog")
        }catch(e){
            console.log(e);
            alert("error while signing in");
            navigate("/signin");
        }
    }

    return <div className=" h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="px-12">
                <div className="flex justify-center pb-2">
                    <img src={logo} className="w-16 h-16"></img>
                </div>
                <div className="text-4xl font-extrabold">
                    Create an account
                </div>
                <div className="text-slate-400 pl-10">
                   {type === "signin" ? "Dont Have an account?":"Already have an account?"}
                    <Link className="pl-2 underline mt-2" to ={type === "signin" ? "/signup" : "/signin" }>{type === "signin"? "Sign Up" : "Sign In"}</Link>
                </div>
            
            <div className="pt-8">
            {type ===  "signup"? <LabelledInput label="Name" placeholder="Name" onChange={(e)=>{
                setpostInput({
                    ...postInputs,
                    name: e.target.value
                })
            }}/>: null}
            <LabelledInput label="Username" placeholder="abc@123.com" onChange={(e)=>{
                setpostInput({
                    ...postInputs,
                    email: e.target.value
                })
            }}/>
            <LabelledInput label="Password" type = {"password"}placeholder="password" onChange={(e)=>{
                setpostInput({
                    ...postInputs,
                    password: e.target.value
                })
            }}/>
            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 w-full">{type === "signup"? "Sign up" : "Sign in"}</button>
            </div>
        </div>
    </div>
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder:string;
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void;
    type?: string
}

function LabelledInput({label, placeholder, onChange,type}: LabelledInputType){
    return <div>
        <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-black mt-2">{label}</label>
            <input onChange={onChange} type = {type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}