const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    data = await Category.findAll({ 
      include: [Product]
    });
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const data = await Category.findByPk(req.params.id, {
    include: [Product]
  })
  res.status(200).json(data);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then((category) => {
      if (!category) {
        res.status(400).json({ message: 'No category created!' });
        return;
      }
      res.status(200).json(category);
      // if there's category tags, we need to create pairings to bulk create in the categoryTag model
      
    });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  const data = await Category.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(data);
  // delete a category by its `id` value
});

module.exports = router;
