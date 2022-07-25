import client from "./options.js";

const domain =
  process.env.NODE_ENV === "development"
    ? "localhost:3000"
    : "memories.tno-msa.com";

const sendEmail = async (name, email, code) => {
  const sentEmail = await client.sendMail({
    from: '"Memories Family" <foo@example.com>',
    to: email,
    subject: "Memories - Account Activation",
    text: "Hello world?",
    html: `<div><h4>Hello ${name}👋,</h4></div>
        <div>
        <p>We are glad to have you in the Memories family!</p>
        <p>In order to confirm your registration, we kindly ask you to activate your account by clicking on the link below:</p>
        </div>
        <div><p>http://${domain}/activation?code=${code}</p></div>`,
  });

  console.log("Message sent: %s", sentEmail.messageId);
};

export default sendEmail;
