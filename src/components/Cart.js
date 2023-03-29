import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
let cartData = [
  {
    "productId": "BW0jAAeDJmlZCF8i",
    "qty": 8
  },
  {
    "productId": "TwMM4OAhmK0VQ93S",
    "qty": 4
  },
  {
    "productId": "v4sLtEcMpzabRyfx",
    "qty": 3
  }
]

let productsData = [
  {
    "name": "UNIFACTOR Mens Running Shoes",
    "category": "Fashion",
    "cost": 50,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/42d4d057-8704-4174-8d74-e5e9052677c6.png",
    "_id": "BW0jAAeDJmlZCF8i"
  },
  {
    "name": "YONEX Smash Badminton Racquet",
    "category": "Sports",
    "cost": 100,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/64b930f7-3c82-4a29-a433-dbc6f1493578.png",
    "_id": "KCRwjF7lN97HnEaY"
  },
  {
    "name": "Tan Leatherette Weekender Duffle",
    "category": "Fashion",
    "cost": 150,
    "rating": 4,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/ff071a1c-1099-48f9-9b03-f858ccc53832.png",
    "_id": "PmInA797xJhMIPti"
  },
  {
    "name": "The Minimalist Slim Leather Watch",
    "category": "Electronics",
    "cost": 60,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/5b478a4a-bf81-467c-964c-1881887799b7.png",
    "_id": "TwMM4OAhmK0VQ93S"
  },
  {
    "name": "Atomberg 1200mm BLDC motor",
    "category": "Home & Kitchen",
    "cost": 80,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/e8e0832c-8f16-4468-95a0-8aaed387a169.png",
    "_id": "a4sLtEcMpzabRyfx"
  },
  {
    "name": "Bonsai Spirit Tree Table Lamp",
    "category": "Home & Kitchen",
    "cost": 80,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/b49ee2dc-6458-42de-851d-b014ac24cd8e.png",
    "_id": "upLK9JbQ4rMhTwt4"
  },
  {
    "name": "Stylecon 9 Seater RHS Sofa Set ",
    "category": "Home & Kitchen",
    "cost": 650,
    "rating": 3,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/7ad56699-20c9-4778-a783-4021e5f0864c.png",
    "_id": "v4sLtEcMpzabRyf"
  },
  {
    "name": "Diamond Pendant (0.01 ct, IJ-SI)",
    "category": "Fashion",
    "cost": 1000,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/95d6d42d-3a37-4efb-ad10-3bcbbb599856.png",
    "_id": "v4sLtEcMpzabRyfx"
  },
  {
    "name": "Apple iPad Pro with Apple M1 chip",
    "category": "Electronics",
    "cost": 900,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/82ac2e7b-e4dd-4a5b-8dbc-3260225d7eb2.png",
    "_id": "w4sLtEcMpzabRyfx"
  },
  {
    "name": "OnePlus (55 inches) Q1 Series 4K",
    "category": "Electronics",
    "cost": 1200,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/a9ca1e8b-8783-4be3-83f8-d06409016e15.png",
    "_id": "x4sLtEcMpzabRyfx"
  },
  {
    "name": "Thinking, Fast and Slow",
    "category": "Books",
    "cost": 15,
    "rating": 5,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/cdb64440-5e95-4aaa-858b-8c12ee316d93.png",
    "_id": "y4sLtEcMpzabRyfx"
  },
  {
    "name": "GREY DOUBLE BUTTON BLAZER",
    "category": "Fashion",
    "cost": 75,
    "rating": 4,
    "image": "https://crio-directus-assets.s3.ap-south-1.amazonaws.com/869ec5e2-52d2-4b8e-bc6b-57eace9ab39e.png",
    "_id": "z4sLtEcMpzabRyfx"
  }
]

export const generateCartItemsFrom = (cartData, productsData) =>
  cartData.map((obj) => ({
    ...productsData.find((o) => (o._id === obj.productId) && o),
    ...obj
  }));

// console.log(generateCartItemsFrom (cartData, productsData));

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
let items = generateCartItemsFrom(cartData, productsData);

export const getTotalCartValue = (items = []) => {
  let totalvalueArray = []
  items.map(item => totalvalueArray.push(item.cost * item.qty));
  let totalCartValue = totalvalueArray.reduce(
    (acc, curr) => acc + curr,
    0
  );
  return totalCartValue;
};

console.log(getTotalCartValue(generateCartItemsFrom(cartData, productsData)));
/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({
  products,
  // items=[],
  handleQuantity,
}) => {
  console.log(items)
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {
          items.map((obj) => {
            return (

              <Box display="flex" alignItems="flex-start" padding="1rem">
                <Box className="image-container">
                  <img
                    // Add product image
                    src={obj.image}
                    // Add product name as alt eext
                    alt={obj.name}
                    width="100%"
                    height="100%"
                  />
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  height="6rem"
                  paddingX="1rem"
                >
                  <div>{obj.name}</div>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ItemQuantity
                      value={obj.qty}
                    />
                    <Box padding="0.5rem" fontWeight="700">
                      ${obj.cost}
                    </Box>
                  </Box>
                </Box>
              </Box>
            )
          })
        }
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
