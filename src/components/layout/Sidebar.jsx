import './Sidebar.css'
import { Link } from "react-router-dom";
import { Text,IconButton } from '@chakra-ui/react';
import { BsBuildingAdd } from 'react-icons/bs'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      {/* Elementos específicos del administrador */}
      <ul>
        <li>User</li>
                <Link to={"/newclient"}>
          <IconButton
            mt={3}
            fontSize="2xl"
            color="gray.500"
            _hover={{ textDecor: "none", backgroundColor: "#ffff" }}
            icon={<BsBuildingAdd />}
          />
          <Text fontSize={10} textAlign="center" color="gray.500">
            Home
          </Text>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;