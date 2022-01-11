//fetchig the required modules
const { response } = require('express')
const res = require('express/lib/response')
const request = require('request')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

//create csvWriter object to define csv file headers
const csvWriter = createCsvWriter({
    path: './data.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'description', title: 'DESCRIPTION'},
        {id: 'html_url', title: 'HTML_URL'},
        {id: 'watechers_count', title: 'WATCHERS COUNT'},
        {id: 'stargazers_count', title: 'STARGAZERS COUNT'},
        {id: 'forks_count', title: 'FORKS COUNT'}
    ]
});
 

//fetch object to define URL and header types and json data
const fetch= {url: 'https://api.github.com/search/repositories?q=is:public',
 headers: {
    "User-Agent" : "request"
  }, json: true
}

//callback function takes error and response as input
function callback(error, response)
{
  if(!error){
  
      //array to store the data
  let getData = [] ;
      
    //for loop to traverse through dataset
  response.body.items.forEach(item => {
    if( item.forks_count >= 100 & item.language == 'JavaScript'){
    console.log("---------------------------------------------------------")
    console.log("name: " +item.name)
    console.log("Description: " +item.description)
    console.log("HTML URL: " +item.html_url)
    console.log('Watchers count: ' +item.watchers_count)
    console.log("Stargazers count: " +item.stargazers_count)
    console.log("Forks Count: " +item.forks_count)
        
        //push data inside an array
    if(item.stargazers_count>200){
      dataArray = {name: item.name, description: item.description,
         html_url : item.html_url, watchers_count: item.watchers_count, 
         stargazers_count: item.stargazers_count, forks_count: item.forks_count}
      getData.push(dataArray)
    
    }
  }
  });
//writing into csv file
   if(data.length > 0){
    csvWriter.writeRecords(data)       
    .then(() => {
        console.log('...Done');
    });
  }else {
    console.log('no data to store')
  }
}else {
  console.log('Unable to connect with API')
}
}

//function caling
request(fetch, callback)


