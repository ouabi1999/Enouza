import React,{ useLayoutEffect} from 'react'
import styled from "styled-components"
import HeadeSeo from '../../../common/HeadeSeo';

function RefundPolicy() {
  useLayoutEffect(() => {
    window.scrollTo({top: 0, left: 0,});
  }, [])
  return (
    <Container>
      <HeadeSeo title = " Enouza - Return Policy"/>
        <div>
            <h1>RETURN AND REFUND POLICY</h1>
        </div>
        <div>
            <h3>Returns:</h3>
              <p>
                  Simply put, you can return merchandise for a refund ONLY if the item is in BRAND NEW, UNOPENED CONDITION, including its original packaging and accessories. We know this seems a little extreme, but without this stipulation, we would not be able to offer our amazing prices.
              </p>
              <p>
                  We will honor refunds for unopened items up until 15 - 25 days from when you have received your product. All refunds will be issued back to your original payment method and can take up will 7-10 business days to apply back to your original payment method.
              </p>
        </div>
        <div>
            <h3> Your refund will be rejected if your items are returned due to the issues related to the following:</h3>
            <ol>
                <li> <span>If you are wanting to return your product due to damage on the item’s original box.</span> </li>
                <li> <span>If the product you have returned has been opened and unsealed. </span></li>
                <li>  <span>Items with minor cosmetic paint problems for prize figures as these are expected.</span> </li>
            </ol>
        </div>
        <div>
            <h3>Exceptions / Non-Returnable items:</h3>
              <p>
                  Pre-orders are final sales and are non-returnable once shipped out. If you do happen to receive a defective product, please contact us for more important on contacting the manufacturer.

                  Items with box imperfections and general flaws.

                  If your figure quality

                  Please get in contact with us if you have questions or concerns about your specific item.</p>
          </div>
        <div>
            <h3>Return Shipping:</h3>
              <p>
                  In order to return a product, please contact our customer support with your order number and reason for return and you will be provided with a return label if your return request is approved.
              </p>
        </div>
        
        <div>
            <h3>Damages and issues</h3>
              <p>
                  Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item so that we can evaluate the issue and make it right.
              </p>
        </div>
        <div>
            <h3>Refunds</h3>
              <p>
                  We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too
              </p>
        </div>


    </Container>
  )
}

export default RefundPolicy

const Container = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(to right, #E9E4F0, #D3CCE3);

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;
  }
`;

const Subtitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  border-bottom: 2px solid lightgray;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const OrderedList = styled.ol`
  padding-left: 20px;

  li {
    font-size: 14px;
    line-height: 1.8;
    margin-bottom: 5px;

    @media (max-width: 768px) {
      font-size: 13px;
    }

    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
`;
