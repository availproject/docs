export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted" data-page-bg="muted">
      {children}
    </div>
  );
}
