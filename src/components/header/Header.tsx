import Button from '../buttons/Button';
import logo from '../../assets/logo.svg';

import './Header.css';


const Header = () => {

  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt='The Gaming Company' title='The Gaming Company' className='logo' />
      <div className="headerRight">
          <nav>
            <Button title='User'></Button>
          </nav>
        </div>
        </div>
    </header>
  );
};

export default Header;