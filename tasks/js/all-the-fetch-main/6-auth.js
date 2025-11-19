// API Keys, Authorization, Credentials, Content-Security-Policy
export function getData() {
  //What is an API Key
  //Where can we pass it to the server - querystring, headers, cookies
  //controlling when cookies and credentials are passed to a server
  //CSP meta tags and headers

  let str = "http://127.0.0.1:3000/?name=value&steve=griffith";
  let url = new URL(str);
  let sp = url.searchParams; // { 'name' => 'value', 'steve' => 'griffith' }

  // sp.append("hello", "world");
  sp.append("api-key", "kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh");
  // document.cookie('')

  let h = new Headers();
  // h.append('content-type', 'application/json')
  // h.append('origin', 'https://cia.org')
  h.append("x-api-key", "kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh"); //API key
  // h.append("Authorization", "Bearer kajshdfkahjsdfkjhsdfkahsdfkjksdjhfksjdh"); //JWT
  //Forbidden Header Names

  let request = new Request(url, {
    method: "POST",
    headers: h,
    cache: "default",
    // "same-origin", "omit" cause no problem but "include" blocks cross-origin preflight requests
    credentials: "same-origin",
  });

  fetch(request)
    .then((response) => {
      if (!response.ok) throw new Error("invalid");
      // We know port 3000 will return text, so to process response body, text() is needed
      return response.text();
    })
    .then((txt) => {
      console.log(txt);
    })
    .catch(console.warn);
}
