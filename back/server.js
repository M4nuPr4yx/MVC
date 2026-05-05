const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 conexão com MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "exemplos"
});

// 🔍 listar pessoas (opcional)
app.get("/pessoas", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM pessoa");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🚀 cadastrar pessoa
app.post("/pessoas", async (req, res) => {
  try {
    const {
      documento,
      nome_razao_social,
      nome_social_fantasia,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email
    } = req.body;

    const query = `
      INSERT INTO pessoa
      (documento, nome_razao_social, nome_social_fantasia,
       cep, endereco, numero, bairro, cidade, estado, email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.execute(query, [
      documento,
      nome_razao_social,
      nome_social_fantasia,
      cep,
      endereco,
      numero,
      bairro,
      cidade,
      estado,
      email
    ]);

    res.json({ success: true });

  } catch (error) {
    console.error("ERRO:", error);
    res.status(500).json({ error: error.message });
  }
});

// ... (mantenha o código existente de conexão e pessoas)

// 🚀 Rota para cadastrar produto
app.post("/produtos", async (req, res) => {
  try {
    const { nome, descricao, preco, estoque } = req.body;

    const query = `
      INSERT INTO produtos (nome, descricao, preco, estoque)
      VALUES (?, ?, ?, ?)
    `;

    await pool.execute(query, [nome, descricao, preco, estoque]);
    res.json({ success: true });
  } catch (error) {
    console.error("ERRO AO SALVAR PRODUTO:", error);
    res.status(500).json({ error: error.message });
  }
});

// 🔍 Rota para listar produtos (útil para ver se funcionou)
app.get("/produtos", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM produtos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ... (mantenha o app.listen no final)

// ▶️ iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});