import React, { useState } from 'react'


import Avatar1 from '../images2/avatar1.jpg'
import Avatar2 from '../images2/avatar2.jpg'
import Avatar3 from '../images2/avatar3.jpg'
import Avatar4 from '../images2/avatar4.jpg'
import Avatar5 from '../images2/avatar5.jpg'
import { Link } from 'react-router-dom'

const authorsData = [
  {id: 1, avatar: Avatar1, name: 'Marvin Okongo', posts: 3},
  {id: 2, avatar: Avatar2, name: 'Sam Ogolla', posts: 5},
  {id: 3, avatar: Avatar3, name: 'Clief Gambino', posts: 0},
  {id: 4, avatar: Avatar4, name: 'Cheryl Debri', posts: 2},
  {id: 5, avatar: Avatar5, name: 'Knox Changer', posts: 1}
]

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData)

  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors__container">
        {
          authors.map(({id, avatar, name, posts}) => {
            return <Link key={id} to={`/blogposts/users/${id}`} className='author'>
              <div className="author__avatar">
                <img src={avatar} alt={`Image of ${name}`} />
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No users/authors found.</h2>}

    </section>
  )
}

export default Authors