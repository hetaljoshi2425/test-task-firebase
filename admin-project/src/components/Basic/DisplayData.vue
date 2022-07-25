<template>
    <div class="vue-component" id="app">
        <h3>User's data Users Id  : {{$attrs.userData.uid}}</h3>
        <ul>
            <li v-for="(item, key) in $attrs.userData">
                {{ key }} : {{ item }}
            </li>
        </ul>
    </div>
</template>
<script>


// export default {


//     data() {
//         return {
//             userInfo: null,
//         };
//     },
//     mounted() {

//         const docRef = collection(db, "users");
//         const snapshot = getDocs(docRef);
//         const result = snapshot.docs.map((doc) => doc.data());
//         console.log(result);
//         self = this;
//         const subjects = firebase.firestore().collection('users')
//         subjects.get().then(function (doc) {
//             doc.forEach(function (doc) {
//                 console.log(doc.data());
//             });
//         }).catch(function (error) {
//             console.log("Error getting document:", error);
//         });

// }

// }

// export default {

    

// // data() {
// //     return {
// //         miceList: [],
// //         isLoading: false
// //     }
// // },


// // mounted() {
// //     // Get mice on component mount
// //     // const db = getFirestore(firebase);

// //     // const q = query(collection(db, "users"));

// //     // const querySnapshot = getDocs(q);
// //     // querySnapshot.forEach((doc) => {
// //     //     // doc.data() is never undefined for query doc snapshots
// //     //     console.log(doc.id, " => ", doc.data());
// //     // });
// // // methods: {
// // //     getMice() {
// // //         this.isLoading = true

       
// // //     },
// // }
// };
</script>
<style scoped>

</style>
