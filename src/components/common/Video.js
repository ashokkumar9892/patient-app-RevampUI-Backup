import React from 'react'
import YouTube from 'react-youtube';
import getVideoId from 'get-video-id';

const Video = ({link}) => {
    
    const { id } = getVideoId(link);
    
    const opts = {
        height: '100%',
        width: '200%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        }
    }
  return (
    <div className="col-xl-6">
   
   <div className="card mb-3">	
   
   <div className="card-body">
   <div className="row">
   <div className="col-xl-6">
   <div className="table-responsive-sm mb-0">
   <YouTube videoId={id} opts={opts}  />
   
   </div>
     
   
     
   </div>
     
   
   
   
   </div>
   
   </div>
     </div>
   </div>
  )
}

export default Video