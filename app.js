// Grow A Grade Plus - Core Application JavaScript

// 1. Database Simulation (using LocalStorage)
const DB = {
  get(table) {
    const data = localStorage.getItem(`growplus_${table}`);
    return data ? JSON.parse(data) : null;
  },
  set(table, data) {
    localStorage.setItem(`growplus_${table}`, JSON.stringify(data));
  },
  init() {
    // Check and seed tables if empty
    if (!this.get('users')) {
      this.set('users', [
        { username: 's12345', email: 'student@example.com', password: '123', role: 'student', displayName: 'สมชาย เรียนดี' },
        { username: 'baanวิศวกรรมศาสตร์', email: 'eng@growplus.com', password: '123', role: 'house_teacher', displayName: 'ครูสมศักดิ์ (บ้านวิศวกรรม)' },
        { username: 'baanวิทยาศาสตร์สุขภาพ', email: 'health@growplus.com', password: '123', role: 'house_teacher', displayName: 'ครูพิมใจ (บ้านวิทยฯ สุขภาพ)' },
        { username: 'T12345678', email: 'guidance@growplus.com', password: '123', role: 'guidance_teacher', displayName: 'ครูแนะแนวสายใจ' }
      ]);
    }
    
    if (!this.get('students')) {
      this.set('students', [
        { username: 's12345', learningPlan: 'วิทยาศาสตร์-คณิตศาสตร์' }
      ]);
    }

    if (!this.get('student_houses')) {
      this.set('student_houses', [
        { studentUsername: 's12345', houseId: 2 } // บ้านวิศวกรรมศาสตร์
      ]);
    }

    if (!this.get('student_targets')) {
      this.set('student_targets', [
        { studentUsername: 's12345', university: 'เทคโนโลยีพระจอมเกล้าธนบุรี', faculty: 'คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์  ' }
      ]);
    }

    if (!this.get('student_pretests')) {
      this.set('student_pretests', [
        { studentUsername: 's12345', houseId: 2, score: 65, status: 'completed' }
      ]);
    }

    if (!this.get('student_grades')) {
      // Seed some grades for s12345
      this.set('student_grades', [
        { studentUsername: 's12345', subjectName: 'คณิตศาสตร์พื้นฐาน', subjectGroup: 'คณิตศาสตร์', grade: 3.5, credit: 1.0, level: 'มัธยมศึกษาปีที่4', term: 'เทอมหนึ่ง' },
        { studentUsername: 's12345', subjectName: 'ฟิสิกส์พื้นฐาน', subjectGroup: 'วิทยาศาสตร์', grade: 2.5, credit: 1.5, level: 'มัธยมศึกษาปีที่4', term: 'เทอมหนึ่ง' },
        { studentUsername: 's12345', subjectName: 'ภาษาอังกฤษ', subjectGroup: 'ภาษาต่างประเทศ', grade: 3.0, credit: 1.0, level: 'มัธยมศึกษาปีที่4', term: 'เทอมหนึ่ง' }
      ]);
    }

    if (!this.get('study_plans')) {
      this.set('study_plans', [
        { id: 1, studentUsername: 's12345', taskTitle: 'ทบทวนสูตรฟิสิกส์ เรื่อง กลศาสตร์', targetDate: '2026-06-25', isCompleted: false },
        { id: 2, studentUsername: 's12345', taskTitle: 'ฝึกทำโจทย์ TPAT3 ข้อสอบเก่าปี 66', targetDate: '2026-06-28', isCompleted: true }
      ]);
    }

    if (!this.get('practice_logs')) {
      this.set('practice_logs', [
        { studentUsername: 's12345', practicedDate: '2026-06-16' },
        { studentUsername: 's12345', practicedDate: '2026-06-17' },
        { studentUsername: 's12345', practicedDate: '2026-06-18' }
      ]);
    }

    if (!this.get('forum_threads')) {
      this.set('forum_threads', [
        { id: 1, houseId: 2, title: 'โจทย์ฟิสิกส์เรื่องรอกข้อนี้คิดยังไงครับ?', content: 'มีมวล 5kg แขวนไว้บนรอกไม่มีความฝืด ต้องการหาความเร่งเมื่อปล่อยมือ...', authorUsername: 's12345', createdAt: new Date('2026-06-18T10:00:00').toISOString() }
      ]);
    }

    if (!this.get('forum_replies')) {
      this.set('forum_replies', [
        { id: 1, threadId: 1, content: 'ให้เขียน Free Body Diagram ของมวลแต่ละตัวแยกกันก่อนครับ จากนั้นตั้งสมการ F = ma ของแต่ละตัวแล้วจับมาลบกันเพื่อตัดแรงตึงเชือก T ออก จะได้ความเร่งออกมาครับ', authorUsername: 'baanวิศวกรรมศาสตร์', createdAt: new Date('2026-06-18T11:30:00').toISOString() }
      ]);
    }
  }
};

