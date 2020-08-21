const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers.js')
const xss = require('xss')


const serializePost = (post) => ({
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
    });

describe('Posts Endpoints', () => {
    let db

    const {
        testUsers,
        testPosts,
    } = helpers.makePostsFixtures()

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe('GET /api/drinks', () => {
        context(`Given no drinks`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )
            it(`responds with 200 and an empty list`, () => {
                const validUser = testUsers[0]
                return supertest(app)
                    .get(`/api/drinks`)
                    .set('Authorization', helpers.makeAuthHeader(validUser))
                    .expect(200, [])
            })
        })

        context('Given there are posts in the database', () => {
            beforeEach('insert posts', () =>
                helpers.seedPostsTables(
                    db,
                    testUsers,
                    testPosts
                )
            )
        })
    })
})