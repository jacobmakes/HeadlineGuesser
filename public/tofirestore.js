        // firebase.firestore().doc('/foo/bar').get().then(() => { });


        function strReplace(str){
            var newStr = str.replace(/\//g, ">");
        return newStr;}

let key = 'b7394067-8c77-4660-81f8-3272c44a957c';
 key = 'test'

const getguard = async () => {

    const base = 'https://content.guardianapis.com/search?order-by=newest&';
    const query = `api-key=${key}`;

    const response = await fetch(base+query);
    const data = await response.json();
    return data;

}
getguard().
    then(datagot)
    .catch(err => console.log(err));

function datagot(data) {
    const results = data.response.results


    //upload to database
results.forEach( (result) =>



      db.collection("guardian").doc(strReplace(result.id)).set(result)
      .catch(function(error) {
        console.error('Error writing new message to database', error);
      })
);


}