DB.init();

// Houses Data Definition (The 9 Houses)
const HOUSES = [
  { id: 1, name: 'บ้านวิทยาศาสตร์สุขภาพ', description: 'เกี่ยวข้องกับวิทยาศาสตร์ แพทย์ เภสัช พยาบาล ทันตะ สหเวช สัตวแพทย์', colorTheme: '#E89BB6', faculties: ['แพทย์', 'เภสัช', 'พยาบาล', 'ทันต', 'สหเวช', 'สัตวแพทย์', 'จิตวิทยา', 'การแพทย์'] },
  { id: 2, name: 'บ้านวิศวกรรมศาสตร์', description: 'วิศวกรรมศาสตร์ เทคโนโลยีสารสนเทศ และนวัตกรรมเทคโนโลยี', colorTheme: '#7CADD3', faculties: ['วิศวกรรม', 'คอมพิวเตอร์', 'สารสนเทศ', 'เทคโนโลยี', 'การบิน'] },
  { id: 3, name: 'บ้านธุรกิจ', description: 'พาณิชยศาสตร์และการบัญชี บริหารธุรกิจ เศรษฐศาสตร์ วิทยาการจัดการ', colorTheme: '#F3C34F', faculties: ['บัญชี', 'บริหารธุรกิจ', 'เศรษฐศาสตร์', 'การจัดการ', 'การตลาด'] },
  { id: 4, name: 'บ้านสถาปัตยกรรม', description: 'สถาปัตยกรรมสาขาภายใน ภูมิสถาปัตยกรรม การออกแบบผลิตภัณฑ์ การออกแบบนิเทศศิลป์', colorTheme: '#D48C7E', faculties: ['สถาปัตยกรรม', 'มัณฑนศิลป์', 'ออกแบบภายใน', 'ออกแบบผลิตภัณฑ์', 'ออกแบบแฟชั่น', 'นิเทศศิลป์'] },
  { id: 5, name: 'บ้านสังคมศาสตร์', description: 'นิติศาสตร์ สังคมศาสตร์ สังคมสงเคราะห์ศาสตร์ โบราณคดี', colorTheme: '#8CB69D', faculties: ['นิติศาสตร์', 'สังคมศาสตร์', 'สังคมสงเคราะห์', 'โบราณคดี', 'รัฐศาสตร์'] },
  { id: 6, name: 'บ้านภาษา', description: 'อักษรศาสตร์ มนุษยศาสตร์ ศิลปศาสตร์', colorTheme: '#B19CD9', faculties: ['อักษรศาสตร์', 'มนุษยศาสตร์', 'ศิลปศาสตร์', 'ภาษา', 'ล่าม', 'แปล'] },
  { id: 7, name: 'บ้านศิลปิน', description: 'นิเทศศาสตร์ ศิลปกรรมศาสตร์ ดนตรี ศิลปะภาพเคลื่อนไหว', colorTheme: '#E06F6F', faculties: ['นิเทศศาสตร์', 'ศิลปกรรมศาสตร์', 'ดนตรี', 'การแสดง', 'ภาพยนตร์', 'ดิจิทัลมีเดีย', 'บรอดแคสติ้ง'] },
  { id: 8, name: 'บ้านนานาชาติ', description: 'หลักสูตรนานาชาติ (Inter) ทุกคณะ ทุกมหาวิทยาลัย', colorTheme: '#90E0EF', faculties: ['นานาชาติ', 'B.B.A', 'International'] },
  { id: 9, name: 'บ้านนี้มีรัก', description: 'บ้านส่งเสริมในด้านของความสนใจ ค้นหาความถนัด และแนะแนวอาชีพ', colorTheme: '#F6C2C2', faculties: ['การศึกษา', 'จิตวิทยา', 'คหกรรม', 'การท่องเที่ยว', 'ธุรกิจการโรงแรม', 'ครัวไทย'] }
];

