//the simplest fetch you can use and still have error handling
const url = "https://jsonplaceholder.typicode.com/users";

export function getData() {
  fetch(url)
    .then((resp) => {
      console.log(resp);
      // checking whether Http status code is in 200-299 range otherwise throw an error
      if (!resp.ok) throw new Error("Not a valid response");
      // json() method extracts JSON string from the readable stream in response obj's body and converts it into an object
      return resp.json();
    })
    .then((dataObj) => {
      // shows all the fetched user objs in an array
      console.log(dataObj);
    })
    .catch((err) => {
      console.warn(err.message);
    });

  //The code below will always fail because fetch is asynchronous, so the response is not available immediately. But we try to perform response.json() immediately
  // let response = fetch(url);
  // let dataObj = response.json();
  // console.log(dataObj);
}

/* Output :
Response { body: ReadableStream, bodyUsed: true, headers: Headers {}, ok: true, redirected: false, status: 200, statusText: "", type: "cors", url: "https://jsonplaceholder.typicode.com/users" }

 [
{id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}, 
{id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', address: {…}, …}, 
{…}, {…}, {…}, {…}, {…}, {…}, 
{id: 9, name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io', address: {…}, …}, 
{id: 10, name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.biz', address: {…}, …}
]
*/
