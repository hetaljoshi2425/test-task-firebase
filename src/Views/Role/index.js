import { Box, Button, Card, CardContent, Grid, styled, Typography } from "@mui/material";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/FirebaseConfig";
import { storeUserData } from "../../redux/Slices/AuthSlice";


const BoxContainer = styled(Box)({
    paddingLeft: 500,
    paddingTop: 80,
    display: "inline-block",
    transform: "scale(0.9)",
});

const Role = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Auth = useSelector(
        (state) => state.rootReducer.Auth.userData
    );

    const userHandler = async (userType) => {
        const q = query(collection(db, "users"), where("uid", "==", Auth.uid));
        const docs = await getDocs(q);
        await setDoc(doc(db, "users", docs.docs[0].id), { ...Auth, role: userType });
        dispatch(storeUserData({
            ...Auth,
            role: userType
        }))
        navigate('/dashboard')
    }

    return (
        <>
            <BoxContainer>
                <Card
                    sx={{
                        maxWidth: 400,
                        border: "1px solid",
                    }}
                >
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            color="text.dark"
                        >
                            {`Hello ${Auth?.email && Auth?.email},
                                 this is the main screen To continue, please choose your account type`}
                        </Typography>
                    </CardContent>
                    <Grid container spacing={2} sx={{ mb: 2, ml: 2 }}>
                        <Grid item xs={4}>
                            <Button size="large" type="button" variant="contained" onClick={() => userHandler('user')}>
                                Simple User
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button size="large" type="button" variant="contained" onClick={() => userHandler('Admin')}>
                                Admin User
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </BoxContainer>
        </>
    );
};

export default Role;