// Pre-Test Questions Data
const PRETEST_QUESTIONS = {
  1: [ // สุขภาพ
    { q: "กระบวนการใดที่เกี่ยวข้องกับตับในการทำลายสารพิษ?", opts: ["Glycolysis", "Deamination", "Detoxification", "Hydrolysis"], ans: 2, sub: "ชีววิทยา" },
    { q: "ถ้าพ่อมีหมู่เลือด A (Heterozygous) และแม่มีหมู่เลือด B (Heterozygous) ลูกจะมีโอกาสมีหมู่เลือดใดได้บ้าง?", opts: ["A, B เท่านั้น", "A, B, AB เท่านั้น", "AB, O เท่านั้น", "A, B, AB, O ทั้งหมด"], ans: 3, sub: "ชีววิทยา" },
    { q: "สารเคมีในข้อใดเมื่อทำปฏิกิริยากับเบสจะส่งกลิ่นฉุนและเปลี่ยนสีกระดาษลิตมัสจากแดงเป็นน้ำเงิน?", opts: ["เกลือแอมโมเนียม", "เกลือโซเดียม", "เกลือคลอไรด์", "กรดซัลฟิวริก"], ans: 0, sub: "เคมี" }
  ],
  2: [ // วิศวะ
    { q: "รถยนต์มวล 1000 kg เคลื่อนที่ด้วยความเร็ว 20 m/s จากนั้นเบรกจนหยุดในเวลา 5 วินาที แรงต้านเฉลี่ยมีค่ากี่นิวตัน?", opts: ["1000 N", "2000 N", "4000 N", "5000 N"], ans: 1, sub: "ฟิสิกส์ (TPAT3)" },
    { q: "ข้อใดคือเลขฐานสิบของเลขฐานสอง 1101?", opts: ["11", "13", "14", "15"], ans: 1, sub: "คอมพิวเตอร์" },
    { q: "กำหนดให้ f(x) = 3x^2 + 2x - 1 อัตราการเปลี่ยนแปลงเฉลี่ยของ f(x) เมื่อ x เปลี่ยนจาก 1 ไปเป็น 2 คือข้อใด?", opts: ["9", "11", "13", "15"], ans: 1, sub: "คณิตศาสตร์ A-Level" }
  ],
  3: [ // ธุรกิจ
    { q: "หลักการทางเศรษฐศาสตร์ใดที่อธิบายถึงจุดที่ผู้ซื้อและผู้ขายตกลงซื้อขายสินค้าในราคากลาง?", opts: ["กฎอุปสงค์", "กฎอุปทาน", "ดุลยภาพตลาด", "ความยืดหยุ่น"], ans: 2, sub: "เศรษฐศาสตร์" },
    { q: "งบดุล (Balance Sheet) ประกอบด้วยหัวข้อหลักใดบ้าง?", opts: ["สินทรัพย์, หนี้สิน, ส่วนของเจ้าของ", "รายได้, ค่าใช้จ่าย, กำไรสุทธิ", "กระแสเงินสดเข้า, กระแสเงินสดออก", "สินทรัพย์หมุนเวียน, หนี้สินระยะสั้น"], ans: 0, sub: "บัญชี" },
    { q: "ข้อใดคือการตลาดแบบ 4P ที่ถูต้อง?", opts: ["Product, Price, Place, Promotion", "Plan, Price, People, Process", "Product, Profit, Place, Presentation", "People, Policy, Performance, Price"], ans: 0, sub: "การบริหารธุรกิจ" }
  ],
  4: [ // สถาปัตย์
    { q: "การเขียนแบบทัศนียภาพที่มีจุดรวมสายตา 1 จุด (One-point Perspective) เหมาะกับการวาดภาพประเภทใด?", opts: ["ภาพมุมมองภายในห้องยาวหรือถนนตรง", "ภาพตึกมุมสูงแบบนกมอง (Bird's eye view)", "ภาพวัตถุเฉียง 45 องศา", "ภาพมุมเงยมองยอดหอคอย"], ans: 0, sub: "สถาปัตยกรรม (TPAT4)" },
    { q: "สีคู่ตรงข้าม (Complementary Colors) ของสีน้ำเงินคือสีใด?", opts: ["สีแดง", "สีเหลือง", "สีส้ม", "สีเขียว"], ans: 2, sub: "การออกแบบ" },
    { q: "มาตราส่วน 1:50 บนกระดาษเขียนแบบ หากวัดระยะได้ 5 ซม. ระยะจริงจะมีค่ากี่เมตร?", opts: ["2.5 เมตร", "5.0 เมตร", "25 เมตร", "0.25 เมตร"], ans: 0, sub: "เขียนแบบสถาปัตย์" }
  ],
  5: [ // สังคม
    { q: "กฎหมายสูงสุดที่ใช้ในการปกครองประเทศคือกฎหมายใด?", opts: ["พระราชบัญญัติ", "พระราชกำหนด", "กฎหมายรัฐธรรมนูญ", "ประมวลกฎหมายแพ่ง"], ans: 2, sub: "นิติศาสตร์" },
    { q: "การศึกษาทางโบราณคดีโดยหลักแล้วเน้นวิเคราะห์จากแหล่งใดมากที่สุด?", opts: ["ตำนานความเชื่อพื้นบ้าน", "หลักฐานทางวัตถุและซากโบราณสถาน", "บันทึกในเอกสารประวัติศาสตร์", "ข้อเขียนวิพากษ์วิจารณ์"], ans: 1, sub: "โบราณคดี" },
    { q: "ปัจจัยสำคัญที่เป็นตัวแบ่งชนชั้นทางสังคมในสังคมอินเดียโบราณคือระบบใด?", opts: ["ระบบฟิวดัล", "ระบบวรรณะ", "ระบบกิลด์", "ระบบทาส"], ans: 1, sub: "สังคมศาสตร์" }
  ],
  6: [ // ภาษา
    { q: "What is the synonym of the word 'BENEFICIAL'?", opts: ["Harmful", "Useless", "Advantageous", "Unfavorable"], ans: 2, sub: "ภาษาอังกฤษ" },
    { q: "คำในข้อใดเป็นคำบาลีที่ใช้ในภาษาไทย?", opts: ["ปัญญา", "ศึกษา", "กษัตริย์", "ไมตรี"], ans: 0, sub: "ภาษาไทย" },
    { q: "โครงสร้างประโยคภาษาฝรั่งเศส 'Je t'aime' มีความหมายตรงกับคำใด?", opts: ["ฉันเกลียดเธอ", "ฉันรักเธอ", "ฉันคิดถึงเธอ", "ฉันมองเห็นเธอ"], ans: 1, sub: "ภาษาต่างประเทศ" }
  ],
  7: [ // ศิลปิน
    { q: "ทฤษฎีการจัดองค์ประกอบภาพในงานภาพยนตร์ข้อใดที่ช่วยดึงความสนใจของผู้ชมไปยังจุดสำคัญ?", opts: ["กฎสามส่วน (Rule of Thirds)", "การใช้อัตราส่วน 16:9", "การตัดต่อแบบรวดเร็ว (Jump Cut)", "การแพนกล้องตามเสียง"], ans: 0, sub: "นิเทศศาสตร์" },
    { q: "เครื่องดนตรีประเภทเป่าลมไม้ (Woodwind) คือข้อใด?", opts: ["Trumpet", "Flute", "Violin", "Cymbal"], ans: 1, sub: "ดนตรี" },
    { q: "การตัดต่อภาพและเสียงที่ลื่นไหลกลมกลืนเรียกว่าอะไร?", opts: ["Transition", "Montage", "Continuity Editing", "Voiceover"], ans: 2, sub: "ภาพยนตร์" }
  ],
  8: [ // นานาชาติ
    { q: "Evaluate: Solve for x: 3x - 7 = 5x + 9", opts: ["x = 8", "x = -8", "x = 1", "x = -1"], ans: 1, sub: "SAT Math" },
    { q: "Choose the correct sentence structure:", opts: ["He don't like to go.", "She has been working since morning.", "They is playing football.", "I will went to the market tomorrow."], ans: 1, sub: "IELTS English" },
    { q: "Which of the following describes a global economy dynamic?", opts: ["Inflation decreases purchasing power.", "Tariffs encourage free trade globally.", "Barter system is the primary trade method.", "Monopoly results in lower prices."], ans: 0, sub: "Global Studies" }
  ],
  9: [ // บ้านนี้มีรัก
    { q: "หากคุณชื่นชอบการประดิษฐ์สิ่งของ ซ่อมแซมระบบไฟ และสนใจเรื่องปัญญาประดิษฐ์ คุณน่าจะมีความถนัดสอดคล้องกับบ้านหลังใดมากที่สุด?", opts: ["บ้านวิทยาศาสตร์สุขภาพ", "บ้านวิศวกรรมศาสตร์", "บ้านสังคมศาสตร์", "บ้านภาษา"], ans: 1, sub: "แบบสำรวจความสนใจ" },
    { q: "การทำงานที่ต้องพบเจอผู้คน คอยรับฟัง ช่วยเหลือแก้ไขปัญหาชีวิต และทำงานกับชุมชน ตรงกับลักษณะของอาชีพในคณะใด?", opts: ["คณะวิศวกรรมคอมพิวเตอร์", "คณะสังคมสงเคราะห์ศาสตร์", "คณะสถาปัตยกรรมศาสตร์", "คณะศิลปศาสตร์"], ans: 1, sub: "ค้นหาความถนัด" },
    { q: "การมีความสุขกับศิลปะการทำอาหาร การเบเกอรี่ และการตกแต่งจานอาหาร สอดคล้องกับหลักสูตรในสาขาใด?", opts: ["สาขาอัญมณีและเครื่องประดับ", "สาขาวิชาศิลปะการประกอบอาหาร (คหกรรม)", "สาขาการนฤมิตศิลป์", "สาขาโบราณคดี"], ans: 1, sub: "ความสนใจพิเศษ" }
  ]
};

