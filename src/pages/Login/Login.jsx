import React, { useState } from 'react';
import { userAuthentication } from '../../hooks/userAuthentication'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { setUserProperties } from 'firebase/analytics';
import { useEffect } from 'react';

const Login = () => {
  const { auth } = userAuthentication();
  const { signInWithEmailAndPassword } = userAuthentication();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { loginUser, error: authError, loading } = userAuthentication();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
const user = {
  email, password
};
const res = await loginUser(user);

if(res){
  navigate('/')
} else {
  setError('Email ou senha errados')
}
};
useEffect(()=>{
  if(authError){
    setError(authError)
  }
},[authError])



return (
  <div>
    <form onSubmit={handleLogin}>
      <label>
        <span>E-mail: </span>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entre com seu e-mail"
        />
      </label>
      <label>
        <span>Senha: </span>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entre com sua senha"
        />
      </label>
      {!loading && <button className="btn">Login</button>}
      {loading && <button className="btn" disabled>Aguarde...</button>}
      {error && <p className="error">{error}</p>}
    </form>
  </div>
);
};

export default Login;
