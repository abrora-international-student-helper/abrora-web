interface CardProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export default function Card({ children, title, className }: CardProps) {
  return (
    <div className={`card ${className}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}