// Seed Seniors Data (พี่ๆ ในบ้าน)
const ALUMNI = [
  { houseId: 1, name: 'พี่หมอเจนนี่', admittedFaculty: 'คณะแพทยศาสตร์', admittedDepartment: 'สาขาแพทยศาสตร์', admittedUniversity: 'มหาวิทยาลัยขอนแก่น', tcasRound: 1, scoreDetails: 'GPAX 3.92, IELTS 7.5, พอร์ตวิชาการดีเด่น', avatar: '👩‍⚕️' },
  { houseId: 2, name: 'พี่บอย เกียร์แดง', admittedFaculty: 'คณะวิศวกรรมศาสตร์', admittedDepartment: 'ภาควิชาวิศวกรรมคอมพิวเตอร์', admittedUniversity: 'มหาวิทยาลัยเกษตรศาสตร์', tcasRound: 3, scoreDetails: 'GPAX 3.45, TPAT3 82/100, A-Level ฟิสิกส์ 76', avatar: '👨‍💻' },
  { houseId: 3, name: 'พี่นลิน บัญชีทอง', admittedFaculty: 'คณะพาณิชยศาสตร์และการบัญชี', admittedDepartment: 'สาขาวิชาเอกบริหารธุรกิจ', admittedUniversity: 'มหาวิทยาลัยธรรมศาสตร์', tcasRound: 2, scoreDetails: 'GPAX 3.75, TGAT 85/100, A-Level คณิต1 72', avatar: '👩‍💼' },
  { houseId: 4, name: 'พี่อาร์ต ดีไซเนอร์', admittedFaculty: 'คณะสถาปัตยกรรมศาสตร์', admittedDepartment: 'สาขาวิชาการออกแบบภายใน', admittedUniversity: 'มหาวิทยาลัยศิลปากร', tcasRound: 3, scoreDetails: 'GPAX 3.10, TPAT4 78/100, วาดลายเส้นดีเยี่ยม', avatar: '🎨' },
  { houseId: 5, name: 'พี่ทนายเต๋า', admittedFaculty: 'คณะนิติศาสตร์', admittedDepartment: 'สาขากฎหมายธุรกิจ', admittedUniversity: 'มหาวิทยาลัยธรรมศาสตร์', tcasRound: 3, scoreDetails: 'GPAX 3.65, A-Level สังคม 70, ภาษาไทย 82', avatar: '🧑‍⚖️' },
  { houseId: 6, name: 'พี่จอย อักษรเหรียญทอง', admittedFaculty: 'คณะมนุษยศาสตร์', admittedDepartment: 'สาขาวิชาภาษาอังกฤษ', admittedUniversity: 'มหาวิทยาลัยนเรศวร', tcasRound: 1, scoreDetails: 'GPAX 3.88, คะแนนเกียรตินิยมกิจกรรมภาษาอังกฤษ', avatar: '👩‍🏫' },
  { houseId: 7, name: 'พี่ซัน ครีเอเตอร์', admittedFaculty: 'คณะนิเทศศาสตร์', admittedDepartment: 'สาขาบรอดแคสติ้ง', admittedUniversity: 'มหาวิทยาลัยกรุงเทพ', tcasRound: 1, scoreDetails: 'GPAX 2.95, ผลงานคลิปวิดีโอยอดวิว 5 แสนบน TikTok', avatar: '🎬' },
  { houseId: 8, name: 'พี่แอนน์ อินเตอร์', admittedFaculty: 'หลักสูตรบริหารธุรกิจบัณฑิต (B.B.A)', admittedDepartment: 'การบัญชีธุรกิจแบบบูรณาการ', admittedUniversity: 'มหาวิทยาลัยธรรมศาสตร์', tcasRound: 1, scoreDetails: 'GPAX 3.60, SAT 1380/1600, IELTS 8.0', avatar: '🌍' },
  { houseId: 9, name: 'พี่ปูเป้ เชฟดาวรุ่ง', admittedFaculty: 'โรงเรียนการเรือน', admittedDepartment: 'เอกคหกรรมศาสตร์', admittedUniversity: 'มหาวิทยาลัยสวนดุสิต', tcasRound: 1, scoreDetails: 'GPAX 3.20, มีความชำนาญและชนะเลิศทำอาหารระดับเขต', avatar: '🧑‍🍳' }
];

