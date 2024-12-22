import React, { useState } from 'react'
import CustomerReviews from './CustomerReviews'
import Feedback from './FeedBack'
import { useSelector } from 'react-redux'
import ApiInstance from '../../../../../common/baseUrl'


function ReviewsLayout() {
  const productData = useSelector(state => state.products.productData)
  const user = useSelector(state=> state.auth.user)
  const [comment, setComment] = useState({ images:[], text:""})
  const [isLoading, setIsLoading] = useState(false)
  const [newRatings, setNewRatings ] = useState(null)
  const [required,  setRequired] = useState(false)
  const [selected, setSelected] = useState({
    isDescription:true,
    isReviews : false
  })

  const [preveiwImages, setPreviewImages] = useState([])

  const [star_rating, set_star_rating] = useState(1);

  let ratings = productData[0]?.ratings.concat(productData[0]?.aliexpress_ratings);

    const fiveStars = ratings?.length > 0 ? ratings?.filter(item => item.stars === 5).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const twoStars = ratings?.length > 0 ? ratings?.filter(item => item.stars === 2).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const fourStars = ratings?.length > 0 ? ratings?.filter(item => item.stars === 4).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const threeStars = ratings?.length > 0 ? ratings?.filter(item => item.stars === 3).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""
    const oneStar = ratings?.length > 0 ? ratings?.filter(item => item.stars === 1).reduce((total, value) => {
      return total += value.stars
    }, 0) : ""

    let sum_stars = ratings?.length > 0 ? ratings?.reduce((total, value) => {
         return total += value.stars
      }, 0):""


      const handelRatingSubmit = (event) => {
        
        console.log(comment)
        if(comment.text !== ""){
  
        
        event.preventDefault()
        setIsLoading(true)
        ApiInstance.post("set-rating/", 
            
            {
                product: productData[0].id,
                user: user.id,
                stars: star_rating,
                review: comment,
  
            })
          .then( (response) => {
            setNewRatings(response.data)
            setIsLoading(false)
            setComment({text:"", images:[]})
            setPreviewImages
            set_star_rating(1)
            setRequired(false)
          })
          .catch(message => {
                console.log(message)
                setIsLoading(false)
                setRequired(false)
            })
        }
      else{
        setRequired(true)
      }
    }
  
    
  return (
    <div>
        <CustomerReviews 
             fiveStars={fiveStars}
             twoStars={twoStars}
             fourStars={fourStars}
             threeStars={threeStars}
             oneStar={oneStar}
             productData={productData}
             sum_stars={sum_stars}
             ratings= {ratings}
             newRatings = {newRatings}
        />
        <Feedback
              comment = {comment}
              setComment = {setComment}
              isLoading = {isLoading}  
              setIsLoading= {setIsLoading}
              newRatings = {newRatings} 
              setNewRatings ={ setNewRatings}
              required = {required}
              star_rating = {star_rating}
              set_star_rating = {set_star_rating}
              handelRatingSubmit = {handelRatingSubmit}
             preveiwImages={ preveiwImages}
             setPreviewImages = {setPreviewImages}
        />
    </div>
  )
}

export default ReviewsLayout