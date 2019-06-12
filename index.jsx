const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());
products = [
  {
    id: 1,
    name: "Product One",
    description: "Product one sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  },
  {
    id: 2,
    name: "Product Two",
    description: "Product two sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  },
  {
    id: 3,
    name: "Product Three",
    description: "Product three sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  },
  {
    id: 4,
    name: "Product Four",
    description: "Product four sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  },
  {
    id: 5,
    name: "Product Five",
    description: "Product five sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  },
  {
    id: 6,
    name: "Product Six",
    description: "Product six sample description",
    imageUrl: "https://picsum.photos/200",
    value: 0
  }
];

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send("products Repository");
});

app.get("/api", (req, res) => {
  res.send("Please specify method");
});

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  let product = productExistance(req.params, res);
  res.send(product);
});

app.post("/api/products", (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(`Bad request: ${error.details[0].message}`);
    return;
  }
  const product = {
    id: products.length + 1,
    name: req.body.name
  };

  products.push(product);
  res.send(product);
});

app.put("/api/products/:id", (req, res) => {
  product = productExistance(req.params, res);
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(`Bad request: ${error.details[0].message}`);
    return;
  }

  product.name = req.body.name;
  res.send(product);
});

app.delete("/api/products/:id", (req, res) => {
  let product = productExistance(req.params, res);
  const index = products.indexOf(product);
  products.splice(index, 1);
  res.send(product);
});

function validateProduct(product) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(product, schema);
}

function productExistance(params, res) {
  let product = products.find(c => c.id === parseInt(params.id));
  if (!product)
    //404
    return res.status(404).send("product n ot found");
  return product;
}
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