// Global State
let currentUser = null;
let allCourses = [];
let tcasData = [];

// XML Loading
async function loadDataFiles() {
  try {
    const textCurriculum = await fetch("curriculum.xml").then(r => r.text());
    const xmlCur = new DOMParser().parseFromString(textCurriculum, "text/xml");
    allCourses = Array.from(xmlCur.querySelectorAll("course")).map(c => ({
      level: txt(c, "ระดับชั้น"),
      term: txt(c, "ภาคเรียน"),
      plan: txt(c, "แผนการเรียน"),
      name: txt(c, "รายวิชา"),
      credit: parseFloat(txt(c, "หน่วยกิต") || "0")
    }));
  } catch (e) {
    console.error("Failed to load curriculum.xml", e);
  }

  try {
    const textTCAS = await fetch("tcas12.xml").then(r => r.text());
    const xmlTCAS = new DOMParser().parseFromString(textTCAS, "text/xml");
    tcasData = Array.from(xmlTCAS.querySelectorAll("row")).map(r => ({
      uni: txt(r, "มหาวิทยาลัย"),
      faculty: txt(r, "คณะ"),
      minGPA: parseFloat(txt(r, "เกรดขั้นต่ำ") || "0")
    }));
  } catch (e) {
    console.error("Failed to load tcas12.xml", e);
  }
}

