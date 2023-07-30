import { Typography, Button, InputAdornment, InputLabel, FormControl, OutlinedInput } from '@mui/material';
import { useState, useEffect } from 'react';
import { BASE_URL } from '../config'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import CustomSnackbar from '../Features/CustomSnackbar';


function Add_UpdateCourse(props) {

    // Create a ref for CustomSnackbar
    const customSnackbarRef = useRef();

    const navigate = useNavigate()

    const CHARACTER_LIMIT = 200;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [published, setPublish] = useState(false);

    useEffect(() => {
        if (props.isUpdate) {
            setTitle(props.title || "");
            setDescription(props.description || "");
            setPrice(props.price || "");
            setImageLink(props.imageLink || "");
            setPublish(props.published || false);
        }
    }, [props.isUpdate, props.title, props.description, props.price, props.imageLink, props.published]);

    const handleChange = (e) => {
        const inputText = e.target.value;
        if (inputText.length <= CHARACTER_LIMIT) {
            setDescription(inputText);
        }
    };

    async function handleAddCourse() {
        const response = await axios.post(`${BASE_URL}/admin/courses`, {
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: published
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        customSnackbarRef.current.handleSnackbarOpen('success', 'Course Added Successfully')
        setTimeout(() => {
            navigate('/admin/menu')
        }, 1000)
    }

    async function handleUpdateCourse() {
        const response = await axios.put(`${BASE_URL}/admin/courses/` + props.courseId, {
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
            published: published
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        customSnackbarRef.current.handleSnackbarOpen('success', 'Course Updated Successfully')
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    return <div >

        {/* Pass the ref to CustomSnackbar */}
        <CustomSnackbar ref={customSnackbarRef} />

        <FormGroup style={{
            alignContent: "center",
            marginTop: 30,
            marginBottom: 75,
        }}>
            <Card style={{ width: "700px", padding: 20, }}>
                <Typography variant={"h6"}>
                    {props.isUpdate ? "Update Course" : "Add Course"}
                </Typography><br />
                <TextField style={{ width: "100%" }}
                    value={title}
                    id="title"
                    label="Title"
                    multiline
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <br /><br />
                <TextField style={{ width: "100%" }}
                    value={description}
                    id="description"
                    label="Description"
                    multiline
                    inputProps={{ maxLength: CHARACTER_LIMIT }}
                    helperText={`${description.length}/${CHARACTER_LIMIT}`}
                    onChange={handleChange}
                />
                <br /><br />
                <FormControl style={{ width: "100%" }}>
                    <InputLabel>Price</InputLabel>
                    <OutlinedInput
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="price"
                        value={price}
                        id="price"
                        onChange={(e) => { setPrice(e.target.value) }}
                    />
                </FormControl>
                <br /><br />
                <TextField style={{ width: "100%" }}
                    value={imageLink}
                    id="imageLink"
                    label="ImageLink"
                    multiline
                    rows={4}
                    onChange={(e) => { setImageLink(e.target.value) }}
                />
                <br /><br />
                <FormControlLabel
                    id='published'
                    checked={published}
                    required control={<Checkbox />}
                    label="Publish Now"
                    onChange={(e) => {
                        setPublish(e.target.checked)
                    }}
                />
                <br /><br />
                <Button
                    variant='contained'
                    onClick={() => {
                        { props.isUpdate ? handleUpdateCourse() : handleAddCourse() }
                    }}>
                    {props.isUpdate ? "Update Course" : "Add Course"}
                </Button>
            </Card>
        </FormGroup>
    </div>
}

export default Add_UpdateCourse;