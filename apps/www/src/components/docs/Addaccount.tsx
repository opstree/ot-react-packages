import { ArrowLeft } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

// ── Constants ────────────────────────────────────────────────────────────────
const EXT_ID = "budget-mgr-" + Math.floor(10000000 + Math.random() * 90000000);

const PERMISSIONS = [
  "budgets:ViewBudget",
  "ce:GetCostAndUsage",
  "ce:GetCostForecast",
  "ce:GetUsageForecast",
  "organizations:ListAccounts",
];

const ENVIRONMENTS = ["PROD", "STAGING", "DEV", "SANDBOX"];
const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"];

type FormState = {
  accountId: string;
  alias: string;
  environment: string;
  region: string;
  ownerEmail: string;
  orgId: string;
  roleArn: string;
};

type ErrorState = {
  accountId?: string;
  alias?: string;
  ownerEmail?: string;
  roleArn?: string;
  submit?: string;
};



// ── Types ────────────────────────────────────────────────────────────────────
const initialForm = {
  accountId: "",
  alias: "",
  environment: "PROD",
  region: "us-east-1",
  ownerEmail: "",
  orgId: "",
  roleArn: "",
};

const initialErrors = {
  accountId: "",
  alias: "",
  ownerEmail: "",
  roleArn: "",
};

// ── Sub-components ───────────────────────────────────────────────────────────
function StepIndicator({
  step,
  label,
  status,
}: {
  step: string;
  label: string;
  status: string;
}) {
  const numClasses =
    status === "done"
      ? "w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[0.72rem] font-semibold shrink-0 transition-all duration-[250ms] bg-emerald-500  text-black"
      : status === "active"
        ? "w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[0.72rem] font-semibold shrink-0 transition-all duration-[250ms] border-2 border-amber-600 text-amber-600 bg-transparent"
        : "w-[26px] h-[26px] rounded-full flex items-center justify-center font-mono text-[0.72rem] font-semibold shrink-0 transition-all duration-[250ms] border-2 border-b border-neutral-300 text-[#6b7591]";

  const labelClasses =
    status === "done"
      ? "text-xs font-medium transition-all duration-[250ms] whitespace-nowrap text-emerald-500"
      : status === "active"
        ? "text-xs font-medium transition-all duration-[250ms] whitespace-nowrap text-black"
        : "text-xs font-medium transition-all duration-[250ms] whitespace-nowrap text-[#6b7591]";

  return (
    <div className="flex items-center gap-2">
      <div className={numClasses}>{status === "done" ? "✓" : step}</div>
      <span className={labelClasses}>{label}</span>
    </div>
  );
}

