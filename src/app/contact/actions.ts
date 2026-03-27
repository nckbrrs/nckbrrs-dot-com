"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type FormState = {
	success: boolean;
	message: string;
} | null;

export async function sendContactEmail(
	_prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const name = formData.get("name") as string;
	const email = formData.get("email") as string;
	const subject = formData.get("subject") as string;
	const message = formData.get("message") as string;

	if (!name || !email || !subject || !message) {
		return { success: false, message: "All fields are required." };
	}

	try {
		await resend.emails.send({
			from: `${name} (via nickbarrs.com contact form) <contact@nickbarrs.com>`,
			to: "contact@nickbarrs.com",
			replyTo: email,
			subject: subject,
			text: message
		});

		return {
			success: true,
			message: "Thanks! I'll get back to you soon."
		};
	} catch {
		return {
			success: false,
			message:
				"Sorry, something went wrong. Please refresh and try again."
		};
	}
}
