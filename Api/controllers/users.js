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
export const getallFilteredusers = (req, res) => {
  const id = req.params.id;
  const q = "SELECT u.* FROM userinfo u LEFT JOIN pedidos p ON (u.id_pessoa = p.Remitente AND p.Receptor = ?) OR (u.id_pessoa = p.Receptor AND p.Remitente = ?) LEFT JOIN amigos a ON (u.id_pessoa = a.id_amigo AND a.id_pessoa = ?) OR (u.id_pessoa = a.id_pessoa AND a.id_amigo = ?) WHERE u.id_pessoa != ? AND p.Remitente IS NULL AND a.id_amigo IS NULL";

  db.query(q, [id, id, id, id, id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

  

export const getEnviados = (req, res) => {
  const q = "SELECT Receptor FROM pedidos WHERE Remitente = ?";
  db.query(q, req.params.id, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }

    try {
      if (data.length === 0) {
        return res.status(200).json([]);
      }

      const promises = data.map(async (element) => {
        const [{ id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento }] = await getUserEnviado(element.Receptor);
        return { id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento };
      });

      const results = await Promise.all(promises);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }
  });
};

export const activeUser = (req,res) =>{
  const q = "UPDATE userinfo SET `status` = 'online' WHERE `id_pessoa` = ?"
  db.query(q,req.params.id, (err)=>{
    if(err) return res.json(err)
    return res.status(200).json("Estado atualizado");
  })

}
export const inactiveUser = (req,res) =>{
  const q = "UPDATE userinfo SET `status` = 'ofline' WHERE `id_pessoa` = ?"
  db.query(q,req.params.id, (err)=>{
    if(err) return res.json(err)
    return res.status(200).json("Estado atualizado");
  })

}
export const VistoPorUltimo = (req,res) =>{
  const q = "UPDATE userinfo SET `VistoPorUltimo` = ? WHERE `id_pessoa` = ?"
  let agora = new Date();
  db.query(q,[agora, req.params.id], (err)=>{
    if(err) return res.json(err)
    return res.status(200).json("Estado atualizado");
  })

}

export const getAmigos = (req, res) => {
  const q = "SELECT id_pessoa FROM amigos WHERE id_amigo = ? UNION SELECT id_amigo FROM amigos WHERE id_pessoa = ?";
  db.query(q, [req.params.id, req.params.id], async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }

    try {
      if (data.length === 0) {
        return res.status(200).json([]);
      }

      const promises = data.map(async (element) => {
        const [{ id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento, status, VistoPorUltimo }] = await getUserEnviado(element.id_pessoa === req.params.id ? element.id_amigo : element.id_pessoa);
        return { id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento, status, VistoPorUltimo };
      });

      const results = await Promise.all(promises);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }
  });
};


export const getRecebidos = (req, res) => {
  const q = "SELECT Remitente FROM pedidos WHERE Receptor = ?";
  db.query(q, req.params.id, async (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }

    try {
      if (data.length === 0) {
        return res.status(200).json([]);
      }

      const promises = data.map(async (element) => {
        const [{ id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento }] = await getUserEnviado(element.Remitente);
        return { id_pessoa, NomeDeUsuario, Cidade, DataDeNascimento };
      });

      const results = await Promise.all(promises);
      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao consultar o banco de dados." });
    }
  });
};

export const getUserEnviado = (id_pessoa) => {
  const q = "SELECT * FROM userinfo WHERE id_pessoa = ?";
  return new Promise((resolve, reject) => {
    db.query(q, id_pessoa, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(data);
    });
  });
};



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
export const addAmigo = (req, res) => {
  const { id_pessoa, id_amigo } = req.body;

  const sql = "INSERT INTO amigos (`id_pessoa`, `id_amigo`) VALUES (?, ?)";
  const values = [id_pessoa, id_amigo];

  db.query(sql, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Falha ao adicionar" });
    }

    return res.status(200).json({ message: "Novo amigo adicionad comsucso" });
  });
};

export const deletepedido = (req, res)=>{
  const q = "DELETE FROM pedidos WHERE Remitente = ? AND Receptor = ?"

  const  Values =[
    req.params.remitente,
    req.params.receptor
  ]
  db.query(q, Values, (err) =>{
      if(err){
        return res.json(err)
      }else{
          return res.status(200).json("Usuario cadastrado com sucesso.");
      }    

  })
}
export const rejectpedido = (req, res)=>{
  const q = "DELETE FROM pedidos WHERE Receptor = ? AND Remitente = ?"
  const  Values =[
    req.params.receptor,
    req.params.remitente,
  ]
  db.query(q, Values, (err) =>{
      if(err){
        return res.json(err)
      }else{
          return res.status(200).json("Usuario rejeitado");
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


