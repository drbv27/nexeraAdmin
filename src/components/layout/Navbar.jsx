import styled from '@emotion/styled';
import Logo from '../../assets/img/NexeraAdvisors-logo.png'
import './Navbar.css'

const Nav  = styled.nav`
        height: 10vh;
    width: 98.7vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-bottom: 1px solid gray;
    box-shadow: 0px 0px 10px gray;
    padding: 0px 4px 0px 4px;
`

const Navbar = () => {
  return (
    <Nav>
      {/* Botones comunes */}
      <div>
        <img src={Logo} alt="" />
      </div>
      <button>Mi Perfil</button>
      {/* Renderizar otros botones según el tipo de usuario */}
    </Nav>
  );
};

export default Navbar;