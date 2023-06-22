
import { useQuery } from '@tanstack/react-query'
import { getClients } from '../API/clientsAPI'
import { Link } from 'react-router-dom';
import { GiCheckMark } from 'react-icons/gi';
import { MdPendingActions } from 'react-icons/md';
import { AiOutlineSchedule } from 'react-icons/ai';
import { GiGears } from 'react-icons/gi'
import { Box, chakra, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import './CompaniesTable.css'

const CompaniesTable = () => {

    const {isLoading,data,isError, error } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    })

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error {error.message}</div>


    const renderStatusIcon = (status) => {
        if (status === 'pending') {
        return <MdPendingActions color="red" size={20}/>;
        } else if (status === 'scheduled') {
        return <AiOutlineSchedule color="orange" size={20}/>;
        } else if (status === 'processing') {
        return <GiGears color="green" size={20}/>;
        } else {
        return null;
    }
  };


  return (
       <Box width="90vw" overflowX="auto">
      <Table variant="simple" border="1px" borderColor="gray.300" style={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Th width="12%" className="column-divider" border="1px" borderColor="gray.300">Company Name</Th>
            <Th width="9%" className="column-divider" border="1px" borderColor="gray.300">Status</Th>
            <Th width="10%" className="column-divider" border="1px" borderColor="gray.300">City</Th>
            <Th width="10%" className="column-divider" border="1px" borderColor="gray.300">Industry / License Type</Th>
            <Th width="10%" className="column-divider" border="1px" borderColor="gray.300">Corp / Sole</Th>
            <Th width="7%" className="column-divider" border="1px" borderColor="gray.300">W.E</Th>
            <Th width="7%" className="column-divider" border="1px" borderColor="gray.300">CSLB</Th>
            <Th width="7%" className="column-divider" border="1px" borderColor="gray.300">O.C</Th>
            <Th width="8%" className="column-divider" border="1px" borderColor="gray.300">Bond</Th>
            <Th width="7%" className="column-divider" border="1px" borderColor="gray.300">W.C</Th>
            <Th width="6%" className="column-divider" border="1px" borderColor="gray.300">L.S</Th>
            <Th width="15%" className="column-divider" border="1px" borderColor="gray.300">Notes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((client) => (
            <Tr key={client.id}>
              <Td border="1px" borderColor="gray.300">
                <chakra.span as={Link} to={`/clients/${client.id}`} color="orange.500">
                  {client.companyName}
                </chakra.span>
              </Td>
              <Td border="1px" borderColor="gray.300">{renderStatusIcon(client.companyStatus)}</Td>
              <Td border="1px" borderColor="gray.300">{client.details.city}</Td>
              <Td border="1px" borderColor="gray.300">{client.details.industryLicenseType}</Td>
              <Td border="1px" borderColor="gray.300">{client.details.corpSole}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.workExperienceForm ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.CSLBAppComplete ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.OnlineCourseSetup ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.Bond ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.WorkersComp ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.statusItems.LiveScan ? <GiCheckMark color="orange" /> : null}</Td>
              <Td border="1px" borderColor="gray.300">{client.details.notes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default CompaniesTable