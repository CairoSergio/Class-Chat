import  express from "express";
import { 
    getUsers, 
    getallusers,
    addPrivateInfo, 
    addPedido,
    updateUsers, 
    verify,
    addInfo,
    getUserEnviado,
    getallFilteredusers,
    getIdUsers, 
    getNome,
    getEnviados,
    deletepedido,
    getRecebidos } from "../controllers/users.js"
import {db} from "../db.js"
const router = express.Router()

router.get('/', getUsers)
router.get('/allusers/:id', getallusers)
router.get('/allFilteredusers/:id', getallFilteredusers)
router.post('/getid', getIdUsers)
router.post('/delete', deletepedido)
router.post('/verify', verify)
router.post('/userprivateinfo', addPrivateInfo)
router.post('/pedido', addPedido)
router.post('/userinfo', addInfo)
router.put('/:id', updateUsers)
router.get('/getNome/:id', getNome)
router.get('/enviados/:id', getEnviados)
router.get('/recebidos/:id', getRecebidos)
router.get('/userenvio/:id', getUserEnviado)
  


export default router