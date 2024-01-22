import { Resend } from "resend";

const respond = new Resend(process.env.RESEND_SECRET_CODE);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXTAUTH_URL}/auth/new-verification?token=${token}`;
  await respond.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
  });
  console.log("done");
  
};
