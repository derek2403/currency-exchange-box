import { cn } from "@/lib/utils";

export const BackgroundGradientGlow = ({ children, className, variant = "aurora" }) => {
  const variants = {
    aurora: {
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
        radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
        radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
      `,
    },
    lavender: {
      background: `linear-gradient(135deg, #E1BEE7 0%, #F3E5F5 20%, #FCE4EC 40%, #FFF0F5 60%, #F8BBD9 80%, #E1BEE7 100%)`,
    },
    goldenGlow: {
      background: `
        radial-gradient(ellipse 85% 65% at 8% 8%, rgba(186, 230, 253, 0.15), transparent 60%),
        radial-gradient(ellipse 75% 60% at 75% 35%, rgba(226, 232, 240, 0.12), transparent 62%),
        radial-gradient(ellipse 70% 60% at 15% 80%, rgba(203, 213, 225, 0.10), transparent 62%),
        radial-gradient(ellipse 70% 60% at 92% 92%, rgba(186, 230, 253, 0.12), transparent 62%),
        linear-gradient(180deg, #ffffff 0%, #ffffff 100%)
      `,
    },
  };

  return (
    <div className={cn("min-h-screen w-full relative", className)}>
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={variants[variant]}
      />
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

