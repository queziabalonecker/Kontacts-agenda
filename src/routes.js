import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import useGlobalContext from './hooks/useGlobalContext';
import { ContactsProvider } from './context/ContactsContext';

function Routes() {
  const ProtectedRoutes = (props) => {
    const { token } = useGlobalContext();

    return (
      <Route render={() => (token ? props.children : <Redirect to='/' />)} />
    );
  };
  return (
    <GlobalProvider>
      <Router>
        <Route path={['/', '/signIn']} exact component={SignIn} />
        <Route path={'/signUp'} exact component={SignUp} />
        <ProtectedRoutes>
          <ContactsProvider>
            <Route path={'/Home'} exact component={Home}></Route>
          </ContactsProvider>
        </ProtectedRoutes>
      </Router>
    </GlobalProvider>
  );
}

export default Routes;
