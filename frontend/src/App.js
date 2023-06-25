import './static/App.css';
import React from 'react';
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import NotFound from './components/NotFound';
import AuthContainer from './containers/AuthContainer';
import DashboardContainer from './containers/DashboardContainer';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import userStore from './store/userStore';

const App = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    userStore.checkUser();
  }, [])

  return (
    <Routes>
      <Route path="*" element={<NotFound navigate={navigate} />} />
      <Route path="/" element={userStore.loggedIn ? <DashboardContainer /> : <Navigate to="/auth" />} />
      <Route exact path="auth" element={<AuthContainer navigate={navigate} />} />
    </Routes>
  )

  // // перечисляем переменные юзера, кнопок и полей
  // const [currentUser, setCurrentUser] = useState();
  // const [registrationToggle, setRegistrationToggle] = useState(false);
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');

  // переодически делаем запрос по этому эндпоинту, чтобы удостовериться, что мы залогинены (если вернётся ошибка, то указываем, что не залогинены)
  // useEffect(() => {
  //   client.get("auth/user/")
  //     .then(function (res) {
  //       setCurrentUser(true);
  //     })
  //     .catch(function (error) {
  //       setCurrentUser(false);
  //     })
  // }, []);

  // это функция кнопки, которая переключает формы регистрации и логина
  // function update_form_btn() {
  //   if (registrationToggle) {
  //     document.getElementById("form_btn").innerHTML = "Register";
  //     setRegistrationToggle(false);
  //   } else {
  //     document.getElementById("form_btn").innerHTML = "Log in";
  //     setRegistrationToggle(true);
  //   }
  // }

  // функция регистрации (бэкенд также автоматически логинит, когда происходит регистрация)
  // function submitRegistration(e) {
  //   e.preventDefault();
  //   client.post(
  //     "auth/register/",
  //     {
  //       email: email,
  //       name: name,
  //       password: password
  //     }
  //   ).then(function (res) {
  //     setCurrentUser(true)
  //   });
  // }

  // функция логина
  // function submitLogin(e) {
  //   e.preventDefault();
  //   client.post(
  //     "auth/login/",
  //     {
  //       email: email,
  //       password: password
  //     }
  //   ).then(function (res) {
  //     setCurrentUser(true);
  //   });
  // }

  // функция логаута
  // function submitLogout(e) {
  //   e.preventDefault();
  //   client.post(
  //     "auth/logout/",
  //     { withCredentials: true }
  //   ).then(function (res) {
  //     setCurrentUser(false);
  //   });
  // }

  //   // выбираем навигационную панель из двух вариантов, в зависимости от того, залогинены ли мы или нет
  //   if (currentUser) {
  //     return (
  //       <div>
  //         <Navbar bg="dark" variant="dark">
  //           <Container>
  //             <Navbar.Brand>Application Tracker</Navbar.Brand>
  //             <Navbar.Toggle />
  //             <Navbar.Collapse className="justify-content-end">
  //               <Navbar.Text>
  //                 <form onSubmit={e => submitLogout(e)}>
  //                   <Button type="submit" variant="light">Log out</Button>
  //                 </form>
  //               </Navbar.Text>
  //             </Navbar.Collapse>
  //           </Container>
  //         </Navbar>
  //         <div className="center">
  //           <h2>You're logged in!</h2>
  //         </div>
  //       </div>
  //     )
  //   }
  //   return (
  //     <div>
  //       <Navbar bg="dark" variant="dark">
  //         <Container>
  //           <Navbar.Brand>Application Tracker</Navbar.Brand>
  //           <Navbar.Toggle />
  //           <Navbar.Collapse className="justify-content-end">
  //             <Navbar.Text>
  //               <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
  //             </Navbar.Text>
  //           </Navbar.Collapse>
  //         </Container>
  //       </Navbar>
  //       {
  //         registrationToggle ? (
  //           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="center">
  //             <Form onSubmit={e => submitRegistration(e)}>
  //               <Form.Group className="mb-3" controlId="formBasicEmail">
  //                 <Form.Label>Email address</Form.Label>
  //                 <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
  //                 <Form.Text className="text-muted">
  //                   We'll never share your email with anyone else.
  //                 </Form.Text>
  //               </Form.Group>
  //               <Form.Group className="mb-3" controlId="formBasicUsername">
  //                 <Form.Label>Name</Form.Label>
  //                 <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
  //               </Form.Group>
  //               <Form.Group className="mb-3" controlId="formBasicPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
  //               </Form.Group>
  //               <Button variant="primary" type="submit">
  //                 Submit
  //               </Button>
  //             </Form>
  //           </div>
  //         ) : (
  //           <div className="center">
  //             <Form onSubmit={e => submitLogin(e)}>
  //               <Form.Group className="mb-3" controlId="formBasicEmail">
  //                 <Form.Label>Email address</Form.Label>
  //                 <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
  //                 <Form.Text className="text-muted">
  //                   We'll never share your email with anyone else.
  //                 </Form.Text>
  //               </Form.Group>
  //               <Form.Group className="mb-3" controlId="formBasicPassword">
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
  //               </Form.Group>
  //               <Button variant="primary" type="submit">
  //                 Submit
  //               </Button>
  //             </Form>
  //           </div>
  //         )
  //       }
  //     </div>
  //   );
})

export default App;
