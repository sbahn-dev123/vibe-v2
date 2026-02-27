//* 일반 몬스터 도감: 층이 올라갈수록 이 목록에서 순서대로 더 강한 몬스터가 등장합니다.
const monsterList = [
    { name: "박쥐", emoji: "🦇", hp: 35, atk: 4 },
    { name: "시궁창 쥐", emoji: "🐀", hp: 38, atk: 4 },
    { name: "작은 거미", emoji: "🕷️", hp: 42, atk: 5 },
    { name: "독버섯", emoji: "🍄", hp: 45, atk: 5 },
    { name: "초록 뱀", emoji: "🐍", hp: 50, atk: 6 },
    { name: "슬라임", emoji: "💧", hp: 55, atk: 6 },
    { name: "늑대", emoji: "🐺", hp: 60, atk: 7 },
    { name: "고블린", emoji: "👺", hp: 65, atk: 7 },
    { name: "선인장", emoji: "🌵", hp: 70, atk: 8 },
    { name: "해골 병사", emoji: "💀", hp: 75, atk: 8 },
    { name: "유령", emoji: "👻", hp: 80, atk: 10 },
    { name: "멧돼지", emoji: "🐗", hp: 85, atk: 10 },
    { name: "거대 게", emoji: "🦀", hp: 90, atk: 11 },
    { name: "좀비", emoji: "🧟", hp: 95, atk: 11 },
    { name: "리자드맨", emoji: "🦎", hp: 100, atk: 12 },
    { name: "하피", emoji: "🦅", hp: 110, atk: 12 },
    { name: "돌 골렘", emoji: "🗿", hp: 120, atk: 14, skill: { type: 'stun', chance: 0.25 } },
    { name: "뱀파이어", emoji: "🧛", hp: 130, atk: 14, skill: { type: 'drain', chance: 0.3 } },
    { name: "늑대인간", emoji: "🐺", hp: 140, atk: 15 },
    { name: "오크 전사", emoji: "👹", hp: 150, atk: 15 },
    { name: "외눈박이 거인", emoji: "👁️", hp: 160, atk: 17 },
    { name: "사막 전갈", emoji: "🦂", hp: 170, atk: 17 },
    { name: "만티코어", emoji: "🦁", hp: 180, atk: 18 },
    { name: "사악한 마법사", emoji: "🧙", hp: 190, atk: 18, skill: { type: 'mp_drain', chance: 0.4, power: 15 } },
    { name: "홉고블린 대장", emoji: "👺", hp: 200, atk: 20 },
    { name: "크라켄", emoji: "🦑", hp: 210, atk: 20 },
    { name: "동굴 트롤", emoji: "👹", hp: 220, atk: 22 },
    { name: "와이번", emoji: "🐉", hp: 230, atk: 22 },
    { name: "히드라", emoji: "🦕", hp: 240, atk: 24 },
    { name: "발록", emoji: "👿", hp: 250, atk: 25 },
    { name: "리치 왕", emoji: "💀", hp: 270, atk: 28 },
    { name: "심연의 마왕", emoji: "😈", hp: 300, atk: 30 },
    { name: "지옥의 사냥개", emoji: "🐕", hp: 320, atk: 32 },
    { name: "그리폰", emoji: "🦅", hp: 340, atk: 34 },
    { name: "골렘 파수꾼", emoji: "🗿", hp: 360, atk: 36 },
    { name: "서큐버스", emoji: "💋", hp: 380, atk: 38, skill: { type: 'drain', chance: 0.3 } },
    { name: "베히모스", emoji: "🦏", hp: 400, atk: 40 },
    { name: "사신", emoji: "💀", hp: 420, atk: 42 },
    { name: "고대의 정령", emoji: "✨", hp: 440, atk: 44 },
    { name: "타락한 성기사", emoji: "🤺", hp: 460, atk: 46, skill: { type: 'stun', chance: 0.25 } },
    { name: "악마 군주", emoji: "👹", hp: 480, atk: 48 },
    { name: "천공의 지배자", emoji: "🌌", hp: 500, atk: 50 },
];

