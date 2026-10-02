// ===== DỮ LIỆU HỌC TIẾNG TRUNG TỪ SỐ 0 =====

// --- THANH MẪU (initials): phụ âm đầu ---
const INITIALS = [
  {p:'b', vi:'đọc nhẹ như "p" tiếng Việt', ex:'八', exP:'bā', exVi:'số 8'},
  {p:'p', vi:'như "p" nhưng bật hơi mạnh', ex:'怕', exP:'pà', exVi:'sợ'},
  {p:'m', vi:'như "m" tiếng Việt', ex:'妈', exP:'mā', exVi:'mẹ'},
  {p:'f', vi:'như "ph" tiếng Việt', ex:'发', exP:'fā', exVi:'phát (triển)'},
  {p:'d', vi:'như "t" tiếng Việt (không bật hơi)', ex:'大', exP:'dà', exVi:'to, lớn'},
  {p:'t', vi:'như "th" nhưng bật hơi mạnh', ex:'他', exP:'tā', exVi:'anh ấy'},
  {p:'n', vi:'như "n" tiếng Việt', ex:'你', exP:'nǐ', exVi:'bạn'},
  {p:'l', vi:'như "l" tiếng Việt', ex:'来', exP:'lái', exVi:'đến'},
  {p:'g', vi:'như "c/k" tiếng Việt (không bật hơi)', ex:'高', exP:'gāo', exVi:'cao'},
  {p:'k', vi:'như "kh" nhưng bật hơi mạnh', ex:'口', exP:'kǒu', exVi:'miệng'},
  {p:'h', vi:'như "h" tiếng Việt, hơi khàn', ex:'好', exP:'hǎo', exVi:'tốt'},
  {p:'j', vi:'như "ch" nhẹ, môi dẹt', ex:'几', exP:'jǐ', exVi:'mấy'},
  {p:'q', vi:'như "ch" bật hơi mạnh, môi dẹt', ex:'七', exP:'qī', exVi:'số 7'},
  {p:'x', vi:'như "x" nhẹ, môi dẹt', ex:'小', exP:'xiǎo', exVi:'nhỏ'},
  {p:'zh', vi:'như "tr" nhưng uốn lưỡi', ex:'中', exP:'zhōng', exVi:'giữa (Trung Quốc)'},
  {p:'ch', vi:'như "tr" bật hơi, uốn lưỡi', ex:'吃', exP:'chī', exVi:'ăn'},
  {p:'sh', vi:'như "s" nặng, uốn lưỡi', ex:'十', exP:'shí', exVi:'số 10'},
  {p:'r', vi:'như "r" nhẹ, uốn lưỡi', ex:'人', exP:'rén', exVi:'người'},
  {p:'z', vi:'như "ch" đầu lưỡi chạm răng', ex:'再', exP:'zài', exVi:'lại (tạm biệt)'},
  {p:'c', vi:'như "ch" bật hơi, đầu lưỡi', ex:'菜', exP:'cài', exVi:'món ăn'},
  {p:'s', vi:'như "x" nhưng đầu lưỡi', ex:'三', exP:'sān', exVi:'số 3'},
];

