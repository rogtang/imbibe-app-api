const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const xss = require("xss");

function makeUsersArray() {
    return [
      {
        id: 1,
        username: 'test-user-1',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        username: 'test-user-2',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 3,
        username: 'test-user-3',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 4,
        username: 'test-user-4',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }
  
  function makePostsArray(users) {
    return [
      {
        id: 1,
        iddrink: '11111',
        strdrink: "Margarita",
        strtags: null,
        strcategory: 'Classic',
    striba: "Contemporary Classics",
    strglass: "Cocktail glass",
    strinstructions:
      "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    strdrinkthumb:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    stringredient1: "Tequila",
    stringredient2: "Triple sec",
    stringredient3: "Lime juice",
    stringredient4: "Salt",
    stringredient5: null,
    stringredient6: null,
    stringredient7: null,
    strmeasure1: "1 1/2 oz ",
    strmeasure2: "1/2 oz ",
    strmeasure3: "1 oz ",
    strmeasure4: null,
    strmeasure5: null,
    strmeasure6: null,
    strmeasure7: null,
    usernotes: "Tastes better with a lime or lemon garnish",
    rating: '5',
    user_id: users[0].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        iddrink: '22222',
        strdrink: "Rum",
        strtags: null,
        strcategory: 'Classic',
    striba: "Contemporary Classics",
    strglass: "Cocktail glass",
    strinstructions:
      "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    strdrinkthumb:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    stringredient1: "Tequila",
    stringredient2: "Triple sec",
    stringredient3: "Lime juice",
    stringredient4: "Salt",
    stringredient5: null,
    stringredient6: null,
    stringredient7: null,
    strmeasure1: "1 1/2 oz ",
    strmeasure2: "1/2 oz ",
    strmeasure3: "1 oz ",
    strmeasure4: null,
    strmeasure5: null,
    strmeasure6: null,
    strmeasure7: null,
    usernotes: "Tastes better with a lime or lemon garnish",
    rating: '5',
    user_id: users[1].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 3,
        iddrink: '33333',
        strdrink: "Punch",
        strtags: "Classic",
        strcategory: 'Classic',
    striba: "Contemporary Classics",
    strglass: "Cocktail glass",
    strinstructions:
      "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    strdrinkthumb:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    stringredient1: "Tequila",
    stringredient2: "Triple sec",
    stringredient3: "Lime juice",
    stringredient4: "Salt",
    stringredient5: null,
    stringredient6: null,
    stringredient7: null,
    strmeasure1: "1 1/2 oz ",
    strmeasure2: "1/2 oz ",
    strmeasure3: "1 oz ",
    strmeasure4: null,
    strmeasure5: null,
    strmeasure6: null,
    strmeasure7: null,
    usernotes: "Tastes better with a lime or lemon garnish",
    rating: '5',
    user_id: users[2].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 4,
        iddrink: '44444',
        strdrink: "Vodka and Tonic",
        strtags: "Very Classic",
        strcategory: 'Classic',
    striba: "Contemporary Classics",
    strglass: "Cocktail glass",
    strinstructions:
      "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
    strdrinkthumb:
      "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    stringredient1: "Tequila",
    stringredient2: "Triple sec",
    stringredient3: "Lime juice",
    stringredient4: "Salt",
    stringredient5: "Lime",
    stringredient6: null,
    stringredient7: null,
    strmeasure1: "1 1/2 oz ",
    strmeasure2: "1/2 oz ",
    strmeasure3: "1 oz ",
    strmeasure4: null,
    strmeasure5: null,
    strmeasure6: null,
    strmeasure7: null,
    usernotes: "Tastes better with a lime or lemon garnish",
    rating: '5',
    user_id: users[3].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }

  
  function makeExpectedPost(users, post, comments=[]) {
    const user = users
      .find(user => user.id === post.user_id)
  
      return {
        serializePost(post) {
            return {
                id: post.id,
    idDrink: post.iddrink,
    strDrink: xss(post.strdrink),
    strTags: xss(post.strtags),
    strCategory: xss(post.strcategory),
    strIBA: xss(post.striba),
    strGlass: xss(post.strglass),
    strInstructions: xss(post.strinstructions),
    strDrinkThumb: xss(post.strdrinkthumb),
    strIngredient1: xss(post.stringredient1),
    strIngredient2: xss(post.stringredient2),
    strIngredient3: xss(post.stringredient3),
    strIngredient4: xss(post.stringredient4),
    strIngredient5: xss(post.stringredient5),
    strIngredient6: xss(post.stringredient6),
    strIngredient7: xss(post.stringredient7),
    strMeasure1: xss(post.strmeasure1),
    strMeasure2: xss(post.strmeasure2),
    strMeasure3: xss(post.strmeasure3),
    strMeasure4: xss(post.strmeasure4),
    strMeasure5: xss(post.strmeasure5),
    strMeasure6: xss(post.strmeasure6),
    strMeasure7: xss(post.strmeasure7),
    usernotes: xss(post.usernotes),
    rating: Number(post.rating),
    user_id: post.user_id
            }
        }
    }
}
  
  
  
  function makePostsFixtures() {
    const testUsers = makeUsersArray()
    const testPosts = makePostsArray(testUsers)
    return { testUsers, testPosts}
  }
  
  function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          imbibe_posts,
          imbibe_users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE imbibe_posts_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE imbibe_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('imbibe_posts_id_seq', 0)`),
          trx.raw(`SELECT setval('imbibe_users_id_seq', 0)`)
        ])
      )
    )
  }
  
  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('imbibe_users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('imbibe_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }
  
  function seedPostsTables(db, users, posts =[]) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
      await seedUsers(trx, users)
      await trx.into('imbibe_posts').insert(posts)
      // update the auto sequence to match the forced id values
      await trx.raw(
        `SELECT setval('imbibe_posts_id_seq', ?)`,
        [posts[posts.length - 1].id],
      )
    })
  }
  
  function seedMaliciousPost(db, user, post) {
    return seedUsers(db, [user])
      .then(() =>
        db
          .into('imbibe_posts')
          .insert([post])
      )
  }
  
  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: `${user.username}`,
      algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }
  
  module.exports = {
    makeUsersArray,
    makePostsArray,
    makeExpectedPost,
  
    makePostsFixtures,
    cleanTables,
    seedPostsTables,
    seedMaliciousPost,
    makeAuthHeader,
    seedUsers,
  }