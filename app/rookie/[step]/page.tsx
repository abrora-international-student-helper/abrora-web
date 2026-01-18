export default function RookieStepPage({ params }: { params: { step: string } }) {
  return (
    <div className="rookie-step-page">
      <h1>Rookie Guide - Step: {params.step}</h1>
      {/* TODO: Detailed view for each step */}
      {/* - Step title and description */}
      {/* - Detailed instructions */}
      {/* - Required documents list */}
      {/* - Tips and tricks */}
      {/* - Common mistakes to avoid */}
      {/* - Related resources */}
      {/* - Progress checkbox */}
      {/* - Next/Previous step navigation */}
    </div>
  )
}
