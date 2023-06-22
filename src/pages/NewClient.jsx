import { useMutation } from '@tanstack/react-query'; 
import  { createClient} from '../API/clientsAPI';
import { useEffect, useState } from 'react';
import { fetchAccessToken } from '../helpers/auth'
import { fetchStates,fetchCities } from '../helpers/api'
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  Text,
  Checkbox,
  Stack
} from '@chakra-ui/react';
import { BsBuildingAdd } from 'react-icons/bs';
import { GiCheckMark } from 'react-icons/gi';
import Layout from '../components/layout/Layout';

const NewClient = () => {
  const [authToken, setAuthToken] = useState('');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [clients, setClients] = useState([]);
  const [workExpForm, setWorkExpForm] = useState(false);
  const [cslbComplete, setCslbComplete] = useState(false);
  const [onlineCourse, setOnlineCourse] = useState(false);
  const [bond, setBond] = useState(false);
  const [workersComp, setWorkersComp] = useState(false);
  const [liveScan, setLiveScan] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const addClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
        console.log('client added');
    }
  })

  useEffect(() => {
    fetchAccessToken()
      .then(token => {
        setAuthToken(token);
      })
      .catch(error => {
        console.log('Error al obtener el token de autenticación: ' + error);
      });
  }, []);

  useEffect(() => {
    const country = 'United States';
    if (authToken) {
      fetchStates(authToken, country)
        .then(data => {
          setStates(data);
        })
        .catch(error => {
          console.log('Error al obtener la lista de países: ' + error);
        });
    }
  }, [authToken]);

  const handleStateSelection = ({ target }) => {
    const state = target.value;
    setState(state);
    setSelectedState(state);
    if (authToken) {
      fetchCities(authToken, state)
        .then(data => {
          setCities(data);
        })
        .catch(error => {
          console.log('Error al obtener la lista de ciudades: ' + error);
        });
    }
  };

  const handleCitySelection = e => {
    const city = e.target.value;
    setCity(city);
    setSelectedCity(city);
  };

  const handleAddContact = () => {
    const newContact = {
      name: contactName,
      email: email,
      phone: phoneInput
    };

    setClients(prevClients => [...prevClients, newContact]);

    // Limpiar los campos después de agregar un cliente
    setContactName('');
    setEmail('');
    setPhoneInput('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    const companyDetails = {
      industryLicenseType: document.getElementById('industryLicenseType').value,
      corpSole: document.getElementById('corpSole').value,
      state: state,
      city: city,
      address: address,
      zipcode: zip,
      phone: phone,
      contacts: clients,
    };

    const statusItems = {
      workExperienceForm: workExpForm,
      CSLBAppComplete: cslbComplete,
      OnlineCourseSetup: onlineCourse,
      Bond: bond,
      WorkersComp: workersComp,
      LiveScan: liveScan
    };

    const company = {
      companyName: document.getElementById('companyName').value,
      companyStatus: document.getElementById('companyStatus').value,
      details: companyDetails,
      statusItems: statusItems,
      conversations:[],
      activities:{
        list:[],
        tasks:[],
        appointments:[],
        milestones:[],
        notes:[]
      }
    };

    // Aquí puedes enviar el objeto 'company' a la base de datos
    console.log(company);
    addClientMutation.mutate(company)

    // Limpiar los campos después de enviar el formulario
    document.getElementById('companyName').value = '';
    document.getElementById('companyStatus').value = '';
    document.getElementById('industryLicenseType').value = '';

    setSelectedState("");
    setSelectedCity("");
    setClients([]);
    setWorkExpForm(false);
    setCslbComplete(false);
    setOnlineCourse(false);
    setBond(false);
    setWorkersComp(false);
    setLiveScan(false);
    setState('');
    setCity('');
    setAddress('');
    setZip('');
    setPhone('');
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Heading align="center" color="gray.600" mt={2}>
          New client
        </Heading>
        <Box ml={5} mr={5}>
          <Flex gap="2" mt={2}>
            <InputGroup flex="7">
              <InputLeftElement pointerEvents="none" color="gray.400">
                <BsBuildingAdd color="gray.300" />
              </InputLeftElement>
              <Input
                id="companyName"
                type="tel"
                placeholder="Company Name"
                focusBorderColor="orange.400"
              />
            </InputGroup>
            <InputGroup flex="4">
              <Select
                id="companyStatus"
                placeholder="Select status"
                color="gray.400"
                focusBorderColor="orange.400"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="scheduled">Scheduled</option>
              </Select>
            </InputGroup>
          </Flex>
          <Flex gap="2" mt={2}>
            <InputGroup flex="7">
              <InputLeftElement pointerEvents="none" color="gray.400">
                <BsBuildingAdd color="gray.300" />
              </InputLeftElement>
              <Input
                id="industryLicenseType"
                type="tel"
                placeholder="Bussiness Industry Type"
                focusBorderColor="orange.400"
              />
            </InputGroup>
            <InputGroup flex="4">
              <Select
                id="corpSole"
                placeholder="Corp sole"
                color="gray.400"
                focusBorderColor="orange.400"
              >
                <option value="corporation">Corporation</option>
                <option value="sole">Sole Propietorship</option>
              </Select>
            </InputGroup>
          </Flex>
          <Flex gap="2" mt={2}>
            <InputGroup flex="2">
              <Select
                placeholder="Select a state"
                onChange={handleStateSelection}
                color="gray.400"
                value={selectedState}
              >
                {states.map(state => (
                  <option key={state.state_name} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup flex="2">
              <Select
                placeholder="Select a city"
                onChange={handleCitySelection}
                color="gray.400"
                value={selectedCity}
              >
                {cities.map(city => (
                  <option key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <InputGroup flex="4">
              <Input
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                color="gray.400"
              />
            </InputGroup>
            <InputGroup flex="1">
              <Input
                placeholder="Zip Code"
                value={zip}
                onChange={e => setZip(e.target.value)}
                color="gray.400"
              />
            </InputGroup>
            <InputGroup flex="1.5">
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                color="gray.400"
              />
            </InputGroup>
          </Flex>

          {clients.map((client, index) => (
            <Flex
              key={index}
              gap={20}
              border="solid 1px lightgray"
              p={2}
              mt={2}
              mb={2}
              borderRadius="md"
              bg="gray.200"
            >
              <Text color="orange.400">Added:</Text>
              <Text color="gray.500">Contact Name: {client.contactName}</Text>
              <Text color="gray.500">Email: {client.email}</Text>
              <Text color="gray.500">Phone:{client.phone}</Text>
              <Text color="gray.500">
                <GiCheckMark />
              </Text>
            </Flex>
          ))}

          <Flex gap="2" mt={2}>
            <Input
              placeholder="Contact Name"
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              color="gray.400"
              flex="4"
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              color="gray.400"
              type="email"
              flex="3"
            />
            <Input
              placeholder="Phone Number"
              value={phoneInput}
              onChange={e => setPhoneInput(e.target.value)}
              color="gray.400"
              type="tel"
              flex="2"
            />
            <Button onClick={handleAddContact} flex="3" colorScheme="orange" variant="outline">
              Add Client
            </Button>
          </Flex>
          <Box border="1px" borderColor="gray.200" mt={2} p={4}>
            <Text color="gray.500">Status Items:</Text>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={workExpForm}
                onChange={e => setWorkExpForm(e.target.checked)}
              >
                Work Exp Form
              </Checkbox>

              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={cslbComplete}
                onChange={e => setCslbComplete(e.target.checked)}
              >
                CSLB Complete
              </Checkbox>

              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={onlineCourse}
                onChange={e => setOnlineCourse(e.target.checked)}
              >
                Online Course
              </Checkbox>

              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={bond}
                onChange={e => setBond(e.target.checked)}
              >
                Bond
              </Checkbox>

              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={workersComp}
                onChange={e => setWorkersComp(e.target.checked)}
              >
                Workers Comp
              </Checkbox>

              <Checkbox
                size="md"
                color="gray.500"
                colorScheme="orange"
                isChecked={liveScan}
                onChange={e => setLiveScan(e.target.checked)}
              >
                Live Scan
              </Checkbox>
            </Stack>
          </Box>
          <Flex justify="center" mt={4}>
            <Button
              type="submit"
              colorScheme="orange"
              borderRadius="full"
              px={8}
              py={4}
              fontSize="md"
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </form>
    </Layout>
  );
};

export default NewClient;
