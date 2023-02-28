import {db} from "../db.js"
import fs from 'fs'
export const getUsers = (_, res) =>{
    const q = "SELECT * FROM userinfo"



    db.query(q, (err, data)=>{
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
export const getPerfil = (req, res) => {
  const id = req.params.id;
  const query = 'SELECT Perfil FROM userinfo WHERE id_pessoa = ?';
  db.query(query, [id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      const image = result[0].Perfil;
      res.send({ base64: Buffer.from(image, 'binary').toString('base64') });
    }
  });
};


export const getIdUsers = (req, res) => {
  const q = "SELECT id FROM userprivateinfo WHERE Email = ?";
  const values = [req.body.Email];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
export const getNome = (req, res) => {
  const q = "SELECT NomeDeUsuario FROM userinfo WHERE id_pessoa = ?";
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

export const addInfo = async (req, res) => {
  try {
    // const imagePath = 'file:///C:/Users/cairo/Desktop/Capture.PNG';
    // const imageContent = await FileSystem.readAsStringAsync(imagePath, { encoding: FileSystem.EncodingType.Base64 });


    const sql = "INSERT INTO userinfo (`id_pessoa`, `NomeDeUsuario`, `Cidade`,`Perfil`, `DataDeNascimento`) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.id_pessoa,
      req.body.NomeDeUsuario,
      req.body.Cidade,
      req.body.imagem,
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


