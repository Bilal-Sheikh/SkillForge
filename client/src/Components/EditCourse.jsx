import { Card, Typography, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../config';
import Add_UpdateCourse from "./Add_UpdateCourse";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

function EditCourse() {

    const navigate = useNavigate();
    let { courseId } = useParams();
    const [course, setCourse] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/admin/courses/` + courseId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data);
            console.log(res.data);
        });
    }, [])

    return <div>
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
            }}>
            <Card style={{
                marginTop: "50px",
                width: "70%",
                padding: "20px",
                position: "relative"
            }}>
                <Typography textAlign={"left"} variant="h3"> {course.title}</Typography>
                <Button
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px"
                    }}
                    size="small"
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={async () => {
                        const response = await axios.delete(`${BASE_URL}/admin/courses/` + course._id, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        navigate("/admin/menu")
                        console.log(response.data);
                    }}>
                    Delete
                </Button>

                <Typography variant="subtitle1"> ID: {courseId}</Typography>
                <Typography variant="subtitle1"> Description: {course.description}</Typography>
                <Typography variant="subtitle1"> Price: {course.price}</Typography>
                <Typography variant="subtitle1"> Published: {String(course.published)}</Typography>
                <img src={course.imageLink} style={{ width: 300 }} ></img>
            </Card>
            <Card style={{ marginTop: "50px" }}>
                <Add_UpdateCourse
                    isUpdate={true}
                    courseId={courseId}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    published={course.published}
                    imageLink={course.imageLink} />
            </Card>
        </div>
    </div >
}

export default EditCourse;
