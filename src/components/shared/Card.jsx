import PropTypes from 'prop-types'

function Card({ children, reverse }) {
  // return <div className={`card ${reverse && 'reverse'}`}>{children}</div>

  return (
    <div
      className='card_1'
      style={{
        backgroundColor: reverse ? 'rgba(1,2,0,0.5)' : '#fff',
        color: reverse ? '#ffff' : '#040',
      }}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  reverse: true,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}

export default Card
