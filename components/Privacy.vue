<template>
<div class="privacy">
        <h4 class="privacy-ttl">プライバシーポリシー</h4>
        <div class="module--spacing--verySmall"></div>
        <p>Don't thorw（以下、「当サービス」）では、個人情報の取り扱いについて下記のように定めます。</p>
        <h5>【個人情報の取得】</h5>
        <p>
          当サービスでは、ユーザーの皆様の個人情報（氏名、住所、メールアドレス、電話番号など個人を特定できる情報）を取得させて頂くことがあります。
        </p>
        <h5>【個人情報の利用】</h5>
        <p>
          取得した個人情報は、下記の目的で利用いたします。<br>
          <ul>
            <li>お客様からのお問い合わせに対する回答送付</li>
          </ul>
        </p>
        <h5>【個人情報の安全管理】</h5>
        <p>
          当サービスでは取得した個人情報について適切な管理に努めると共に個人情報の漏洩、改ざん、不正な侵入の防止に努めます。
        </p>
        <h5>【第三者への開示・提供の禁止】</h5>
        <p>
          当サービスではお客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示いたしません。<br>
          <ul>
            <li>法律上照会権限を有する者から書面による正式な協力要請、照会があった場合</li>
            <li>お客様の同意があった場合</li>
          </ul>
        </p>
        <h5>【個人情報に関する問い合わせ】</h5>
        <p>
          個人情報に関するお問い合わせは、下記までお願い致します。<br>
          <i>watano.takuya@gmail.com</i>
        </p>
        <h5>【改変と見直しについて】</h5>
        <p>個人情報については、法令変更などを受けて随時見直しを行います。</p>
    </div>
</template>

<style scoped>
.privacy li {
  list-style: square inside;
}
/*PC*/
@media screen and (min-width: 1026px) {
  .privacy {
    margin: 0 auto;
    padding: 1%;
    width: 50%;
    height: 200px;
    border: 1px solid #000;
    overflow: scroll;
  }
  .privacy-ttl {
    margin-top: 0px;
    font-size: 17px;
  }

  .privacy h5 {
    font-size: 15px;
    text-align: left;
  }

  .privacy p {
    font-size: 10px;
    text-align: left;
  }
}
/*タブレット*/
@media screen and (min-width: 482px) and (max-width: 1025px) {
  .privacy {
    margin: 0 auto;
    padding: 1.5%;
    width: 95%;
    height: 250px;
    border: 1px solid #000;
    overflow: scroll;
  }

  .privacy-ttl {
    margin-top: 0px;
    font-size: 17px;
  }

  .privacy h5 {
    font-size: 15px;
    text-align: left;
  }

  .privacy p {
    font-size: 10px;
    text-align: left;
  }
}
@media screen and (max-width: 481px) {
  .privacy {
    margin: 0 auto;
    padding: 1%;
    width: 95%;
    height: 200px;
    border: 1px solid #000;
    overflow: scroll;
  }

  .privacy-ttl {
    font-size: 17px;
  }

  .privacy h5 {
    font-size: 15px;
    text-align: left;
  }

  .privacy p {
    font-size: 10px;
    text-align: left;
  }
}
</style>