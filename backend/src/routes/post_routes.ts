import express from 'express'
import authenticate from '../common/auth_middleware'
import { getAllPosts, getPostById, deletePostById, createNewPost, updatePostMessageById } from '../controllers/post'

const router = express.Router()

router.get('/',getAllPosts)

router.post('/',authenticate,createNewPost)

router.get('/:id',getPostById)

router.delete('/:id',authenticate,deletePostById)
router.delete('/',authenticate,deletePostById)

router.post('/:id', authenticate, updatePostMessageById)
router.post('/', authenticate, updatePostMessageById)

export = router
