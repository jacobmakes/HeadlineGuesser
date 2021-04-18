const functions = require("firebase-functions");
const Feed = require('rss-to-json');
const fetch = require("node-fetch");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//







exports.hollaback = functions.https.onCall((data, context) => {
return 'hello darkness' +data;

});

exports.paperscraper = functions.https.onRequest((request, response) => {


  function strReplace(str){ //replace backslash
      var newStr = str.replace(/\//g, ">");
  return newStr;}

  function strReplaceM(str){ //get dailymail from title
    var newStr = str.replace(/https:\/\/www.dailymail.co.uk\//g, "");
return newStr;}

function strReplaceMT(str){ //REMOVE columist name from title
  var newStr = str.replace(/^([A-Z]|\s){1,30}:/g, "");
return newStr;}


  //GET FROM GUARDIAN

  let key = 'b7394067-8c77-4660-81f8-3272c44a957c';
  key = 'test'

  const getguard = async (pagenum) => {

    const base = 'https://content.guardianapis.com/search?order-by=newest&page=';
     pagenum = `${pagenum}`
    const query = `&api-key=${key}`;

    const response = await fetch(base+pagenum+query);
    const data = await response.json();
    return data;

}
for(pagenum=1; pagenum <2; pagenum++){
getguard(pagenum).
    then(datagot)
    .catch(err => console.log(err));}

function datagot(data) {
    const results = data.response.results
 

    functions.logger.info("output data", {structuredData: true});
    //upload to database
results.forEach( (result) =>{

  let rand1 = Math.floor(Math.random() * 2147483646) + 1;
  let rand2 = Math.floor(Math.random() * 2147483646) + 1;
  let rand3 = Math.floor(Math.random() * 2147483646) + 1;
  let rand4 = Math.floor(Math.random() * 2147483646) + 1;
  let rand5 = Math.floor(Math.random() * 2147483646) + 1;
  let rand6 = Math.floor(Math.random() * 2147483646) + 1;
  result = {...result,random: {random1: rand1,
    random2:rand2,
    random3:rand3,
    random4:rand4,         
    random5:rand5,
    random5:rand6,
}, title: result.webTitle

};

      admin.firestore().collection("guardian").doc(strReplace(result.id)).set(result)
      .catch(function(error) {
        console.error('Error writing new message to guardian database', error);
      })
    }
);


}
//get from mail

async function getfeed(){

  var rss = await Feed.load('https://www.dailymail.co.uk/home/index.rss');
  let temp = JSON.stringify(rss, null, 3)
  output = JSON.parse(temp);
  return output.items;

}
var gotfeed = getfeed();

gotfeed.then(worked,failed
);

function worked(res) {
    console.log('dailymail sucess')
 //Parse info and add to database

 const results = res //res is the list of news items
 response.send(results); //TODO: Just say complete

 functions.logger.info("list of news items got", {structuredData: true});
 //upload to database
results.forEach( (result) =>{

  let rand1 = Math.floor(Math.random() * 2147483646) + 1;
  let rand2 = Math.floor(Math.random() * 2147483646) + 1;
  let rand3 = Math.floor(Math.random() * 2147483646) + 1;
  let rand4 = Math.floor(Math.random() * 2147483646) + 1;
  let rand5 = Math.floor(Math.random() * 2147483646) + 1;
  let rand6 = Math.floor(Math.random() * 2147483646) + 1;
  result = {...result, random:{random1: rand1,
    random2:rand2,
    random3:rand3,
    random4:rand4,         
    random5:rand5,
    random5:rand6,
}};
  result.title = strReplaceMT(result.title);


 
   admin.firestore().collection("mail").doc(strReplace(strReplaceM(result.id))).set(result)
   .catch(function(error) {
     console.error('Error writing new message to database', error);
   })

  });

};
function failed(err) {
    console.log(err)
    
};






  functions.logger.info("Hello loggers!", {structuredData: true});
});


exports.randomupdate = functions.https.onRequest((request, response) => {

randomize('mail');
randomize('guardian')

 function randomize(paper){ admin.firestore().collection(paper).get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      let rand1 = Math.floor(Math.random() * 2147483646) + 1;
      let rand2 = Math.floor(Math.random() * 2147483646) + 1;
      let rand3 = Math.floor(Math.random() * 2147483646) + 1;
      let rand4 = Math.floor(Math.random() * 2147483646) + 1;
      let rand5 = Math.floor(Math.random() * 2147483646) + 1;
      let rand6 = Math.floor(Math.random() * 2147483646) + 1;
//update each document
      doc.ref.update({
        random: {random1: rand1,
                  random2:rand2,
                  random3:rand3,
                  random4:rand4,         
                  random5:rand5,
                  random6:rand6,
        }
    })
    .then(() => {
        console.log("Documents successfully updated with random!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: random", error);
    });


      
  });
  });
 }
  response.send('completed');

});