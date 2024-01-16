import { useNavigate } from "react-router-dom";
import Button from '../buttons/Button';
import logo from '../../assets/logo.svg';

import './Header.css';


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt='The Gaming Company' title='The Gaming Company' className='logo' />
      <div className="headerRight">
          <nav>
            <Button onClick={()=> navigate('/')} title='Color Memory'></Button>
            <Button onClick={()=> navigate('/Tenzies')} title='Tenzies'></Button>
          </nav>
        </div>
        </div>
    </header>
  );
};

export default Header;