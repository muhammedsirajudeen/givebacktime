export default function Navbar(){
    //the live courses must sort through geographically and getting the course that is the nearest to u

    return (
        <div className="nav-bar-container">
            
            <div className="nav-item" id="nav-heading">Givebacktime.</div>
            <a href="/home" className="nav-item">Home</a>
            <a href="/courses" className="nav-item">Courses</a>
            <a href="/livecourses" className="nav-item">Live</a>
            <a href="/launch" className="nav-item">Launch</a>


        </div>
    )
}