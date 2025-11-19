// Uploading json string from code and image & json files from page in browser to a server

// Url/Endpoint where server is running
let endpoint = "http://127.0.0.1:3000/";

// Function to upload data to server
export function setData() {
  // Selecting the file pickers to get the uploaded file inputs
  const imgInput = document.getElementById("imgFile");
  const jsonInput = document.getElementById("jsonFile");
  // Listening the submit event on the form
  document.getElementById("myForm").addEventListener("submit", (ev) => {
    // Prevent default action after form submission ie. no sending data to action url, replacing current page with result from server
    ev.preventDefault();

    // Prepare Data to Set as Request body: Create a jsonString from the obj to be sent. Create a FormData obj from the form element with file pickers
    let obj = {
      id: 123,
      name: "steve",
    };
    let jsonstring = JSON.stringify(obj);

    // Creating FormData obj & Appending files to it
    // let fd = new FormData();
    // fd.append("imageFile", imgInput.files[0], imgInput.files[0].name);

    // Creating FormData obj using forms w file pickers
    let fd = new FormData(document.getElementById("myForm"));

    // Create a Request object with the endpoint, method, body and headers
    let request = new Request(endpoint, {
      method: "POST",
      // body: jsonString,
      body: fd,
      headers: {
        // "content-type": "application/json",
        "content-type": "multipart/form-data",
      },
    });

    fetch(request)
      .then((response) => {
        if (!response.ok) throw new Error("invalid");
        return response.text();
      })
      .then((txt) => {
        console.log(txt);
      })
      .catch(console.warn);
  });
}
