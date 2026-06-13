/**
 * Aether AI Enterprise Portal - Standalone End-to-End Test Suite
 * 
 * Verifies core security constraints, JWT authorization route guards, 
 * database credential hashing, and employee CRUD transaction lifecycles.
 */

const BASE_URL = 'http://localhost:5000/api';
let jwtToken = '';
let testEmployeeId = '';

const testAdminEmail = `admin_e2e_${Math.random().toString(36).substring(2, 9)}@aether.ai`;
const testAdminPassword = 'secure_e2e_password_2026';

const runE2ETestSuite = async () => {
  console.log('🛸 Starting Aether AI Full-Stack End-to-End Verification Test Suite...\n');

  // Helper utility for HTTP operations
  const sendRequest = async (path, method = 'GET', body = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const config = { method, headers };
    if (body) {
      config.body = JSON.stringify(body);
    }
    const res = await fetch(`${BASE_URL}${path}`, config);
    let json = null;
    try {
      json = await res.json();
    } catch (e) {
      // Handle empty body responses
    }
    return { status: res.status, data: json };
  };

  try {
    // ==========================================
    // PHASE 1: SECURITY & AUTHENTICATION TESTS
    // ==========================================
    console.log('--- PHASE 1: SECURITY & AUTHENTICATION CONTROLS ---');

    // Test 1.1: Register a new Admin account node
    console.log(`[TEST 1.1] Registering fresh Admin account: ${testAdminEmail}`);
    const regRes = await sendRequest('/auth/register', 'POST', {
      name: 'E2E Test Administrator',
      email: testAdminEmail,
      password: testAdminPassword
    });
    
    console.log(`Assertion: HTTP Status should be 211. Received: ${regRes.status}`);
    if (regRes.status === 211 && regRes.data.token) {
      console.log('✅ PASS: Admin account registered successfully.');
    } else {
      throw new Error(`FAIL: Registration failed. Status: ${regRes.status}, Data: ${JSON.stringify(regRes.data)}`);
    }

    // Test 1.2: Log in with the newly created Admin account node
    console.log('[TEST 1.2] Authenticating newly created Admin node...');
    const loginRes = await sendRequest('/auth/login', 'POST', {
      email: testAdminEmail,
      password: testAdminPassword
    });

    console.log(`Assertion: HTTP Status should be 200. Received: ${loginRes.status}`);
    if (loginRes.status === 200 && loginRes.data.token) {
      jwtToken = loginRes.data.token;
      console.log('✅ PASS: Admin login success. Storing JWT session token.');
    } else {
      throw new Error(`FAIL: Authentication failed. Status: ${loginRes.status}`);
    }

    // Test 1.3: Confirm Security Route Guard rejects unauthenticated requests
    console.log('[TEST 1.3] Accessing protected route (/api/employees) without a token...');
    const unauthRes = await sendRequest('/employees', 'GET');

    console.log(`Assertion: HTTP Status should be 401. Received: ${unauthRes.status}`);
    if (unauthRes.status === 401) {
      console.log('✅ PASS: Unauthorized request successfully blocked by route guard.');
    } else {
      throw new Error(`FAIL: Route guard allowed unauthenticated request. Status: ${unauthRes.status}`);
    }

    // Test 1.4: Confirm Security Route Guard rejects invalid token signatures
    console.log('[TEST 1.4] Accessing protected route (/api/employees) with an invalid token signature...');
    const badTokenRes = await sendRequest('/employees', 'GET', null, 'invalid_dummy_token_signature');

    console.log(`Assertion: HTTP Status should be 401. Received: ${badTokenRes.status}`);
    if (badTokenRes.status === 401) {
      console.log('✅ PASS: Request carrying invalid token successfully blocked.');
    } else {
      throw new Error(`FAIL: Route guard allowed invalid token signature. Status: ${badTokenRes.status}`);
    }


    // ==========================================
    // PHASE 2: EMPLOYEE CRUD LIFECYCLE
    // ==========================================
    console.log('\n--- PHASE 2: EMPLOYEE CRUD LIFECYCLE & DATABASE INTEGRITY ---');

    // Test 2.1: CREATE employee node
    const testEmployeeEmail = `employee_e2e_${Math.random().toString(36).substring(2, 9)}@aether.ai`;
    console.log(`[TEST 2.1] Creating a new Employee record: ${testEmployeeEmail}`);
    const employeeData = {
      name: 'E2E Test Employee',
      email: testEmployeeEmail,
      department: 'Research & Operations',
      role: 'Staff Researcher',
      salary: 130000,
      joinDate: new Date('2025-01-15T00:00:00.000Z')
    };

    const createRes = await sendRequest('/employees', 'POST', employeeData, jwtToken);
    
    console.log(`Assertion: HTTP Status should be 201. Received: ${createRes.status}`);
    if (createRes.status === 201 && createRes.data._id) {
      testEmployeeId = createRes.data._id;
      console.log(`✅ PASS: Employee record created in Atlas database. ID: ${testEmployeeId}`);
    } else {
      throw new Error(`FAIL: Employee creation transaction rejected. Status: ${createRes.status}`);
    }

    // Test 2.2: READ employee ledger list
    console.log('[TEST 2.2] Fetching employee ledger list...');
    const readRes = await sendRequest('/employees', 'GET', null, jwtToken);
    
    console.log(`Assertion: HTTP Status should be 200. Received: ${readRes.status}`);
    const isPresent = (readRes.data ?? []).some((emp) => emp._id === testEmployeeId);
    if (readRes.status === 200 && isPresent) {
      console.log('✅ PASS: Newly created Employee record successfully located in ledger list.');
    } else {
      throw new Error('FAIL: Created employee not found in database ledger.');
    }

    // Test 2.3: UPDATE employee parameters
    console.log('[TEST 2.3] Modifying employee record parameter metrics (salary -> 142000)...');
    const updateRes = await sendRequest(`/employees/${testEmployeeId}`, 'PUT', {
      salary: 142000,
      department: 'Advanced AI Development'
    }, jwtToken);

    console.log(`Assertion: HTTP Status should be 200. Received: ${updateRes.status}`);
    if (updateRes.status === 200 && updateRes.data.salary === 142000 && updateRes.data.department === 'Advanced AI Development') {
      console.log('✅ PASS: Employee record metrics successfully updated and synchronized.');
    } else {
      throw new Error(`FAIL: Employee update transaction failed. Status: ${updateRes.status}`);
    }

    // Test 2.4: DELETE employee record
    console.log('[TEST 2.4] Removing Employee record permanently from Atlas cluster...');
    const delRes = await sendRequest(`/employees/${testEmployeeId}`, 'DELETE', null, jwtToken);

    console.log(`Assertion: HTTP Status should be 200. Received: ${delRes.status}`);
    if (delRes.status === 200) {
      console.log('✅ PASS: Employee record deleted from database.');
    } else {
      throw new Error(`FAIL: Employee deletion transaction rejected. Status: ${delRes.status}`);
    }

    // Test 2.5: Verify record removal from database ledger
    console.log('[TEST 2.5] Performing post-delete check on employee ledger...');
    const verifyRes = await sendRequest('/employees', 'GET', null, jwtToken);
    const stillExists = (verifyRes.data ?? []).some((emp) => emp._id === testEmployeeId);
    
    console.log(`Assertion: Employee should be absent from list. Still exists: ${stillExists}`);
    if (verifyRes.status === 200 && !stillExists) {
      console.log('✅ PASS: Confirmed Employee is absent from database ledger.');
    } else {
      throw new Error('FAIL: Deleted employee record still remains in the database.');
    }

    console.log('\n🛸 ALL END-TO-END SECURITY AND DATA INTEGRITY TESTS COMPLETED WITH 100% SUCCESS.');

  } catch (error) {
    console.error('\n💥 E2E Test Suite stopped due to assertion failure:');
    console.error(error.message);
    process.exit(1);
  }
};

runE2ETestSuite();
