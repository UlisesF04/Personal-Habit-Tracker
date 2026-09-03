const tw = {
  page: "min-h-screen w-full flex items-center justify-center overflow-hidden relative",
  blob: "absolute rounded-full pointer-events-none",
  noise: "absolute inset-0 opacity-30 pointer-events-none",
  card: "relative z-10 w-full max-w-4xl mx-4 rounded-2xl overflow-hidden",
  cardInner: "flex h-full",

  decorPanel: "hidden lg:block w-[42%] relative overflow-hidden",
  decorGrid: "absolute inset-0 opacity-[0.07]",
  decorOrb: "absolute rounded-full pointer-events-none",
  decorContent: "relative z-10 text-center",
  decorSub: "text-[#7A6458] text-sm font-semibold uppercase mt-1 tracking-[0.2em]",
  decorPills: "relative z-10 flex flex-col gap-3 w-full max-w-[260px]",
  decorPill: "flex items-center gap-3 px-4 py-2.5 rounded-xl",
  decorText: "text-[#36251E] text-sm font-medium",
  decorInner:
    "relative w-full h-full flex flex-col items-center justify-center gap-8 px-12 overflow-hidden select-none",

  formPanel:
    "flex-1 flex flex-col justify-center px-8 py-10 lg:px-12 overflow-hidden",

  brand: "flex items-center gap-2.5 mb-8",
  logoIcon: "w-9 h-9 rounded-xl flex items-center justify-center",
  logoText: "text-lg font-bold text-[#36251E]",

  tabs: "flex gap-1 mb-8 p-1 rounded-xl w-fit",
  tab: "px-5 py-2 rounded-lg text-sm font-medium",

  form: "flex flex-col gap-4 max-w-sm",
  formRegister: "flex flex-col gap-3.5 max-w-sm",
  title: "text-2xl font-bold text-[#36251E]",
  subtitle: "text-[#7A6458] text-sm mt-1 font-medium",

  fieldGroup: "flex flex-col gap-1.5",
  label: "text-[11px] uppercase font-bold text-[#7A6458]",
  inputWrap: "relative flex items-center",
  iconWrap: "absolute left-3.5 pointer-events-none text-[#9C8A7F]",
  iconRight: "absolute right-3.5 pointer-events-none text-[#6A9A7B]",
  input:
    "w-full pl-10 pr-4 py-3 rounded-xl text-sm placeholder-[#B8A99D] font-medium",

  error: "flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs",

  btn: "mt-1 w-full py-3 rounded-xl text-sm",
  btnLoading: "flex items-center justify-center gap-2",

  strengthWrap: "flex items-center gap-2 mt-0.5",
  strengthBars: "flex gap-1 flex-1",
  strengthLbl:
    "text-[11px] font-medium w-14 text-right transition-colors duration-300",

  footerHint: "text-xs text-[#7A6458] text-center mt-1 font-medium",
  footerLink:
    "bg-transparent border-none p-0 font-bold cursor-pointer transition-colors",

  successWrap: "flex flex-col items-center gap-4 py-8",
  successIcon: "w-16 h-16 rounded-full flex items-center justify-center",
  successTitle: "text-[#36251E] font-bold text-lg",
  successSub: "text-[#7A6458] text-sm mt-1 font-medium",
};

export default tw;
