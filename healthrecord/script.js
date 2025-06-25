const patients = {};
const patientIdToBlockchainId = {}; 

async function generateBlockchainId(patientData) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(patientData)));
    return Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function addPatient() {
    const id = document.getElementById('patient-id').value;
    const name = document.getElementById('patient-name').value;
    const dob = document.getElementById('patient-dob').value;
    const gender = document.getElementById('patient-gender').value;
    const contact = document.getElementById('patient-contact').value;
    const history = document.getElementById('patient-history').value;
    const medications = document.getElementById('patient-medications').value;
    const appointments = document.getElementById('patient-appointments').value;
    const doctor = document.getElementById('assign-doctor').value;

    if (id && name && dob && gender && contact) {
        const patientData = { id, name, dob, gender, contact, history, medications, appointments, doctor };
        generateBlockchainId(patientData).then(blockchainId => {
            
            patients[blockchainId] = patientData;
            patientIdToBlockchainId[id] = blockchainId; 

            alert('Patient added successfully with Blockchain ID!');
            document.querySelectorAll('#add-patient input, #add-patient textarea').forEach(input => input.value = '');
            document.getElementById('assign-doctor').value = '';
        });
    } else {
        alert('Please fill in all required fields.');
    }
}

function viewPatient() {
    const id = document.getElementById('search-id').value;
    const blockchainId = patientIdToBlockchainId[id];

    if (blockchainId) {
        const record = patients[blockchainId]; 

        document.getElementById('patient-record').style.display = 'block';
        document.getElementById('record-name').textContent = `Full Name: ${record.name}`;
        document.getElementById('record-dob').textContent = `Date of Birth: ${record.dob}`;
        document.getElementById('record-gender').textContent = `Gender: ${record.gender}`;
        document.getElementById('record-contact').textContent = `Contact Number: ${record.contact}`;
        document.getElementById('record-history').textContent = `Medical History: ${record.history}`;
        document.getElementById('record-medications').textContent = `Current Medications: ${record.medications}`;
        document.getElementById('record-appointments').textContent = `Appointment Date: ${record.appointments}`;
        document.getElementById('record-doctor').textContent = `Doctor Assigned: ${record.doctor}`;
        document.getElementById('record-blockchain-id').textContent = `Blockchain ID: ${blockchainId}`; 
    } else {
        alert('Patient record not found.');
    }
}