// --- VẬN MẪU (finals): vần ---
const FINALS = [
  {p:'a', vi:'a', ex:'大', exP:'dà', exVi:'to'},
  {p:'o', vi:'ô', ex:'波', exP:'bō', exVi:'sóng'},
  {p:'e', vi:'ơ', ex:'喝', exP:'hē', exVi:'uống'},
  {p:'i', vi:'i', ex:'你', exP:'nǐ', exVi:'bạn'},
  {p:'u', vi:'u', ex:'不', exP:'bù', exVi:'không'},
  {p:'ü', vi:'"uy" môi tròn chu ra', ex:'女', exP:'nǚ', exVi:'nữ, con gái'},
  {p:'ai', vi:'ai', ex:'爱', exP:'ài', exVi:'yêu'},
  {p:'ei', vi:'ây', ex:'没', exP:'méi', exVi:'không (có)'},
  {p:'ao', vi:'ao', ex:'好', exP:'hǎo', exVi:'tốt'},
  {p:'ou', vi:'âu', ex:'口', exP:'kǒu', exVi:'miệng'},
  {p:'an', vi:'an', ex:'三', exP:'sān', exVi:'số 3'},
  {p:'en', vi:'ân', ex:'门', exP:'mén', exVi:'cửa'},
  {p:'ang', vi:'ang', ex:'上', exP:'shàng', exVi:'lên, trên'},
  {p:'eng', vi:'âng', ex:'生', exP:'shēng', exVi:'sinh (học sinh)'},
  {p:'ong', vi:'ung', ex:'中', exP:'zhōng', exVi:'giữa'},
  {p:'ia', vi:'ia', ex:'家', exP:'jiā', exVi:'nhà'},
  {p:'ie', vi:'iê', ex:'谢', exP:'xiè', exVi:'cảm ơn'},
  {p:'iao', vi:'iao', ex:'小', exP:'xiǎo', exVi:'nhỏ'},
  {p:'iu', vi:'iêu (viết tắt của iou)', ex:'六', exP:'liù', exVi:'số 6'},
  {p:'ian', vi:'iên', ex:'见', exP:'jiàn', exVi:'gặp (tạm biệt)'},
  {p:'in', vi:'in', ex:'今', exP:'jīn', exVi:'nay (hôm nay)'},
  {p:'iang', vi:'iang', ex:'想', exP:'xiǎng', exVi:'muốn, nhớ'},
  {p:'ing', vi:'inh', ex:'明', exP:'míng', exVi:'sáng (ngày mai)'},
  {p:'ua', vi:'oa', ex:'花', exP:'huā', exVi:'hoa'},
  {p:'uo', vi:'uô', ex:'国', exP:'guó', exVi:'nước (đất nước)'},
  {p:'uai', vi:'oai', ex:'快', exP:'kuài', exVi:'nhanh'},
  {p:'ui', vi:'uây (viết tắt của uei)', ex:'水', exP:'shuǐ', exVi:'nước'},
  {p:'uan', vi:'oan', ex:'关', exP:'guān', exVi:'quan hệ'},
  {p:'un', vi:'uân (viết tắt của uen)', ex:'军', exP:'jūn', exVi:'quân đội'},
  {p:'uang', vi:'oang', ex:'光', exP:'guāng', exVi:'ánh sáng'},
  {p:'üe', vi:'uyê', ex:'月', exP:'yuè', exVi:'mặt trăng, tháng'},
  {p:'üan', vi:'uyên', ex:'元', exP:'yuán', exVi:'đồng (tiền)'},
  {p:'ün', vi:'uyn', ex:'云', exP:'yún', exVi:'mây'},
];

const PINYIN_RULES = [
  'Sau j, q, x thì ü viết thành u: ju (thực ra là jü), qu, xu — nhưng vẫn đọc là "uy".',
  'iou viết tắt thành iu (vd: liù = lìou), uei → ui (shuǐ), uen → un (lún).',
  'i đứng một mình thêm y ở đầu: i → yi, ia → ya, ie → ye, iao → yao...',
  'u đứng một mình thêm w ở đầu: u → wu; ü → yu (nǚ → nǚ, nhưng yu).',
];

// --- THANH ĐIỆU (tones) ---
const TONES = [
  {n:1, mark:'¯', name:'thanh 1 (thanh ngang)', desc:'giữ giọng cao và đều, như đang hát nốt cao', ex:'mā', hanzi:'妈', vi:'mẹ'},
  {n:2, mark:'ˊ', name:'thanh 2 (thanh lên)', desc:'giọng đi lên, như hỏi "hả?"', ex:'má', hanzi:'麻', vi:'cây gai'},
  {n:3, mark:'ˇ', name:'thanh 3 (thanh xuống-lên)', desc:'giọng xuống thấp rồi lên, như ngạc nhiên "hả??"', ex:'mǎ', hanzi:'马', vi:'con ngựa'},
  {n:4, mark:'ˋ', name:'thanh 4 (thanh xuống)', desc:'giọng xuống mạnh và dứt khoát, như quát "này!"', ex:'mà', hanzi:'骂', vi:'mắng, chửi'},
  {n:0, mark:'·', name:'thanh nhẹ', desc:'đọc nhẹ, ngắn, không nhấn', ex:'ma', hanzi:'吗', vi:'(trợ từ hỏi) ...không?'},
];

