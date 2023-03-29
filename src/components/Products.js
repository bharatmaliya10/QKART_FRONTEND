import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import {
    CircularProgress,
    Grid,
    InputAdornment,
    TextField,
    OutlinedInput
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";
import Cart from './Cart'



const Products = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [logged, setLogged] = useState(false);
    const [products, setProducts] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true)
    const [timerId, setTimerId] = useState(0)
    // const [cartItems, setCartItems] = useState([])

    // console.log(products);

    let username = localStorage.getItem('username')
    // let balance = localStorage.getItem('balance')
    let token = localStorage.getItem('token')
    // console.log(token)

    useEffect(() => {
        if (username) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [])

    useEffect(() => {
        debounceSearch(text, timerId);
    }, [text])

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





    const performAPICall = async (url) => {
        console.log(url);
        try {
            const response = await axios.get(url);
            setLoading(false);
            setProducts(response.data);
        }
        catch (error) {
            setProducts([]);
            console.log(error);
            setLoading(false);
        }
    };

    // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
    /**
     * Definition for search handler
     * This is the function that is called on adding new search keys
     *
     * @param {string} text
     *    Text user types in the search bar. To filter the displayed products based on this text.
     *
     * @returns { Array.<Product> }
     *      Array of objects with complete data on filtered set of products
     *
     * API endpoint - "GET /products/search?value=<search-query>"
     *
     */
    const performSearch = async (text) => {
        let url = `${config.endpoint}/products`

        if (text !== '') {
            url = `${config.endpoint}/products/search?value=${text}`
        }

        performAPICall(url);

    };
    // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
    /**
     * Definition for debounce handler
     * With debounce, this is the function to be called whenever the user types text in the searchbar field
     *
     * @param {{ target: { value: string } }} event
     *    JS event object emitted from the search input field
     *
     * @param {NodeJS.Timeout} debounceTimeout
     *    Timer id set for the previous debounce call
     *
     */
    const handleChange = (e) => {
        setText(e.target.value)
    }

    const debounceSearch = (event, debounceTimeout) => {
        if (timerId !== 0) {
            clearTimeout(debounceTimeout);
        }
        const timer = setTimeout(() => {
            performSearch(event);
        }, 600);
        setTimerId(timer);

    }

    /**
     * Perform the API call to fetch the user's cart and return the response
     *
     * @param {string} token - Authentication token returned on login
     *
     * @returns { Array.<{ productId: string, qty: number }> | null }
     *    The response JSON object
     *
     */
    const fetchCart = async (token) => {
        if (!token) return;
        let url = `${config.endpoint}/cart`
        try {
            // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
            const {data} = await axios.get(url, {
              headers:{
                Authorization: `Bearer ${token}`
              }
            })
            console.log(data)
        } catch (e) {
            if (e.response && e.response.status === 400) {
                enqueueSnackbar(e.response.data.message, { variant: "error" });
            } else {
                enqueueSnackbar(
                    "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
                    {
                        variant: "error",
                    }
                );
            }
            return null;
        }
    };

    // fetchCart(token);

    // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
    /**
     * Return if a product already is present in the cart
     *
     * @param { Array.<{ productId: String, quantity: Number }> } items
     *    Array of objects with productId and quantity of products in cart
     * @param { String } productId
     *    Id of a product to be checked
     *
     * @returns { Boolean }
     *    Whether a product of given "productId" exists in the "items" array
     *
     */
    const isItemInCart = (items, productId) => {
    };

    /**
     * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
     *
     * @param {string} token
     *    Authentication token returned on login
     * @param { Array.<{ productId: String, quantity: Number }> } items
     *    Array of objects with productId and quantity of products in cart
     * @param { Array.<Product> } products
     *    Array of objects with complete data on all available products
     * @param {string} productId
     *    ID of the product that is to be added or updated in cart
     * @param {number} qty
     *    How many of the product should be in the cart
     * @param {boolean} options
     *    If this function was triggered from the product card's "Add to Cart" button
     *
 
     */
    const addToCart = async (
        token,
        items,
        products,
        productId,
        qty,
        options = { preventDuplicate: false }
    ) => {  
      let url = `${config.endpoint}/cart`
      try{
        const {data} = await axios.post(url, 
          {"productId":"BW0jAAeDJmlZCF8i","qty":8},
           {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
      }catch(error){

      }

    };
    addToCart(token);

    return (
        <div>
           <Header hasHiddenAuthButtons={true}>
                <TextField sx={{ mx: 'auto', my: '1rem' }} className="search-desktop" id="outlined-search" placeholder="Search for items/categories" type="search"
                    value={text}
                    onChange={handleChange} />
                {
                    logged ?
                        <>
                            <Avatar alt={`${username}`} src="../assets/hero_image.png" />
                            {username}
                            <Button sx={{ ml: '1rem' }} role='button' className="button" variant="contained"
                                onClick={() => {
                                    localStorage.removeItem("username")
                                    localStorage.removeItem("balance")
                                    localStorage.removeItem("token")
                                    history.push("/login")
                                }}>
                                LOGOUT
                            </Button>
                        </>
                        :
                        <>
                            <Button sx={{ mr: '1rem' }} className="button" variant="contained" onClick={() => { history.push("/login") }}>
                                Login
                            </Button>
                            <Button className="button" variant="contained" onClick={() => { history.push("/register") }}>
                                Register
                            </Button>
                        </>
                }
            </Header>

            <Grid container spacing={2}>
                <Grid item className="product-grid">
                    <Box className="hero">
                        <p className="hero-heading">
                            India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                            to your door step
                        </p>
                    </Box>
                </Grid>
                {
                    loading ? <> <CircularProgress /><p>Loading Products</p>  </>
                        :
                        <Grid container spacing={2}>
                            {
                                products.length === 0 ? <Box>No Products Found</Box>
                                    :
                                    products.map((product) => {
                                        return (
                                            <Grid key={product._id} item xs={6} md={3}>
                                                <ProductCard product={product} />
                                            </Grid>
                                        );
                                    })}
                        </Grid>
                }
                <Cart/>
            </Grid>
            <Footer />
        </div>
    );
};

export default Products;



//       <Header>

//       </Header>

//       <TextField
//         className="search-mobile"
//         size="small"
//         fullWidth
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <Search color="primary" />
//             </InputAdornment>
//           ),
//         }}
//         placeholder="Search for items/categories"
//         name="search"
//       />
//         {/* TODO: CRIO_TASK_MODULE_CART - Display the Cart component */}
//       <Footer />
//     </div>
//   );
// };

// export default Products;