class Tabelas
{
	init(conexao)
	{
		this.conexao = conexao
		console.log("Tabelas iniciado")
		this.criarAtendimentos()
	}

	criarAtendimentos()
	{
		const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id INT NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, status VARCHAR(20) NOT NULL, observacoes TEXT, data detetime NOT NULL, dataCriacao datetime NOT NULL PRIMARY KEY(id))'
		this.conexao.query(sql, (erro) =>
		{
			if(erro)
			{
				console.log(erro)
			}
			else
			{
				console.log("Tabela Atendimentos criada com sucesso")
			}
		})
	}
}

module.exports = new Tabelas