//puxando o prisma
const prisma = require('../../prisma/prismaClient');

const cadastrar = async(req, res)=>{

    const { nome, funcao, dosagem} = req.body;

    try {
        // Verifica se já existe um remedio com o mesmo nome
        const remedioExistente = await prisma.remedio.findFirst({
            where:{
                nome:nome,
            },
        });

        if(remedioExistente)
        {
            return res.status(400).json({error:'Remedio já cadastrado'})
        }
        
        // Se o remedio não existe, cria o novo remedio
        const novoRemedio = await prisma.remedio.create({
            data: {
                nome,
                funcao,
                dosagem: parseFloat(dosagem),
                status:true
            }
        });
        res.status(201).json(novoRemedio);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(400).json({ error: `Erro ao criar remedio: ${error.message}` });
    }
}


// Função para deletar um usuário pelo ID
const deletar = async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.remedio.update({
            where: { id: parseInt(id) },
            data:{status:false} // Altera o status para falso (remedio "deletado")
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar remedio' });
    }
};

// Função para retornar todos os remedios
const getRemedios = async (req,res)=>{
    try {
        // Busca todos os usuários do banco
        const remedios = await prisma.remedio.findMany({
            where:{status:true},
        });
        res.status(200).json(remedios);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(500).json({ error: 'Erro ao buscar remedios' });
    }
}






//exportando routes
module.exports ={
    cadastrar,
    deletar,
    getRemedios
}