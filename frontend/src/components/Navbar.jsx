import React from 'react'
import './css/Navbar.css';




function Navbar() {


  

  return (
    <div>
      <div className='nav'> 
      <div style={{marginRight:'5rem'}} className='navhead'>

      <a to='/' style={{textDecoration:'none',color: 'rgb(255,255,255)'}}> <h1 className='headerr'>Tomato Disease Classification</h1></a>
      </div>
      <div style={{marginRight:'5rem'}} className='list'>

      <ul>
        <a href="/signup" style={{textDecoration: 'none'}}><li>AboutUs</li></a>
      </ul>
      </div>

      
    </div>
    </div>
  )
}

export default Navbar
