import {db} from "../db.js"
import fs from 'fs'
export const getUsers = (_, res) =>{
  const q = "SELECT * FROM userprivateinfo"



  db.query(q, (err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}
export const getallusers = (req, res) =>{
  const q = "SELECT * FROM userinfo WHERE id_pessoa != ?"
  db.query(q, req.params.id,(err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}
export const getallFilteredusers = (req, res) =>{
  const q = 
  "SELECT * FROM userinfo WHERE id_pessoa != ? AND id_pessoa NOT IN (SELECT Remitente FROM pedidos WHERE Receptor = ? UNION SELECT Receptor FROM pedidos WHERE Remitente = ?)"
  db.query(q, [req.params.id, req.params.id, req.params.id], (err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}

export const getUserEnviado = (req, res) =>{
  const q = "SELECT * FROM userinfo WHERE id_pessoa = ?"
  db.query(q, req.params.id,(err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}
export const getEnviados = (req, res) =>{
  const q = "SELECT Receptor FROM pedidos WHERE Remitente = ?"
  db.query(q, req.params.id,(err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}
export const getRecebidos = (req, res) =>{
  const q = "SELECT Remitente FROM pedidos WHERE Receptor = ?"
  db.query(q, req.params.id,(err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}
export const verify = (req, res) =>{
  const q = "SELECT * FROM userprivateinfo WHERE Email = ? AND Senha = ?";

  const values = [
    req.body.Email,
    req.body.Senha
  ]

  db.query(q, values, (err, data)=>{
      if(err) return res.json(err);

      return res.status(200).json(data)
  })
}


export const getIdUsers = (req, res) => {
  const q = "SELECT id FROM userprivateinfo WHERE Email = ?";
  const values = [req.body.Email];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
export const getNome = (req, res) => {
  const q = "SELECT NomeDeUsuario, Cidade FROM userinfo WHERE id_pessoa = ?";
  const id = req.params.id;
  db.query(q, [id] ,(err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

 
export const addPrivateInfo =(req, res)=>{
    const q = "INSERT INTO userprivateinfo (`Email`,`Telefone`, `Senha`, `Code`) VALUES(?,?,?,?)"

    const  Values =[
        req.body.Email,
        req.body.Telefone,
        req.body.Senha,
        req.body.Code,
    ]

    db.query(q, Values, (err) =>{
        if(err){
         return res.json(err)
        }else{

            return res.status(200).json("Usuario cadastrado com sucesso.");
        }    

    })
}
export const addPedido = (req, res)=>{
    const q = "INSERT INTO pedidos(`Remitente`,`Receptor`) VALUES(?,?)"

    const  Values =[
      req.body.Remitente,
      req.body.Receptor
    ]

    db.query(q, Values, (err) =>{
        if(err){
         return res.json(err)
        }else{
            return res.status(200).json("Usuario cadastrado com sucesso.");
        }    

    })
}
export const deletepedido = (req, res)=>{
    const q = "DELETE FROM pedidos WHERE Remitente = ? AND Receptor = ?"

    const  Values =[
      req.body.Remitente,
      req.body.Receptor
    ]

    db.query(q, Values, (err) =>{
        if(err){
         return res.json(err)
        }else{

            return res.status(200).json("Usuario cadastrado com sucesso.");
        }    

    })
}

export const addInfo = async (req, res) => {
  try {
    const sql = "INSERT INTO userinfo (`id_pessoa`, `NomeDeUsuario`, `Cidade`, `DataDeNascimento`) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.id_pessoa,
      req.body.NomeDeUsuario,
      req.body.Cidade,
      req.body.DataDeNascimento,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao cadastrar usuário." });
      } else {
        res.status(200).json({ message: "Usuário cadastrado com sucesso." });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao ler arquivo." });
  }
};

export const updateUsers =(req, res)=>{
    const q = "UPDATE usuarios SET `nome` = ?, `email` = ? ,`telefone` = ?,`cidade` = ? WHERE `id` =  ?"

    const  Values =[
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.cidade,
    ]

    db.query(q, [...Values, req.params.id], (err) =>{
        if(err) return res.json(err)

        return res.status(200).json("Usuario atualizado com sucesso.");
    })
}

// export const deleteUsers =(req, res)=>{
//     const q = "DELETE FROM usuarios WHERE `id` = ?"

//     db.query(q, req.params.id, (err) =>{
//         if(err) return res.json(err)

//         return res.status(200).json("Usuario deletado com sucesso.");
//     })
// }


