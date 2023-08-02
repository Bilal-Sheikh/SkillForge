import { Typography, ListItem, ListItemButton, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import List from '@mui/material/List';
import { BASE_URL } from '../config';
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';


function ShowCoursesAdmin() {

    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState("")

    useEffect(() => {
        axios.get(`${BASE_URL}/admin/courses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourses(res.data.courses);
            // console.log(res.data.courses);
        });
    }, [])

    const filteredItems = useMemo(() => {
        return courses.filter(course => {
            // console.log(course.title);
            return course.title.toLowerCase().includes(query.toLowerCase())
        })
    }, [courses, query])
    // console.log("FILTERED", filteredItems);

    if (courses.length === 0)
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                <Typography variant={"h3"} marginBottom={70}>Please add some courses</Typography>
            </div>
        )

    return <div>

        <Grid container spacing={2} style={{ marginTop: '10px', paddingLeft: 60 }}>
            <Grid item>
                <Typography variant={"h6"}>Choose From {courses.length} Courses </Typography>
            </Grid>
            <Grid item lg={8}
                style={{
                    paddingLeft: 60
                }}>
                <TextField
                    style={{
                        backgroundColor: 'inherit',
                        width: '400px',
                        border: '1px solid',
                        borderRadius: '5px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>)
                    }}
                    value={query}
                    variant='standard'
                    onChange={e => setQuery(e.target.value)}
                />
            </Grid>
        </Grid>
        <List style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginBottom: 200
        }}>
            {filteredItems.map(title => {
                return <ListItem alignItems="flex-start" divider>
                    <CourseCards course={title} />
                </ListItem>
            })}
        </List>
    </div >
}

function CourseCards({ course }) {

    const courseId = course._id
    const navigate = useNavigate()

    return (
        <Grid container spacing={2} style={{ padding: "20px", }}>
            <Grid item xs={3} sm={12} md={12} lg={12}>
                <ListItemButton
                    onClick={() => {
                        navigate(`/admin/editcourse/` + courseId);
                    }}
                >
                    <a href={course.imageLink}>
                        <img
                            src={course.imageLink}
                            style={{
                                width: "250px",
                                height: "150px",
                                borderRadius: "20px",
                            }}
                        />
                    </a>
                    <div style={{ paddingLeft: '20px' }}>
                        <Typography variant="h5" style={{ marginBottom: '20px' }}>
                            <strong>{course.title}</strong>
                        </Typography>

                        <Typography variant="subtitle1">{course.description}</Typography>

                        <Typography variant="subtitle1" style={{ position: "absolute", right: "0", top: "0" }}>
                            Price: ${course.price}
                        </Typography>

                        <Typography variant="subtitle1"> Published: {String(course.published)}</Typography>
                    </div>
                </ListItemButton>
            </Grid>
        </Grid>
    )
}

export default ShowCoursesAdmin;