function txt(parent, tag) {
  const el = parent.querySelector(tag);
  return el ? el.textContent.trim() : "";
}

// Subject group analyzer mapper
function getSubjectGroup(subjectName) {
  const name = subjectName.toLowerCase();
  if (name.includes('ฟิสิกส์') || name.includes('เคมี') || name.includes('ชีววิทยา') || name.includes('วิทยาศาสตร์') || name.includes('ดาราศาสตร์') || name.includes('โลกและอวกาศ')) {
    return 'วิทยาศาสตร์';
  } else if (name.includes('คณิตศาสตร์') || name.includes('แคลคูลัส') || name.includes('พีชคณิต')) {
    return 'คณิตศาสตร์';
  } else if (name.includes('ภาษาอังกฤษ') || name.includes('english') || name.includes('ฝรั่งเศส') || name.includes('ญี่ปุ่น') || name.includes('จีน') || name.includes('เยอรมัน') || name.includes('บาลี')) {
    return 'ภาษาต่างประเทศ';
  } else if (name.includes('ภาษาไทย')) {
    return 'ภาษาไทย';
  } else if (name.includes('สังคม') || name.includes('ประวัติศาสตร์') || name.includes('ภูมิศาสตร์') || name.includes('หน้าที่พลเมือง') || name.includes('พระพุทธ')) {
    return 'สังคมศึกษา';
  } else if (name.includes('สุขศึกษา') || name.includes('พลศึกษา')) {
    return 'สุขศึกษาและพลศึกษา';
  } else if (name.includes('ศิลปะ') || name.includes('ดนตรี') || name.includes('ทัศนศิลป์') || name.includes('นาฏศิลป์')) {
    return 'ศิลปะ';
  } else {
    return 'การงานอาชีพและเทคโนโลยี';
  }
}

