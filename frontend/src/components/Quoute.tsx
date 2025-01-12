import gif from "../assets/img/background.gif"

export const Quote = ()=>{
    return(
    <div className="bg-slate-300 h-screen flex justify-center flex-col ">
        <div className="flex justify-center">
            <div className="max-w-lg ">
                <div className="">
                    <img src={gif}></img>
                </div>
                <div className="text-5xl font-semibold font-serif subpixel-antialiased italic text-center pb-20">
                "Reinvent Blogging for better"
                </div>
                <div className="max-w-md text-left text-xl font-serif subpixel-antialiased mt-4">
                
                </div>
                <div className="max-w-md text-left text-sm font-serif subpixel-antialiased text-slate-500 pb-38">
                  
                </div>
            </div>
            
        </div>
       
    </div>
    )
}