const TONE_CHANGE_RULES = [
  {t:'不 bù → bú', d:'Khi 不 đứng trước chữ thanh 4, đọc thành thanh 2. Vd: 不对 bú duì (không đúng), 不去 bú qù (không đi).'},
  {t:'一 yī → yí / yì', d:'一 trước thanh 4 đọc yí (vd: 一定 yí dìng = nhất định); trước thanh 1/2/3 đọc yì (vd: 一起 yì qǐ = cùng nhau). Đứng một mình vẫn là yī.'},
  {t:'Hai thanh 3 liền nhau', d:'Chữ đầu chuyển thành thanh 2. Vd: 你好 nǐ hǎo đọc thành ní hǎo.'},
];

// --- 8 NÉT CƠ BẢN (vẽ SVG minh họa) ---
const STROKES = [
  {p:'héng', h:'横', vi:'nét ngang', desc:'kéo ngang từ trái sang phải', svg:'<line x1="15" y1="50" x2="85" y2="50"/>'},
  {p:'shù', h:'竖', vi:'nét sổ (dọc)', desc:'kéo dọc từ trên xuống dưới', svg:'<line x1="50" y1="12" x2="50" y2="88"/>'},
  {p:'piě', h:'撇', vi:'nét phẩy (trái)', desc:'hất xiên xuống về bên trái', svg:'<path d="M68 14 C 52 38, 36 60, 20 84"/>'},
  {p:'nà', h:'捺', vi:'nét mác (phải)', desc:'đè xiên xuống về bên phải', svg:'<path d="M32 18 C 50 44, 64 64, 84 84"/>'},
  {p:'diǎn', h:'点', vi:'nét chấm', desc:'chấm một điểm, hơi nghiêng', svg:'<ellipse cx="50" cy="48" rx="10" ry="14" transform="rotate(20 50 48)"/>'},
  {p:'tí', h:'提', vi:'nét hất', desc:'hất xiên lên về bên phải', svg:'<line x1="18" y1="72" x2="84" y2="34"/>'},
  {p:'zhé', h:'折', vi:'nét gập', desc:'đi rồi gập góc (vd: sổ ngang)', svg:'<path d="M40 14 L40 58 L82 58"/>'},
  {p:'gōu', h:'钩', vi:'nét móc', desc:'sổ xuống rồi móc lên', svg:'<path d="M52 12 L52 74 C 52 84, 44 86, 34 80"/>'},
];

const STROKE_ORDER_RULES = [
  {t:'Ngang trước, sổ sau', ex:'十 (số 10): viết nét ngang trước, nét sổ sau'},
  {t:'Phẩy trước, mác sau', ex:'人 (người): phẩy trái trước, mác phải sau'},
  {t:'Trên trước, dưới sau', ex:'三 (số 3): viết từ nét trên cùng xuống'},
  {t:'Trái trước, phải sau', ex:'你 (bạn): viết bộ bên trái trước'},
  {t:'Ngoài trước, trong sau', ex:'月 (mặt trăng): khung ngoài trước, nét trong sau'},
  {t:'Giữa trước, hai bên sau', ex:'小 (nhỏ): nét sổ giữa trước, hai chấm sau'},
  {t:'Vào nhà rồi đóng cửa', ex:'国 (nước): khung ngoài, viết chữ bên trong, đóng nét đáy cuối cùng'},
];

// --- CHỮ HÁN ĐẦU TIÊN ---
const NUMBERS = [
  {h:'一', p:'yī', vi:'1 - một', nets:1},
  {h:'二', p:'èr', vi:'2 - hai', nets:2},
  {h:'三', p:'sān', vi:'3 - ba', nets:3},
  {h:'四', p:'sì', vi:'4 - bốn', nets:5},
  {h:'五', p:'wǔ', vi:'5 - năm', nets:4},
  {h:'六', p:'liù', vi:'6 - sáu', nets:4},
  {h:'七', p:'qī', vi:'7 - bảy', nets:2},
  {h:'八', p:'bā', vi:'8 - tám', nets:2},
  {h:'九', p:'jiǔ', vi:'9 - chín', nets:2},
  {h:'十', p:'shí', vi:'10 - mười', nets:2},
];

