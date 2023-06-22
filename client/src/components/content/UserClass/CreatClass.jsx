import React from 'react'
import "../UserClass/UserClass.css"
const CreatClass = () => {
  return (
    <div>
        <form className='form-class'>
            <input className='input-class' placeholder='nhap ten lop'/>
            <button className="btn-class">Creat</button>
        </form>
    </div>
  )
}

export default CreatClass