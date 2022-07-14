import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetData } from "../../redux/Slices/AuthSlice";
import { collection, getDocs, onSnapshot, query, where, getFirestore, setDoc, doc } from "firebase/firestore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Backdrop, Box, Button, Fade, Grid, Modal, TextField, Typography } from "@mui/material";
import { Visibility } from "@mui/icons-material";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [inputVal, setInputVal] = useState({ key: "", value: "" });

    const handleOpen = (details) => {
        setOpen(true)
        setSelectedUser(details)
    };

    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputVal({ ...inputVal, [name]: value });
    };

    const handleSubmit = async (id) => {
        const db = getFirestore();
        const q = query(collection(db, "users"), where("uid", "==", id));
        const docs = await getDocs(q);
        await setDoc(doc(db, "users", docs.docs[0].id), { ...docs.docs[0].data(), [inputVal.key]: inputVal.value })
        dispatch(userGetData([...Auth.userData, { ...docs.docs[0].data(), [inputVal.key]: inputVal.value }]));
    }

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    const dispatch = useDispatch();

    const Auth = useSelector((state) => state.rootReducer.Auth);

    useEffect(() => {
        const fetchData = async () => {
            if (Auth && Auth.userData && Auth.userData.role === "user") {
                dispatch(userGetData([{ ...Auth.userData }]));
            }
        };
        fetchData();
    }, []);

    const unsubscribeRef = React.useRef();

    const getChat = async () => {

        const db = getFirestore();


        const collectionRef = collection(db, "users");
        const q = query(
            collectionRef, where("role", "==", "user"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const result = [];
            snapshot.docs.map((doc) => {
                result.push(doc.data());
            });
            dispatch(userGetData(result))
        });

        unsubscribeRef.current = unsubscribe;
    };

    useEffect(() => {
        getChat();

        return () => {
            unsubscribeRef.current?.();
        };
    }, []);

    return (
        <>
            <Grid container spacing={3} sx={{ mt: 4, ml: 6 }}>
                <Grid item xs={6}>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            size="small"
                            aria-label="a dense table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="">Name</TableCell>
                                    <TableCell align="">Email</TableCell>
                                    {Auth.userData.role !== "user" && <TableCell align="">Actions</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Auth?.userList?.length > 0 ? (
                                    Auth?.userList?.map((details, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {details?.name}
                                            </TableCell>
                                            <TableCell align="">{details?.email}</TableCell>
                                            <TableCell align="">
                                                <Visibility
                                                    onClick={() => handleOpen(details)}
                                                    sx={{ cursor: "pointer" }}
                                                />
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={open}
                                                    onClose={handleClose}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={open}>
                                                        <Box sx={style}>
                                                            {
                                                                Object.entries(selectedUser).map((data) => (
                                                                    <Box key={data[0]}>
                                                                        <Typography component="span" sx={{ mr: 2 }}>{data[0].toUpperCase()}:</Typography>
                                                                        <Typography component="span">{data[1]}</Typography>
                                                                    </Box>
                                                                ))
                                                            }
                                                            <Box
                                                                component="form"
                                                                sx={{
                                                                    "& > :not(style)": {
                                                                        m: 1,
                                                                        mt: 1,
                                                                        width: "20ch",
                                                                    },
                                                                }}
                                                                noValidate
                                                                autoComplete="off"
                                                            >
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Key"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    name="key"
                                                                    value={inputVal.key}
                                                                    onChange={(e) => handleChange(e)}
                                                                />
                                                                <TextField
                                                                    id="outlined-basic"
                                                                    label="Value"
                                                                    variant="outlined"
                                                                    type="text"
                                                                    name="value"
                                                                    value={inputVal.value}
                                                                    onChange={(e) => handleChange(e)}
                                                                />
                                                            </Box>
                                                            <Button variant="contained" onClick={() => handleSubmit(details?.uid)} >
                                                                Submit
                                                            </Button>
                                                        </Box>
                                                    </Fade>
                                                </Modal>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <h2 sx={{ mt: 4, ml: 5 }}>No data found!</h2>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
