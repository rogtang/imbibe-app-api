BEGIN;

TRUNCATE
  imbibe_posts,
  imbibe_users
  RESTART IDENTITY CASCADE;

INSERT INTO imbibe_users (username, password)
VALUES
    ('demo@demo.com', '$2a$12$HZ/fjbzxttUj0irTLdDXhefefVlcn2Myir7mlEF0FzoXWzr36wbyO'),
    ('roger@roger.com', '$2a$12$PqeTLzbDeLuSrG4UV6RtIuSaBIAB8Ak25QGVEP06D.N7K7boE/dlK'),
    ('joe@mocha.com', '$2a$12$W8RbWDtZ9IE0xajpcWqFHubk5R/GABjqBoWly82x2Dh6i/HZ2d67m');

INSERT INTO imbibe_posts (
    idDrink,
    strDrink,
    strTags,
    strCategory,
    strIBA,
    strGlass,
    strInstructions,
    strDrinkThumb,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    userNotes,
    rating,
    user_id)
VALUES
    ('11007', 'Margarita', 'IBA,ContemporaryClassic', 'Ordinary Drink', 'Contemporary Classics', 'Cocktail glass', 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg', 'Tequila', 'Triple sec', 'Lime juice', 'Salt', null, null, null, '1 1/2 oz', '1/2 oz', '1 oz', null, null, null, null, 'Delicious with anything.', '5', 1),
    ('11007', 'Margarita', 'IBA,ContemporaryClassic', 'Ordinary Drink', 'Contemporary Classics', 'Cocktail glass', 'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg', 'Tequila', 'Triple sec', 'Lime juice', 'Salt', null, null, null, '1 1/2 oz', '1/2 oz', '1 oz', null, null, null, null, 'Delicious with anything.', '5', 2),
    ('12460', 'Vodka And Tonic', null, 'Ordinary Drink', null, 'Highball glass', 'Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.', 'https://www.thecocktaildb.com/images/media/drink/lmj2yt1504820500.jpg', 'Vodka', 'Tonic water', null, null, null, null, null, '2 oz', null, null, null, null, null, null, 'Garnish with a lime', '3', 1),
    ('12460', 'Vodka And Tonic', null, 'Ordinary Drink', null, 'Highball glass', 'Pour vodka into a highball glass over ice cubes. Fill with tonic water, stir, and serve.', 'https://www.thecocktaildb.com/images/media/drink/lmj2yt1504820500.jpg', 'Vodka', 'Tonic water', null, null, null, null, null, '2 oz', null, null, null, null, null, null, 'Garnish with a lime', '3', 3),
    ('11462', 'Harvey Wallbanger', 'IBA,ContemporaryClassic', 'Ordinary Drink', 'Contemporary Classics', 'Collins glass', 'Stir the vodka and orange juice with ice in the glass, then float the Galliano on top. Garnish and serve.', 'https://www.thecocktaildb.com/images/media/drink/vg4bva1504369725.jpg', 'Vodka', 'Galliano', 'Orange Juice', null, null, null, null, '1 oz', '1/2 oz', '4 oz', null, null, null, null, 'Pretty disgusting. Never try this again', '1', 1),
    ('17196', 'Cosmopolitan', 'IBA,ContemporaryClassic', 'Cocktail', 'Contemporary Classics', 'Cocktail glass', 'Add all ingredients into cocktail shaker filled with ice. Shake well and double strain into large cocktail glass. Garnish with lime wheel.', 'https://www.thecocktaildb.com/images/media/drink/kpsajh1504368362.jpg', 'Absolut Citron', 'Lime juice', 'Cointreau', 'Cranberry Juice', null, null, null, '1 1/4 oz', '1/4 oz', '1/4 oz', '1/4 cup', null, null, null, 'Good when I am feeling classy and sophisticated', '4', 1);

COMMIT;