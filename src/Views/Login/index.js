import React from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { db } from "../../firebase/FirebaseConfig";
import { addDoc, collection, doc, getDocs, query, setDoc, where } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { storeUserData } from "../../redux/Slices/AuthSlice";

const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
        marginTop: theme.spacing(2),
    },
}));

const BoxContainer = styled(Box)({
    paddingLeft: 500,
    paddingTop: 80,
    display: "inline-block",
    transform: "scale(0.9)",
});

const Login = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleAuthHandle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
            dispatch(storeUserData({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            }))
            navigate("/role");

        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

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
                            Sign in with Google
                        </Typography>
                        <form>
                            <Grid container spacing={3} sx={{ mt: 0 }}>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Button
                                                size="large"
                                                type="button"
                                                variant="contained"
                                                startIcon={<Google />}
                                                onClick={googleAuthHandle}
                                            ></Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </BoxContainer>
        </>
    );
};

export default Login;
