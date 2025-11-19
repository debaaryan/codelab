// using async and await instead of fetch().then().then().catch() chaining
// still needs error handling with try..catch
const url = "https://jsonplaceholder.typicode.com/users";

export async function getData() {
  try {
    let response = await fetch(url);
    console.log(response);

    if (!response.ok) throw new Error("Not a valid response");

    let dataObj = await response.json();
    console.log(dataObj);
  } catch (err) {
    console.warn(err.message);
  }
}
