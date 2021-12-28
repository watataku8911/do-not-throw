<template>
  <div class="footer-box">
    <footer class="footer">
      <h1 class="footer-h1"><NuxtLink to="/">Don't throw</NuxtLink></h1>
      <div class="about">
        <h4 class="footer-h4">About</h4>
        <ul>
          <li class="li">Dont' throwについて</li>
          <li class="li">よくある質問</li>
          <li class="li">
            <a
              href="https://watataku-portfolio.web.app"
              target="_blank"
              class="footer-a"
              >運営会社</a
            >
          </li>
          <li class="li">使い方</li>
          <li class="li">チェンジログ</li>
        </ul>
      </div>

      <div class="legal">
        <h4 class="footer-h4">Legal</h4>
        <ul>
          <li class="li">プライバシーポリシー</li>
          <li class="li">特定法表記</li>
        </ul>
      </div>

      <div class="links">
        <h4 class="footer-h4">Links</h4>
        <ul>
          <li class="li">
            <a
              href="https://watataku-portfolio.web.app/contact#c-box"
              target="_blank"
              class="footer-a"
              >お問い合わせ</a
            >
          </li>
          <li class="li">
            <a
              href="https://twitter.com/watataku8911"
              target="_blank"
              class="footer-a"
              >Twitter</a
            >
          </li>
          <li class="li">
            <a
              href="https://instagram.com/watataku8911"
              target="_blank"
              class="footer-a"
              >Instagram</a
            >
          </li>
          <li class="li">Github</li>
        </ul>
      </div>
    </footer>
    <small class="copy">&copy;2021 Watataku</small>
  </div>
</template>

<style scoped>
.footer {
  padding-top: 20px;
}

.footer-h1 a {
  color: #37e279;
  text-decoration: none;
}

.footer-h4 {
  margin-bottom: 20px;
}

.li {
  color: #333;
  margin-bottom: 20px;
  list-style: none;
}

.footer-a {
  color: #333;
  text-decoration: none;
}

.footer-box .copy {
  letter-spacing: 1px;
  text-align: center;
  border-top: solid 1px #888;
  width: 100%;
  background-color: #ccc;
  display: block;
  padding-top: 2%;
  padding-bottom: 2%;
}

@media screen and (min-width: 1026px) {
  .footer-h1 {
    font-family: "Anton", sans-serif;
    font-family: "Lobster", cursive;
    font-size: 2em;
  }

  .footer-box .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

@media screen and (min-width: 482px) and (max-width: 1025px) {
  .footer-h1 {
    font-family: "Anton", sans-serif;
    font-family: "Lobster", cursive;
    font-size: 2em;
  }

  .footer-box .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

@media screen and (max-width: 481px) {
  .footer-h1 {
    font-family: "Anton", sans-serif;
    font-family: "Lobster", cursive;
    font-size: 2em;
    margin-bottom: 20px;
  }

  .footer-box .footer {
    width: 100%;
  }
}
</style>
