
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import './index.css'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import {Blogs} from './pages/Blogs'
import { Publish } from './pages/Publish'
import {Loading} from './pages/Loading'




function App() {
  

  return (
    <>
      <BrowserRouter>
       <Routes>
          <Route path = '/signup' element = {<Signup/>} />
          <Route path = '/signin' element = {<Signin/>} />
          <Route path = '/blog/:id' element = {<Blog/>} />
          <Route path = '/blog' element = {<Blogs/>} />
          <Route path = '/publish' element = {<Publish/>} />
          <Route path = '/loading' element = {<Loading/>} />

       </Routes>
      </BrowserRouter>
    
    </>
      
  )
}

export default App