const PICTOGRAPHS = [
  {h:'人', p:'rén', vi:'người', nets:2, note:'nhìn như người đang bước đi'},
  {h:'日', p:'rì', vi:'mặt trời / ngày', nets:4, note:'hình mặt trời có chấm giữa (nay viết thành ngang)'},
  {h:'月', p:'yuè', vi:'mặt trăng / tháng', nets:4, note:'hình trăng khuyết'},
  {h:'山', p:'shān', vi:'núi', nets:3, note:'3 đỉnh núi'},
  {h:'水', p:'shuǐ', vi:'nước', nets:4, note:'dòng nước chảy ở giữa'},
  {h:'火', p:'huǒ', vi:'lửa', nets:4, note:'ngọn lửa đang cháy'},
  {h:'木', p:'mù', vi:'cây, gỗ', nets:4, note:'cây có cành lá'},
  {h:'口', p:'kǒu', vi:'miệng', nets:3, note:'hình cái miệng há'},
];

// --- TỪ VỰNG HSK1 THEO CHỦ ĐỀ ---
const VOCAB = [
  // Chào hỏi
  {h:'你好', p:'nǐ hǎo', vi:'xin chào', ex:'你好！', exP:'Nǐ hǎo!', exVi:'Xin chào!'},
  {h:'谢谢', p:'xièxie', vi:'cảm ơn', ex:'谢谢你！', exP:'Xièxie nǐ!', exVi:'Cảm ơn bạn!'},
  {h:'对不起', p:'duìbuqǐ', vi:'xin lỗi', ex:'对不起！', exP:'Duìbuqǐ!', exVi:'Xin lỗi!'},
  {h:'没关系', p:'méi guānxi', vi:'không sao đâu', ex:'没关系。', exP:'Méi guānxi.', exVi:'Không sao đâu.'},
  {h:'再见', p:'zàijiàn', vi:'tạm biệt', ex:'再见！', exP:'Zàijiàn!', exVi:'Tạm biệt!'},
  // Đại từ
  {h:'我', p:'wǒ', vi:'tôi', ex:'我是越南人。', exP:'Wǒ shì Yuènán rén.', exVi:'Tôi là người Việt Nam.'},
  {h:'你', p:'nǐ', vi:'bạn', ex:'你好吗？', exP:'Nǐ hǎo ma?', exVi:'Bạn khỏe không?'},
  {h:'他', p:'tā', vi:'anh ấy, ông ấy', ex:'他是老师。', exP:'Tā shì lǎoshī.', exVi:'Anh ấy là giáo viên.'},
  {h:'她', p:'tā', vi:'cô ấy, chị ấy', ex:'她是学生。', exP:'Tā shì xuéshēng.', exVi:'Cô ấy là học sinh.'},
  // Gia đình
  {h:'爸爸', p:'bàba', vi:'bố', ex:'我爸爸是老师。', exP:'Wǒ bàba shì lǎoshī.', exVi:'Bố tôi là giáo viên.'},
  {h:'妈妈', p:'māma', vi:'mẹ', ex:'我妈妈很好。', exP:'Wǒ māma hěn hǎo.', exVi:'Mẹ tôi rất tốt.'},
  {h:'哥哥', p:'gēge', vi:'anh trai', ex:'我哥哥是学生。', exP:'Wǒ gēge shì xuéshēng.', exVi:'Anh trai tôi là học sinh.'},
  {h:'姐姐', p:'jiějie', vi:'chị gái', ex:'我姐姐很漂亮。', exP:'Wǒ jiějie hěn piàoliang.', exVi:'Chị gái tôi rất đẹp.'},
  {h:'弟弟', p:'dìdi', vi:'em trai', ex:'我弟弟五岁。', exP:'Wǒ dìdi wǔ suì.', exVi:'Em trai tôi 5 tuổi.'},
  {h:'妹妹', p:'mèimei', vi:'em gái', ex:'我妹妹七岁。', exP:'Wǒ mèimei qī suì.', exVi:'Em gái tôi 7 tuổi.'},
  // Thời gian
  {h:'今天', p:'jīntiān', vi:'hôm nay', ex:'今天很好。', exP:'Jīntiān hěn hǎo.', exVi:'Hôm nay rất tốt.'},
  {h:'明天', p:'míngtiān', vi:'ngày mai', ex:'明天见。', exP:'Míngtiān jiàn.', exVi:'Mai gặp nhé.'},
  {h:'昨天', p:'zuótiān', vi:'hôm qua', ex:'昨天我很忙。', exP:'Zuótiān wǒ hěn máng.', exVi:'Hôm qua tôi rất bận.'},
  {h:'现在', p:'xiànzài', vi:'bây giờ', ex:'现在几点？', exP:'Xiànzài jǐ diǎn?', exVi:'Bây giờ mấy giờ?'},
  // Quốc gia
  {h:'中国', p:'Zhōngguó', vi:'Trung Quốc', ex:'我爱中国。', exP:'Wǒ ài Zhōngguó.', exVi:'Tôi yêu Trung Quốc.'},
  {h:'越南', p:'Yuènán', vi:'Việt Nam', ex:'我是越南人。', exP:'Wǒ shì Yuènán rén.', exVi:'Tôi là người Việt Nam.'},
  {h:'人', p:'rén', vi:'người', ex:'中国人。', exP:'Zhōngguó rén.', exVi:'Người Trung Quốc.'},
  // Nghề nghiệp
  {h:'老师', p:'lǎoshī', vi:'giáo viên', ex:'我是老师。', exP:'Wǒ shì lǎoshī.', exVi:'Tôi là giáo viên.'},
  {h:'学生', p:'xuéshēng', vi:'học sinh', ex:'我是学生。', exP:'Wǒ shì xuéshēng.', exVi:'Tôi là học sinh.'},
  // Tính từ
  {h:'好', p:'hǎo', vi:'tốt', ex:'很好。', exP:'Hěn hǎo.', exVi:'Rất tốt.'},
  {h:'大', p:'dà', vi:'to, lớn', ex:'很大。', exP:'Hěn dà.', exVi:'Rất to.'},
  {h:'小', p:'xiǎo', vi:'nhỏ', ex:'很小。', exP:'Hěn xiǎo.', exVi:'Rất nhỏ.'},
  {h:'多', p:'duō', vi:'nhiều', ex:'很多。', exP:'Hěn duō.', exVi:'Rất nhiều.'},
  {h:'少', p:'shǎo', vi:'ít', ex:'很少。', exP:'Hěn shǎo.', exVi:'Rất ít.'},
  {h:'高兴', p:'gāoxìng', vi:'vui vẻ', ex:'我很高兴。', exP:'Wǒ hěn gāoxìng.', exVi:'Tôi rất vui.'},
  {h:'漂亮', p:'piàoliang', vi:'đẹp', ex:'很漂亮。', exP:'Hěn piàoliang.', exVi:'Rất đẹp.'},
  // Động từ
  {h:'爱', p:'ài', vi:'yêu', ex:'我爱你。', exP:'Wǒ ài nǐ.', exVi:'Tôi yêu bạn.'},
  {h:'吃', p:'chī', vi:'ăn', ex:'吃饭。', exP:'Chī fàn.', exVi:'Ăn cơm.'},
  {h:'喝', p:'hē', vi:'uống', ex:'喝水。', exP:'Hē shuǐ.', exVi:'Uống nước.'},
  {h:'去', p:'qù', vi:'đi', ex:'去中国。', exP:'Qù Zhōngguó.', exVi:'Đi Trung Quốc.'},
  {h:'来', p:'lái', vi:'đến', ex:'来越南。', exP:'Lái Yuènán.', exVi:'Đến Việt Nam.'},
  {h:'是', p:'shì', vi:'là', ex:'我是学生。', exP:'Wǒ shì xuéshēng.', exVi:'Tôi là học sinh.'},
  {h:'有', p:'yǒu', vi:'có', ex:'我有一本书。', exP:'Wǒ yǒu yì běn shū.', exVi:'Tôi có một quyển sách.'},
  {h:'不', p:'bù', vi:'không', ex:'不是。', exP:'Bú shì.', exVi:'Không phải.'},
  {h:'在', p:'zài', vi:'ở', ex:'我在家。', exP:'Wǒ zài jiā.', exVi:'Tôi ở nhà.'},
  // Danh từ
  {h:'家', p:'jiā', vi:'nhà, gia đình', ex:'我家很大。', exP:'Wǒ jiā hěn dà.', exVi:'Nhà tôi rất to.'},
  {h:'学校', p:'xuéxiào', vi:'trường học', ex:'我的学校很大。', exP:'Wǒ de xuéxiào hěn dà.', exVi:'Trường tôi rất to.'},
  {h:'朋友', p:'péngyou', vi:'bạn bè', ex:'我的朋友。', exP:'Wǒ de péngyou.', exVi:'Bạn của tôi.'},
  {h:'水', p:'shuǐ', vi:'nước', ex:'喝水。', exP:'Hē shuǐ.', exVi:'Uống nước.'},
  {h:'饭', p:'fàn', vi:'cơm', ex:'吃饭。', exP:'Chī fàn.', exVi:'Ăn cơm.'},
  {h:'书', p:'shū', vi:'sách', ex:'看书。', exP:'Kàn shū.', exVi:'Đọc sách.'},
  // Từ hỏi & trợ từ
  {h:'的', p:'de', vi:'(trợ từ sở hữu) của', ex:'我的书。', exP:'Wǒ de shū.', exVi:'Sách của tôi.'},
  {h:'这', p:'zhè', vi:'đây, này', ex:'这是什么？', exP:'Zhè shì shénme?', exVi:'Đây là cái gì?'},
  {h:'那', p:'nà', vi:'kia, đó', ex:'那是什么？', exP:'Nà shì shénme?', exVi:'Kia là cái gì?'},
  {h:'什么', p:'shénme', vi:'cái gì', ex:'这是什么？', exP:'Zhè shì shénme?', exVi:'Đây là cái gì?'},
  {h:'谁', p:'shéi', vi:'ai', ex:'他是谁？', exP:'Tā shì shéi?', exVi:'Anh ấy là ai?'},
  {h:'哪', p:'nǎ', vi:'nào', ex:'你是哪国人？', exP:'Nǐ shì nǎ guó rén?', exVi:'Bạn là người nước nào?'},
  {h:'怎么', p:'zěnme', vi:'như thế nào', ex:'怎么走？', exP:'Zěnme zǒu?', exVi:'Đi như thế nào?'},
  {h:'吗', p:'ma', vi:'(trợ từ câu hỏi) ...không?', ex:'你好吗？', exP:'Nǐ hǎo ma?', exVi:'Bạn khỏe không?'},
  {h:'呢', p:'ne', vi:'(trợ từ) còn...?', ex:'你呢？', exP:'Nǐ ne?', exVi:'Còn bạn thì sao?'},
];

