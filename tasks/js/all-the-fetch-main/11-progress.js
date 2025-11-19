// Measure the download progress of a file
const imgStr = "https://picsum.photos/id/237/3000/2000"; // Big image

export function getData() {
  // Download a big image and measure the progress of the download
  fetch(imgStr).then(async (response) => {
    // Create a reader to read the stream of data from the response body
    const reader = response.body.getReader();

    // Get the length (size) of the file
    const contentLength = +response.headers.get("content-length");

    // How much data so far
    let receivedLength = 0;
    let chunks = [];

    console.group("progress");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // Exit if no more data
      chunks.push(value);
      receivedLength += value.length;
      console.log(`Received ${receivedLength} of ${contentLength}`); // Output
    }
    console.groupEnd("progress");

    // Combine all the data chunks into single byteArray
    let byteArray = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      byteArray.set(chunk, position);
      position += chunk.length;
    }

    // For an image
    let blob = new Blob([byteArray], { type: "image/jpg" });
    let url = URL.createObjectURL(blob);
    let img = document.getElementById("pic");
    img.src = url;
    img.alt = imgStr;

    // If it were a text file we could use let txt = new TextDecoder('utf-8').decode(byteArray) and then JSON.parse if it was a JSON string
  });
}

/*
progress
Received 13500 of 529800
Received 15000 of 529800
Received 19500 of 529800
...
Received 100500 of 529800
Received 105000 of 529800
Received 112500 of 529800
...
Received 526500 of 529800
Received 528000 of 529800
Received 529800 of 529800

Image is displayed on page after the download is complete
 */
