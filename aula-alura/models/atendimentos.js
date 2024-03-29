const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento
{
	adiciona(atendimento, res)
	{
		const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
		const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

		const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
		const clienteEhValido = atendimento.cliente.length > 4

		const validacoes = [
			{
				 nome: 'data'
				,valido: dataEhValida
				,mensagem: 'Não se pode agendar para o passado'
			},
			{
				 nome: 'cliente'
				,valido: clienteEhValido
				,mensagem: 'Nome deve ter pelo menos 5 caracteres'
			}
		]

		const erros = validacoes.filter(campo => !campo.valido)

		const existemErros = erros.length

		if(existemErros)
		{
			res.status(400).json(erros)
		}
		else
		{
			const atendimentoDatado = {...atendimento, dataCriacao, data}
			const sql = 'INSERT INTO Atendimentos SET ?'

			conexao.query(sql, atendimentoDatado, (erro, resultados) => 
			{
				if(erro)
				{
					res.status(400).json(erro)
				}
				else
				{
					const id = resultados.insertId
					res.status(201).json({...atendimento, id})
				}
			})
		}
		
	}

	lista(res)
	{
		const sql = 'SELECT * FROM Atendimentos'

		conexao.query(sql, (erro, resultados) =>
		{
			if(erro)
			{
				res.status(400).json(erro)
			}
			else
			{
				res.status(200).json(resultados)
			}
		})
	}

	buscaPorId(id, res)
	{
		const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
		conexao.query(sql, (erro, resultados) =>
		{
			if(erro)
			{
				res.status(400).json(erro)
			}
			else
			{
				const atendimento = resultados[0]
				res.status(200).json(atendimento)
			}
		})
	}

	altera(id, valores, res)
	{
		if(valores.data)
		{
			valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
		}
		const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

		conexao.query(sql, [valores, id], (erro, resultados) =>
		{
			if(erro)
			{
				res.status(400).json(erro)
			}
			else
			{
				res.status(200).json({...valores, id})
			}
		})
	}

	delete(id, res)
	{
		const sql = 'DELETE FROM Atendimentos WHERE id=?'

		conexao.query(sql, id, (erro, resultados) =>
		{
			if(erro)
			{
				res.status(400).json(erro)
			}
			else
			{
				res.status(200).json(resultados)
			}
		})
	}
}

module.exports = new Atendimento