const DrinksService = {
  getDrinks(knex) {
    return knex.select("*").from("imbibe_posts");
  },
  getById(knex, id) {
    return knex.select("*").from("imbibe_posts").where("id", id).first();
  },
  getByUser(knex, user_id) {
    return knex
      .select("*")
      .from("imbibe_posts")
      .where("imbibe_posts.user_id", user_id);
  },
  findDrink(knex, drink_id, user_id) {
    return knex
      .select("*")
      .from("imbibe_posts")
      .where("iddrink", drink_id)
      .where("user_id", user_id)
  },
  insertDrink(knex, newDrink) {
    console.log(newDrink);
    return knex("imbibe_posts")
      .returning('*')
      .insert({
        iddrink: newDrink.idDrink,
        strdrink: newDrink.strDrink,
        strtags: newDrink.strTags,
        strcategory: newDrink.strCategory,
        striba: newDrink.strIBA,
        strglass: newDrink.strGlass,
        strinstructions: newDrink.strInstructions,
        strdrinkthumb: newDrink.strDrinkThumb,
        stringredient1: newDrink.strIngredient1,
        stringredient2: newDrink.strIngredient2,
        stringredient3: newDrink.strIngredient3,
        stringredient4: newDrink.strIngredient4,
        stringredient5: newDrink.strIngredient5,
        stringredient6: newDrink.strIngredient6,
        stringredient7: newDrink.strIngredient7,
        strmeasure1: newDrink.strMeasure1,
        strmeasure2: newDrink.strMeasure2,
        strmeasure3: newDrink.strMeasure3,
        strmeasure4: newDrink.strMeasure4,
        strmeasure5: newDrink.strMeasure5,
        strmeasure6: newDrink.strMeasure6,
        strmeasure7: newDrink.strMeasure7,
        strvideo: newDrink.strVideo,
        user_id: newDrink.user_id,
      })

      .then((rows) => {
        return rows[0];
      });
  },
  insertPost(knex, newDrink) {
    return knex
      .insert(newDrink)
      .into("imbibe_posts")
      .returning("*")
      .then((array) => {
        return array[0];
      });
  },
  insertUserPost(knex, newPost) {
    return knex
      .insert(newPost)
      .into("imbibe_posts")
      .where("user_id", newPost.user_id)
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deletePost(knex, id) {
    return knex.from("imbibe_posts").where("id", id).delete();
  },
  updatePost(knex, id, newPostFields) {
    return knex.from("imbibe_posts").where({ id }).update(newPostFields);
  },
};

module.exports = DrinksService;
