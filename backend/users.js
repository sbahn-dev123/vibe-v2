const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('./auth');
const admin = require('./admin'); // 관리자 미들웨어 추가
// User Model
const User = require('./User');
const Score = require('./Score'); // Score 모델을 가져옵니다.

// @route   POST api/users/register
// @desc    Register new user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, password, email, country, birthdate } = req.body;

    // Simple validation
    if (!username || !password || !email || !country || !birthdate) {
        return res.status(400).json({ message: '모든 필드를 채워주세요.' });
    }

    // 생년월일 유효성 검사 추가
    if (isNaN(new Date(birthdate).getTime())) {
        return res.status(400).json({ message: '유효하지 않은 생년월일 형식입니다.' });
    }

    try {
        // Check for existing user
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: '이미 존재하는 사용자 이름입니다.' });
        }

        // Check for existing email
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
        }

        user = new User({
            username,
            password,
            email,
            country,
            birthdate
        });

        // Create salt & hash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.json({
            message: '회원가입 성공!'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/login
// @desc    Auth user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).json({ message: '모든 필드를 채워주세요.' });
    }

    try {
        // Check for existing user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        }

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role // 역할(role) 정보 추가
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' }, // 1 day
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    username: user.username,
                    role: user.role // 역할 정보도 응답에 포함
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        // .select('-password')를 사용하여 응답에서 비밀번호 필드를 제외합니다.
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { email, country, birthdate, currentPassword, newPassword } = req.body;

    // 유효성 검사
    if (!email || !country || !birthdate || !currentPassword) {
        return res.status(400).json({ message: '필수 필드를 모두 입력해주세요.' });
    }

    // 생년월일 유효성 검사 추가
    if (isNaN(new Date(birthdate).getTime())) {
        return res.status(400).json({ message: '유효하지 않은 생년월일 형식입니다.' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 현재 비밀번호 확인
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
        }

        // 다른 사용자가 이미 사용 중인 이메일인지 확인
        if (email !== user.email) {
            const existingEmailUser = await User.findOne({ email });
            if (existingEmailUser) {
                return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
            }
        }

        // 필드 업데이트
        user.email = email;
        user.country = country;
        user.birthdate = birthdate;

        // 새 비밀번호가 제공된 경우 업데이트
        if (newPassword) {
            if (newPassword.length < 4) { // 예시: 최소 4자
                return res.status(400).json({ message: '새 비밀번호는 4자 이상이어야 합니다.' });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        await user.save();

        res.json({ message: '프로필이 성공적으로 업데이트되었습니다.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//! ============================================================
//! 관리자 전용 API
//! ============================================================

// @route   GET api/users/admin/all
// @desc    Get all users (for admin)
// @access  Admin
router.get('/admin/all', admin, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ register_date: -1 });
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/admin/:id
// @desc    Update a user by ID (for admin)
// @access  Admin
router.put('/admin/:id', admin, async (req, res) => {
    const { username, email, country, birthdate, role } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 필드 업데이트
        user.username = username || user.username;
        user.email = email || user.email;
        user.country = country || user.country;
        user.birthdate = birthdate || user.birthdate;
        user.role = role || user.role;

        await user.save();
        res.json({ message: '사용자 정보가 업데이트되었습니다.' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/users/admin/:id
// @desc    Delete a user by ID (for admin)
// @access  Admin
router.delete('/admin/:id', admin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
        await user.remove();
        res.json({ message: '사용자가 삭제되었습니다.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/users/admin/reset-score/:id
// @desc    관리자가 사용자의 스코어를 초기화
// @access  Private/Admin
router.post('/admin/reset-score/:id', [auth, admin], async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 사용자와 연결된 스코어 문서를 찾습니다.
        const scoreRecord = await Score.findOne({ user: req.params.id });

        if (scoreRecord) {
            // 스코어가 존재하면 0으로 리셋하고 저장합니다.
            scoreRecord.score = 0;
            scoreRecord.liveFloor = 0; // 실시간 층수도 초기화
            await scoreRecord.save();
        }
        // 스코어 기록이 없으면 아무것도 할 필요가 없습니다.

        res.json({ message: `'${user.username}' 사용자의 스코어가 성공적으로 초기화되었습니다.` });

    } catch (error) {
        console.error('Score reset error:', error.message);
        res.status(500).send('서버 오류가 발생했습니다.');
    }
});

/**
 * POST /api/users/find-id
 * 이메일과 생년월일로 아이디를 찾습니다.
 */
router.post('/find-id', async (req, res) => {
    const { email, birthdate } = req.body;

    if (!email || !birthdate) {
        return res.status(400).json({ success: false, message: '이메일과 생년월일을 모두 입력해주세요.' });
    }

    try {
        const user = await User.findOne({ email, birthdate });

        if (!user) {
            return res.status(404).json({ success: false, message: '일치하는 사용자 정보가 없습니다.' });
        }

        res.json({ success: true, username: user.username });

    } catch (error) {
        console.error('아이디 찾기 중 서버 오류:', error);
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.' });
    }
});

/**
 * POST /api/users/reset-password
 * 이메일과 생년월일로 비밀번호를 초기화합니다.
 */
router.post('/reset-password', async (req, res) => {
    const { email, birthdate } = req.body;

    if (!email || !birthdate) {
        return res.status(400).json({ success: false, message: '이메일과 생년월일을 모두 입력해주세요.' });
    }

    try {
        const user = await User.findOne({ email, birthdate });

        if (!user) {
            return res.status(404).json({ success: false, message: '일치하는 사용자 정보가 없습니다.' });
        }

        // 1. 8자리의 임시 비밀번호 생성
        const newPassword = Math.random().toString(36).slice(-8);

        // 2. 비밀번호를 안전하게 해싱
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // 3. DB에 해시된 비밀번호로 업데이트
        user.password = hashedPassword;
        await user.save();

        // 4. 생성된 임시 비밀번호(평문)를 프론트엔드로 전송
        res.json({ success: true, newPassword: newPassword });

    } catch (error) {
        console.error('비밀번호 초기화 중 서버 오류:', error);
        res.status(500).json({ success: false, message: '서버에서 오류가 발생했습니다.' });
    }
});

module.exports = router;