//* 중간 보스 몬스터 도감: 10층, 30층, 50층 등 20층 간격으로 등장하는 특별한 몬스터입니다.
const midBossList = [
    // 10층 보스
    { name: "오크 족장", emoji: "🗿", hp: 115, atk: 22, xp: 380, dropCoins: 200, specialDrop: { type: 'permanent_stat', stat: 'str', value: 5, name: '족장의 전투도끼', sellPrice: 700 } },
    // 30층 보스
    { name: "미노타우르스", emoji: "🐃", hp: 480, atk: 42, xp: 1400, dropCoins: 900, specialDrop: { type: 'permanent_stat', stat: 'vit', value: 7, name: '미노타우르스의 돌심장', sellPrice: 1800 } },
    // 50층 보스
    { name: "키메라", emoji: "🦁", hp: 1380, atk: 105, xp: 3500, dropCoins: 2200, specialDrop: { type: 'xp_bonus', value: 0.30, name: '키메라의 지혜', sellPrice: 4000 } },
    // 70층 보스
    { name: "나가 여왕", emoji: "🐍", hp: 1950, atk: 127, xp: 5500, dropCoins: 3400, specialDrop: { type: 'permanent_stat', stat: 'mnd', value: 10, name: '나가 여왕의 영롱한 비늘', sellPrice: 6500 } },
    // 90층 보스
    { name: "언데드 소서러", emoji: "💀", hp: 2650, atk: 138, xp: 9000, dropCoins: 5500, specialDrop: { type: 'permanent_stat', stat: 'int', value: 10, name: '리치의 영혼석', sellPrice: 10000 } },
    // 110층 보스
    { name: "용암 골렘", emoji: "🌋", hp: 3570, atk: 154, xp: 14500, dropCoins: 8500, specialDrop: { type: 'permanent_stat', stat: 'vit', value: 15, name: '펄펄 끓는 용암의 핵', sellPrice: 15000 } },
    // 130층 보스
    { name: "사막의 폭군", emoji: "🦂", hp: 4490, atk: 182, xp: 20000, dropCoins: 12500, specialDrop: { type: 'permanent_stat', stat: 'agi', value: 15, name: '사막의 신기루', sellPrice: 21000 } },
    // 150층 보스
    { name: "심해의 지배자", emoji: "🦑", hp: 6210, atk: 231, xp: 30000, dropCoins: 19000, specialDrop: { type: 'permanent_stat', stat: 'mnd', value: 18, name: '심해 지배자의 왕관', sellPrice: 33000 } },
    // 170층 보스
    { name: "별의 포식자", emoji: "🌠", hp: 8280, atk: 297, xp: 46000, dropCoins: 28000, specialDrop: { type: 'permanent_stat', stat: 'fcs', value: 18, name: '삼켜진 별의 조각', sellPrice: 48000 } },
    // 190층 보스
    { name: "차원의 방랑자", emoji: "💠", hp: 10580, atk: 385, xp: 68000, dropCoins: 46000, specialDrop: { type: 'permanent_stat', stat: 'luk', value: 18, name: '뒤틀린 차원의 균열', sellPrice: 72000 } },
    // 210층 보스
    { name: "시간의 왜곡자", emoji: "⏳", hp: 13500, atk: 480, xp: 85000, dropCoins: 58000, specialDrop: { type: 'debuff_resistance', value: 0.40, name: '시간의 흐름 제어', sellPrice: 90000 } },
    // 230층 보스
    { name: "공허의 감시자", emoji: "🌌", hp: 17000, atk: 580, xp: 110000, dropCoins: 75000, specialDrop: { type: 'hp_regen_per_turn', value: 25, name: '공허의 생명력', sellPrice: 120000 } },
    // 250층 보스
    { name: "차원의 틈새", emoji: "🕳️", hp: 21000, atk: 700, xp: 140000, dropCoins: 95000, specialDrop: { type: 'bonus_stat_points', value: 2, name: '차원의 조각', sellPrice: 150000 } },
    // 270층 보스
    { name: "우주의 심장", emoji: "💖", hp: 26000, atk: 850, xp: 175000, dropCoins: 120000, specialDrop: { type: 'crit_damage_bonus', value: 0.40, name: '우주의 맥동', sellPrice: 180000 } },
    // 290층 보스
    { name: "태초의 존재", emoji: "🥚", hp: 32000, atk: 1000, xp: 220000, dropCoins: 150000, specialDrop: { type: 'permanent_stat', stat: 'fcs', value: 30, name: '태초의 근원', sellPrice: 250000 } },
];

