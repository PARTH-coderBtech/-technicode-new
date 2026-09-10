const puppeteer = require("puppeteer");
const QRCode = require("qrcode");

const generateCertificatePDF = async (certificate) => {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify/${certificate.certificateId}`;

  const qrCode = await QRCode.toDataURL(verificationUrl);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const html = `
<!DOCTYPE html>

<html>

<head>

<style>

@page {
  size: A4 landscape;
  margin: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

.certificate {
  width: 1123px;
  height: 794px;

  padding: 55px 70px;

  position: relative;

  background: linear-gradient(
    135deg,
    #ffffff,
    #f7fbff
  );

  border: 12px solid #071B2A;
}

.inner-border {
  position: absolute;

  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;

  border: 2px solid #00D1FF;
}

.content {
  position: relative;
  z-index: 2;

  text-align: center;
}

.logo {
  font-size: 34px;
  font-weight: bold;

  color: #071B2A;

  letter-spacing: 2px;
}

.logo span {
  color: #00AEEF;
}

.title {
  margin-top: 35px;

  font-size: 28px;

  letter-spacing: 5px;

  color: #071B2A;
}

.presented {
  margin-top: 25px;

  font-size: 17px;

  color: #555;
}

.name {
  margin-top: 15px;

  font-size: 42px;

  font-weight: bold;

  color: #071B2A;

  text-transform: uppercase;
}

.line {
  width: 400px;

  height: 2px;

  background: #00D1FF;

  margin: 15px auto;
}

.description {
  margin-top: 20px;

  font-size: 17px;

  line-height: 1.7;

  color: #444;
}

.role {
  font-size: 24px;

  font-weight: bold;

  color: #00AEEF;

  margin: 12px 0;
}

.bottom {
  position: absolute;

  bottom: 55px;

  left: 70px;
  right: 70px;

  display: flex;

  justify-content: space-between;

  align-items: flex-end;
}

.signature {
  text-align: center;

  width: 180px;
}

.signature-line {
  border-top: 1px solid #333;

  margin-bottom: 8px;
}

.qr img {
  width: 95px;
}

.certificate-id {
  font-size: 13px;

  color: #555;
}

.footer {
  font-size: 12px;

  color: #777;

  margin-top: 5px;
}

</style>

</head>

<body>

<div class="certificate">

<div class="inner-border"></div>

<div class="content">

<div class="logo">
TECH<span>IN</span>CODE
</div>

<div class="title">
CERTIFICATE OF COMPLETION
</div>

<div class="presented">
This is proudly presented to
</div>

<div class="name">
${certificate.recipientName}
</div>

<div class="line"></div>

<div class="description">

For successfully completing the

<div class="role">
${certificate.role}
</div>

Internship Program with TechInCode.

<br/>

The candidate successfully participated in
practical assignments and project-based activities
in the field of ${certificate.domain}.

<br/>

Internship Duration:

<strong>
${formatDate(certificate.startDate)}
-
${formatDate(certificate.endDate)}
</strong>

</div>

</div>

<div class="bottom">

<div class="signature">

<div class="signature-line"></div>

<strong>Authorized Signatory</strong>

<br/>

TechInCode

</div>


<div class="qr">

<img src="${qrCode}" />

<div class="certificate-id">

Certificate ID:

<br/>

<strong>
${certificate.certificateId}
</strong>

</div>

</div>

</div>

</div>

</body>

</html>
`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = generateCertificatePDF;