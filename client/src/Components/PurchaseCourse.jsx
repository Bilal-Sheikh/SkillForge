import { Typography, Button, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from '../config';
import { useRef } from 'react';
import axios from "axios";
import SellIcon from '@mui/icons-material/Sell';
import DoneIcon from '@mui/icons-material/Done';
import CustomSnackbar from '../Features/CustomSnackbar';

function PurchaseCourse() {

    // Create a ref for CustomSnackbar
    const customSnackbarRef = useRef();

    const navigate = useNavigate()
    let { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [isPurchased, setIsPurchased] = useState(false);


    useEffect(() => {
        axios.get(`${BASE_URL}/user/courses/` + courseId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse(res.data);
            // console.log(res.data);
        });
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/user/purchasedCourses`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            //check if _id exist in the res.data.purchasedCourses
            res.data.purchasedCourses.forEach(element => {
                if (element._id === courseId) {
                    setIsPurchased(true);
                }
                // console.log(element._id);
            })
        })
    }, [isPurchased])


    const handlePaymentSuccess = async (data) => {
        const response = await axios.post(`${BASE_URL}/user/courses/` + course._id, {}, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        navigate(`/user/paymentsuccess?paymentID=${data.paymentID}&orderID=${data.orderID}`);
        // console.log(response.data);
    }

    const handleOpenRazorpay = (data) => {

        const KEY_ID = import.meta.env.VITE_RAZORPAY_API_KEY
        const options = {
            key: KEY_ID,
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            name: 'Online Course',
            description: 'Purchase Course',
            callback_url: `${BASE_URL}/user/verify`,
            handler: function (response) {
                // console.log(response, 'handler: function');
                axios.post(`${BASE_URL}/user/verify`, { response: response },
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(res => {
                        // console.log('VERIFY FE', res);
                        if (res.status === 200) {
                            handlePaymentSuccess(res.data);
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            }
        }
        const razor = new window.Razorpay(options);
        razor.open()
    }

    const handlePayment = async () => {

        const _data = { amount: 10 }
        await axios.post(`${BASE_URL}/user/orders`, _data, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(res => {
                // console.log("ORDER DATA", res.data);
                handleOpenRazorpay(res.data.order);
            })
            .catch(err => {
                // console.log(err);
            });
    }

    return <div>

        {/* Pass the ref to CustomSnackbar */}
        <CustomSnackbar ref={customSnackbarRef} />

        <div style={{
            marginTop: "50px",
            marginLeft: "150px",
            width: "70%",
            padding: "20px",
            position: "relative",
            marginBottom: 200
        }}>
            <img src={course.imageLink} style={{ width: 300, borderRadius: '30px' }} ></img>
            <Typography textAlign={"left"} variant="h3" style={{ marginTop: '30px' }}> {course.title}</Typography>
            <Typography variant="subtitle1"> ID: {courseId}</Typography>
            <Typography variant="subtitle1"> Description: {course.description}</Typography>
            <Typography variant="subtitle1"> Price: {course.price}</Typography>

            <Typography variant="subtitle1">
                By - {course.publishedBy && course.publishedBy[0]
                    ?
                    `${course.publishedBy[0].FirstName} ${course.publishedBy[0].LastName}`
                    :
                    "Unknown"}
            </Typography>

            {isPurchased ?
                <Button style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px"
                }}
                    size="small"
                    variant="contained"
                    startIcon={<DoneIcon />}
                    color='info'
                    onClick={() => {
                        navigate("/user/showpurchased")
                    }}>
                    {customSnackbarRef.current.handleSnackbarOpen('success', 'Already in Your Library')}
                    View in Library
                </Button>
                :
                <Button
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px"
                    }}
                    size="small"
                    variant="contained"
                    startIcon={<SellIcon />}
                    color='info'
                    onClick={() => handlePayment()}
                >
                    Purchase
                </Button>
            }
        </div>
    </div >
}

export default PurchaseCourse