//* 메인 보스 몬스터 도감: 20층, 40층, 60층 등 20층마다 등장하는 강력한 몬스터입니다.
const bossList = [
    // 20층 보스
    { name: "거대 고블린 왕", emoji: "👑", hp: 345, atk: 30, xp: 1000, dropCoins: 650, skill: { type: 'stun', chance: 0.32, name: '왕의 철퇴' }, specialDrop: { type: 'gold_bonus', value: 0.30, name: '빛나는 탐욕의 왕관', sellPrice: 2000 } },
    // 40층 보스
    { name: "어둠의 기사", emoji: "⚔️", hp: 750, atk: 57, xp: 1900, dropCoins: 1200, skill: { type: 'charge_attack', chance: 0.4, power: 2.5, name: '어둠의 검격' }, specialDrop: { type: 'crit_damage_bonus', value: 0.25, name: '기사의 부서진 검', sellPrice: 3000 } },
    // 60층 보스
    { name: "고대 드래곤", emoji: "🐉", hp: 2070, atk: 121, xp: 4500, dropCoins: 3000, skill: { type: 'charge_attack', chance: 0.45, power: 3, name: '고대의 드래곤 브레스' }, specialDrop: { type: 'permanent_stat', stat: 'vit', value: 18, name: '고대 드래곤의 굳건한 심장', sellPrice: 6000 } },
    // 80층 보스
    { name: "심연의 군주", emoji: "😈", hp: 3105, atk: 143, xp: 7000, dropCoins: 4500, skill: { type: 'mp_drain', chance: 0.55, power: 100, name: '깊은 심연의 속삭임' }, specialDrop: { type: 'hp_regen_per_turn', value: 15, name: '심연의 재생 반지', sellPrice: 9000 } },
    // 100층 보스
    { name: "세계의 파괴자", emoji: "☄️", hp: 3910, atk: 154, xp: 12000, dropCoins: 7000, skill: { type: 'charge_attack', chance: 0.55, power: 3.8, name: '멸망의 운석' }, specialDrop: { type: 'permanent_stat', stat: 'str', value: 18, name: '세계 파괴자의 핵', sellPrice: 15000 } },
    // 120층 보스
    { name: "타락한 천사", emoji: "👼", hp: 5175, atk: 176, xp: 17000, dropCoins: 10000, skill: { type: 'drain', chance: 0.45, name: '타락의 권능' }, specialDrop: { type: 'bonus_stat_points', value: 1, name: '타락한 천사의 축복', sellPrice: 20000 } },
    // 140층 보스
    { name: "강철의 거신병", emoji: "🤖", hp: 6900, atk: 215, xp: 26000, dropCoins: 15000, skill: { type: 'stun', chance: 0.6, name: '초진동 강철 주먹' }, specialDrop: { type: 'permanent_stat', stat: 'vit', value: 25, name: '오버클럭된 거신병의 동력원', sellPrice: 28000 } },
    // 160층 보스
    { name: "우주 장로", emoji: "🐙", hp: 9545, atk: 270, xp: 37000, dropCoins: 22000, skill: { type: 'charge_attack', chance: 0.65, power: 4.2, name: '우주 붕괴' }, specialDrop: { type: 'mp_cost_reduction', value: 0.15, name: '우주의 근원', sellPrice: 45000 } },
    // 180층 보스
    { name: "혼돈의 화신", emoji: "🌀", hp: 12075, atk: 341, xp: 54000, dropCoins: 34000, skill: { type: 'mp_drain', chance: 0.75, power: 250, name: '혼돈의 소용돌이' }, specialDrop: { type: 'debuff_resistance', value: 0.30, name: '혼돈의 방패', sellPrice: 65000 } },
    // 200층 보스
    { name: "종언의 창조주", emoji: "🌌", hp: 17250, atk: 440, xp: 85000, dropCoins: 60000, skill: { type: 'charge_attack', chance: 0.8, power: 5, name: '초신성' }, specialDrop: { type: 'permanent_stat', stat: 'fcs', value: 50, name: '창조주의 절대 권능', sellPrice: 100000 } },
    // 220층 보스
    { name: "무한의 군주", emoji: "♾️", hp: 22000, atk: 550, xp: 110000, dropCoins: 80000, skill: { type: 'charge_attack', chance: 0.82, power: 5.5, name: '무한의 파동' }, specialDrop: { type: 'permanent_stat', stat: 'str', value: 25, name: '무한의 힘', sellPrice: 150000 } },
    // 240층 보스
    { name: "절대자의 그림자", emoji: "👤", hp: 28000, atk: 680, xp: 150000, dropCoins: 110000, skill: { type: 'mp_drain', chance: 0.8, power: 350, name: '그림자 흡수' }, specialDrop: { type: 'permanent_stat', stat: 'mag', value: 25, name: '절대자의 지식', sellPrice: 180000 } },
    // 260층 보스
    { name: "창조의 파편", emoji: "💎", hp: 35000, atk: 800, xp: 200000, dropCoins: 140000, skill: { type: 'stun', chance: 0.85, name: '파편 폭발' }, specialDrop: { type: 'permanent_stat', stat: 'vit', value: 30, name: '창조의 핵', sellPrice: 220000 } },
    // 280층 보스
    { name: "운명의 직조자", emoji: "🕸️", hp: 45000, atk: 950, xp: 260000, dropCoins: 180000, skill: { type: 'drain', chance: 0.7, name: '운명의 실타래' }, specialDrop: { type: 'mp_cost_reduction', value: 0.25, name: '운명의 실', sellPrice: 280000 } },
    // 300층 보스
    { name: "만물의 근원", emoji: "🌟", hp: 60000, atk: 1100, xp: 350000, dropCoins: 250000, skill: { type: 'charge_attack', chance: 0.9, power: 6.5, name: '근원의 폭발' }, specialDrop: { type: 'bonus_stat_points', value: 5, name: '만물의 정수', sellPrice: 400000 } },
];

