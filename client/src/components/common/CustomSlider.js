import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "components";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomSlider = ({ product, activedTab, normal }) => {
  return (
    <>
      <Slider className="custom-slider" {...settings}>
        {product?.map((el) => (
          <Product
            key={el._id}
            productData={el}
            isNew={activedTab === 1 ? false : true}
            normal={normal}
          />
        ))}
      </Slider>
    </>
  );
};

export default memo(CustomSlider);
