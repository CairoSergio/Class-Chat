import  express from "express";
import { getUsers, addPrivateInfo, updateUsers, verify,addInfo,getIdUsers,getPerfil, getNome } from "../controllers/users.js"
import {db} from "../db.js"
const router = express.Router()

router.get('/', getUsers)
router.post('/getid', getIdUsers)
router.post('/verify', verify)
router.post('/userprivateinfo', addPrivateInfo)
router.post('/userinfo', addInfo)
router.put('/:id', updateUsers)
router.post('/getImage/:id', getPerfil)
router.post('/getNome/:id', getNome)
  





export default router