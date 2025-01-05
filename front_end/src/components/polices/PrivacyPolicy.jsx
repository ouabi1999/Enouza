import React,{ useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import HeadeSeo from "../../../common/HeadeSeo";

function PrivacyPolicy() {
  useLayoutEffect(() => {
    window.scrollTo({top: 0, left: 0,});
  }, [])
  return (
    <Container>
      <HeadeSeo title = "Enouza - Privacy policy"/>
      
        <div>
            <h1>PRIVACY POLICY</h1>
            <p> This Privacy Policy describes how Enouza.com (the “Site” or “we”)  collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>
        </div>
        <h3>Collecting Personal Information</h3>
      <p>
        When you visit the Site, we collect certain information about your device, your interaction with the Site, 
        and the information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information”.
        See the list below for more information about what Personal Information we collect and why.
      </p>
      <div>
      <h3>Device information</h3>
      <ol>
        <li> 
          <strong>Examples of Personal Information collected : </strong>
          <span>
              version of web browser, IP address, time zone, cookie information,
              what sites or products you view, search terms, and how you interact with the Site.
          </span>
        </li>
        <li> 
          <strong> Purpose of collection : </strong>
          <span>
              to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.
          </span>
        </li>
        <li> 
          <strong> Source of collection : </strong>
          <span>
               Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.
          </span>
        </li>
        <li> 
          <strong> Disclosure for a business purpose : </strong>
          <span>
              shared with our processor Enouza.
          </span>
        </li>
      </ol>
      </div>
      <div>
      <h3> Order information</h3>
      <ol>
        <li> 
          <strong>Examples of Personal Information collected : </strong>
          <span>
                name, billing address, shipping address, payment information, email address, and phone number
          </span>
        </li>
        <li> 
          <strong> Purpose of collection : </strong>
          <span>
              to provide products or services to you to fulfill our contract, 
              to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
          </span>
        </li>
        <li> 
          <strong> Source of collection : </strong>
          <span>
                collected from you.
          </span>
        </li>
        <li> 
          <strong> Disclosure for a business purpose : </strong>
          <span>
              shared with our processor Enouza.
          </span>
        </li>
      </ol>
      </div>
      <div>
      <h3> Customer support information </h3>
      <ol>
        <li> 
          <strong>Examples of Personal Information collected : </strong>
          <span>
                name, billing address, shipping address, 
                payment information, email address, and phone number.
               
          </span>
        </li>
        <li> 
          <strong> Purpose of collection : </strong>
          <span>
          to provide customer support.
          </span>
        </li>
        <li> 
          <strong> Source of collection : </strong>
          <span>
                collected from you.
          </span>
        </li>
        
      </ol>
      </div>


      <div>
      <h3> Sharing Personal Information </h3>
      <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>
      <ol>
        
        <li> 
          <span>
               We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful requests for information we receive, or to otherwise protect our rights
          </span>
             
        </li>
      </ol>
      </div>


      <div>
      <h3> Behavioural Advertising </h3>
      <p>As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For example:</p>
      <ol>
        <li> 
      
          <span>
              We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here:
              <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noreferrer">
                {""} https://policies.google.com/privacy {""}
              </a>
              {""} You can also opt-out of Google Analytics here : {""}

              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" > https://tools.google.com/dlpage/gaoptout </a>
          </span>
        </li>
        <li> 
         
          <span>
              We share information about your use of the Site, your purchases, and your interaction with our ads on other websites with our advertising partners. We collect and share some of this information directly with our advertising partners, and in some cases through the use of cookies or other similar technologies (which you may consent to, depending on your location)
          </span>
        </li>
      </ol>
      <p>For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at {""}
          <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"  target="_blank" rel="noreferrer" >
             http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
          </a>.
        </p>
      <p> You can opt-out of targeted advertising by:</p>
      <ol>
      <li> 
          <span>
          FACEBOOK - <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noreferrer">https://www.facebook.com/settings/?tab=ads</a>.
          </span>
        </li>
        <li> 
          <span>
          GOOGLE - <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noreferrer">https://www.google.com/settings/ads/anonymous</a>.
          </span>
        </li>
       
        <li> 
          <span>
          BING - <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noreferrer">https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads</a>]
          </span>
        </li>
        </ol>
        <p>Additionally, you can opt-out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at
           <a href="http://optout.aboutads.info/" target="blank" rel="noreferrer"> http://optout.aboutads.info/</a>.
          </p>
      </div>
    

      <div>
      <h3> Using Personal Information </h3>
       <p>
           We use your Personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers
       </p>
      
      </div>
      <div>
      <h3> Lawful basis </h3>
       <p>
            Pursuant to the General Data Protection Regulation (“GDPR”), if you are a resident of the European Economic Area (“EEA”), we process your personal information under the following lawful bases:
       </p>
        <ol className="list">
          <li>Your consent;</li>
          <li>The performance of the contract between you and the Site;</li>
          <li>Compliance with our legal obligations;</li>
          <li>To protect your vital interests;</li>
          <li>To perform a task carried out in the public interest;</li>
          <li>For our legitimate interests, which do not override your fundamental rights and freedoms.</li>
        </ol>
      </div>

      <div>
        <h3> Retention </h3>
        <p>
          When you place an order through the Site, we will retain your Personal Information for our records unless and until you ask us to erase this information. For more information on your right of erasure, please see the ‘Your rights’ section below.
        </p>
      </div>
      <div>
        <h3> Automatic decision-making </h3>
        <p>
          If you are a resident of the EEA, you have the right to object to processing based solely on automated decision-making (which includes profiling), when that decision-making has a legal effect on you or otherwise significantly affects you.
        </p>
        <p>
          We engage in fully automated decision-making that has a legal or otherwise significant effect using customer data.
        </p>
        <p>
          Our processor Enouza uses limited automated decision-making to prevent fraud that does not have a legal or otherwise significant effect on you.
        </p>
        <p>
          Services that include elements of automated decision-making include:
        </p>
        <ol className="list">
          <li>Temporary denylist of IP addresses associated with repeated failed transactions. This denylist persists for a small number of hours.</li>
          <li>Temporary denylist of credit cards associated with deny listed IP addresses. This denylist persists for a small number of days.</li>
        </ol>
      </div>
      <div>
        <h3>Your rights : </h3>
        <h3>GDPR</h3>
        <p> If you are a resident of the EEA, you have the right to access the Personal Information we hold about you, to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights, please contact us through the contact information below</p>
      
      </div>
      <div>
        <h3>CCPA</h3>
        <p>
          If you are a resident of California, you have the right to access the Personal Information we hold about you (also known as the ‘Right to Know’),
          to port it to a new service, and to ask that your Personal Information be corrected, updated, or erased. If you would like to exercise these rights,
          and If you would like to designate an authorized agent to submit these requests on your behalf, please contact us at the address below:
        </p>
      </div>
      <div>
        <h3>Cookies</h3>
        <p>
          A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection). This means you don’t have to re-enter this information each time you return to the site or browse from one page to another. Cookies also provide information on how people use the website, for instance, whether it’s their first time visiting or if they are a frequent visitor.
        </p>
        <p>We use the following cookies to optimize your experience on our Site and to provide our services</p>
      </div>
      <div>
        <h3>Do Not Track</h3>
        <p>
          Please note that because there is no consistent industry understanding of how to respond to “Do Not Track” signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.
        </p>
        
      </div>
      <div>
        <h3>Changes</h3>
        <p>
          We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
        </p>
        
      </div>
      <div>
        <h3> Contact </h3>
        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at [ Enouza.contact@gmail.com ]
        </p>
        <p>Last updated: June 15. 2022</p>
      </div>
      
    </Container>
  )
}

export default PrivacyPolicy

const Container = styled.div`
  
  max-width: 1200px;
  min-height: 100vh;
  border-radius: 4px;
  background: #d3cce3;
  background: -webkit-linear-gradient(to right, #e9e4f0, #d3cce3);
  background: linear-gradient(to right, #e9e4f0, #d3cce3);
  `