function FormGroup({
  label,
  required = false,
  error = "",
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[0.65rem] font-medium tracking-wider text-[#6b7591] uppercase">
        {label}
        {required && <span className="text-amber-600 ml-0.5"> ★</span>}
      </label>
      {children}
      {error && <span className="text-[0.7rem] text-red-500 font-mono">{error}</span>}
    </div>
  );
}

function UpperText({ setVisible }: { setVisible: (visible: boolean) => void }) {
  return (
    <header className="px-7 pt-6 pb-5 border-b border-neutral-300 flex items-start justify-between">
      <div>
        <h2 id="modal-title" className="text-[1.05rem] font-semibold tracking-tight text-black">
          Onboard AWS Account
        </h2>
        <p className="font-mono text-[0.72rem] text-[#6b7591] mt-0.5">
          Register account for budget management
        </p>
      </div>
      <button
        className="bg-transparent border border-b border-neutral-300 text-[#6b7591] rounded-md w-7 h-7 cursor-pointer text-sm flex items-center justify-center transition-colors duration-150 shrink-0 hover:border-amber-600 hover:text-amber-600"
        onClick={() => setVisible(false)}
        aria-label="Close"
      >
        ✕
      </button>
    </header>
  );
}

function Footer({
  goBack,
  goNext,
  nextBtnClass,
  nextBtnLabel,
  currentStep,
  submitted,
}: {
  goBack: () => void;
  goNext: () => void;
  nextBtnClass: string;
  currentStep: number;
  nextBtnLabel: string;
  submitted: boolean;
}) {
  const nextClasses =
    nextBtnClass === "btn-next success"
      ? "flex-[3] border-none rounded-lg text-sm font-semibold py-2.5 px-4 cursor-default flex items-center justify-center gap-1.5 transition-colors duration-150 bg-emerald-500 text-white"
      : "flex-[3] border-none rounded-lg text-sm font-semibold py-2.5 px-4 cursor-pointer flex items-center justify-center gap-1.5 transition-colors duration-150 bg-amber-600 text-white hover:bg-amber-400";

  return (
    <div className="w-full px-7 pt-4 pb-6 flex justify-between items-center gap-8">
      <button
        className="flex-1 bg-transparent flex gap-4 items-center border border-b border-neutral-300 rounded-lg text-black text-sm font-medium py-2.5 px-4 cursor-pointer transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        onClick={goBack}
        disabled={currentStep === 1}
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <button className={nextClasses} onClick={goNext} disabled={submitted}>
        {nextBtnLabel}
      </button>
    </div>
  );
}

// ── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({
  form,
  errors,
  onChange,
}: {
  form: typeof initialForm;
  errors: ErrorState;
  onChange: (field: string, value: string) => void;
}) {
  const inputBase =
    "bg-neutral-100 border border-b border-neutral-300 rounded-[7px] text-black text-sm py-2 px-3 outline-none transition-colors duration-150 w-full appearance-none placeholder:text-[#3a4155] focus:border-amber-600";

  return (
    <div className="animate-[fadeIn_0.2s_ease] flex flex-col gap-4">
      <FormGroup label="AWS Account ID" required error={errors.accountId}>
        <input
          type="text"
          className={`${inputBase} ${errors.accountId ? "!border-red-500" : ""}`}
          value={form.accountId}
          onChange={(e) => onChange("accountId", e.target.value)}
          placeholder="e.g. 123456789012"
          maxLength={12}
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup
        label="Account Alias / Friendly Name"
        required
        error={errors.alias}
      >
        <input
          type="text"
          className={`${inputBase} ${errors.alias ? "!border-red-500" : ""}`}
          value={form.alias}
          onChange={(e) => onChange("alias", e.target.value)}
          placeholder="e.g. Production Core"
          autoComplete="off"
        />
      </FormGroup>

      <div className="grid grid-cols-2 gap-3">
        <FormGroup label="Environment">
          <select
            className={`${inputBase} pr-8 bg-no-repeat bg-[right_0.75rem_center] text-black`}
            value={form.environment}
            onChange={(e) => onChange("environment", e.target.value)}
          >
            {ENVIRONMENTS.map((env) => (
              <option key={env} value={env} className="text-black">
                {env}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup label="Primary Region">
          <select
            className={`${inputBase} pr-8 bg-no-repeat bg-[right_0.75rem_center] text-black`}
            value={form.region}
            onChange={(e) => onChange("region", e.target.value)}
          >
            {REGIONS.map((r) => (
              <option key={r} value={r} className="text-black">
                {r}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>

      <FormGroup label="Account Owner Email" error={errors.ownerEmail}>
        <input
          type="email"
          className={`${inputBase} text-black ${errors.ownerEmail ? "!border-red-500" : ""}`}
          value={form.ownerEmail}
          onChange={(e) => onChange("ownerEmail", e.target.value)}
          placeholder="team@yourorg.com"
          autoComplete="off"
        />
      </FormGroup>

      <FormGroup label="AWS Organizations ID (Optional)">
        <input
          type="text"
          className={inputBase}
          value={form.orgId}
          onChange={(e) => onChange("orgId", e.target.value)}
          placeholder="o-xxxxxxxxxx"
          autoComplete="off"
        />
      </FormGroup>
    </div>
  );
}

// ── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({
  form,
  errors,
  onChange,
}: {
  form: typeof initialForm;
  errors: ErrorState;
  onChange: (field: string, value: string) => void;
}) {
  const inputBase =
    "bg-neutral-100 border border-b border-neutral-300 rounded-[7px] text-black text-sm py-2 px-3 outline-none transition-colors duration-150 w-full appearance-none placeholder:text-[#3a4155] focus:border-amber-600";

  const trustPolicy = useMemo(() => {
    const principal = form.accountId || "MGMT_ACCOUNT";
    return `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::${principal}:root"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": {
        "sts:ExternalId": "${EXT_ID}"
      }
    }
  }]
}`;
  }, [form.accountId]);

  return (
    <div className="animate-[fadeIn_0.2s_ease] flex flex-col gap-4">
      <div className="bg-[#1c1608] border border-[#78450a] rounded-lg p-4 flex gap-2.5">
        <div className="text-amber-600 text-sm shrink-0 mt-px">⚡</div>
        <div>
          <h4 className="text-[0.8rem] font-semibold text-amber-300 mb-1">
            Cross-Account IAM Role Required
          </h4>
          <p className="text-[0.78rem] text-[#c9943a] leading-relaxed">
            Create an IAM role in the target account that grants Budget Manager
            read access to AWS Cost Explorer, Budgets, and billing data.
          </p>
        </div>
      </div>

      <div>
        <div className="font-mono text-[0.63rem] tracking-widest text-[#6b7591] uppercase mb-1.5">
          Trust Policy
        </div>
        <div className="bg-[#0a0d14] border-b border-neutral-300 rounded-lg p-4 font-mono text-[0.7rem] text-sky-300 leading-[1.7] overflow-x-auto whitespace-pre-wrap break-all">
          {trustPolicy}
        </div>
      </div>

      <div>
        <div className="font-mono text-[0.63rem] tracking-widest text-[#6b7591] uppercase mb-1.5">
          Required Permissions
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PERMISSIONS.map((p) => (
            <span
              className="font-mono text-[0.65rem] bg-[#0d1018] border-b border-neutral-300 rounded px-2 py-1 text-slate-400"
              key={p}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <FormGroup label="IAM Role ARN" required error={errors.roleArn}>
        <input
          type="text"
          className={`${inputBase} ${errors.roleArn ? "!border-red-500" : ""}`}
          value={form.roleArn}
          onChange={(e) => onChange("roleArn", e.target.value)}
          placeholder="arn:aws:iam::123456789012:role/BudgetManagerRole"
          autoComplete="off"
        />
      </FormGroup>
    </div>
  );
}

// ── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({ form }: { form: typeof initialForm }) {
  const [testState, setTestState] = useState<"idle" | "testing" | "success">("idle");

  const handleTest = () => {
    if (testState !== "idle") return;
    setTestState("testing");
    setTimeout(() => setTestState("success"), 1800);
  };

  const cells = [
    { label: "Account ID", value: form.accountId, mono: false },
    { label: "Alias", value: form.alias, mono: false },
    { label: "Environment", value: form.environment, mono: false },
    { label: "Region", value: form.region, mono: false },
    { label: "Owner", value: form.ownerEmail, mono: false },
    { label: "Role ARN", value: form.roleArn, mono: true },
  ];

  const testBtnClasses =
    testState === "testing"
      ? "flex items-center gap-2 bg-transparent border border-blue-500 rounded-[7px] text-blue-500 text-[0.8rem] py-2 px-4 cursor-pointer transition-colors duration-150 self-start"
      : testState === "success"
        ? "flex items-center gap-2 bg-transparent border border-emerald-500 rounded-[7px] text-emerald-500 text-[0.8rem] py-2 px-4 cursor-pointer transition-colors duration-150 self-start"
        : "flex items-center gap-2 bg-transparent border  border-neutral-300 rounded-[7px] text-[#6b7591] text-[0.8rem] py-2 px-4 cursor-pointer transition-colors duration-150 self-start hover:lue-500 hover:text-blue-500";

  return (
    <div className="animate-[fadeIn_0.2s_ease] flex flex-col gap-4">
      <div>
        <div className="font-mono text-[0.63rem] tracking-widest text-[#6b7591] uppercase mb-1.5">
          Summary
        </div>
        <div className="grid grid-cols-2 gap-px bg-[#252a38] rounded-lg overflow-hidden border  border-neutral-300">
          {cells.map(({ label, value, mono }) => (
            <div className="bg-[#0d1018] p-3" key={label}>
              <div className="font-mono text-[0.62rem] tracking-wider text-[#6b7591] uppercase mb-1">
                {label}
              </div>
              <div
                className={`text-sm font-medium ${!value
                  ? "text-[#6b7591]"
                  : mono
                    ? "font-mono text-[0.68rem] break-all text-slate-200"
                    : "text-slate-200"
                  }`}
              >
                {value || "—"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={testBtnClasses} onClick={handleTest}>
        {testState === "testing" && (
          <span className="inline-block animate-spin">↺</span>
        )}
        {testState === "success" && <span>✓</span>}
        {testState === "idle" && <span>↺</span>}
        {testState === "testing"
          ? "Testing…"
          : testState === "success"
            ? "Connection Verified"
            : "Test IAM Connection"}
      </button>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function AWSOnboardModal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<ErrorState>(initialErrors);
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleChange = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const validate1 = () => {
    const errs = { ...initialErrors };
    let ok = true;

    if (!form.accountId.trim()) {
      errs.accountId = "AWS Account ID is required.";
      ok = false;
    } else if (!/^\d{8,12}$/.test(form.accountId.trim())) {
      errs.accountId = "Must be a valid numeric account ID.";
      ok = false;
    }

    if (!form.alias.trim()) {
      errs.alias = "Friendly name is required.";
      ok = false;
    }

    if (
      form.ownerEmail.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.ownerEmail.trim())
    ) {
      errs.ownerEmail = "Enter a valid email address.";
      ok = false;
    }

    setErrors(errs);
    return ok;
  };

  const validate2 = () => {
    const errs = { ...initialErrors };
    let ok = true;

    if (!form.roleArn.trim()) {
      errs.roleArn = "IAM Role ARN is required.";
      ok = false;
    } else if (!form.roleArn.trim().startsWith("arn:aws:iam::")) {
      errs.roleArn = 'ARN must start with "arn:aws:iam::"';
      ok = false;
    }

    setErrors(errs);
    return ok;
  };

  const stepStatus = (n: number) => {
    if (n < currentStep) return "done";
    if (n === currentStep) return "active";
    return "";
  };

  const goNext = () => {
    if (currentStep === 1 && !validate1()) return;
    if (currentStep === 2 && !validate2()) return;

    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  if (!visible) {
    return (
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            setVisible(true);
            setCurrentStep(1);
            setForm(initialForm);
            setErrors(initialErrors);
            setSubmitted(false);
          }}
          className="bg-amber-600 text-white border-none rounded-lg py-2.5 px-6 text-sm font-semibold cursor-pointer hover:bg-amber-500 transition-colors duration-150"
        >
          + Onboard Account
        </button>
      </div>
    );
  }

  const nextBtnClass = submitted ? "btn-next success" : "btn-next default";
  const nextBtnLabel = submitted
    ? "✓ Account Added"
    : currentStep === 3
      ? "✓ Add Account"
      : "Continue →";

  return (
    <div className="text-black font-sans">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-4 z-50">
        <div
          className=" bg-neutral-100 border  border-neutral-300 w-full max-w-[560px] shadow-[0_40px_100px_rgba(0,0,0,0.7)] flex flex-col max-h-[90vh] overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <UpperText setVisible={setVisible} />
          {/* Steps */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-none">
            <div className="flex items-center px-7 py-5  border-b border-neutral-300">
              <StepIndicator
                step="1"
                label="Account Details"
                status={stepStatus(1)}
              />
              <div className="flex-1 h-px bg-[#252a38] mx-2" />
              <StepIndicator
                step="2"
                label="IAM Trust"
                status={stepStatus(2)}
              />
              <div className="flex-1 h-px bg-[#252a38] mx-2" />
              <StepIndicator
                step="3"
                label="Validate & Add"
                status={stepStatus(3)}
              />
            </div>

            {/* Body */}
            <div className="p-7 overflow-y-auto overflow-x-hidden">
              {currentStep === 1 && (
                <Step1 form={form} errors={errors} onChange={handleChange} />
              )}
              {currentStep === 2 && (
                <Step2 form={form} errors={errors} onChange={handleChange} />
              )}
              {currentStep === 3 && <Step3 form={form} />}
            </div>
          </div>

          <Footer
            goBack={goBack}
            goNext={goNext}
            nextBtnClass={nextBtnClass}
            nextBtnLabel={nextBtnLabel}
            currentStep={currentStep}
            submitted={submitted}
          />
        </div>
      </div>
    </div>
  );
}
