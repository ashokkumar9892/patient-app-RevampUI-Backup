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
    <div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">Category 1</h3>
</div>
</div>
    <Video link={"https://www.youtube.com/watch?v=IzIk2YQVwRM"}/>
   
    <Video link={"https://www.youtube.com/watch?v=EnspRnEA4_c"}/>  
    <div className="card mb-3">
	<div className="card-header bg-primary pt-2 pb-2"> <h3 className="text-white mb-0">Category 2</h3>
</div>
</div>
  
    <Video link={"https://www.youtube.com/watch?v=hDC9Pd3QnaY"}/>
   
   <Video link={"https://www.youtube.com/watch?v=hDC9Pd3QnaY"}/>  
   
   
   
   
    </div>
      </div>
  )
}

export default Tutorials