//* 상점에서 판매하는 방어구 목록: 티어가 높아질수록 성능과 가격이 증가합니다.
const armorList = [
    { name: '누더기 가죽 갑옷', emoji: '🧑‍🌾', maxHpBonus: 22, cost: 130 },
    { name: '견고한 나무 갑옷', emoji: '🪖', maxHpBonus: 45, cost: 350 },
    { name: '강철 사슬 갑옷', emoji: '🛡️', maxHpBonus: 80, cost: 750 },
    { name: '기사의 판금 갑옷', emoji: '🤺', maxHpBonus: 125, cost: 1550 },
    { name: '백은 갑옷', emoji: '🤴', maxHpBonus: 180, cost: 3200 },
    { name: '용비늘 갑옷', emoji: '🐉', maxHpBonus: 250, cost: 7500 },
    { name: '지옥불 갑옷', emoji: '😈', maxHpBonus: 340, cost: 13800 },
    { name: '천상의 수호자 갑옷', emoji: '😇', maxHpBonus: 450, cost: 26500 },
    { name: '심연의 군주 갑옷', emoji: '😈', maxHpBonus: 580, cost: 50000 },
    { name: '창조주의 성의', emoji: '🌌', maxHpBonus: 740, cost: 88000 },
];

//* 상점에서 판매하는 HP 회복 물약 목록
const healPotionList = [
    { name: '낡은 물약', healAmount: 10, cost: 60 },
    { name: '소형 물약', healAmount: 16, cost: 110 },
    { name: '중형 물약', healAmount: 28, cost: 190 },
    { name: '대형 물약', healAmount: 45, cost: 290 },
    { name: '특제 물약', healAmount: 65, cost: 420 },
    { name: '정제된 성수', healAmount: 90, cost: 600 },
    { name: '엘릭서', healAmount: 130, cost: 880 },
    { name: '이그드라실의 수액', healAmount: 180, cost: 1100 },
    { name: '피닉스의 눈물', healAmount: 260, cost: 1350 },
    { name: '생명의 샘물', healAmount: 9999, cost: 1500 },
];

//* 상점에서 판매하는 MP 회복 물약 목록
const mpPotionList = [
    { name: '마나의 이슬', mpAmount: 12, cost: 70 },
    { name: '소형 마나 물약', mpAmount: 24, cost: 155 },
    { name: '중형 마나 물약', mpAmount: 45, cost: 280 },
    { name: '대형 마나 물약', mpAmount: 70, cost: 440 },
    { name: '정신의 비약', mpAmount: 100, cost: 660 },
    { name: '현자의 돌', mpAmount: 140, cost: 1000 },
    { name: '마력의 샘', mpAmount: 200, cost: 1450 },
    { name: '아카식 레코드의 파편', mpAmount: 260, cost: 1750 },
    { name: '공허의 정수', mpAmount: 360, cost: 1900 },
    { name: '세계수의 눈물', mpAmount: 9999, cost: 2000 },
];

