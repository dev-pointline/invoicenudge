import { Mail, ArrowRight, Copy } from "lucide-react";
import { CopyEmailButton } from "./CopyEmailButton";

interface OnboardingPromptProps {
  forwardEmail: string;
}

export function OnboardingPrompt({ forwardEmail }: OnboardingPromptProps) {
  return (
    <div className="bg-white rounded-2xl border p-8 text-center">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Mail className="h-8 w-8 text-primary-600" />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Forward your first invoice
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Send any invoice to the address below. We&apos;ll extract the details and
        set up automatic reminders.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 inline-block mb-6">
        <div className="flex items-center gap-3">
          <code className="text-lg font-mono text-primary-700">
            {forwardEmail}
          </code>
          <CopyEmailButton email={forwardEmail} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-medium">
            1
          </div>
          Forward invoice
        </div>
        <ArrowRight className="h-4 w-4" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-medium">
            2
          </div>
          AI extracts details
        </div>
        <ArrowRight className="h-4 w-4" />
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-medium">
            3
          </div>
          Reminders sent automatically
        </div>
      </div>
    </div>
  );
}