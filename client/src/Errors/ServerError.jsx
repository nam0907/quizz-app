import React from 'react'
import "./serverError.css"
const ServerError = () => {
  return (
    <div className='header-serverError'>
      {/* <div><img src='' width={500} height={500}/></div> */}
        <div>
          <div>
            <span>500</span>
            <span>Server Error</span>
          </div>
          <div>
            <span>OOPS, something went wrong</span>
          </div>
        </div>
    </div>
  )
}

export default ServerError