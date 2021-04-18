console.log('hello');
const theboys = firebase.functions().httpsCallable('hollaback');
theboys('thin lizzy').then(result =>{
    console.log('6data', result.data);}
);

db.collection(paperclicked).where('title', "==",headlinelist[paper][count[paper]] ).doc().update(
    {correct:{otherpaper: firebase.firestore.FieldValue.increment(1)}}

)
.catch(function(error) {
  console.error('Error writing new message to guardian database', error);
})