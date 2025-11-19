// 4-response.js
// String Urls pointing to files
const jsonStr = "http://127.0.0.1:5500/local-sample.json"; // json file
const imgStr = "https://picsum.photos/id/237/300/200"; // image file
const fontStr =
  "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Hw5aXp-p7K4KLg.woff2"; // font file
const htmlStr = "http://127.0.0.1:5500/"; //html file

export function getData() {
  // Fetch image file and handle the response
  fetch(imgStr)
    .then((resp) => {
      if (!resp.ok) throw new Error("invalid");
      // Use blob() while fetching image, video, audio, font files
      return resp.blob();

      // return resp.text(); // for text files like, html, css, js, xml
      // return resp.json(); // for json files
    })
    .then((blob) => {
      console.log(blob); // output

      // Create an object URL for the blob and use that URL to display the related image by replacing an already existing image on page
      let url = URL.createObjectURL(blob);
      console.log(url); // output

      let img = document.getElementById("pic");
      img.src = url; // output
    })
    .catch(console.warn);
}

/* Output :
Blob { size: 14060, type: "image/jpeg", [[Prototype]]: Blob }

blob:http://127.0.0.1:5500/8f2bc16b-226e-4751-a7e8-372ffb996d2d  (blob URL is temporary URL, changes with time)

Displays the blob image on the page
*/
