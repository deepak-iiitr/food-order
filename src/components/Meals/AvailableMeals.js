
// import { useEffect } from 'react';
// import Card from '../UI/Card';
// import MealItem from './MealItem/MealItem';
// import classes from './AvailableMeals.module.css';

// // const DUMMY_MEALS = [
// //   {
// //     id: 'm1',
// //     name: 'Kesari Sabudana Khichdi',
// //     description: 'Healty...Sabudana...peanuts...chopped onion',
// //     price: 180,
// //   },
// //   {
// //     id: 'm2',
// //     name: 'Poha',
// //     description: 'Indian breakfast...flattened rice...onion...lemon juice...peanuts.',
// //     price: 35,
// //   },
// //   {
// //     id: 'm3',
// //     name: 'Salad',
// //     description: 'Green vegetables...carrot...tomato...cucumber...radish',
// //     price: 49,
// //   },
// //   {
// //     id: 'm4',
// //     name: 'Dal',
// //     description: 'Tuvar dal...onions...tomatoes...spices.',
// //     price: 109,
// //   },
// //   {
// //     id: 'm5',
// //     name: 'Mushroom Soup',
// //     description: 'Mushroom...Creamy...Healthy',
// //     price: 129,
// //   },
// //   {
// //     id: 'm6',
// //     name: 'Tomato Soup',
// //     description: 'Tomatoes...hot or cold...Healty',
// //     price: 99,
// //   },
// //   {
// //     id: 'm7',
// //     name: 'Palak Soup',
// //     description: 'Green...Palak...Healty',
// //     price: 89,
// //   },
// //   {
// //     id: 'm8',
// //     name: 'Coconut Water',
// //     description: 'fresh...packed...healty',
// //     price: 40,
// //   },
// //   {
// //     id: 'm9',
// //     name: 'Pomegranate Guice',
// //     description: 'Healthy...red...fresh',
// //     price: 90,
// //   },
// //   {
// //     id: 'm10',
// //     name: 'Lemon Water',
// //     description: 'Healthy...crystal clear...',
// //     price: 39,
// //   },
// //   {
// //     id: 'm11',
// //     name: 'Orange Guice',
// //     description: 'Healthy...and freshe oranges...',
// //     price: 70,
// //   },
// //   {
// //     id: 'm12',
// //     name: 'Moong Dal Khichdi',
// //     description: 'Healthy...Light dinner...Protein rich',
// //     price: 180,
// //   },
// //   {
// //     id: 'm13',
// //     name: 'Oats Idli',
// //     description: 'Healthy...Tasty...with wheat oats',
// //     price: 8,
// //   },
// //   {
// //     id: 'm14',
// //     name: 'Roasted Makhana',
// //     description: 'Healthy...and lightly fried in pure ghee...salted',
// //     price: 80,
// //   },
// //   {
// //     id: 'm15',
// //     name: 'Murmure/Puffed Rice',
// //     description: 'Healthy...and peanuts and lightly fried...',
// //     price: 49,
// //   },
// //   {
// //     id: 'm16',
// //     name: 'Tilgul Ladoos',
// //     description: 'Protein Rich...Til and Jaggery...',
// //     price: 250,
// //   },
// // ];

// const AvailableMeals = () => {
//   useEffect(()=>{
//     fetch('https://food-order-30501-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json').then(()=>{

//     });
//   },[])
//   fetch()
//   const mealsList = DUMMY_MEALS.map((meal) => (
//     <MealItem
//       key={meal.id}
//       id={meal.id}
//       name={meal.name}
//       description={meal.description}
//       price={meal.price}
//     />
//   ));

//   return (
//     <section className={classes.meals}>
//       <Card>
//         <ul>{mealsList}</ul>
//       </Card>
//     </section>
//   );
// };

// export default AvailableMeals;



import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-order-30501-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;