# review/ — バズ撮りカメラ 物リスト レビューページ

公開URL: https://nakagawasanchi.github.io/buzz-dori/review/  （index は noindex）

## 構成
- `index.html` … トップ（4工程カード）＋工程ページ（#items / #cuts / #stills / #videos）。データは `data.json`、判定は Supabase から読む
- `data.json` … **正本**。`places`・`groups[]`（id / place / name / motion / items / reuse / why / cuts[] / stills[] / videos[]）・`itemCount`・`version`・`generated`
- `media/` … 静止画・動画（`<gid>_c<N>.jpg|.mp4`）。data.json の `stills` / `videos` に相対パス（`media/k01_c1.jpg`）を入れると表示される

## 判定の保存先
Supabase（tracingmap プロジェクト）の既存テーブル `buzzdori_feedback`（page, body, created_at）を流用。
- `page = review:<stage>:<gid>`（stage は items / cuts / stills / videos）。**stills / videos は1枚・1本ずつ判定で `<gid>` = `<グループ>_c<N>`**（例 `review:stills:k01_c3`。N は data.json の stills/videos 配列の位置＝カット番号）
- `body = {"status":"ok|fix|drop|","comment":"…","dropped":["外したアイテム"],"by":"中川|しゅり|claude"}`
- 追記のみ・**同じ page の最新行が有効**。URL/anon key は `../index.html` と同じ

## Claude（Mac / Air の Slack秘書）の更新手順
1. `git -C ~/50_PRIVATE/buzz-dori pull --ff-only origin main`
2. `review/` を編集（data.json のグループ・カット案・stills/videos のパス、index.html の見た目）。`itemCount` と `generated` も更新
3. **公開は `bash ~/50_PRIVATE/claude_code/scripts/buzzdori_publish.sh "review: …"`**（pull→add review→commit→push を一括。Pages は数十秒で反映）。Slack秘書は許可リストの都合で `cd … && git …` が通らないので必ずこれを使う
4. 判定を読む: `python3 ~/50_PRIVATE/claude_code/scripts/buzzdori_review.py feedback cuts`（`pending cuts` で要修正だけ）
5. Claude 側から判定を書く: `… set cuts k01 ok` / `… set cuts k01 fix 寄りを俯瞰に`

ルール: 固定カメラ（カット内で動かさない）／カットごとに別撮り・別アングル／同一アングルの間で背景を変えない／3カット基本／IHコンロ／子ども向けは子どもを写す。分け方の基準は `~/50_PRIVATE/claude_code/notes/topics/バズ撮りカメラ_物リスト_指示傾向.md`。
