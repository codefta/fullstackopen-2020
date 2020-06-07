import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE_BLOG':
      return state.map((b) => (b.id === action.data.id ? action.data : b))
    case 'DELETE_BLOG':
      return state.filter((b) => b.id !== action.data)
    case 'ADD_COMMENT':
      console.log(action.data.id, action.data)
      return state.map((b) => (b.id === action.data.id ? action.data : b))
    default:
      return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blog = blogs.find((blog) => (blog.id = id))
    const blogLike = { ...blog, likes: blog.likes + 1 }
    await blogService.update(id, blogLike)

    dispatch({
      type: 'LIKE_BLOG',
      data: blogLike,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)

    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export const addComment = (id, content) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blog = blogs.find((blog) => (blog.id = id))
    const comment = await blogService.createComment(id, { content })
    const blogComments = { ...blog, comments: blog.comments.concat(comment) }

    dispatch({
      type: 'ADD_COMMENT',
      data: blogComments,
    })
  }
}

export default blogReducer
