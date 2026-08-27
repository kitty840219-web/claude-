export default function MainWrapper({ children }: { children: React.ReactNode }) {
  return <main className="flex-1 bg-night-dark pb-16 md:pb-0">{children}</main>;
}
