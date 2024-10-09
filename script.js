// Predefined users (username: password)
const users = [
    { email: 'student1@example.com', password: 'password123' },
    { email: 'student2@example.com', password: 'mypassword' },
    { email: 'abhi1764640@gmail.com', password: 'november202002' } // Added credentials
];

let paymentHistory = []; // This will store payment records

function register(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    // You can implement registration logic here if needed

    alert('Registration successful! You can now log in.');
    document.getElementById('registerForm').reset();
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert('Login successful! You can now proceed to make payments.');
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('paymentContainer').style.display = 'block';
    } else {
        alert('Invalid email or password!');
    }
}

function payWithRazorpay() {
    const studentName = document.getElementById('studentName').value;
    const collegeName = document.getElementById('collegeName').value;
    const amount = document.getElementById('amount').value;

    if (!studentName || !collegeName || !amount) {
        document.getElementById('message').innerText = 'Please fill all fields.';
        return;
    }

    const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay Key ID
        amount: amount * 100,
        currency: 'INR',
        name: 'College Fees',
        description: `Payment for ${collegeName}`,
        handler: function (response) {
            document.getElementById('message').innerText = 
                `Payment of ₹${amount} successful! Payment ID: ${response.razorpay_payment_id}`;
            
            // Add payment record
            paymentHistory.push({ id: response.razorpay_payment_id, amount, collegeName, studentName });
            updatePaymentHistory();
            document.getElementById('paymentForm').reset();
        },
        prefill: {
            name: studentName,
            email: '', // Optional
            contact: '' // Optional
        },
        theme: {
            color: '#007bff'
        }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
}

function updatePaymentHistory() {
    const historyList = document.getElementById('paymentHistory');
    historyList.innerHTML = ''; // Clear previous history
    paymentHistory.forEach(payment => {
        const li = document.createElement('li');
        li.innerText = `Payment ID: ${payment.id}, Amount: ₹${payment.amount}, College: ${payment.collegeName}, Student: ${payment.studentName}`;
        historyList.appendChild(li);
    });
}

function goBack() {
    document.getElementById('paymentContainer').style.display = 'none';
    document.getElementById('authContainer').style.display = 'block';
}

function togglePasswordVisibility(passwordFieldId, iconElement) {
    const passwordField = document.getElementById(passwordFieldId);
    const isPasswordVisible = passwordField.type === 'text';
    passwordField.type = isPasswordVisible ? 'password' : 'text';
    iconElement.textContent = isPasswordVisible ? '👁️' : '👁️‍🗨️'; // Change icon based on visibility
}
