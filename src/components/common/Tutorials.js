import React from 'react'
import Video from './Video'


const Tutorials = () => {
  
  return (
    <div className="col">
    <div className="page-title-container mb-3">
    <div className="row">
    <div className="col mb-2">
    <h1 className="mb-2 pb-0 display-4" id="title">Tutorial Videos
    </h1>
    </div>
    </div>
    </div>
    
    <div className="row">
    <Video link={"https://www.youtube.com/watch?v=IzIk2YQVwRM"}/>
   
    <Video link={"https://www.youtube.com/watch?v=EnspRnEA4_c"}/>  
    
  
    <Video link={"https://www.youtube.com/watch?v=hDC9Pd3QnaY"}/>
   
   <Video link={"https://www.youtube.com/watch?v=hDC9Pd3QnaY"}/>  
   
   
   
   
    </div>
      </div>
  )
}

export default Tutorials