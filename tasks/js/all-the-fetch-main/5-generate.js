// Create Webpage content from fetch results
// String Urls pointing to files
const jsonStr = "https://random-data-api.com/api/v2/users?size=10";
const textStr = "http://127.0.0.1:3000/";
const imgStr = "https://picsum.photos/id/237/300/200";

export function getData() {
  let list = document.getElementById("list"); // the <ul>
  let header = document.querySelector("header"); // the <header>
  let img = document.getElementById("pic"); // the <img>

  // Fetch the JSON and display it in the list, most useful
  fetch(jsonStr)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      return response.json();
    })
    .then((dataArray) => {
      console.log(dataArray); // output
      // Replace the list in html with the new list created from dataArray obj returned by json()
      list.innerHTML = dataArray
        .map(({ uid, first_name, last_name }) => {
          return `<li class="listitem" data-uid="${uid}">
            <p>${first_name}</p>
            <p>${last_name}</p>
          </li>`;
        })
        .join("");
    })
    .catch(console.warn);

  // Fetch the text and display it in the header
  fetch(textStr)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      return response.text();
    })
    .then((txt) => {
      header.innerHTML += `<h2>${txt}</h2>`;
    })
    .catch(console.warn);

  // Fetch the image and display it on page by replacing an existing image
  fetch(imgStr)
    .then((resp) => {
      if (!resp.ok) throw new Error("invalid");
      return resp.blob();
    })
    .then((blob) => {
      let url = URL.createObjectURL(blob);
      console.log(url); // output
      img.src = url;
    })
    .catch(console.warn);
}

/* Output :
------------ On Page
Hello World!
List of first_name and last_name of 10 users

------------ In Console
(10) [
{id: 6682, uid: 'f8340d33-11ed-4acf-b124-a340bb94b9f2', password: 'zLKBXHDROr', first_name: 'Art', last_name: 'Zieme', …},
{id: 3151, uid: '49ab9c40-d02d-4fa8-a4d6-99a52e5d18d4', password: 'O8Zy7qSNJe', first_name: 'Miesha', last_name: 'Murazik', …},
{id: 6028, uid: 'f7b79c3c-9b4a-4cfb-8e05-cad9548a213e', password: 'm2EUDMZRKW', first_name: 'Von', last_name: 'Feest', …},
{id: 2032, uid: '1137f279-6594-4dff-aa99-6ecaf66071cd', password: 'yv5Uj1cWha', first_name: 'Florentino', last_name: 'Cremin', …},
{id: 2785, uid: 'efb362c4-2261-46db-8504-f69d89a88b76', password: 'Tg1bSrs8R3', first_name: 'Shenita', last_name: 'Weimann', …},
{id: 3010, uid: 'a6a31d9c-5bab-433d-a337-5bbe6ec231b7', password: 'E6dNf4Vl0r', first_name: 'Josiah', last_name: 'Parisian', …},
{id: 4629, uid: 'bb298578-22c9-4dbc-8958-7f860cef60bd', password: 'R7Zao08Sbh', first_name: 'Alonso', last_name: 'Kreiger', …},
{id: 5113, uid: 'ab1b10a1-f7e8-4742-b9d8-61573d5113e0', password: '8eHtYuyF5o', first_name: 'Shelba', last_name: 'Brown', …},
{id: 5638, uid: '0ca52816-ecc9-4722-a607-7bbe2b18f4f8', password: 'xCN8kh6PrE', first_name: 'Rosanne', last_name: 'Dare', …},
{id: 9198, uid: '168a35cf-b0cb-4b60-a431-ddfcd246e422', password: 'mU6zlebiCo', first_name: 'Marhta', last_name: 'Ruecker', …},
]

blob:http://127.0.0.1:5500/06dc5b2d-56a0-41a6-9a32-8bb87b48af79
*/
