/* ================= コンテンツデータ（将来的にGoogleシート連携予定） =================
   構造:
   - ARTICLES: 教科書の記事
   - SECTIONS: カットガイドの撮影セクション（各cutsに角度・POINT・素材）
   - DICT: 逆引き辞典
   共通フィールド:
   - tags: string[]  検索・ハッシュタグ用
   - published: true/false  falseは一覧・検索・タグから非表示（シートの「下書き」相当）
   - source: "sheet" | "local"  データの出所
*/
const IMG = k => `assets/img/${k}.png`;

const ARTICLES = [
 {id:"light", title:"自然光を味方にする", point:"照明よりまず窓際！これだけで見え方が9割変わるよ〜",
  body:`いちばん手っ取り早く「映え」に近づくのは、実は照明を頑張ることじゃなくて窓際に立つこと。\nレースカーテン越しの光は柔らかくて、被写体の色をいちばん自然に見せてくれます。\n\n光が足りないと感じたら、白い紙や白い皿をレフ板がわりに置いてみて。\n影がふわっと和らいで、それだけでワンランク上の見え方になります。`,
  tags:["光","自然光","窓際"], published:true, source:"local"},
 {id:"background", title:"背景を「すっきり」させる3つの方法", point:"迷ったら“1個どける”！引き算が正解だよ◎",
  body:`1. 主役の後ろに置くものを1〜2個までに絞る。\n2. 無地の布・木の板・アイボリーの紙を1枚敷くだけで生活感がぐっと減る。\n3. 撮る前に周りを軽く見渡して、視界に入る余計なものを画角の外に出す。\n\n「引き算」を意識するだけで、同じ商品・同じ部屋でも見違えます。`,
  tags:["背景","構図","引き算"], published:true, source:"local"},
 {id:"hands", title:"手の入れ方で「生活感」を出す", point:"手がひとつ入るだけで、ぐっと“自分ごと”になるよ♪",
  body:`置き画だけだと綺麗だけど少し他人事に見えがち。\nそこに手が1つ入るだけで「自分でも使えそう」に変わります。\n\n爪や指先を意識してゆっくり動かす、手首のスナップを効かせすぎない。\nこの2つだけ意識すれば十分です。`,
  tags:["手","生活感","動作"], published:true, source:"local"},
 {id:"thumbnail", title:"サムネの黄金型：ピル型タグ＋大きな2行タイトル", point:"1画面に1メッセージ。欲張らないのがコツ！",
  body:`サムネの型はシンプル。\n上にピル型の一言タグ、下に大きめの2行タイトル。情報は詰め込みすぎない。\n\n1画面1メッセージを守るだけで、スクロールする指が止まりやすくなります。`,
  tags:["サムネ","タイトル","デザイン"], published:true, source:"local"},
 {id:"cuts", title:"リールの黄金カット割（掴み3秒→変化→結論）", point:"掴みの3秒がすべて。最初に“予告”してあげて◎",
  body:`最初の3秒で「なにが起きるか」を予告する。\n真ん中で変化（開ける・塗る・比べる）を見せる。\n最後に結論（仕上がり・答え）で締める。\n\nこの3段構成に沿ってカットを並べるだけで、離脱しにくいリールになります。`,
  tags:["カット割り","リール","構成"], published:true, source:"local"},
 {id:"fiveshot", title:"1つの動作は「5つの角度」で撮る", point:"手→顔→引き→肩越し→変化球。この5つで動画になるよ！",
  body:`テレビの現場で使われている「5ショットルール」という型があります。\n1つの作業を、この5つの角度で撮るだけ：\n\n① 手のアップ（何をしているか）\n② 顔のアップ（誰がしているか）\n③ 引き（どこでしているか）\n④ 肩越し（本人の目線に近い角度）\n⑤ 変化球（真上や床すれすれなど意外な角度）\n\nこの5カットが揃うと、それだけで「ちゃんとした動画」に見えます。\n1カット3〜5秒ずつでOK。まずはこの型をなぞってみて。`,
  tags:["アングル","カット割り","動作"], published:true, source:"local"},
 {id:"angle45", title:"次のカットは「45度」うごく", point:"寄り引きだけじゃなくて“回り込む”！45度で新鮮に見えるよ◎",
  body:`カットを変えるとき、ズームで寄ったり引いたりするだけだと単調になりがち。\nプロの目安は「次のカットは前の位置から45度以上動く」こと。\n\n被写体のまわりを回り込むと、背景に映るものも変わって、脳が「新しい情報だ」と感じてくれます。\n高さを変えるのも効果大。目線→ローアングル→真上、と動いてみて。\n\nひとつだけ注意。反対側（180度の向こう）まで回り込むと、向きが逆転して見ている人が混乱します。同じ側の半円の中で動くのが基本です。`,
  tags:["アングル","構図","カット割り"], published:true, source:"local"},
 {id:"repeat", title:"同じ動作を「繰り返して」撮る", point:"もう1回やって、角度を変えてもう1回。それだけでプロっぽくなる♪",
  body:`カメラが1台しかなくても、マルチカメラ風の動画は作れます。\nコツは「同じ動作を何回か繰り返して、そのたびに角度を変えて撮る」こと。\n\n椅子に座る、瓶のフタを開ける、クリームを塗る……\n繰り返せる動作なら何でもOK。\n\n1回目は引きで、2回目は手元に寄って、3回目は真上から。\n撮るときは少し長め（10秒くらい）に回しておいて、編集でいいところだけ使いましょう。`,
  tags:["動作","カット割り","繰り返し"], published:true, source:"local"},
 {id:"actioncut", title:"動作の「途中」で切ると繋がって見える", point:"動きを7:3で分けてみて。座る途中で切り替えると自然だよ〜",
  body:`別の角度で撮った2つのカットを自然に繋ぐコツは、「動作の途中」で切り替えること。\n映像の世界では「アクションつなぎ」と呼ばれる基本技です。\n\n動き全体を10とすると、7:3くらいで分けるのがきれい。\n「座る」なら、腰を下ろしはじめ（7割）まで見せて、別角度の着席の瞬間（残り3割）に切り替える。\n\n動きが橋渡しになって、カットの切れ目がほとんど気にならなくなります。`,
  tags:["カット割り","つなぎ","動作"], published:true, source:"local"},
 {id:"colors", title:"世界観は「色を3つに絞る」", point:"色は3つまで。それだけで“世界観”が出るよ〜",
  body:`背景・小物・服の色を、テーマカラー3色以内でまとめると統一感が出ます。\n色数が増えるほど「ごちゃっと」した印象になりやすいので注意。\n\n迷ったら、ベース1色＋差し色1色＋差し色を支える1色、くらいの配分がちょうどいい。`,
  tags:["色","世界観","配色"], published:true, source:"local"},
 {id:"phrases", title:"バズる切り口フレーズ集", point:"最初の一言に迷ったら、この中から選んでみて♪",
  body:`「この発想はなかった」「こっちが正解!?」「知らないと損してた」「これ1本で変わる」\n「〇〇な人だけ見て」「地味に神アイテム」\n\n冒頭のテロップや台本の掴みに、こうしたフレーズを添えるだけで最初の3秒の離脱が減ります。`,
  tags:["フレーズ","タイトル","サムネ"], published:true, source:"local"},
];

