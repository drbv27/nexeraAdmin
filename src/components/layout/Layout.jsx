import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = (props) => {
  return (
    <div >
        <Navbar />
        <div className='wrap'>
            <Sidebar />
            <div className='principal'>
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default Layout