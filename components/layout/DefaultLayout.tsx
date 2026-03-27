export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-auto">
      {children}
    </div>
  )
}