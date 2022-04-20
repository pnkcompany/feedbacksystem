import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
import UserService from '../services/user.service'

// NOTE: added layout prop for nicer animation
// https://www.framer.com/docs/animation/#layout-animations

function FeedbackList() {
  let idx = useParams()
  const [feedback, setFeedback] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    UserService.getReviews(idx).then(
      (response) => {
        setFeedback((old) => [...old, ...response.data])
        setIsLoading(false)
        console.log(feedback)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setFeedback([..._content, `Entry ${_content.length}`])
      }
    )
  }, [])

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  // return (
  //   <div className='feedback-list'>
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // )
}

export default FeedbackList