const SECTIONS = [
 {id:"scene", title:"使用シーンを分解", subtitle:"「椅子に座る」を4カットで", emoji:"🪑", sample:true,
  tags:["動作","カット割り","暮らし"], published:true, source:"local",
  full:{src:"assets/video/scene_full.mp4", per:0.8}, cuts:[
   {title:"椅子を引く", angle:"少し引きで、部屋の空気ごと写す", tip:"「これから使う」の予感を1カット目に", media:{v:"assets/video/cut1.mp4"}},
   {title:"背もたれに手を添える", angle:"手元にぐっと寄って", tip:"手のアップで動作の始まりを見せる", media:{v:"assets/video/cut2.mp4"}},
   {title:"腰を下ろす", angle:"横から、動きの瞬間を", tip:"腰を下ろす途中（7割あたり）で止めると、次のカットが自然に繋がる", media:{v:"assets/video/cut3.mp4"}},
   {title:"座って一息", angle:"座った姿に寄って余韻を", tip:"落ち着いた表情で締めると「暮らし」が伝わる", media:{v:"assets/video/cut4.mp4"}},
 ]},
 {id:"fiveshot", title:"なんでも5ショット", subtitle:"どんな動作にも使える万能型", emoji:"✋",
  tags:["アングル","動作","万能"], published:true, source:"local", cuts:[
   {title:"手のアップ", angle:"手元にぐっと寄って", tip:"まず「何をしているか」を手で見せる", media:{i:IMG("lifestyle_using")}},
   {title:"顔のアップ", angle:"表情がわかる距離で", tip:"「誰がしているか」。表情が入ると温度が出る", media:{i:IMG("scene_after")}},
   {title:"引き", angle:"場所全体がわかる広さで", tip:"「どこでしているか」。前のカットから45度以上動くと新鮮に見える", media:{i:IMG("scene_before")}},
   {title:"肩越し", angle:"本人の後ろから手元を見下ろして", tip:"本人目線に近づくと「自分ごと」になる", media:{i:IMG("howto_step1")}},
   {title:"変化球アングル", angle:"真上か、床すれすれから", tip:"最後に1枚、意外な角度で遊ぶと締まる", media:{i:IMG("unbox_contents_flatlay")}},
 ]},
 {id:"unbox", title:"開封", subtitle:"箱を開けるワクワクを見せる", emoji:"📦",
  tags:["開封","商品紹介","ワクワク"], published:true, source:"local", cuts:[
   {title:"箱ヒーロー", angle:"正面から、目線の高さで", tip:"冒頭1秒で「何を開けるか」を伝える", media:{i:IMG("unbox_box_hero")}},
   {title:"開ける瞬間", angle:"斜め上から、手ごと入れて", tip:"開封の瞬間は続きが気になる引きになる", media:{i:IMG("unbox_opening")}},
   {title:"中身を並べる", angle:"真上から俯瞰で", tip:"全体像が一目でわかると安心感が出る", media:{i:IMG("unbox_contents_flatlay")}},
 ]},
 {id:"spec", title:"仕様・ディテール", subtitle:"質感と作り込みを伝える", emoji:"🔍",
  tags:["仕様","ディテール","質感"], published:true, source:"local", cuts:[
   {title:"全体像", angle:"正面から、背景はすっきりさせて", tip:"主役をまず1枚で見せ切る", media:{i:IMG("spec_overview")}},
   {title:"質感の寄り", angle:"斜め横からの光で、グッとマクロ", tip:"質感アップは指を止めさせる", media:{i:IMG("spec_texture_macro")}},
   {title:"気になる部分", angle:"特徴的なパーツに部分アップ", tip:"細部のこだわりが伝わると信頼感が増す", media:{i:IMG("spec_detail")}},
   {title:"手でサイズ感", angle:"手のひらに乗せて", tip:"実際の大きさが一番伝わるカット", media:{i:IMG("spec_inhand")}},
 ]},
 {id:"lifestyle", title:"それがある暮らし", subtitle:"生活になじむ空気感を見せる", emoji:"🏠",
  tags:["暮らし","生活感","部屋"], published:true, source:"local", cuts:[
   {title:"置いた部屋の引き", angle:"窓際の自然光で少し引いて", tip:"世界観が伝わると保存されやすい", media:{i:IMG("lifestyle_room_wide")}},
   {title:"使う手元", angle:"動作中の手元に寄って", tip:"人の動きが入ると「自分ごと」になる", media:{i:IMG("lifestyle_using")}},
   {title:"余韻の寄り", angle:"斜めから、背景は軽くボケさせて", tip:"最後の一枚が投稿の余韻を決める", media:{i:IMG("lifestyle_afterglow")}},
 ]},
 {id:"beforeafter", title:"ビフォーアフター", subtitle:"変化の説得力で魅せる", emoji:"✨",
  tags:["ビフォーアフター","変化","説得力"], published:true, source:"local", cuts:[
   {title:"ビフォー", angle:"正面から、変化前の状態を", tip:"ビフォーが弱いとアフターも弱く見える", media:{i:IMG("beforeafter_before")}},
   {title:"作業中", angle:"手元に寄って、変化の途中を", tip:"変化が起きる瞬間は最後まで見られやすい", media:{i:IMG("beforeafter_working")}},
   {title:"アフター", angle:"ビフォーと同じ構図・同じ距離で", tip:"同じ構図で撮ると変化が一目でわかる", media:{i:IMG("beforeafter_after")}},
 ]},
 {id:"size", title:"サイズ・比較", subtitle:"大きさの実感を伝える", emoji:"📏",
  tags:["サイズ","比較","実寸"], published:true, source:"local", cuts:[
   {title:"定番品と並べる", angle:"見慣れたものを隣に置いて正面から", tip:"身近な比較対象があるとサイズ感が一瞬で伝わる", media:{i:IMG("size_compare_item")}},
   {title:"手のひらに乗せる", angle:"手のひらに乗せて正面から", tip:"手に乗せるだけで実寸がわかる", media:{i:IMG("size_palm")}},
   {title:"収納に入れる", angle:"しまう動作を斜め上から", tip:"収まる様子は「使えそう」を後押しする", media:{i:IMG("size_storage")}},
 ]},
 {id:"howto", title:"使い方ステップ", subtitle:"手順を追って理解させる", emoji:"🔢",
  tags:["使い方","手順","ステップ"], published:true, source:"local", cuts:[
   {title:"STEP1", angle:"手元に寄って、最初の動作を", tip:"STEPごとに区切ると迷わず真似できる", media:{i:IMG("howto_step1")}},
   {title:"STEP2", angle:"手元に寄って、次の動作を", tip:"同じアングルで揃えるとテンポが生まれる", media:{i:IMG("howto_step2")}},
   {title:"STEP3・仕上がり", angle:"真上俯瞰で、仕上がり全体を", tip:"完成形で締めると満足感が残る", media:{i:IMG("howto_step3")}},
 ]},

 /* ---- ここからGoogleシート連携データ（source:"sheet"） ---- */
 {id:"pour-drink", title:"飲み物を注ぐ", subtitle:"キッチンでの一連の動作を3カットで", emoji:"🥤",
  tags:["キッチン","動作","飲み物"], published:true, source:"sheet", draftMedia:true, cuts:[
   {title:"シンクに向かって歩く", angle:"引きで、部屋の空気ごと写す", tip:"引きで家の印象を伝えよう", media:{i:IMG("lifestyle_room_wide")}},
   {title:"グラスをシンクに置く", angle:"手元に寄って", tip:"手の印象を減らすために、カメラに映らない側の手でグラスを持とう", media:{i:IMG("howto_step1")}},
   {title:"水を注ぐ", angle:"手元にぐっと寄って", tip:"迷いなく注ごう", media:{i:IMG("howto_step2")}},
 ]},
 {id:"desk-rest", title:"机で休憩する", subtitle:"腰を下ろすまでの流れを2カットで", emoji:"🪑",
  tags:["机","休憩","動作"], published:true, source:"sheet",
  full:{src:"assets/video/rest_full.mp4", per:0.9}, cuts:[
   {title:"机にグラスを置く", angle:"手元に寄って", tip:"着地してすぐ手を引っ込めない", media:{v:"assets/video/rest_cut1.mp4"}},
   {title:"椅子に腰掛ける", angle:"横から、座る動きを追って", tip:"髪の毛や向きで顔を隠せる", media:{v:"assets/video/rest_cut2.mp4"}},
 ]},

 /* ---- ここからローカル追加（source:"local"・しゅりさん式の型で新規作成） ---- */
 {id:"coffee-morning", title:"朝のコーヒーを淹れる", subtitle:"香りと余韻まで伝える3カット", emoji:"☕",
  tags:["キッチン","朝","暮らし"], published:true, source:"local", cuts:[
   {title:"ケトルでお湯を注ぐ", angle:"手元に寄って、湯気ごと写す", tip:"湯気が入ると香りまで伝わる。細く一定の速さで注ごう", media:{i:IMG("lifestyle_using")}},
   {title:"ドリッパーに落ちる様子", angle:"真上から、円を描く動きを", tip:"前のカットから45度回り込んで真上に来ると新鮮に見える", media:{i:IMG("spec_texture_macro")}},
   {title:"カップを両手で持つ", angle:"座った状態で、少し引きで", tip:"手が入ると「自分ごと」になる。指先までゆっくり動かして", media:{i:IMG("lifestyle_afterglow")}},
 ]},
 {id:"laundry-fold", title:"洗濯物をたたむ", subtitle:"暮らしの丁寧さが伝わる3カット", emoji:"🧺",
  tags:["家事","暮らし","動作"], published:true, source:"local", cuts:[
   {title:"カゴを持ってくる", angle:"少し引きで、部屋の空気ごと", tip:"「これからやる」の予感を1カット目に", media:{i:IMG("lifestyle_room_wide")}},
   {title:"たたむ手元", angle:"手元にぐっと寄って", tip:"5ショットルールの「手のアップ」。爪先まで意識してゆっくり", media:{i:IMG("howto_step2")}},
   {title:"たたみ終えて重ねる", angle:"真上俯瞰で仕上がりを", tip:"整った様子で締めると満足感が伝わる", media:{i:IMG("howto_step3")}},
 ]},
 {id:"grocery-put-away", title:"買い物から帰って片付ける", subtitle:"帰宅から片付けまでの3カット", emoji:"🛍️",
  tags:["家事","キッチン","暮らし"], published:true, source:"local", cuts:[
   {title:"玄関で袋を置く", angle:"引きで、玄関先の空気ごと", tip:"帰宅の始まりを1カット目に見せる", media:{i:IMG("unbox_box_hero")}},
   {title:"冷蔵庫にしまう", angle:"肩越しに、手元を見下ろして", tip:"本人目線に近いカットは「自分ごと」になりやすい", media:{i:IMG("howto_step1")}},
   {title:"しまい終えてキッチンを整える", angle:"斜めから部屋全体を引きで", tip:"動作の途中（7:3）で切り替えると自然に繋がる", media:{i:IMG("spec_overview")}},
 ]},
];

