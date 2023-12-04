// Fazendo os requerimentos dos pacotes necessários
const express = require("express");
const app = express();
const connection = require("./db/database");
const Produto = require("./models/produto");
const Livro = require("./models/livro")
const Usuario = require('./models/usuario');

// Conectando com o banco de dados MySQL
connection
    .authenticate()
    .then(() => {
        console.log("Conexão realizada");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Setando o EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Incializando a aplicação
app.listen(8080, () => {
    console.log("App rodando na porta 8080");
});

// Rota padrão (página inicial)
app.get("/", (rec, res) => {
    res.render("index");
});

// Rota cardápio
app.get("/cardapio", async (rec, res) => {
    const produtos = await Produto.findAll();
    res.render("cardapio", {
        produtos : produtos
    });
})

// Rota biblioteca
app.get("/biblioteca", async (rec, res) => {
    const livros = await Livro.findAll();
    res.render("biblioteca", {
        livros : livros
    })
})

// Rota Login dos Funcionários
app.get("/login", (rec, res) => {
    res.render("entrar")
})

app.get("/gerenciar", async (rec, res) => {
    const produtos = await Produto.findAll();
    const livros = await Livro.findAll();
    res.render("gerenciar", {
        produtos : produtos,
        livros : livros,
    });
})

// Processamento do login dos funcionários
app.post('/processar', async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { usuario: usuario } });

        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
            res.redirect("/gerenciar")
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(`Erro ao processar o formulário: ${error.message}`);
    }
});

// Cadastrar produto
app.get('/cadastrar', (req, res) => {
    res.render('cadastrarProd');
});

app.post('/cadastrarProd', async (req, res) => {
    const { nome, preco, id, img, categoria } = req.body;
    try {
        const novoProduto = await Produto.create({
            id: id,
            nome: nome,
            preco: preco,
            img: img,
            categoria: categoria,
        });
        console.log('Produto cadastrado:', novoProduto);
        res.redirect('/gerenciar');
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        res.status(500).send(`Erro ao cadastrar produto: ${error.message}`);
    }
});

app.get("/editar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('editarProd', { produto });
    } catch (error) {
        console.error('Erro ao buscar produto para edição:', error);
        res.status(500).send('Erro ao buscar produto para edição.');
    }
});

app.post('/editarProd/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, preco, img } = req.body;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }

        // Atualizar os campos do produto
        produto.nome = nome;
        produto.preco = preco;
        produto.img = img;

        // Salvar as alterações no banco de dados
        await produto.save();

        console.log('Produto editado:', produto);
        res.redirect('/gerenciar'); // Redirecionar para a página de gerenciamento
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        res.status(500).send('Erro ao editar produto.');
    }
});

// Rota para deletar produto
app.get("/deletar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }
        res.render('deletarProd', { produto });
    } catch (error) {
        console.error('Erro ao buscar produto para exclusão:', error);
        res.status(500).send('Erro ao buscar produto para exclusão.');
    }
});

app.post('/deletarProd/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado');
        }

        // Excluir o produto do banco de dados
        await produto.destroy();

        console.log('Produto excluído:', produto);
        res.redirect('/gerenciar'); // Redirecionar para a página de gerenciamento
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).send('Erro ao excluir produto.');
    }
});

// Fazer doação
app.get('/doar', (req, res) => {
    res.render('doar');
});

app.post('/doarLivro', async (req, res) => {
    const {titulo, autor, img, id} = req.body;
    try {
        const novaDoacao = await Livro.create({
            img : img,
            titulo: titulo,
            autor: autor,
            id : id,
        });
        console.log('Livro cadastrado:', novaDoacao);
        res.redirect('/gerenciar');
    } catch (error) {
        console.error('Erro ao cadastrar a doação:', error);
        res.status(500).send('Erro ao cadastrar doação.');
    }
});

app.get("/editarLivro/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).send('Livro não encontrado');
        }
        res.render('editarLivro', { livro });
    } catch (error) {
        console.error('Erro ao buscar livro para edição:', error);
        res.status(500).send('Erro ao buscar livro para edição.');
    }
});

app.post('/editarLivro2/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, img } = req.body;

    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).send('Livro não encontrado');
        }

        // Atualizar os campos do produto
        livro.titulo = titulo;
        livro.autor = autor;
        livro.img = img;

        // Salvar as alterações no banco de dados
        await livro.save();

        console.log('Livro editado:', livro);
        res.redirect('/gerenciar'); // Redirecionar para a página de gerenciamento
    } catch (error) {
        console.error('Erro ao editar livro:', error);
        res.status(500).send('Erro ao editar livro.');
    }
});

// Rota para deletar produto
app.get("/deletarLivro/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).send('Livro não encontrado');
        }
        res.render('deletarLivro', { livro });
    } catch (error) {
        console.error('Erro ao buscar livro para exclusão:', error);
        res.status(500).send('Erro ao buscar livro para exclusão.');
    }
});

app.post('/deletarLivro2/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const livro = await Livro.findByPk(id);
        if (!livro) {
            return res.status(404).send('Livro não encontrado');
        }

        // Excluir o produto do banco de dados
        await livro.destroy();

        console.log('Livro excluído:', livro);
        res.redirect('/gerenciar'); // Redirecionar para a página de gerenciamento
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        res.status(500).send('Erro ao excluir livro.');
    }
});