//* 상점에서 판매하는 공격력 강화(버프) 물약 목록
const buffPotionList = [
    { name: '흐릿한 힘의 물약', turns: 6, mult: 1.25, cost: 130 },
    { name: '하급 힘의 물약', turns: 6, mult: 1.35, cost: 220 },
    { name: '중급 힘의 물약', turns: 5, mult: 1.5, cost: 500 },
    { name: '상급 힘의 물약', turns: 5, mult: 1.7, cost: 830 },
    { name: '괴력의 비약', turns: 5, mult: 2.3, cost: 1350 },
    { name: '용사의 영약', turns: 5, mult: 2.8, cost: 2200 },
    { name: '거인의 심장', turns: 5, mult: 3.2, cost: 3850 },
    { name: '신의 분노', turns: 3, mult: 3.6, cost: 6000 },
    { name: '혼돈의 비약', turns: 3, mult: 4.5, cost: 8800 },
    { name: '종언의 영약', turns: 3, mult: 5.5, cost: 13500 },
];

//* 상점에서 판매하는 무기 목록
const weaponList = [
    { name: '낡은 단검', emoji: '🔪', atkBonus: 7, cost: 200 },
    { name: '무쇠 도끼', emoji: '🪓', atkBonus: 13, cost: 530 },
    { name: '강철 장검', emoji: '🗡️', atkBonus: 22, cost: 1100 },
    { name: '미스릴 창', emoji: '🔱', atkBonus: 34, cost: 2200 },
    { name: '오리할콘 대검', emoji: '⚔️', atkBonus: 50, cost: 4400 },
    { name: '요도 무라마사', emoji: '👹', atkBonus: 68, cost: 9400 },
    { name: '용살자의 검', emoji: '🐲', atkBonus: 90, cost: 17500 },
    { name: '신검 엑스칼리버', emoji: '✨', atkBonus: 115, cost: 33000 },
    { name: '마검 롱기누스', emoji: '🔱', atkBonus: 150, cost: 57000 },
    { name: '창조주의 검', emoji: '☄️', atkBonus: 200, cost: 105000 },
];

//* 상점에서 판매하는 치명타 확률 증가(버프) 물약 목록
const critPotionList = [
    { name: '약한 집중의 물약', bonus: 7, turns: 5, cost: 130 },
    { name: '집중의 물약', bonus: 11, turns: 5, cost: 280 },
    { name: '강한 집중의 물약', bonus: 20, turns: 5, cost: 480 },
    { name: '예리함의 비약', bonus: 22, turns: 4, cost: 700 },
    { name: '통찰의 영약', bonus: 28, turns: 4, cost: 850 },
    { name: '매의 눈', bonus: 40, turns: 3, cost: 1500 },
    { name: '절대집중', bonus: 55, turns: 3, cost: 2200 },
    { name: '신의 시야', bonus: 70, turns: 2, cost: 3200 },
    { name: '시간의 눈', bonus: 80, turns: 3, cost: 4800 },
    { name: '운명의 실', bonus: 100, turns: 2, cost: 6800 },
];

//* 각 스탯의 이름과 설명을 정의한 객체 (스탯 분배 창에서 사용)
const statInfo = {
    str: { name: '힘', description: '공격력을 2 증가시킵니다.' },
    vit: { name: '체력', description: '최대 체력을 5 증가시킵니다.' },
    mag: { name: '마력', description: '스킬 추가 피해량을 2.0, 층 이동 시 MP 회복량을 3 증가시킵니다.' },
    mnd: { name: '정신력', description: '최대 MP를 5 증가시킵니다.' },
    agi: { name: '민첩', description: '회피 확률을 3% 증가시킵니다.' },
    int: { name: '지혜', description: '골드 획득량을 2% 증가시킵니다.' },
    luk: { name: '집중', description: '치명타 확률을 0.7% 증가시킵니다.' },
    fcs: { name: '고도의 집중', description: '흑섬 확률을 0.4% 증가시킵니다.'}
};