const { CLIENT_URL, MAIL_USERNAME } = process.env;

exports.registerEmail = (emailReceiver, name, otp) => {
    const template = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Kode Verifikasi Email</title>
            <style>
                body {
                    font-family: sans-serif;
                    line-height: 1.5;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                }
                h1 {
                    color: #30628c;
                    margin-bottom: 20px;
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    padding: 20px;
                    background-color: #f5f5f5;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Verifikasi Email</h1>
                <p>Halo <b>${name},</b></p>
                <p>
                    Terima kasih telah mendaftar di FlyNow! Untuk memverifikasi email kamu, silahkan
                    masukkan kode OTP berikut:
                </p>
                <div class="otp-code">${otp}</div>
                <p>
                    <i
                        >Kode OTP ini hanya berlaku selama 15 menit dan bersifat rahasia. Mohon untuk
                        tidak membagikan kode ini kepada siapapun, termasuk pihak yang mengatasnamakan
                        FlyNow.</i
                    >
                </p>
                <p>Jika Anda tidak melakukan pendaftaran, Anda dapat mengabaikan email ini.</p>
                <br /><br />
                <p>Terima kasih,</p>
                <p><b>FlyNow Support</b></p>
            </div>
        </body>
    </html>
  `;

    return {
        from: {
            name: "FlyNow Support",
            address: MAIL_USERNAME,
        },
        to: emailReceiver,
        subject: "Verifikasi Email (OTP)",
        html: template,
    };
};

exports.forgotPasswordEmail = (emailReceiver, name, token) => {
    const template = `
      <!DOCTYPE html>
      <html>
          <head>
              <title>Reset Password</title>
              <style>
                  body {
                      font-family: sans-serif;
                      line-height: 1.5;
                      color: #333;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      border: 1px solid #eee;
                      border-radius: 5px;
                  }
                  .header {
                      text-align: center;
                      margin-bottom: 20px;
                  }
                  h1 {
                      color: #30628c;
                      margin-bottom: 20px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Reset Password</h1>
                  <p>Halo <b>${name},</b></p>
                  <p>Untuk mereset password kamu, silakan klik tombol di bawah ini:</p>
                  <a
                      href="${CLIENT_URL}/reset-password/${token}"
                      style="
                          display: inline-block;
                          padding: 10px 20px;
                          background-color: #30628c;
                          color: #ffffff !important;
                          text-decoration: none;
                          border-radius: 5px;
                          font-family: sans-serif !important;
                      "
                      >Reset Password</a
                  >
                  <p>Jika kamu tidak meminta untuk mereset password, kamu bisa mengabaikan email ini.</p>
                  <br /><br />
                  <p>Terima kasih,</p>
                  <p><b>FlyNow Support</b></p>
              </div>
          </body>
      </html>
  `;

    return {
        from: {
            name: "FlyNow Support",
            address: MAIL_USERNAME,
        },
        to: emailReceiver,
        subject: "Link Reset Password",
        html: template,
    };
};

exports.resendOTPEmail = (emailReceiver, name, otp) => {
    const template = `
    <!DOCTYPE html>
    <html>
        <head>
            <title>Kode Verifikasi Email</title>
            <style>
                body {
                    font-family: sans-serif;
                    line-height: 1.5;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #eee;
                    border-radius: 5px;
                }
                h1 {
                    color: #30628c;
                    margin-bottom: 20px;
                }
                .otp-code {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    padding: 20px;
                    background-color: #f5f5f5;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Verifikasi Email</h1>
                <p>Halo <b>${name},</b></p>
                <p>
                    Terima kasih telah mendaftar di FlyNow! Untuk memverifikasi email kamu, silahkan
                    masukkan kode OTP berikut:
                </p>
                <div class="otp-code">${otp}</div>
                <p>
                    <i
                        >Kode OTP ini hanya berlaku selama 15 menit dan bersifat rahasia. Mohon untuk
                        tidak membagikan kode ini kepada siapapun, termasuk pihak yang mengatasnamakan
                        FlyNow.</i
                    >
                </p>
                <p>Jika Anda tidak melakukan pendaftaran, Anda dapat mengabaikan email ini.</p>
                <br /><br />
                <p>Terima kasih,</p>
                <p><b>FlyNow Support</b></p>
            </div>
        </body>
    </html>
  `;

    return {
        from: {
            name: "FlyNow Support",
            address: MAIL_USERNAME,
        },
        to: emailReceiver,
        subject: "Verifikasi Email (OTP)",
        html: template,
    };
};
