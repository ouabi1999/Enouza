import React, { useState } from 'react'
import styled from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ReturnFAQ() {
  const [activeQuastion, setAciveQuastion] = useState("");
  const data =[
    {
      id :1,
      quastion:"What's your return policy?",
      answer:{
      
          paragraphe:[" If you’re looking to return your order for whatever reason, we're here to help with no hassle! We offer returns within 30 days of purchase. You can return your product for a refund to the original payment method if the product did not meet your expectations. The refund will be processed back to its original form of payment within 5-10 business days."],
          list:[
            "Clearance items are final sale and cannot be returned or exchanged.",
            "Returned items must include identifying information and be returned in the original product packaging.",
            "Returned items must have no visible signs of wear or use.",
            "The shipping cost will not be refunded unless you were sent a wrong or damaged item.",
            "A prepaid return label will not be provided unless the wrong item was sent, or the item was damaged in transit.",
            "We do not process apparel exchanges. If the item you purchased doesn't fit, please return it for a refund. You may then place a new order for your desired size. For more information and RMA labels, please contact our Customer Service Team.",
            

          ]

        }
    },
    {
      id :2,
      quastion:"How do you return a product?",
      answer:{
          paragraphe:[],
          list:[
            "Log in to your Enouza account and contact our Customer Service Team",
            "Provide as much information as possible about the products you wish to return or exchange from your order.",
            "Returned items must have no visible signs of wear or use.",
            "Print the prepaid shipping label that you will receive by email.",
            "Please note that a prepaid return label will not be provided unless the wrong item was sent, or the item was damaged in transit.",
            "Send all items back to us using the label provided.",
            

        ]

      }
    },
    {
      id :3,
      quastion:"My product arrived demaged! What should I do?",
      answer:{
          paragraphe:["Sorry collectors! We understand how disappointing it is to receive a damaged item - especially an item you have waited months for! Unfortunately, mistakes happen and products may get damaged during transit. In the event that this happens, please contact us with pictures of the damaged item and we will replace or issue a partial or full refund.  Your satisfaction is our #1 priority!"],
          list:[],
        }
    },
    {
      id :4,
      quastion:"What products are excluded from the return policy?",
      answer:{
          paragraphe:[],
          list:[
            "Digital goods such as memberships and gift cards can not be refunded. If there are any issues downloading the product or redeeming your license key,",
            "Mystery Bundles are also not refundable. Please note that if you order multiple Mystery Bundles, you will receive duplicates.",
            "Snacks and drinks.",
            "Open DVDs and Blu-ray are not refundable.",
            "Clearance / final sale items are not eligible for returns.",


          ]
      }
    },
    {
      id :5,
      quastion:"My product has a defect / messing parts. What should I do",
      answer:{
          paragraphe:[
            "Contact us directly with pictures and explanation of the defect.",
            "Please note: home video products are not guaranteed to come with a slipcover.",
          ],
          list:[],

      }
    },
    {
      id :6,
      quastion:"What's your refund policy?",
      answer:{
          paragraphe:[],
          list:[
            "After an order is cancelled or a return is processed, your refund will be issued to its original form of payment.",
            "Upon completion of your return, a refund will be processed within 1-5 business days.",
            "After a refund has been processed, please allow 3-5 business days for Paypal refunds and 3-10 business days for all other payment methods.",
            "We will notify you via email when your refund has been issued.",
            "A full refund will be issued even if a Enouza Store Digital Gift Card was used as full or partial payment on the order.",
            "An order can be cancelled and immediately refunded if the package has not yet begun processing for shipment. ",
            "Once a package begins processing for shipment, it will have to be delivered to its destination and returned to Enouza before a refund can be issued.Please contact our Customer Service Team for more detailed information.",
            

        ]

      }
    }
  ]
  const showAnswer = (id)=>{
    if(activeQuastion === id){
      setAciveQuastion("")
    }else{
      setAciveQuastion(id)
    }
    


  }
  return (
    <Container>
      <div>
        <div >
          {data.map((item , index)=> {
            return (
              <div className="content" key={index}>
                <button 
                        className='button-container' 
                        onClick={() => showAnswer(item.id) }
                      >

                  <span>
                  {activeQuastion === item.id ? (
                      <KeyboardArrowDownIcon className="arrow-icon" />
                    )
                    : 
                       <KeyboardArrowRightIcon className="arrow-icon" />
                    
                  }
                  </span>

                  <span> {item.quastion}</span>
                </button>
                {activeQuastion === item.id && (
                  
                  <div className='show'>

                    {item.answer?.paragraphe?.map(item => {
                      return (
                        <div className="text" >
                          <p> {item} </p>
                        </div>
                      )
                    })}


                    <ul>
                      {item.answer.list?.map(list => {
                        return (
                          <li> {list} </li>
                        )
                      })}


                    </ul>

                  </div>

                )}


              </div>
            )
          })}
        </div>
      </div>

    </Container>
  )
}

export default ReturnFAQ
export const Container = styled.div`
 

  h2 {
    color: #130161;
    margin-left: 15px;
    font-size: 1.4rem;
    text-decoration:underline;
  }

  ul {
    margin-left: 20px;
    padding-left: 20px;
  }

  li {
    list-style-type: circle;
    font-size: 14px;
    margin-bottom: 5px;
  }

  .text {
    font-size: 15px;
    margin-left: 20px;
    margin-bottom: 10px;
    line-height: 1.5;
  }

  .button-container {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    padding: 10px 0;
    cursor: pointer;
    justify-content: space-between;
    font-family: "Arial", sans-serif;
    font-size: 1rem;
    transition: background 0.3s;
  }

  .button-container:hover {
    background: #f9f9f9;
  }

  .button-container span {
    font-weight: bold;
    font-size: 1rem;
    color: #333;
  }

  .show {
    transition: max-height 0.5s ease-in-out, opacity 0.5s;
    overflow: hidden;
    padding: 10px 0;
  }

  .content {
    border-bottom: 1px solid lightgray;
    padding: 15px 0;
    background: #fff;
    margin-bottom: 8px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .content:last-child {
    border-bottom: none;
  }

  .arrow-icon {
    font-size: 1.2rem;
    color: gray;
    margin-right: 10px;
  }

  @media only screen and (max-width: 820px) {
    h2 {
      font-size: 1.5rem;
    }

    .button-container {
      font-size: 0.95rem;
    }

    .text {
      font-size: 14px;
    }

    li {
      font-size: 13px;
    }

    .arrow-icon {
      font-size: 1rem;
    }
  }

  @media only screen and (max-width: 600px) {
    h2 {
      font-size: 1rem;
      margin-left: 10px;
    }

    .button-container {
      font-size: 0.9rem;
      padding: 8px 0;
    }

    .text {
      font-size: 13px;
    }

    li {
      font-size: 12px;
    }

    .arrow-icon {
      font-size: 0.9rem;
    }
  }

  @media only screen and (max-width: 400px) {
    h2 {
      font-size: 0.9rem;
    }

    .button-container  span{
      font-size: 0.7rem;
      font-weight:bolder;
    }

    .text {
      font-size: 10px;
    }

    li {
      font-size: 9px;
    }

    .arrow-icon {
      font-size: 1rem;
    }
  }
`;
