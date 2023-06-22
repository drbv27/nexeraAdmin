
import Layout from '../components/layout/Layout';
import CompaniesTable from '../components/CompaniesTable';
import { Box } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Layout>
      <Box m={2}>
        <h1>Dashboard</h1>
        <CompaniesTable/>
      </Box>
    </Layout>
  );
};

export default Dashboard;