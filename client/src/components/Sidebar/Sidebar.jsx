import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div>
            <Link to="/diary">Diary</Link>
            <Link to="/today">Today</Link>
            <Link to="/stats">Stats</Link>
        </div>
    );
}
 
export default Sidebar;