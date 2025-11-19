// URL and Request Objects
/*
url: href, host, hostname, port, protocol, origin, pathname, hash, search, searchParams

request options: method, body, headers, cache

cache  (HTTP Cache, NOT Cache API)
- `default`: cache first, server request if stale, update cache if newer
- `reload`: always go to server AND update the cache
- `no-store`: always go to server but do not update the cache
- `no-cache`: make a conditional request to server and compare, update cache and use latest
- `force-cache`: only makes request if there is no HTTP Cache file
- `only-if-cache`: from cache or 504 gateway timeout error
Headers
- string | object literal | new Headers()
*/

const str =
  "http://127.0.0.1:5500/tasks/js/all-the-fetch-main/local-sample.json?attempt=123&other=hello";

export function getData() {
  // Pass an url string to URL constructor to create an URL obj and pass it to fetch
  const url = new URL(str);
  console.log(
    `Origin → ${url.origin},`,
    `Protocol → ${url.protocol},`,
    `Host → ${url.host},`,
    `Port → ${url.port},`,
    `Pathname → ${url.pathname}`
  );
  fetch(url).then((response) => console.log(response.status)); // output

  // Request() constructor can take url as string or obj, just like fetch()
  const request1 = new Request(str);
  fetch(request1).then((response) => console.log(response.status)); // output

  // Pass the url obj to Request() constructor, set options obj properties and pass to fetch, default method is GET (read), set HTTP cache to no-store so that cache don't get updated
  const request2 = new Request(url, {
    headers: { "x-steve": "hello" },
    method: "GET",
    cache: "no-store",
  });

  fetch(request2)
    .then((response) => {
      console.log(response.status); // output

      if (!response.ok) throw new Error("Invalid");

      return response.json();
    })
    .then((data) => {
      console.log(data); // output
    })
    .catch((err) => console.warn(err.message));
}

/* Output :
Origin → http://127.0.0.1:5500, Protocol → http:, Host → 127.0.0.1:5500, Port → 5500, Pathname → tasks/js/all-the-fetch-main/local-sample.json
200
200
200
{id: '681c63a3-35a2-4f1a-90e8-a101ecbb120f', name: 'Wade Wilson', email: 'ryan@vancity.org', tag: 'Maximum Effort'}
*/
