import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, TextField, Grid } from '@material-ui/core';
import './ListaPostagemTitulo.css';
import useLocalStorage from 'react-use-localstorage';
import Postagem from '../../../models/Postagem';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaPostagemTitulo() {

  const [posts, setPosts] = useState<Postagem[]>([])
  //const [token, setToken] = useLocalStorage('token');
  let history = useHistory();
  const [titulo, setTitulo] = useState<string>("")

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      history.push("/login")

    }
  }, [token])

  async function getPost() {
    await busca(`/postagens/titulo/${titulo}`, setPosts, {
      headers: {
        'Authorization': token
      }
    })
  }


  useEffect(() => {

    getPost()

  }, [posts.length])

  function updateTitulo(e: ChangeEvent<HTMLInputElement>) {

    setTitulo(
      e.target.value
    )

  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    getPost();
  }

  return (
    <>
      <form action="" onSubmit={onSubmit}>
        <Box display="flex" justifyContent="center" marginTop={2} marginBottom={2} width="100%">
        <TextField
          label="Título"
          id="titulo"
          value={titulo}
          variant="outlined"
          className="input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => updateTitulo(e)}
        />
        <Button variant="contained"  className="button"  type="submit" color="primary">
          Pesquisar
        </Button>
        </Box>
      </form>

      {
        posts.map(post => (
          <Box m={2} >
              <Card variant="outlined">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Postagens
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {post.titulo}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.texto}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.tema?.descricao}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box display="flex" justifyContent="center" mb={1.5}>

                    <Link to={`/formularioPostagem/${post.id}`} className="text-decorator-none" >
                      <Box mx={1}>
                        <Button variant="contained" className="marginLeft" size='small' color="primary" >
                          atualizar
                        </Button>
                      </Box>
                    </Link>
                    <Link to={`/deletarPostagem/${post.id}`} className="text-decorator-none">
                      <Box mx={1}>
                        <Button variant="contained" size='small' color="secondary">
                          deletar
                        </Button>
                      </Box>
                    </Link>
                  </Box>
                </CardActions>
              </Card>
            </Box>
        ))
       }
  </>
  );
}

export default ListaPostagemTitulo