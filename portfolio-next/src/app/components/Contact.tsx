"use client";
import { sendEmail } from "@/actions/sendEmail";
import { Button } from "@/components/Button";

export function Contact() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-y-8">
        <div className="flex w-full flex-col justify-center gap-y-4 text-center">
          <h2 className="text-3xl font-bold  md:text-4xl">
            Get in touch with me
          </h2>
          <p className="text-gray-400">
            I'm always open to new opportunities and collaborations.
          </p>
        </div>
        <form
          className="flex w-full max-w-xl flex-col gap-y-4"
          action={async (formData) => {
            await sendEmail(formData);
          }}
        >
          <input
            className="h-14 w-full rounded-lg border border-gray-400/20 bg-gray-800/10 p-4"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Your email"
          />
          <textarea
            className="h-52 w-full rounded-lg border border-gray-400/20 bg-gray-800/10 p-4"
            name="message"
            placeholder="Your message"
            required
            maxLength={5000}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}