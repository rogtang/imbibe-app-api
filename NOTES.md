test users:

('demo@demo.com', 'password123'),
    ('roger@roger.com', 'roger'),
    ('joe@mocha.com', 'joemocha');


TO FIX:
  - prevent duplicate entries (i.e. if a user searches the same drink twice should get an error)
  DONE - fix "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
  - is serializePost correct? response in postman is all empty strings but full data is in database per dbeaver
  - implement fuzzy search? where?
  - how to hid x-rapidapikey in env variables?








handleSubmit = e => {
    e.preventDefault()
    const {cocktail_name} = e.target
    const post = {
      cocktail_name: cocktail_name.value,
    }

    const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${query}`;
    console.log(url)
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "02f452b098mshbeb1a53ff5f47a7p129c48jsnb1cb78d3a166",
    "Content-Type": "application/json",
	}
})
.then(res => {
  if(!res.ok) {
    throw new Error('Sorry, cocktail could not be found in database. Please try another search.');
  }
  return res.json();
})
.then(response => {
	console.log(response.drinks[0]);
})
.catch(error => {
	console.log(error);
});