// 2. Authentication Helper Functions
function checkUsernamePattern(username, role) {
  if (role === 'student') {
    return /^s\d{5}$/.test(username);
  } else if (role === 'house_teacher') {
    return /^baan.+/.test(username);
  } else if (role === 'guidance_teacher') {
    return /^T\d{8}$/.test(username);
  }
  return false;
}

// 3. GPAX and Grade Calculations
function calculateStudentGPAX(studentUsername) {
  const grades = DB.get('student_grades') || [];
  const studentGrades = grades.filter(g => g.studentUsername === studentUsername);
  
  if (studentGrades.length === 0) return 0.00;
  
  let totalCredits = 0;
  let totalPoints = 0;
  studentGrades.forEach(g => {
    totalCredits += g.credit;
    totalPoints += g.grade * g.credit;
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits) : 0.00;
}

function calculateGroupGPA(studentUsername, groupName) {
  const grades = DB.get('student_grades') || [];
  const groupGrades = grades.filter(g => g.studentUsername === studentUsername && g.subjectGroup === groupName);
  
  if (groupGrades.length === 0) return 0.00;
  
  let totalCredits = 0;
  let totalPoints = 0;
  groupGrades.forEach(g => {
    totalCredits += g.credit;
    totalPoints += g.grade * g.credit;
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits) : 0.00;
}

// Color status indicator calculations (For Teachers only)
// Green: Real GPAX >= Target + 0.31
// Yellow: Target - 0.25 <= Real GPAX < Target + 0.31 (e.g. 2.75 - 3.30 for 3.00 target)
// Red: Real GPAX <= Target - 0.50 (and below 2.50)
function getStudentColorStatus(studentUsername) {
  const targets = DB.get('student_targets') || [];
  const studentTargets = targets.filter(t => t.studentUsername === studentUsername);
  
  if (studentTargets.length === 0) return 'yellow'; // default neutral
  
  const gpax = calculateStudentGPAX(studentUsername);
  
  // If there are multiple targets, compare against the highest requirement (worst-case warning)
  let maxTargetMinGPA = 0;
  studentTargets.forEach(st => {
    const tcasMatch = tcasData.find(d => d.uni === st.university && d.faculty === st.faculty);
    if (tcasMatch && tcasMatch.minGPA > maxTargetMinGPA) {
      maxTargetMinGPA = tcasMatch.minGPA;
    }
  });

  if (maxTargetMinGPA === 0) maxTargetMinGPA = 3.00; // default benchmark if not in list or 0.00

  // Check specific subjects (like Math/Science/English) if target is Engineering or Health Sci
  const mathGPA = calculateGroupGPA(studentUsername, 'คณิตศาสตร์');
  const sciGPA = calculateGroupGPA(studentUsername, 'วิทยาศาสตร์');
  const engGPA = calculateGroupGPA(studentUsername, 'ภาษาต่างประเทศ');
  
  // Underperform criteria
  const belowTargetHuge = gpax <= (maxTargetMinGPA - 0.50);
  const belowKeySubjects = (mathGPA > 0 && mathGPA < 2.50) || (sciGPA > 0 && sciGPA < 2.50) || (engGPA > 0 && engGPA < 2.50);
  
  if (belowTargetHuge || belowKeySubjects) {
    return 'red';
  } else if (gpax >= (maxTargetMinGPA + 0.31)) {
    return 'green';
  } else {
    return 'yellow';
  }
}
