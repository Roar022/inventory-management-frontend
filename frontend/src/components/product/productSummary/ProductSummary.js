import React, { useEffect } from "react";
import "./productSummary.scss";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  selectCategory,
  selectOutOfStock,
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";
import {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY,
} from "../../../redux/features/product/productSlice";

// Format Amount for two decimal places
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  // Icons
  const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
  const productIcon = <BsCart4 size={40} color="#fff" />;
  const categoryIcon = <BiCategory size={40} color="#fff" />;
  const outOfStockIcon = <BsCartX size={40} color="#fff" />;
  const dispatch = useDispatch();
  const outOfStock = useSelector(selectOutOfStock);
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const totalCategory = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products, outOfStock]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          // count={totalStoreValue}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}  `}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={totalCategory.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
