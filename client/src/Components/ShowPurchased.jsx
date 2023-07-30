import React, { useEffect } from 'react'
import { useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { BASE_URL } from '../config';
import axios from 'axios';

function ShowPurchased() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/user/purchasedCourses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourses(res.data.purchasedCourses);
            console.log(res.data.purchasedCourses);
        });
    }, [])

    if (courses.length === 0)
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                <Typography variant={"h3"} marginBottom={70}>Please buy some courses</Typography>
            </div>
        )

    return <div>
        <div style={{
            marginTop: '30px',
            marginLeft: '30px',
        }}>
            <Typography variant='h4'> <strong>Your Courses</strong> </Typography>
        </div>
        <List>
            {courses.map(course => {
                return <ListItem alignItems="flex-start" divider>
                    <PurchaseCourseCards course={course} />
                </ListItem>
            })}
        </List>
    </div>
}

function PurchaseCourseCards({ course }) {

    return (
        <div style={{ marginLeft: '30px', marginTop: '30px', }}>
            <ListItemText>
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

                <Typography variant='h5'> <strong>{course.title}</strong> </Typography>
                <Typography variant="subtitle1"> ID: {course._id}</Typography>

                <Typography
                    variant="subtitle1"
                    style={{
                        paddingRight: '200px',
                        paddingTop: '10px',
                        paddingBottom: '10px',
                    }}>
                    {course.description}
                </Typography>

                <Typography variant="subtitle1"> By -
                    {course.publishedBy[0].FirstName} {course.publishedBy[0].LastName}
                </Typography>
            </ListItemText>
        </div>
    )
}

export default ShowPurchased