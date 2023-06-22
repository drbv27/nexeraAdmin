import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { getClients } from '../API/clientsAPI';
import Layout from '../components/layout/Layout';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const ClientDetails = () => {
    const { id } = useParams();
    const clientId = parseInt(id, 10);
    const {isLoading,data,isError, error } = useQuery({
        queryKey: ['clients'],
        queryFn: getClients
    })
    const client = data.find((client)=> client.id === clientId)
    const [companyName, setCompanyName] = useState(client.companyName);
    const [companyStatus, setCompanyStatus] = useState(client.companyStatus);
    const [contacts, setContacts] = useState(client.details.contacts);
    const [addressDetails, setAddressDetails] = useState({
        address: client.details.address,
        city: client.details.city,
        state: client.details.state,
        zipcode: client.details.zipcode,
        phone: client.details.phone
    });
    const [industryLicenseType, setIndustryLicenseType] = useState(client.details.industryLicenseType);
    const [corpSole, setCorpSole] = useState(client.details.corpSole);

    const [workExperienceForm, setWorkExperienceForm] = useState(client.statusItems.workExperienceForm);
    const [CSLBAppComplete, setCSLBAppComplete] = useState(client.statusItems.CSLBAppComplete);
    const [onlineCourseSetup, setOnlineCourseSetup] = useState(client.statusItems.OnlineCourseSetup);
    const [bond, setBond] = useState(client.statusItems.Bond);
    const [workersComp, setWorkersComp] = useState(client.statusItems.WorkersComp);
    const [liveScan, setLiveScan] = useState(client.statusItems.LiveScan);

    if (isLoading) return <div>Loading...</div>
    else if (isError) return <div>Error {error.message}</div>

    console.log(data.find((client)=> client.id === clientId));



  const handleWorkExperienceFormChange = (event) => {
    setWorkExperienceForm(event.target.value);
  };

  const handleCSLBAppCompleteChange = (event) => {
    setCSLBAppComplete(event.target.value);
  };

  const handleOnlineCourseSetupChange = (event) => {
    setOnlineCourseSetup(event.target.value);
  };

  const handleBondChange = (event) => {
    setBond(event.target.value);
  };

  const handleWorkersCompChange = (event) => {
    setWorkersComp(event.target.value);
  };

  const handleLiveScanChange = (event) => {
    setLiveScan(event.target.value);
  };


  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyStatusChange = (event) => {
    setCompanyStatus(event.target.value);
  };

  const handleContactChange = (index, field, value) => {
    setContacts((prevContacts) => {
      const updatedContacts = [...prevContacts];
      updatedContacts[index] = {
        ...updatedContacts[index],
        [field]: value,
      };
      return updatedContacts;
    });
  };

  const handleAddressDetailsChange = (field, value) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleIndustryLicenseTypeChange = (event) => {
    setIndustryLicenseType(event.target.value);
  };

  const handleCorpSoleChange = (event) => {
    setCorpSole(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('Nuevo valor de Company Name:', companyName);
    console.log('Nuevo valor de Address Details:', addressDetails);
    console.log('Contactos modificados:', contacts);
    console.log('Nuevo valor de Industry License Type:', industryLicenseType);
    console.log('Nuevo valor de Corp Sole:', corpSole);

  };

  if (!client) {
    return <div>No se encontró el cliente.</div>;
  }

  return (
    <Layout>
      <Flex h='100%'>
        <Box m={2} flex='5' bg='gray.50' align='center' style={{ height: '100vh', maxHeight: '100%', overflow: 'auto' }}>
          <Heading size='md'>Company Profile</Heading>
          <form onSubmit={handleFormSubmit}>
            <FormControl border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
              <FormLabel htmlFor='companyName'>Company Name</FormLabel>
              <InputGroup>
                <Input
                  type='text'
                  id='companyName'
                  value={companyName}
                  onChange={handleCompanyNameChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
              <FormLabel htmlFor='companyStatus'>Company Status</FormLabel>
              <Select
                id='companyStatus'
                value={companyStatus}
                onChange={handleCompanyStatusChange}
              >
                <option value='pending'>Pending</option>
                <option value='scheduled'>Scheduled</option>
                <option value='processing'>Processing</option>
              </Select>
            </FormControl>
            <Box border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
              <FormLabel htmlFor='industryLicenseType'>Business</FormLabel>
              <FormControl>
                <FormLabel htmlFor='industryLicenseType'>Industry License Type</FormLabel>
                <InputGroup>
                  <Input
                    type='text'
                    id='industryLicenseType'
                    value={industryLicenseType}
                    onChange={handleIndustryLicenseTypeChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='corpSole'>Corp Sole</FormLabel>
                <InputGroup>
                  <Input
                    type='text'
                    id='corpSole'
                    value={corpSole}
                    onChange={handleCorpSoleChange}
                  />
                </InputGroup>
              </FormControl>
            </Box>
            <Box border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
                <FormLabel htmlFor='NONE'>Address Details</FormLabel>
                <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                        address/city/state/zip
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                    <FormControl>
                        <FormLabel htmlFor='address'>Address</FormLabel>
                        <InputGroup>
                        <Input
                            type='text'
                            id='address'
                            value={addressDetails.address}
                            onChange={(e) =>
                            handleAddressDetailsChange('address', e.target.value)
                            }
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='city'>City</FormLabel>
                        <InputGroup>
                        <Input
                            type='text'
                            id='city'
                            value={addressDetails.city}
                            onChange={(e) =>
                            handleAddressDetailsChange('city', e.target.value)
                            }
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='state'>State</FormLabel>
                        <InputGroup>
                        <Input
                            type='text'
                            id='state'
                            value={addressDetails.state}
                            onChange={(e) =>
                            handleAddressDetailsChange('state', e.target.value)
                            }
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='zipcode'>ZIP</FormLabel>
                        <InputGroup>
                        <Input
                            type='text'
                            id='zipcode'
                            value={addressDetails.zipcode}
                            onChange={(e) =>
                            handleAddressDetailsChange('zipcode', e.target.value)
                            }
                        />
                        </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='phone'>Phone</FormLabel>
                        <InputGroup>
                        <Input
                            type='text'
                            id='phone'
                            value={addressDetails.phone}
                            onChange={(e) =>
                            handleAddressDetailsChange('phone', e.target.value)
                            }
                        />
                        </InputGroup>
                    </FormControl>
                    </AccordionPanel>
                </AccordionItem>
                </Accordion>
            </Box>
            <Box border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
                <FormLabel htmlFor='none'>Contacts</FormLabel>
                <Accordion allowToggle>
                {contacts.map((contact, index) => (
                    <AccordionItem key={index}>
                    <h2>
                        <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {contact.name}
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <FormControl>
                        <FormLabel htmlFor={`name-${index}`}>Name</FormLabel>
                        <Input
                            id={`name-${index}`}
                            value={contact.name}
                            onChange={(e) =>
                            handleContactChange(index, 'name', e.target.value)
                            }
                        />
                        </FormControl>
                        <FormControl>
                        <FormLabel htmlFor={`email-${index}`}>Email</FormLabel>
                        <Input
                            id={`email-${index}`}
                            value={contact.email}
                            onChange={(e) =>
                            handleContactChange(index, 'email', e.target.value)
                            }
                        />
                        </FormControl>
                        <FormControl>
                        <FormLabel htmlFor={`phone-${index}`}>Phone</FormLabel>
                        <Input
                            id={`phone-${index}`}
                            value={contact.phone}
                            onChange={(e) =>
                            handleContactChange(index, 'phone', e.target.value)
                            }
                        />
                        </FormControl>
                    </AccordionPanel>
                    </AccordionItem>
                ))}
                </Accordion>
            </Box>


            <Box border='solid 1px lightgray' p={2} mt={1} borderRadius='md'>
              <FormLabel htmlFor='none'>Status Items</FormLabel>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        Status Items
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <FormControl>
                      <FormLabel htmlFor='workExperienceForm'>Work Experience Form</FormLabel>
                      <Select
                        id='workExperienceForm'
                        value={workExperienceForm}
                        onChange={handleWorkExperienceFormChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='CSLBAppComplete'>CSLB App Complete</FormLabel>
                      <Select
                        id='CSLBAppComplete'
                        value={CSLBAppComplete}
                        onChange={handleCSLBAppCompleteChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='onlineCourseSetup'>Online Course Setup</FormLabel>
                      <Select
                        id='onlineCourseSetup'
                        value={onlineCourseSetup}
                        onChange={handleOnlineCourseSetupChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='bond'>Bond</FormLabel>
                      <Select
                        id='bond'
                        value={bond}
                        onChange={handleBondChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='workersComp'>Workers Comp</FormLabel>
                      <Select
                        id='workersComp'
                        value={workersComp}
                        onChange={handleWorkersCompChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='liveScan'>Live Scan</FormLabel>
                      <Select
                        id='liveScan'
                        value={liveScan}
                        onChange={handleLiveScanChange}
                      >
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </Select>
                    </FormControl>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>


            <Button type='submit'>Save</Button>
          </form>
        </Box>
        <Box m={2} flex='7' align='center'>
          <Heading size='md'>Chat</Heading>
        </Box>
        <Box m={2} flex='5' bg='gray.50' align='center'>
          <Heading size='md'>Activities</Heading>
          <Tabs>
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Layout>
  );
}

export default ClientDetails