function Signin() {
  return (
    <div class='container'>
      <main class='auth'>
        <div class='auth__header'>
          <div class='auth__logo'>
            <a href='/index.html'>
              <img src='/public/icons/linkbrary.svg' alt='링크브러리 로고' />
            </a>
            <h1 class='a11y'>링크브러리 로그인</h1>
          </div>
          <div class='auth__redirect'>
            <span>회원이 아니신가요?</span>
            <a href='/pages/signup.html' class='auth__redirect-link'>
              회원 가입하기
            </a>
          </div>
        </div>

        <form novalidate class='form'>
          <div class='form__inputs'>
            <div class='form__input'>
              <label for='form-email' class='form__input-text'>
                이메일
              </label>
              <input
                type='email'
                placeholder='codeit@codeit.com'
                id='form-email'
                class='form__input-box'
              />
              <p class='error-message'></p>
            </div>
            <div class='form__input'>
              <label for='form-password' class='form__input-text'>
                비밀번호
              </label>
              <input
                type='password'
                placeholder='• • • • • • • •'
                id='form-password'
                class='form__input-box'
              />
              <button type='button' class='form__password-toggle'>
                <img src='/public/icons/eye-off.svg' alt='비밀번호 표시' />
              </button>
              <p class='error-message'></p>
            </div>
          </div>
          <button type='submit' class='form__submit button'>
            로그인
          </button>
        </form>

        <div class='auth__social'>
          <span class='auth__social-text'>소셜 로그인</span>
          <ul class='auth__social-logos'>
            <li>
              <a
                href='https://google.com'
                class='auth__social-logo auth__social-logo--google'
              >
                <img src='/public/icons/google.png' alt='구글 로고' />
              </a>
            </li>
            <li>
              <a
                href='https://www.kakaocorp.com/page/'
                class='auth__social-logo auth__social-logo--kakaotalk'
              >
                <img src='/public/icons/kakotalk.svg' alt='카카오톡 로고' />
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Signin;
