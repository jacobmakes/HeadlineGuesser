const Feed = require('rss-to-json');

async function getfeed(){

    var rss = await Feed.load('https://www.express.co.uk/columnistsrss/40.278/alan-titchmarsh');
    let temp = JSON.stringify(rss, null, 3)
    output = JSON.parse(temp);
    console.log(output.items[3]);

    return output;

}
var eats = getfeed();

eats.then(worked,failed
);

function worked(res) {
    console.log(res)
    
};
function failed(err) {
    console.log(err)
    
};
