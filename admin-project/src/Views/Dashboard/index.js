import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userGetData } from "../../redux/Slices/AuthSlice";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  getFirestore,
  setDoc,
  doc,
} from "firebase/firestore";

import DisplayData from "../../components/Basic/DisplayData.vue";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { applyVueInReact } from "veaury";

const UserData = applyVueInReact(DisplayData);

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [inputVal, setInputVal] = useState({ key: "", value: "" });

  const handleOpen = (details) => {
    setOpen(true);
    setSelectedUser(details);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal({ ...inputVal, [name]: value });
  };

  const handleSubmit = async (id) => {
    const db = getFirestore();
    const q = query(collection(db, "users"), where("uid", "==", id));
    const docs = await getDocs(q);
    await setDoc(doc(db, "users", docs.docs[0].id), {
      ...docs.docs[0].data(),
      [inputVal.key]: inputVal.value,
    });
    dispatch(
      userGetData([
        ...Auth.userData,
        { ...docs.docs[0].data(), [inputVal.key]: inputVal.value },
      ])
    );
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
    const q = query(collectionRef, where("role", "==", "user"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const result = [];
      snapshot.docs.map((doc) => {
        result.push(doc.data());
      });
      dispatch(userGetData(result));
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
                  <TableCell align="">Actions</TableCell>
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
      <Grid spacing={3} sx={{ mt: 4, mr: 88 }}>
        <Grid item xs={6}>
          <UserData userData={selectedUser} />
        </Grid>
        {Auth.userData.role !== "user" ? (
          <>
            <Grid item xs={6}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": {
                    m: 1,
                    mt: 1,
                    width: "20ch",
                    marginLeft: "70px",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <h3>Add new fields</h3>
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
                <Button
                  variant="contained"
                  onClick={() => handleSubmit(selectedUser.uid)}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </>
        ) : null}
      </Grid>
    </>
  );
};

export default Dashboard;
