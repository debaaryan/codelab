// Multiple Requests In Sequence using then().then().then() chaining and At The Same Time using Promise.all()
const jsonStr = "https://random-data-api.com/api/v2/users?size=10";
const imgStr = "https://picsum.photos/id/237/3000/2000";

export function getData() {
  // Multiple Requests In Sequence using then().then().then() chaining
  let imgResponse;
  let jsonResponse;

  fetch(imgStr)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      console.log("Multiple Requests In Sequence");
      imgResponse = response.blob();
      return fetch(jsonStr);
    })
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      jsonResponse = response.json();
      return Promise.all([imgResponse, jsonResponse]);
    })
    .then(([blob, jsonData]) => {
      console.log(blob);
      console.log(jsonData);
    })
    .catch(console.warn);

  // ******************************
  // Multiple Requests At The Same Time using Promise.all()
  Promise.all([fetch(imgStr), fetch(jsonStr)])
    .then(([responseI, responseJ]) => {
      if (!responseI.ok || !responseJ.ok) throw new Error("invalid");
      console.log("Multiple Requests At The Same Time");
      const imgResponse2 = responseI.blob();
      const jsonResponse2 = responseJ.json();
      return Promise.all([imgResponse2, jsonResponse2]);
    })
    .then(([blob, jsonData]) => {
      console.log(blob);
      console.log(jsonData);
    })
    .catch(console.warn);
}

/*
Multiple Requests At The Same Time
Blob {size: 529800, type: ‘image/jpeg’}

(10) [{id: 9690, uid: e4833-a0…636, password: “ksafjdkjSDFA”…}, {id: 9690, uid: f0ac98-b9…335, password: “asda@jkAFDSA”…}, … {id: 4439, uid: d00c87-c3…485, password: “ntavHQXJGisd”…}]

Multiple Requests In Sequence
Blob {size: 529800, type: ‘image/jpeg’}

(10) [{id: 6235, uid: e4833-9c…b88, password: “9J6X1EtWjZ”…}, {id: 4012, uid: f0ac98-2e…786, password: “O7YfxRC1ey”…}, … {id: 8024, uid: 0ab726-4a…433, password: “rQtw2h09s8”…}]
*/
