import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://bp2022.herokuapp.com'
})

/**
 * 
 * @param url -> Url do recurso
 * @param dados -> Objeto JSON da Requisição 
 * @param setDado -> Objeto JSON de Resposta
 * async -> Função assincrona que espera a resposta do servidor para continuar a execução
 * api.post -> Método Post
 * setDado -> Inseres a Resposta na variável setDado
 */

export const cadastroUsuario = async(url: any,dados: any,setDado: any) => { 
    const resposta = await api.post(url,dados)
    setDado(resposta.data)
}

export const login = async(url: any,dados: any,setDado: any) => { 
    const resposta = await api.post(url,dados)
    setDado(resposta.data.token)
}

// Busca Postagem e Tema (Envia o token no Cabeçalho)
export const busca = async(url: any,setDado: any, header: any) => { 
    const resposta = await api.get(url,header)
    setDado(resposta.data)
}