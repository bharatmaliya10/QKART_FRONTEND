import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({product,  handleAddToCart }) => {

  return (
    <Card className="card">
      <CardMedia
        component="img"
        alt={product.name}
        aria-label={product.name}
        image={product.image}
        role='img'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="div">
          ${product.cost}
        </Typography>
        <Rating
          name="simple-controlled"
          value={product.rating}
        />
      </CardContent>
      <CardActions>
      <Button className="button" variant="contained" >
      <AddShoppingCartOutlined />  ADD TO CART
      </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