const DICT = [
 {id:"cosmetics", cat:"コスメ・スキンケア", light:"柔らかい自然光・逆光ぎみ", bg:"無地／大理石調", angle:"斜め45°＋真上", rec:["spec","lifestyle"],
  tags:["コスメ","スキンケア","光"], published:true, source:"local"},
 {id:"food", cat:"食べ物・ドリンク", light:"自然光サイド", bg:"木／リネン", angle:"真上＋寄り", rec:["lifestyle","spec"],
  tags:["食べ物","ドリンク","自然光"], published:true, source:"local"},
 {id:"gadget", cat:"ガジェット・家電", light:"均一・影控えめ", bg:"グレー／白", angle:"正面＋ディテール", rec:["unbox","spec"],
  tags:["ガジェット","家電","開封"], published:true, source:"local"},
 {id:"fashion", cat:"服・ファッション小物", light:"自然光", bg:"白壁／床置き", angle:"真上フラットレイ", rec:["lifestyle","size"],
  tags:["服","ファッション","フラットレイ"], published:true, source:"local"},
 {id:"interior", cat:"インテリア雑貨", light:"窓際自然光", bg:"実際の部屋", angle:"引き＋寄り", rec:["lifestyle","beforeafter"],
  tags:["インテリア","雑貨","部屋"], published:true, source:"local"},
 {id:"kitchen", cat:"キッチン・食器", light:"自然光", bg:"木／タイル", angle:"真上＋斜め", rec:["howto","lifestyle"],
  tags:["キッチン","食器","暮らし"], published:true, source:"local"},
 {id:"baby", cat:"おもちゃ・ベビー", light:"明るい自然光", bg:"無地明るい", angle:"目線＋俯瞰", rec:["unbox","lifestyle"],
  tags:["おもちゃ","ベビー","開封"], published:true, source:"local"},
 {id:"book", cat:"本・文具", light:"柔らかい光", bg:"無地／木", angle:"真上フラットレイ", rec:["spec","size"],
  tags:["本","文具","フラットレイ"], published:true, source:"local"},
 {id:"housework", cat:"家事・暮らしの動作", light:"自然光", bg:"実際の部屋・キッチン", angle:"動作の途中でカットを割る", rec:["pour-drink","desk-rest","laundry-fold","grocery-put-away"],
  tags:["家事","動作","暮らし"], published:true, source:"local"},
 {id:"drink-scene", cat:"ドリンクを飲むシーン", light:"自然光サイド", bg:"キッチン／リビング", angle:"動作を分解して見せる", rec:["pour-drink","desk-rest"],
  tags:["ドリンク","キッチン","動作"], published:true, source:"local"},
];

window.CONTENT = { ARTICLES, SECTIONS, DICT };
