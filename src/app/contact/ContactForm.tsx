"use client";

import { useActionState } from "react";
import { sendContactEmail, type FormState } from "./actions";

export default function ContactForm() {
	const [state, action, isPending] = useActionState<FormState, FormData>(
		sendContactEmail,
		null
	);

	if (state?.success) {
		return <p className={successMessageStyling}>{state.message}</p>;
	}

	return (
		<form action={action} className={formStyling}>
			<div className={rowStyling}>
				<div className={fieldGroupStyling}>
					<label htmlFor="name" className={labelStyling}>
						name
					</label>
					<input
						id="name"
						name="name"
						type="text"
						required
						autoComplete="name"
						className={inputStyling}
					/>
				</div>
				<div className={fieldGroupStyling}>
					<label htmlFor="email" className={labelStyling}>
						email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						autoComplete="email"
						className={inputStyling}
					/>
				</div>
			</div>

			<div className={fieldGroupStyling}>
				<label htmlFor="subject" className={labelStyling}>
					subject
				</label>
				<input
					id="subject"
					name="subject"
					type="text"
					required
					className={inputStyling}
				/>
			</div>

			<div className={fieldGroupStyling}>
				<label htmlFor="message" className={labelStyling}>
					message
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={6}
					className={textareaStyling}
				/>
			</div>

			{state && <p className={errorMessageStyling}>{state.message}</p>}

			<button
				type="submit"
				disabled={isPending}
				className={submitButtonStyling}
			>
				{isPending ? "sending..." : "send"}
			</button>
		</form>
	);
}

const formStyling = `
	flex
	flex-col
	gap-6
	w-full
	max-w-2xl
	h-[500px]
`;

const rowStyling = `
	flex
	flex-col md:flex-row
	gap-6
`;

const fieldGroupStyling = `
	flex
	flex-col
	gap-2
	w-full
`;

const labelStyling = `
	text-sm
	font-medium
	tracking-tight
	text-black dark:text-bone
	opacity-60
`;

const inputStyling = `
	w-full
	bg-transparent
	border-b
	border-black dark:border-bone
	border-opacity-30 dark:border-opacity-30
	py-2
	text-base
	text-black dark:text-bone
	outline-none
	focus:border-opacity-100 dark:focus:border-opacity-100
	transition-all
	duration-200
`;

const textareaStyling = `
	w-full
	bg-transparent
	border-b
	border-black dark:border-bone
	border-opacity-30 dark:border-opacity-30
	py-2
	text-base
	text-black dark:text-bone
	outline-none
	focus:border-opacity-100 dark:focus:border-opacity-100
	transition-all
	duration-200
	resize-none
`;

const submitButtonStyling = `
	w-fit
	text-base
	font-bold
	tracking-tight
	text-black dark:text-bone
	underline
	underline-offset-4
	opacity-80
	hover:opacity-100
	disabled:opacity-40
	transition-opacity
	duration-200
	cursor-pointer
	disabled:cursor-not-allowed
`;

const successMessageStyling = `
	text-sm
	font-medium
	text-black dark:text-bone
	h-[500px]
`;

const errorMessageStyling = `
	text-sm
	font-medium
	text-red-500
`;
