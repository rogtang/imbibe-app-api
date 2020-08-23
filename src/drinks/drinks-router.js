require('dotenv').config()
const path = require("path");
const express = require("express");
const xss = require("xss");
const fetch = require('node-fetch');
const DrinksService = require("./drinks-service");
const { requireAuth } = require("../middleware/jwt-auth");
const axios = require("axios");
const { RAPIDAPI_KEY } = require('../config')

const drinksRouter = express.Router();
const bodyParser = express.json();

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
  
  drinksRouter
    .route("/")
    //comment out while auth is not fully implemented
    .get(requireAuth, (req, res, next) => {
      const knexInstance = req.app.get("db");
      console.log(req.user)
      DrinksService.getByUser(knexInstance, req.user.id)
        .then((posts) => {
          res.json(posts.map(serializePost));
        })
        .catch(next);
    })
    /*.get((req, res, next) => {
        const knexInstance = req.app.get("db");
        console.log(req.user)
        DrinksService.getDrinks(knexInstance)
          .then((posts) => {
            res.json(posts.map(serializePost));
          })
          .catch(next);
      })*/
  /*  .post(requireAuth, bodyParser, (req, res, next) => {
      const {
        name,
        url,
        address,
        usernotes,
        price_rating,
        size_rating,
        location_rating,
      } = req.body;
  
      if (!name) {
        return res.status(400).send({
          error: { message: "'Name' is required" },
        });
      }
  
      if (!address) {
        return res.status(400).send({
          error: { message: "'Address' is required" },
        });
      }
  
      if (!price_rating) {
        return res.status(400).send({
          error: { message: "A price rating is required" },
        });
      }
  
      if (!size_rating) {
        return res.status(400).send({
          error: { message: "A size rating is required" },
        });
      }
  
      if (!location_rating) {
        return res.status(400).send({
          error: { message: "A location rating is required" },
        });
      }
  
      if ((url && !isWebUri(url))) {
        return res.status(400).send({
          error: { message: "'url' must be a valid URL"}
        })
      }
  
      const knexInstance = req.app.get("db");
      const newPost = {
        name,
        url,
        address,
        usernotes,
        price_rating,
        size_rating,
        location_rating
      };
  
      newPost.user_id = req.user.id;
  
      DrinksService.insertPost(knexInstance, newPost)
        .then((post) => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${post.id}`))
            .json(serializePost(post));
        })
        .catch(next);
    });
    */
  
  drinksRouter
    .route("/:post_id")
    .all(requireAuth)
    .all((req, res, next) => {
      DrinksService.getById(req.app.get("db"), req.params.post_id)
        .then((post) => {
          if (!post) {
            return res.status(404).json({
              error: { message: `That post doesn't exist` },
            });
          }
          res.post = post;
          next();
        })
        .catch(next);
    })
    .get((req, res, next) => {
      res.json(serializePost(res.post));
    })
    .delete((req, res, next) => {
      DrinksService.deletePost(req.app.get("db"), req.params.post_id)
        .then(numRowsAffected => {
          res.status(204).end();
        })
        .catch(next);
    })
    .patch(bodyParser, (req, res, next) => {
      const {
        usernotes,
        rating,
        user_id
      } = req.body;
  
      const postToUpdate = { 
        usernotes,
        rating,
        user_id
      }
  
      const numberOfValues = Object.values(postToUpdate).filter(Boolean).length
      if (numberOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must content either notes or a rating.`
          }
        })
  
      DrinksService.updatePost(
        req.app.get('db'),
        req.params.post_id,
        postToUpdate
      )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
    })
  
  
drinksRouter
    .route(`/search/:search_drink`)
    .all(requireAuth)
    .get((req, res, next) => {
    console.log(req.params.search_drink, "search drink name");
    let query = req.params.search_drink;
    //not working
    if (!query) {
      return res.status(400).send({
        error: { message: "Name of a drink is required" },
      });
    }
    console.log(query)

    //apikey not working in axios call
    const apikey = RAPIDAPI_KEY

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
    axios({
      "method":"GET",
      "url":"https://the-cocktail-db.p.rapidapi.com/search.php",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "02f452b098mshbeb1a53ff5f47a7p129c48jsnb1cb78d3a166",
      "useQueryString":true
      },"params":{
      "s":`${query}`
      }
      })
      .then((response)=>{
        const drink = response.data.drinks
        const knexInstance = req.app.get("db");
        const newDrink = {
            idDrink: drink[0].idDrink,
            strDrink: drink[0].strDrink,
            strTags: drink[0].strTags,
            strCategory: drink[0].strCategory,
            strIBA: drink[0].strIBA,
            strGlass: drink[0].strGlass,
            strInstructions: drink[0].strInstructions,
            strDrinkThumb: drink[0].strDrinkThumb,
            strIngredient1: drink[0].strIngredient1,
            strIngredient2: drink[0].strIngredient2,
            strIngredient3: drink[0].strIngredient3,
            strIngredient4: drink[0].strIngredient4,
            strIngredient5: drink[0].strIngredient5,
            strIngredient6: drink[0].strIngredient6,
            strIngredient7: drink[0].strIngredient7,
            strMeasure1: drink[0].strMeasure1,
            strMeasure2: drink[0].strMeasure2,
            strMeasure3: drink[0].strMeasure3,
            strMeasure4: drink[0].strMeasure4,
            strMeasure5: drink[0].strMeasure5,
            strMeasure6: drink[0].strMeasure6,
            strMeasure7: drink[0].strMeasure7,
        };
      //console.log(res)
      //newDrink.id = res.post.id
      newDrink.user_id = req.user.id;
      
      console.log('new drink is', newDrink)
      //use insertDrink, need to write condition that prevents idDrink from being used twice
      //unable to get post.id (shows as undefined)
      DrinksService.insertDrink(knexInstance, newDrink)
        .then((post) => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${post.id}`))
            .json(serializePost(post));
        })
        .catch(next);

      })
 /*     .then(numRowsAffected => {
        res.status(201).end()
      })*/
      .catch((error)=>{
        console.log(error)
      })
      
      
    })
    



module.exports = drinksRouter;