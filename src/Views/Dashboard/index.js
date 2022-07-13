import React, { useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/FirebaseConfig';
import { userGetData } from '../../redux/Slices/AuthSlice';

const Dashboard = () => {
    const dispatch = useDispatch()

    const Auth = useSelector(
        (state) => state.rootReducer.Auth
    );

    const getData = async () => {
        const docRef = query(collection(db, "users"), where("role", "==", "user"));
        const querySnapshot = await getDocs(docRef);
        const result = [];
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        });
        dispatch(userGetData(result))
    };

    useEffect(() => {
        const fetchData = (async () => {
            if (Auth && Auth.userData && Auth.userData.role === "user") {
                dispatch(userGetData([{ ...Auth.userData }]))
            }
            else if (Auth && Auth.userData && Auth.userData.role === "Admin") {
                getData()

            }
        })
        fetchData();
    }, []);

    return (
        <>
            {
                Auth?.userList?.length > 0 ? Auth?.userList?.map((details) => (
                    <>
                        <div>
                            name: {details?.name}
                        </div>
                        <div>
                            email: {details?.email}
                        </div>
                        <hr />
                    </>
                )) : (
                    <h2>No data found!</h2>
                )
            }
        </>
    )
}

export default Dashboard