// --- MẪU CÂU GIAO TIẾP ---
const SENTENCES = [
  {h:'你好！', p:'Nǐ hǎo!', vi:'Xin chào!'},
  {h:'你好吗？', p:'Nǐ hǎo ma?', vi:'Bạn khỏe không?'},
  {h:'谢谢！', p:'Xièxie!', vi:'Cảm ơn!'},
  {h:'对不起。', p:'Duìbuqǐ.', vi:'Xin lỗi.'},
  {h:'没关系。', p:'Méi guānxi.', vi:'Không sao đâu.'},
  {h:'再见！', p:'Zàijiàn!', vi:'Tạm biệt!'},
  {h:'我叫小明。', p:'Wǒ jiào Xiǎo Míng.', vi:'Tôi tên là Tiểu Minh. (thay tên bạn vào)'},
  {h:'我是越南人。', p:'Wǒ shì Yuènán rén.', vi:'Tôi là người Việt Nam.'},
  {h:'你是哪国人？', p:'Nǐ shì nǎ guó rén?', vi:'Bạn là người nước nào?'},
  {h:'你叫什么名字？', p:'Nǐ jiào shénme míngzi?', vi:'Bạn tên là gì?'},
];

// --- 7 CHẶNG LỘ TRÌNH ---
const STAGES = [
  {id:'pinyin', n:1, name:'Pinyin', desc:'Học phiên âm: thanh mẫu, vận mẫu — đọc được mọi chữ có pinyin', icon:'🔤'},
  {id:'tones', n:2, name:'Thanh điệu', desc:'4 thanh + thanh nhẹ, game luyện nghe phân biệt thanh', icon:'🎵'},
  {id:'strokes', n:3, name:'Nét chữ', desc:'8 nét cơ bản + 7 quy tắc thứ tự viết', icon:'✍️'},
  {id:'characters', n:4, name:'Chữ đầu tiên', desc:'Số 1-10 và 8 chữ tượng hình đơn giản', icon:'🈁'},
  {id:'vocab', n:5, name:'Từ vựng', desc:'~60 từ HSK1, flashcard nhắc ôn thông minh', icon:'🃏'},
  {id:'sentences', n:6, name:'Mẫu câu', desc:'10 câu giao tiếp cơ bản nhất', icon:'💬'},
  {id:'quiz', n:7, name:'Kiểm tra', desc:'Quiz tổng hợp sau khi học xong', icon:'📝'},
];
