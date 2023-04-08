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
    addAmigo,
    getNome,
    getEnviados,
    rejectpedido,
    deletepedido,
    activeUser,
    getAmigos,
    inactiveUser,
    VistoPorUltimo,
    getRecebidos } from "../controllers/users.js"
const router = express.Router()

router.get('/', getUsers)
router.get('/amigos/:id', getAmigos)
router.get('/allusers/:id', getallusers)
router.get('/allFilteredusers/:id', getallFilteredusers)
router.post('/getid', getIdUsers)
router.delete('/delete/:remitente/:receptor', deletepedido)
router.delete('/rejectedpedido/:receptor/:remitente', rejectpedido)
router.post('/verify', verify)
router.post('/userprivateinfo', addPrivateInfo)
router.post('/addamigo', addAmigo)
router.post('/pedido', addPedido)
router.post('/userinfo', addInfo)
router.put('/:id', updateUsers)
router.put('/active/:id', activeUser)
router.put('/inactive/:id', inactiveUser)
router.put('/visto/:id', VistoPorUltimo)
router.get('/getNome/:id', getNome)
router.get('/enviados/:id', getEnviados)
router.get('/recebidos/:id', getRecebidos)
router.get('/userenvio/:id', getUserEnviado)
  


export default router