import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import { getCountryDataList } from 'countries-list';

export default function NewEmployee() {

    //^-------------------------------------------------------------------------------------------------------------------------------------//
    //^ all form variables
    // personal variables:
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [gender, setGender] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [birthPlace, setBirthPlace] = useState();
    const [nationality, setNationality] = useState("Italy");
    const countryList = getCountryDataList();
    const [permitId, setPermitId] = useState();
    const [idNumber, setIdNumber] = useState();
    const [taxId, settaxId] = useState();
    const [personalMail, setPersonalMail] = useState();
    const [phoneNumber, setphoneNumber] = useState();

    // Residence variables:
    const [state, setState] = useState();
    const [region, setRegion] = useState();
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [capNumber, setCapNumber] = useState();

    // contract variables:
    const [department, setDepartment] = useState();
    const [salary, setSalary] = useState();
    const [companyMail, setCompanyMail] = useState();
    const [contractLevel, setContractLevel] = useState();
    const [role, setRole] = useState();
    const [workingHours, setWorkingHours] = useState();
    const [contractType, setContractType] = useState();
    const [hireDate, setHireDate] = useState();
    const [contractExpiry, setContractExpiry] = useState();
    const [isAdmin, setIsAdmin] = useState(false);





    //^-------------------------------------------------------------------------------------------------------------------------------------//
    // submit function
    const [validated, setValidated] = useState(false);
    const token = localStorage.getItem("token");
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const payload = {
            name: name,
            last_name: lastName,
            personal_mail: personalMail,
            date_of_birth: dateOfBirth,
            phone_number: phoneNumber,
            gender: gender,
            birth_place: birthPlace,
            nationality: nationality,
            residency_permit_number: permitId,
            identity_card_number: idNumber,
            tax_id: taxId,
            residence: {
                state: state,
                region: region,
                city: city,
                street: street,
                house_number: houseNumber,
                cap_number: capNumber
            },
            hire_date: hireDate,
            department: department,
            salary: salary,
            contract_level: contractLevel,
            role: role,
            working_hours: workingHours,
            contract_type: contractType,
            contract_expiry: contractExpiry,
            company_mail: companyMail,
            isAdmin: isAdmin
        }

        try {
            console.log(process.env.REACT_APP_API_URL);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/newemployee`, {
                method: 'POST',
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Si è verificato un errore:', error);
        }

    };

    // show residence permit input for the user
    function checkNationality(event) {
        const newNationality = event.target.value;
        setNationality(newNationality);
        if (newNationality !== "Italy") {
            document.getElementById("permit-number-input").classList.remove("d-none");
        } else {
            document.getElementById("permit-number-input").classList.add("d-none");
        }
    };








    return (
        <div className='bg-dark py-5'>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    {/*------------------------------------------- personal info ---------------------------------------------  */}
                    <div>
                        <h3 className='my-3'>Personal Information:</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>First name *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="First name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Last name *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setLastName(e.target.value)}
                                    value={lastName}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="Last name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Gender *</Form.Label>
                                <Form.Select
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>Date of birth *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    value={dateOfBirth}
                                    data-bs-theme="dark"
                                    required
                                    type="date"
                                    placeholder="Last name"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Birth place *</Form.Label>
                                <Form.Select
                                    onChange={(e) => setBirthPlace(e.target.value)}
                                    value={birthPlace}
                                    required
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="Birth place"
                                >
                                    <option value="">Select Nationality</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Nationality *</Form.Label>
                                <Form.Select
                                    onChange={(e) => checkNationality(e)}
                                    value={nationality}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select Nationality</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </Form.Select>

                            </Form.Group>
                            <Form.Group id='permit-number-input' className='d-none' as={Col} md="3">
                                <Form.Label>Residency permit number *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setPermitId(e.target.value)}
                                    value={permitId}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="ID Card Number"
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="3">
                                <Form.Label>ID Card Number *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setIdNumber(e.target.value)}
                                    value={idNumber}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="ID Card Number"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Tax ID *</Form.Label>
                                <Form.Control
                                    onChange={(e) => settaxId(e.target.value)}
                                    value={taxId}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="Tax ID"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Personal mail *</Form.Label>
                                <Form.Control onChange={(e) => setPersonalMail(e.target.value)}
                                    value={personalMail}
                                    data-bs-theme="dark"
                                    required
                                    type="text"
                                    placeholder="Personal mail"
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3">
                                <Form.Label>Phone number *</Form.Label>
                                <Form.Control
                                    onChange={(e) => setphoneNumber(e.target.value)}
                                    value={phoneNumber}
                                    data-bs-theme="dark"
                                    required
                                    type="number"
                                    placeholder="Phone number"
                                />
                            </Form.Group>
                        </Row>
                    </div>


                    {/*------------------------------------------- Residence ---------------------------------------------  */}
                    <div>
                        <h3 className='mt-5'>Residence:</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setState(e.target.value) }}
                                    value={state}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="State"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Region</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setRegion(e.target.value) }}
                                    value={region}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="Region"
                                    required />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setCity(e.target.value) }}
                                    value={city}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="City"
                                    required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="8">
                                <Form.Label>Street</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setStreet(e.target.value) }}
                                    value={street}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="Street"
                                    required />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>House number</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setHouseNumber(e.target.value) }}
                                    value={houseNumber}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="House number"
                                    required />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setCapNumber(e.target.value) }}
                                    value={capNumber}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="Zip"
                                    required />
                            </Form.Group>
                        </Row>
                    </div>


                    {/*------------------------------------------- Contract Information ---------------------------------------------  */}
                    <div>
                        <h3 className='mt-5'>Contract Information:</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4">
                                <Form.Label>Department *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setDepartment(e.target.value) }}
                                    value={department}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value="Green Power">Green Power</option>
                                    <option value="Telecomunication">Telecomunication</option>
                                    <option value="Environmental">Environmental</option>
                                    <option value="Stracture engineering">Stracture engineering</option>
                                    <option value="Permit">Permit</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Salary *</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setSalary(e.target.value) }}
                                    value={salary}
                                    data-bs-theme="dark"
                                    min={0}
                                    type="number"
                                    placeholder="Salary"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="4">
                                <Form.Label>Company mail *</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setCompanyMail(e.target.value) }}
                                    value={companyMail}
                                    data-bs-theme="dark"
                                    type="text"
                                    placeholder="Company mail"
                                    required
                                />
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>Contract level *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setContractLevel(e.target.value) }}
                                    value={contractLevel}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value="Q">Q</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3S">3S</option>
                                    <option value="3">3</option>
                                    <option value="4S">4S</option>
                                    <option value="4">4</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Role *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setRole(e.target.value) }}
                                    value={role}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value="Project Manger">Project Manger</option>
                                    <option value="Employee">Employee</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Working hours *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setWorkingHours(e.target.value) }}
                                    value={workingHours}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value="Full time">Full time</option>
                                    <option value="Part time">Part time</option>

                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Contract type *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setContractType(e.target.value) }}
                                    value={contractType}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value="Period contract">Period contract</option>
                                    <option value="Permanent contract">Permanent contract</option>
                                    <option value="Unit price contract">Unit price contract</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Hire date *</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setHireDate(e.target.value) }}
                                    value={hireDate}
                                    data-bs-theme="dark"
                                    type="date"
                                    placeholder="Hire date"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Contract expiry *</Form.Label>
                                <Form.Control
                                    onChange={(e) => { setContractExpiry(e.target.value) }}
                                    value={contractExpiry}
                                    data-bs-theme="dark"
                                    type="date"
                                    placeholder="Contract expiry"
                                    required
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="2">
                                <Form.Label>Admin Profile? *</Form.Label>
                                <Form.Select
                                    onChange={(e) => { setIsAdmin(e.target.value) }}
                                    value={isAdmin}
                                    data-bs-theme="dark"
                                    required
                                >
                                    <option value="">Select one</option>
                                    <option value={true}>Yes</option>
                                    <option value={false}>No</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </div>


                    <Button className="mt-5" type="submit">Add Employee</Button>
                </Form>
            </Container>
        </div>
    );
}
