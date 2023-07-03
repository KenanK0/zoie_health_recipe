# Zoie Health Recipe Challenge

Zoie Health Recipe Challenge is a dynamic and responsive web application built with React. It's designed to assist users in exploring various culinary delights. The application fetches its rich database of recipes from the Spoonacular API, which provides a free tier with a limited number of requests per day. users can search for recipes using particular ingredients, and view detailed instructions and ingredient lists for any chosen recipe.

## Live Demo

The application is hosted on Vercel and can be accessed via the following link: https://zoie-health-recipe.vercel.app/


## API Usage
This project uses the free tier of the Spoonacular API, which has a limit of a certain number of requests per day. Please note that excessive usage of the application might result in hitting this limit. If you're testing or extending this project, be mindful of the number of requests you're making.

## Features
The application includes the following features:

* Recipe Search: Users can search for recipes based on the ingredients they have on hand.
* Recipe Details: Users can access detailed information about a recipe, including cooking instructions and ingredient lists.
* Interactive Ingredient Checklist: Users can check off ingredients as they go along to keep track of what they've used.
* Cooking Progress Tracker: Users can also track their cooking progress by checking off completed steps.
## Built With
* React
* Material UI
* Spoonacular API
## How to run the project locally

1. Clone the project repository from GitHub by running the following command in your terminal:
```
git clone https://github.com/KenanK0/zoie_health_recipe.git
```

2. Navigate to the project directory:

```
cd zoie_health_recipe
```
3. Install the project dependencies:
```
yarn install
```

4. Start the project:

```
npm start
```
The application will start running on http://localhost:3000

## Project Structure

The application is modularized into various components for scalability and ease of maintenance. These components include drawers, headings, and cards, each responsible for rendering a specific part of the user interface.

The application is fully responsive and provides an optimal user experience across various screen sizes.

