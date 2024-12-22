import React , {useState} from 'react'
import { Container } from './ReturnFAQ';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ShippingFAQ() {

  const [activeQuastion, setAciveQuastion] = useState("");
  const data =[
    {
      id :1,
      quastion:"How much does shipping cost?",
      answer:{
      
          paragraphe:[
            "International shipping costs vary by shipping destination. Here is a breakdown of the cost per shipment:",
          
          ],
          list:[
           "Canada: $0 - $19.99",
           "Europe: $0 - $40",
           "Australia: $0 - $43.99",
           "Worldwid: Free shipping for some products",
          ]

        }
    },
    {
      id :2,
      quastion:"What happens if my package is lost in transit?",
      answer:{
          paragraphe:[
            "If a package is shown as delivered but not received, please contact the carrier and then notify us within 30 days of the delivery date.",
            "f it is determined that the package is lost due to mis-delivery by the carrier, we will replace your order.",
             "If the package is lost due to an incomplete, or incorrect address, we can not offer refunds or exchanges - all customers are responsible for ensuring that their shipping address is correct at the time of purchase. In the event that a package is returned to us, you will pay an additional shipping fee in order for the package to be sent out again.",
             "If you find that your shipping address is incorrect, or that it has changed since you've last placed your order, please notify us with the order number/id and address."
          
            ],
          list:[]

      }
    },
    {
      id :3,
      quastion:"When will my order ship?",
      answer:{
          paragraphe:[
            "Your order will be processed during normal business days (Monday - Friday, excluding holidays).",
            "If an item is in stock, your order will be processed within 1 to 5 business days. The delivery time after processing will vary based on the shipping address. Currently, delivery times vary between 15 to 30 business days.",
            "Once an item ships, you will receive an email with the tracking information. In special circumstances, tracking numbers may not be available.",
          ],
          list:[],
        }
    },
    {
      id :4,
      quastion:"Will I receive my order in multiple packages?",
      answer:{
          paragraphe:["If you purchase in-stock items that are shipped from different warehouses, you will be sent multiple shipments."],
          list:[],
      }
    },
    {
      id :5,
      quastion:"How are shipping prices calculated?",
      answer:{
          paragraphe:[
            "Shipping charges are calculated during checkout. You may add items to your cart, proceed to checkout, and enter your shipping address to see the cost of shipping for your order."
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
            "A full refund will be issued even if a ANIMIS Store Digital Gift Card was used as full or partial payment on the order.",
            "An order can be cancelled and immediately refunded if the package has not yet begun processing for shipment. ",
            "Once a package begins processing for shipment, it will have to be delivered to its destination and returned to ANIMIS before a refund can be issued.Please contact our Customer Service Team for more detailed information.",
            

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
        <h2>Shipping</h2>

        <div >
          {data.map((item , index) => {
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
                          <span> {item} </span>
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

export default ShippingFAQ