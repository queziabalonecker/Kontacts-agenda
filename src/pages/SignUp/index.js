import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import signInImage from '../../assets/imagem-cadastro.png';
import useGlobalContext from '../../hooks/useGlobalContext';
import useRequests from '../../hooks/useRequests';
import './styles.css';

const SignUp = () => {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const { loading, setLoading } = useGlobalContext();
  const requests = useRequests();
  const history = useHistory();

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.id]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await requests.post('usuarios', form);
    setLoading(false);

    if (result) {
      history.push('/signIn');
    }
  };

  return (
    <>
      <div className='container-page-signUp'>
        <div className='container-signUp'>
          <div className='signUp'>
            <h1>Cadastre-se</h1>
            <form onSubmit={handleSubmit} action='submit'>
              <input
                id='nome'
                type='text'
                placeholder='Nome'
                autoComplete='off'
                onChange={(event) => handleChange(event)}
                value={form.nome}
              />

              <input
                id='email'
                type='text'
                placeholder='E-mail'
                autoComplete='off'
                onChange={(event) => handleChange(event)}
                value={form.email}
              />

              <input
                id='senha'
                type='password'
                placeholder='Senha'
                onChange={(event) => handleChange(event)}
                value={form.senha}
              />

              <button className='btn-signUp'>CADASTRAR</button>
              <button className='btn-cancel' onClick={() => history.push('/')}>
                CANCELAR
              </button>
            </form>
          </div>
          <div className='to-signIn'>
            <span>Já tem cadastro?</span>
            <Link to='/signIn'>Clique aqui!</Link>
          </div>
          {loading && (
            <CircularProgress
              style={{
                color: 'green',
                position: 'absolute',
                right: '48%',
                bottom: '20rem',
                opacity: '0.4',
              }}
            />
          )}
        </div>
        <img className='signUp-image' src={signInImage} alt='' />
      </div>
    </>
  );
};
export default SignUp;
