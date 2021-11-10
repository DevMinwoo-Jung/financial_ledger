import React, { useState } from 'react';
import Receipt from '../recepit/receipt';
import Slider from "react-slick";
import styles from './receipts.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Modal from '../modal/modal';
import uuid from 'react-uuid';
import styled from "styled-components";

const Arrow = styled.div`
.slick-prev:before {
  color: black; 
}
.slick-next:before {
  color: black;
}`

const Receipts = ({records}) => {



  const [img, setImg] = useState(null);
  const [show, setShow] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 2000,
  };
  const length =   Object.keys(records)
  .map(key => records[key])
  .filter(record => record['fileURL'] !== '')
  .map(record => record);
  
  const showModal = (event) => {
    setShow(true);
    const img = event.target.src;
    setImg(img);
  };

  const onRequestClose = () => {
    setShow(false);
  };

  

  return (
    <>
    <div className={styles.receipts}>
    {
      show === false ? null : <Modal img={img} onRequestClose={onRequestClose}/>
    }
    <Arrow>
      <Slider {...settings} slidesToShow={Math.min(length.length, 3)}>
        {
            Object.keys(records)
            .map(key => records[key])
            .filter(record => record['fileURL'] !== '')
            .map(record => (<Receipt key={uuid()} record={record} showModal={showModal}/>))
        }
      </Slider>
    </Arrow>
    </div>
    </>
  );
};

export default Receipts;