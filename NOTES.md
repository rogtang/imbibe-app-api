test users:

('demo@demo.com', 'password123'),
    ('roger@roger.com', 'roger'),
    ('joe@mocha.com', 'joemocha');


TO FIX:
  - prevent duplicate entries (i.e. if a user searches the same drink twice should get an error)
  - implement fuzzy search? where?









//enter fetch here...
    /*const url = `https://the-cocktail-db.p.rapidapi.com/search.php?s=${query}`;
    console.log(url)
    const fetch_response = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
        "x-rapidapi-key": "02f452b098mshbeb1a53ff5f47a7p129c48jsnb1cb78d3a166",
        "Content-Type": "application/json",
      }
    });
    const json = await fetch_response.json();
    response.json(json);*/