db.collection('quizzes').onSnapshot((snapshot) => {
    console.log(snapshot.docChanges());
})