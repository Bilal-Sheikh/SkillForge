import { useParams } from "react-router-dom";
import ShowCoursesAdmin from './ShowCoursesAdmin';
import ShowCoursesUser from './ShowCoursesUser';

function Menu() {
    const { role } = useParams()

    return <div>
        <div>
            {role === "admin" && <ShowCoursesAdmin />}
            {role === "user" && <ShowCoursesUser />}
        </div>
    </div>
}
export default Menu;