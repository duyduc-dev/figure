$(() => {
  const btnLogin = $(".btn-login");
  const loginModalContainer = $(".modal-login-container");
  const overlay = $(".modal-login-container>.overlay");

  const formLogin = $(".modal-login-inner");

  btnLogin.click(() => {
    loginModalContainer.fadeIn();
  });
  overlay.click(() => {
    loginModalContainer.fadeOut();
  });

  // formLogin.submit((e) => {
  //   e.preventDefault();
  //   const formData = formLogin.serializeArray().reduce(
  //     (total, val) => ({
  //       ...total,
  //       [val.name]: val.value,
  //     }),
  //     {}
  //   );

  //   console.log(formData);
  // });
});
