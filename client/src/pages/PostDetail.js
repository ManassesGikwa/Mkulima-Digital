import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images2/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor />
          <div className="post-detail__buttons">
            <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail__thumbanail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquid dolorem et sunt maxime corrupti aperiam magnam nemo facere numquam ducimus saepe eum error voluptate architecto nihil nulla, ratione consequuntur eligendi at, laborum voluptatibus, iure a minima. Aliquid, sed iste!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sapiente maxime pariatur suscipit. Laboriosam, ullam? Quod obcaecati omnis deserunt, minus sint ab exercitationem quia dolore similique facilis tempora deleniti cum, aut fuga rerum? Nihil at eos iure vel odio voluptate, quibusdam temporibus sint deserunt cumque neque in, eveniet voluptatibus esse quidem. Quas sequi et illum.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto perferendis laborum odio facilis suscipit obcaecati, tempora architecto error animi minima quisquam consequuntur. Totam quae similique repudiandae unde laboriosam maxime sequi esse, inventore impedit rem est suscipit qui autem accusantium excepturi enim alias atque ut odio quas, possimus ipsam dolorem. Qui, maxime! Dignissimos tempore illum magni ut in eos corporis inventore nesciunt ipsum asperiores quas ipsa atque culpa, perspiciatis hic, temporibus mollitia, incidunt nam. Eaque, ex doloribus. Quod asperiores, vel eos labore velit ipsum accusantium necessitatibus architecto quis tenetur tempora sequi at quaerat, temporibus, doloremque dicta ut alias repudiandae consectetur atque quibusdam mollitia repellat ipsa. Suscipit ipsa error a iste unde natus, cum quod, numquam adipisci praesentium dolores distinctio ad sapiente! Deleniti aliquid non inventore, maiores, corrupti optio dolorem saepe ut sed quidem reiciendis vitae voluptatem cum nesciunt nihil voluptatibus autem necessitatibus. Fugiat accusamus optio rerum nostrum aut, nemo tempora consectetur, illum architecto repudiandae quam sapiente.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptas cupiditate eveniet! Facere laboriosam suscipit odio voluptatem dicta minus quod.</p>
      </div>
    </section>
  )
}

export default PostDetail