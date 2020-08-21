const DrinksService = {
  getDrinks(knex) {
    return knex.select("*").from('imbibe_posts');
  },
  getById(knex, id){
    return knex.select('*').from('imbibe_posts').where('id', id).first()
},
  getByUser(knex, user_id) {
    return knex
      .select("*")
      .from("imbibe_posts")
      .where("imbibe_posts.user_id", user_id);
  },
  insertDrink(knex, newDrink) {
    console.log(newDrink);
    return knex
      .raw(
        `
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
            user_id
            )
		VALUES ('${newDrink.idDrink}', 
                '${newDrink.strDrink}',  
                '${newDrink.strTags}', 
                '${newDrink.strCategory}', 
                '${newDrink.strIBA}', 
                '${newDrink.strGlass}', 
                '${newDrink.strInstructions}', 
                '${newDrink.strDrinkThumb}', 
                '${newDrink.strIngredient1}', 
                '${newDrink.strIngredient2}', 
                '${newDrink.strIngredient3}', 
                '${newDrink.strIngredient4}', 
                '${newDrink.strIngredient5}',
                '${newDrink.strIngredient6}',
                '${newDrink.strIngredient7}', 
                '${newDrink.strMeasure1}',
                '${newDrink.strMeasure2}',
                '${newDrink.strMeasure3}',
                '${newDrink.strMeasure4}',
                '${newDrink.strMeasure5}',
                '${newDrink.strMeasure6}',
                '${newDrink.strMeasure7}',
                '${newDrink.user_id}'
				);
        `)
      .then((rows) => {
        return rows;
      });
  },
  insertPost(knex, newDrink) {
    console.log(newDrink)
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
