const API_URL = '/api';
let allUsers = []; // To store user data locally

// --- Helper Functions ---
function getAuthHeaders() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('jwt');
    if (token) {
        headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
}

/**
 * 국가 코드를 국기 이미지 HTML로 변환하는 함수
 * @param {string} countryCode - 'KR', 'US' 등의 국가 코드
 * @returns {string} - <img> 태그 문자열
 */
function getFlagImgHtml(countryCode) {
    if (!countryCode) return '';
    if (countryCode.toUpperCase() === 'ETC') return '<span class="flag-icon">🌐</span>'; // 기타 국가는 이모지 사용
    const code = countryCode.toLowerCase();
    return `<img src="https://flagcdn.com/w20/${code}.png" srcset="https://flagcdn.com/w40/${code}.png 2x" width="20" alt="${countryCode}" class="flag-icon">`;
}

// --- Modal Control ---
const editModal = document.getElementById('edit-user-modal');

function openEditModal(userId) {
    const user = allUsers.find(u => u._id === userId);
    if (!user) return;

    document.getElementById('edit-user-id').value = user._id;
    document.getElementById('edit-username').value = user.username;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-country').value = user.country;
    document.getElementById('edit-role').value = user.role;
    
    const birthDate = new Date(user.birthdate);
    if (!isNaN(birthDate.getTime())) {
        document.getElementById('edit-birthdate').value = birthDate.toISOString().split('T')[0];
    } else {
        document.getElementById('edit-birthdate').value = '';
    }

    document.getElementById('edit-error-msg').textContent = '';
    editModal.style.display = 'flex';
}

function closeEditModal() {
    editModal.style.display = 'none';
}

/**
 * 입력된 검색어로 사용자 목록을 필터링하고 다시 렌더링합니다.
 */
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredUsers = allUsers.filter(user => 
        (user.username && user.username.toLowerCase().includes(searchTerm)) ||
        (user.email && user.email.toLowerCase().includes(searchTerm))
    );
    renderUserList(filteredUsers);
}

// --- API Calls ---
async function fetchAllUsers() {
    try {
        const response = await fetch(`${API_URL}/users/admin/all`, {
            headers: getAuthHeaders()
        });
        if (response.status === 403) {
            alert('접근 권한이 없습니다. 관리자 계정으로 로그인해주세요.');
            window.location.href = '/';
            return;
        }
        if (!response.ok) {
            throw new Error('사용자 목록을 불러오는데 실패했습니다.');
        }
        allUsers = await response.json();
        renderUserList(allUsers);
    } catch (error) {
        alert(error.message);
        window.location.href = '/';
    }
}

async function handleUpdateUser(event) {
    event.preventDefault();
    const userId = document.getElementById('edit-user-id').value;
    const errorMsgEl = document.getElementById('edit-error-msg');

    const payload = {
        username: document.getElementById('edit-username').value,
        email: document.getElementById('edit-email').value,
        country: document.getElementById('edit-country').value,
        birthdate: document.getElementById('edit-birthdate').value,
        role: document.getElementById('edit-role').value,
    };

    try {
        const response = await fetch(`${API_URL}/users/admin/${userId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || '업데이트에 실패했습니다.');
        }
        alert('사용자 정보가 성공적으로 수정되었습니다.');
        closeEditModal();
        fetchAllUsers(); // 목록 새로고침
    } catch (error) {
        errorMsgEl.textContent = error.message;
    }
}

async function handleResetScore(userId) {
    const user = allUsers.find(u => u._id === userId);
    if (!confirm(`정말로 '${user.username}' 사용자의 스코어를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/admin/reset-score/${userId}`, {
            method: 'POST',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || '스코어 초기화에 실패했습니다.');
        }
        alert(`'${user.username}' 사용자의 스코어가 초기화되었습니다.`);
        // The list doesn't show scores, so no need to refresh.
    } catch (error) {
        alert(error.message);
    }
}

async function handleDeleteUser(userId) {
    const user = allUsers.find(u => u._id === userId);
    if (!confirm(`정말로 '${user.username}' 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users/admin/${userId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || '삭제에 실패했습니다.');
        }
        alert('사용자가 삭제되었습니다.');
        fetchAllUsers(); // 목록 새로고침
    } catch (error) {
        alert(error.message);
    }
}

// --- Rendering ---
function renderUserList(usersToRender) {
    const userListBody = document.getElementById('user-list');
    const userCountEl = document.getElementById('user-count');
    
    userListBody.innerHTML = '';
    userCountEl.textContent = usersToRender.length;

    usersToRender.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${getFlagImgHtml(user.country)} ${user.country}</td>
            <td>${formatDate(user.birthdate)}</td>
            <td>${user.role}</td>
            <td>${formatDate(user.register_date)}</td>
            <td>
                <button class="btn btn-edit" onclick="openEditModal('${user._id}')">수정</button>
                <button class="btn btn-delete" onclick="handleDeleteUser('${user._id}')">삭제</button>
                <button class="btn btn-reset" style="background-color: #f59e0b;" onclick="handleResetScore('${user._id}')">스코어 초기화</button>
            </td>
        `;
        userListBody.appendChild(row);
    });
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Admin check
    if (localStorage.getItem('userRole') !== 'admin') {
        alert('접근 권한이 없습니다.');
        window.location.href = '/';
        return;
    }

    fetchAllUsers();

    document.getElementById('edit-user-form').addEventListener('submit', handleUpdateUser);

    // --- 검색 기능 이벤트 리스너 ---
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');

    // 입력할 때마다 실시간으로 검색
    searchInput.addEventListener('input', performSearch);

    // Enter 키를 눌렀을 때 검색
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // 검색 버튼 클릭 시 검색
    searchButton.addEventListener('click', performSearch);
});