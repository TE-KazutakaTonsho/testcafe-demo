import { Selector, Role } from 'testcafe';

const userId = process.env.USER_ID;
const password = process.env.PASSWORD;
const baseUrl = process.env.BASE_URL;

// adminでログイン
const admin = Role(`${baseUrl}/login`, async t => {
  await t
    .typeText('input[name="userid"]', userId)
    .typeText('input[name="password"]', password)
    .click('button[type="submit"]');
}, { preserveUrl: true });  // ログイン後のURLを維持する

///////////

fixture('私の最初のテスト')
  .page(baseUrl);

test('adminでログインしたらトップ画面が表示される', async t => {
  await t
    .useRole(admin)
    .expect(Selector('#b_content_area > h1').innerText).eql('トップ画面');
});

test('adminでログインしてグループ一覧メニューを選択したらグループ一覧が表示される', async t => {
  const groupListButton = Selector('#b_menu_area').find('button').withText('グループ一覧');
  await t
    .useRole(admin)
    .click(groupListButton)
    .expect(Selector('#b_content_area > h1').innerText).eql('グループ一覧');
});
